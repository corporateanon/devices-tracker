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
            const match: any = {};
            if (filter.battery === HighLow.Low) {
                match.battery = { $lte: BATTERY_LOW_FILTER_THRESHOLD };
            }
            if (filter.battery === HighLow.High) {
                match.battery = { $gte: BATTERY_HIGH_FILTER_THRESHOLD };
            }

            if (filter.level === HighLow.Low) {
                match.level = { $lte: LEVEL_LOW_FILTER_THRESHOLD };
            }
            if (filter.level === HighLow.High) {
                match.level = { $gte: LEVEL_HIGH_FILTER_THRESHOLD };
            }

            if (filter.online === YesNo.Yes) {
                const timeThreshold = new Date(
                    new Date().valueOf() - OFFLINE_FILTER_TIMEOUT
                );
                match.updatedAt = { $gt: timeThreshold.valueOf() };
            }
            if (filter.online === YesNo.No) {
                const timeThreshold = new Date(
                    new Date().valueOf() - OFFLINE_FILTER_TIMEOUT
                );
                match.updatedAt = { $lte: timeThreshold.valueOf() };
            }

            const aggregation = Telemetry.aggregate([
                {
                    $match: match,
                },
                {
                    $addFields: {
                        score: {
                            $add: [
                                '$level',
                                {
                                    $subtract: [1, '$battery'],
                                },
                            ],
                        },
                    },
                },
                {
                    $sort: {
                        score: -1,
                    },
                },
                {
                    $project: {
                        score: 0,
                    },
                },
            ]);

            return (await aggregation.exec()).map((tel) => ({
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
