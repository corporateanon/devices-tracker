import { FilterQuery } from 'mongoose';
import {
    BATTERY_HIGH_FILTER_THRESHOLD,
    BATTERY_LOW_FILTER_THRESHOLD,
    LEVEL_HIGH_FILTER_THRESHOLD,
    LEVEL_LOW_FILTER_THRESHOLD,
    OFFLINE_FILTER_TIMEOUT,
} from '../../constants';
import { Telemetry } from '../../db/models';
import { ITelemetry } from '../../db/Telemetry';
import {
    HighLow,
    Resolvers,
    TelemetrySort,
    YesNo,
} from '../../generated/graphql';
import { ApplicationContext } from '../applicationContext';

export const telemetryResolvers: Resolvers<ApplicationContext> = {
    Query: {
        async getTelemetry(_, { ID }) {
            return await Telemetry.findById(ID).lean();
        },

        async getTelemetries(_, { filter }) {
            const match: FilterQuery<ITelemetry> = {};

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
                match.updatedAt = { $gt: new Date(timeThreshold.valueOf()) };
            }
            if (filter.online === YesNo.No) {
                const timeThreshold = new Date(
                    new Date().valueOf() - OFFLINE_FILTER_TIMEOUT
                );
                match.updatedAt = { $lte: new Date(timeThreshold.valueOf()) };
            }

            const sort =
                {
                    [TelemetrySort.BatteryHigh]: { battery: -1 },
                    [TelemetrySort.BatteryLow]: { battery: 1 },
                    [TelemetrySort.LevelHigh]: { level: -1 },
                    [TelemetrySort.LevelLow]: { level: 1 },
                    [TelemetrySort.Newest]: { updatedAt: -1 },
                    [TelemetrySort.Oldest]: { updatedAt: 1 },
                    [TelemetrySort.Urgent]: { score: -1 },
                }[filter.sort] ?? {};

            const items = await Telemetry.aggregate<
                ITelemetry & { score: number }
            >([
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
                    $sort: sort,
                },
            ]);

            return items.map(({ score, ...telemetry }) => ({
                telemetry,
                meta: { score },
            }));
        },
    },
};
