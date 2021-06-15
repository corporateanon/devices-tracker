import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import NoSsr from '@material-ui/core/NoSsr';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import React from 'react';
import { SplashScreen } from '../components/SplashScreen';
import { SessionContextProvider } from '../lib/sessionContext';

const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
});

const DynamicDashboard = dynamic(
    () => import('../components/Dashboard').then((m) => m.Dashboard),
    { ssr: false }
);

const HomePage: NextPage = () => {
    const [session, loading] = useSession();

    if (!session) {
        return (
            <NoSsr>
                <SplashScreen />
            </NoSsr>
        );
    }

    return (
        <>
            <SessionContextProvider value={[session, loading]}>
                <ApolloProvider client={client}>
                    <DynamicDashboard />
                </ApolloProvider>
            </SessionContextProvider>
        </>
    );
};

export default HomePage;
