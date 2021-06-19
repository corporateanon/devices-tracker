import { NextApiRequest } from 'next';
import { AuthenticationError } from 'apollo-server-micro';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

export interface ApplicationContext {
    session?: { type: 'user'; data: Session } | { type: 'api-key' };
}

export async function createApplicationContext({
    req,
}: {
    req: NextApiRequest;
}): Promise<ApplicationContext> {
    const key = req.query.key ?? req.headers['x-api-key'];
    if (key && key === process.env.API_KEY) {
        return { session: { type: 'api-key' } };
    }

    const session = await getSession({ req });
    if (!session) {
        throw new AuthenticationError('Unauthorized');
    }
    return {
        session: { type: 'user', data: session },
    };
}
