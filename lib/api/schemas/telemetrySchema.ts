import { gql } from 'apollo-server-micro';

// https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/

export const telemetrySchema = gql`
    type Telemetry {
        id: ID!
        lat: Float!
        lng: Float!
        level: Float!
        battery: Float!
        updatedAt: String!
    }

    enum YesNo {
        YES
        NO
    }

    enum HighLow {
        LOW
        HIGH
    }

    input TelemetryFilter {
        level: HighLow
        battery: HighLow
        online: YesNo
    }

    extend type Query {
        getTelemetries(filter: TelemetryFilter!): [Telemetry]
        getTelemetry(ID: ID!): Telemetry
    }
`;
