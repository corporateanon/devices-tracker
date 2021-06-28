import { gql } from 'apollo-server-micro';

export const contactSchema = gql`
    type Contact {
        _id: ObjectID!
        updatedAt: DateTime!
        name: String!
        phone: String
        archived: Boolean
    }

    input ContactFilter {
        archived: Boolean
    }

    input ContactInput {
        _id: ID
        name: String
        phone: String
    }

    extend type Mutation {
        saveContact(contact: ContactInput!): Contact
    }

    extend type Query {
        getContacts(filter: ContactFilter): [Contact!]!
        getContact(id: ID!): Contact
    }
`;
