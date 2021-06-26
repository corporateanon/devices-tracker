import moment from 'moment';
import {
    BATTERY_HIGH_FILTER_THRESHOLD,
    BATTERY_LOW_FILTER_THRESHOLD,
    LEVEL_HIGH_FILTER_THRESHOLD,
    LEVEL_LOW_FILTER_THRESHOLD,
    OFFLINE_FILTER_TIMEOUT,
} from '../../constants';
import { Telemetry } from '../../db/models';
import { HighLow, Resolvers, YesNo } from '../../generated/graphql';
import { ApplicationContext } from '../applicationContext';

export const telemetryResolvers: Resolvers<ApplicationContext> = {
    Query: {
        async getTelemetry(_, { ID }) {
            const doc = await Telemetry.findById(ID).lean();
            //TODO: remove this mess
            return {
                ...doc,
                id: doc._id,
                updatedAt: doc.updatedAt.toString(),
            };
        },
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

            //TODO: remove this mess
            return data.map((tel) => ({
                lat: tel.lat,
                lng: tel.lng,
                id: tel._id,
                deviceId: tel.deviceId,
                level: tel.level,
                battery: tel.battery,
                updatedAt: moment(tel.updatedAt).toISOString(),
            }));
        },
    },
};
