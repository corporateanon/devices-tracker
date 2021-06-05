import moment from 'moment';
import {
    BATTERY_HIGH_FILTER_THRESHOLD,
    BATTERY_LOW_FILTER_THRESHOLD,
    LEVEL_HIGH_FILTER_THRESHOLD,
    LEVEL_LOW_FILTER_THRESHOLD,
    OFFLINE_FILTER_TIMEOUT,
} from '../constants';
import { Telemetry } from '../db/models';
import { HighLow, Resolvers, YesNo } from '../generated/graphql';

export const resolvers: Resolvers<any> = {
    Query: {
        async getTelemetries(_, { filter }) {
            let query = Telemetry.find();
            if (filter.battery === HighLow.Low) {
                query = query
                    .where('battery')
                    .lte(BATTERY_LOW_FILTER_THRESHOLD);
            }
            if (filter.battery === HighLow.High) {
                query = query
                    .where('battery')
                    .gte(BATTERY_HIGH_FILTER_THRESHOLD);
            }

            if (filter.level === HighLow.Low) {
                query = query.where('level').lte(LEVEL_LOW_FILTER_THRESHOLD);
            }
            if (filter.level === HighLow.High) {
                query = query.where('level').gte(LEVEL_HIGH_FILTER_THRESHOLD);
            }

            if (filter.online === YesNo.Yes) {
                const timeThreshold = new Date(
                    new Date().valueOf() - OFFLINE_FILTER_TIMEOUT
                );
                query = query.where('updatedAt').gt(timeThreshold.valueOf());
            }
            if (filter.online === YesNo.No) {
                const timeThreshold = new Date(
                    new Date().valueOf() - OFFLINE_FILTER_TIMEOUT
                );
                query = query.where('updatedAt').lte(timeThreshold.valueOf());
            }

            const data = await query.exec();

            return data.map((tel) => ({
                lat: tel.lat,
                lng: tel.lng,
                id: tel._id,
                level: tel.level,
                battery: tel.battery,
                updatedAt: moment(tel.updatedAt).toISOString(),
            }));
        },
    },
};
