import { NextApiHandler } from 'next';

export const apiKey = () => (handler: NextApiHandler): NextApiHandler => {
    return async (req, res) => {
        const { key } = req.query;
        if (key !== process.env.API_KEY) {
            res.status(403).json({ error: 'Wrong API key' });
            return;
        }

        handler(req, res);
    };
};
