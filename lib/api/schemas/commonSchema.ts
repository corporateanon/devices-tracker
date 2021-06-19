import { gql } from 'apollo-server-micro';

export const commonSchema = gql`
    scalar DateTime
    scalar ObjectID

    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;
