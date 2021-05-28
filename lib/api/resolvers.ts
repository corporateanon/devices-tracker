import moment from 'moment';
import { Telemetry } from '../db/models';
import { HighLow, Resolvers, YesNo } from '../generated/graphql';

export const resolvers: Resolvers<any> = {
    Query: {
        async getTelemetries(_, { filter }) {
            let query = Telemetry.find();
            if (filter.battery === HighLow.Low) {
                query = query.where('battery').lte(0.1);
            }
            if (filter.battery === HighLow.High) {
                query = query.where('battery').gte(0.9);
            }
            if (filter.level === HighLow.Low) {
                query = query.where('level').lte(0.1);
            }
            if (filter.level === HighLow.High) {
                query = query.where('level').gte(0.9);
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
