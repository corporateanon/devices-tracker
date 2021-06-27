import { gql } from '@apollo/client';

gql`
    query GetTelemetries($filter: TelemetryFilter!) {
        getTelemetries(filter: $filter) {
            id
            deviceId
            lat
            lng
            level
            battery
            updatedAt
        }
    }

    query GetTelemetry($id: ID!) {
        getTelemetry(ID: $id) {
            id
            deviceId
            lat
            lng
            level
            battery
            updatedAt
        }
    }

    query GetContacts {
        getContacts {
            _id
            name
            phone
            updatedAt
        }
    }

    mutation SaveContact($contact: ContactInput!) {
        saveContact(contact: $contact) {
            _id
            name
            phone
            updatedAt
        }
    }
`;
