import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import NoSsr from '@material-ui/core/NoSsr';
import { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import React from 'react';
import { SplashScreen } from '../components/SplashScreen';
import { SessionContextProvider } from '../lib/sessionContext';

const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
});

const CommonPage: NextPage = ({ children }) => {
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
                <ApolloProvider client={client}>{children}</ApolloProvider>
            </SessionContextProvider>
        </>
    );
};

export default CommonPage;
