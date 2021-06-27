import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CssBaseline, NoSsr } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    );

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <NoSsr>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <NextAuthProvider session={pageProps.session}>
                        <SplashScreen>
                            <ApolloProvider client={client}>
                                <Component {...pageProps} />
                            </ApolloProvider>
                        </SplashScreen>
                    </NextAuthProvider>
                </ThemeProvider>
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
