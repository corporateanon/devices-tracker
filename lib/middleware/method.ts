import { NextApiHandler } from 'next';

export const method = (...methodNames: string[]) => (
    handler: NextApiHandler
): NextApiHandler => {
    const normalizedMethodNames = methodNames.map((name) => name.toLowerCase());
    return async (req, res) => {
        if (!normalizedMethodNames.includes(req.method.toLowerCase())) {
            res.status(405).end();
            return;
        }

        handler(req, res);
    };
};
