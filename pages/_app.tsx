import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NoSsr } from '@material-ui/core';
import { getSession, Provider as NextAuthProvider } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import { SplashScreen } from '../components/SplashScreen';
import '../css/reset.css';

const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <NoSsr>
                <NextAuthProvider session={pageProps.session}>
                    <SplashScreen>
                        <ApolloProvider client={client}>
                            <Component {...pageProps} />
                        </ApolloProvider>
                    </SplashScreen>
                </NextAuthProvider>
            </NoSsr>
        </>
    );
}

export async function getServerSideProps(ctx) {
    return {
        props: {
            session: await getSession(ctx),
        },
    };
}
