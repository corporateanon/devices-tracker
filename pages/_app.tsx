import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CssBaseline, NoSsr } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, Provider as NextAuthProvider } from 'next-auth/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { SplashScreen } from '../components/SplashScreen';
import '../css/reset.css';

const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
    );
}

export const getServerSideProps: GetServerSideProps<{
    session: Session;
}> = async (ctx) => {
    return {
        props: {
            session: await getSession(ctx),
        },
    };
};
