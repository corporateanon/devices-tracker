import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
});

const DynamicDashboard = dynamic(
    () => import('../lib/Dashboard').then((m) => m.Dashboard),
    { ssr: false }
);

const HomePage: NextPage = () => {
    return (
        <>
            <ApolloProvider client={client}>
                <DynamicDashboard />
            </ApolloProvider>
        </>
    );
};

export default HomePage;
