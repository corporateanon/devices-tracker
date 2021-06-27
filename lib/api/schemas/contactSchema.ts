import { gql } from 'apollo-server-micro';

export const contactSchema = gql`
    type Contact {
        _id: ObjectID!
        updatedAt: DateTime!
        name: String!
        phone: String
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
        getContacts: [Contact!]!
        getContact(id: ID!): Contact
    }
`;
