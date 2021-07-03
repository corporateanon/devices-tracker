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
                contact {
                    name
                    phone
                }
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

    query GetContacts($filter: ContactFilter) {
        getContacts(filter: $filter) {
            _id
            name
            phone
            archived
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

    mutation UpdateContactArchived($contact: ContactArchivedInput!) {
        updateContactArchived(contact: $contact)
    }

    mutation SaveTelemetry($telemetry: TelemetryUpdate!) {
        updateTelemetry(telemetry: $telemetry)
    }
`;
