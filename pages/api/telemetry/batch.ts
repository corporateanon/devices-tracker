import { NextApiHandler } from 'next';
import { Telemetry } from '../../../lib/db/models';

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(400).end();
        return;
    }
    const { key } = req.query;
    if (key !== process.env.API_KEY) {
        res.status(403).json({ error: 'Wrong API key' });
        return;
    }

    const telemetriesList = req.body;

    const docs = [];
    for (const telemetryItem of telemetriesList) {
        const doc = await Telemetry.findOneAndUpdate(
            { _id: `${telemetryItem._id}` },
            {
                ...telemetryItem,
                updatedAt: Date.now(),
            },
            {
                new: true,
                upsert: true,
            }
        );
        docs.push(doc);
    }

    res.status(201).json(docs);
};
export default handler;
