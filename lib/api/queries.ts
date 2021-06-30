import { gql } from '@apollo/client';

gql`
    query GetTelemetries($filter: TelemetryFilter!) {
        getTelemetries(filter: $filter) {
            telemetry {
                _id
                deviceId
                lat
                lng
                level
                battery
                updatedAt
                contactID
            }
            meta {
                score
            }
        }
    }

    query GetTelemetry($id: ObjectID!) {
        getTelemetry(ID: $id) {
            _id
            deviceId
            lat
            lng
            level
            battery
            updatedAt
            contactID
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

    mutation SaveTelemetry($telemetry: TelemetryUpdate!) {
        updateTelemetry(telemetry: $telemetry)
    }
`;
