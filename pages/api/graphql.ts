import { ApolloServer } from 'apollo-server-micro';
import { resolvers as scalarsResolvers } from 'graphql-scalars';
import { createApplicationContext } from '../../lib/api/applicationContext';
import { contactResolvers } from '../../lib/api/resolvers/contactResolvers';
import { telemetryResolvers } from '../../lib/api/resolvers/telemetryResolvers';
import { commonSchema } from '../../lib/api/schemas/commonSchema';
import { contactSchema } from '../../lib/api/schemas/contactSchema';
import { telemetrySchema } from '../../lib/api/schemas/telemetrySchema';

const apolloServer = new ApolloServer({
    typeDefs: [commonSchema, contactSchema, telemetrySchema],
    resolvers: [
        contactResolvers,
        telemetryResolvers,
        {
            DateTime: scalarsResolvers.DateTime,
            ObjectID: scalarsResolvers.ObjectID,
        },
    ],
    context: createApplicationContext,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
