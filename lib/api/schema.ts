import { gql } from 'apollo-server-micro';

// https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/

export const typeDefs = gql`
    type Telemetry {
        id: ID!
        lat: Float!
        lng: Float!
        level: Float!
        battery: Float!
        updatedAt: String!
    }

    type Query {
        getTelemetries: [Telemetry]
    }
`;
