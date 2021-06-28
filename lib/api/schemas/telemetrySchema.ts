import { gql } from 'apollo-server-micro';

// https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/

export const telemetrySchema = gql`
    type Telemetry {
        _id: ObjectID!
        deviceId: String!
        lat: Float!
        lng: Float!
        level: Float!
        battery: Float!
        updatedAt: DateTime!
    }

    enum YesNo {
        YES
        NO
    }

    enum HighLow {
        LOW
        HIGH
    }

    enum TelemetrySort {
        URGENT
        NEWEST
        OLDEST
        BATTERY_LOW
        BATTERY_HIGH
        LEVEL_LOW
        LEVEL_HIGH
    }

    input TelemetryFilter {
        level: HighLow
        battery: HighLow
        online: YesNo
        sort: TelemetrySort
    }

    extend type Query {
        getTelemetries(filter: TelemetryFilter!): [Telemetry]
        getTelemetry(ID: ObjectID!): Telemetry
    }
`;
