import { gql } from '@apollo/client';

gql`
    query GetTelemetries {
        getTelemetries {
            id
            lat
            lng
            level
            battery
            updatedAt
        }
    }
`;
