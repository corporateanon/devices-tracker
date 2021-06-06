import { gql } from 'apollo-server-micro';

export const contactSchema = gql`
    type Contact {
        _id: ID!
        updatedAt: String!
        name: String!
        phone: String
    }

    input ContactInput {
        _id: ID
        name: String!
        phone: String
    }


    extend type Query {
        saveContact(contact: ContactInput!): Contact
        getContacts: [Contact!]!
        getContact(id: ID!): Contact
    }
`;
