import { gql } from '@apollo/client';

gql`
    query GetFeatures {
        getFeatures {
            id
            lat
            lng
            level
        }
    }
`;
