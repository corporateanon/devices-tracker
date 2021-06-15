import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import { ApplicationContext } from '../../lib/api/applicationContext';
import { contactResolvers } from '../../lib/api/resolvers/contactResolvers';
import { telemetryResolvers } from '../../lib/api/resolvers/telemetryResolvers';
import { contactSchema } from '../../lib/api/schemas/contactSchema';
import { telemetrySchema } from '../../lib/api/schemas/telemetrySchema';

const apolloServer = new ApolloServer({
    typeDefs: [contactSchema, telemetrySchema],
    resolvers: [contactResolvers, telemetryResolvers],
    async context({ req }): Promise<ApplicationContext> {
        const session = await getSession({ req });
        if (!session) {
            throw new AuthenticationError('Unauthorized');
        }
        return {
            session,
        };
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
