import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const AUTHORIZED_EMAILS = (process.env.AUTHORIZED_EMAILS ?? '').split(
    /[,\s\n]+/
);
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export default NextAuth({
    secret: NEXTAUTH_SECRET,
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    database: process.env.MONGODB_CONNECTION,

    callbacks: {
        async signIn(user, account, profile) {
            if (AUTHORIZED_EMAILS.includes(user.email)) {
                return true;
            }
            return false;
        },
    },
});
