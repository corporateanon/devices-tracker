import { gql } from '@apollo/client';

gql`
    query GetTelemetries($filter: TelemetryFilter!) {
        getTelemetries(filter: $filter) {
            id
            lat
            lng
            level
            battery
            updatedAt
        }
    }
`;
