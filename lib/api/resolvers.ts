import axios from 'axios';
import { Telemetry } from '../db/models';
import { Resolvers } from '../generated/graphql';

export const resolvers: Resolvers<any> = {
    Query: {
        async getFeatures() {
            const data = await Telemetry.find({});

            return data.map((tel) => ({
                lat: tel.lat,
                lng: tel.lng,
                id: tel._id,
                level: tel.level,
            }));
        },
    },
};
