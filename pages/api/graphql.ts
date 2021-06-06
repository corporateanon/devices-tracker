import { ApolloServer } from 'apollo-server-micro';
import { contactResolvers } from '../../lib/api/resolvers/contactResolvers';
import { telemetryResolvers } from '../../lib/api/resolvers/telemetryResolvers';
import { contactSchema } from '../../lib/api/schemas/contactSchema';
import { telemetrySchema } from '../../lib/api/schemas/telemetrySchema';

const apolloServer = new ApolloServer({
    typeDefs: [contactSchema, telemetrySchema],
    resolvers: [contactResolvers, telemetryResolvers],
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
