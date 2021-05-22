import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../lib/api/schema';
import { resolvers } from '../../lib/api/resolvers';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
