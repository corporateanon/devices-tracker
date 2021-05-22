import moment from 'moment';
import { Telemetry } from '../db/models';
import { Resolvers } from '../generated/graphql';

export const resolvers: Resolvers<any> = {
    Query: {
        async getTelemetries() {
            const data = await Telemetry.find({});

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
