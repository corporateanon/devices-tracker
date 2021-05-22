import { NextApiHandler } from 'next';
import { Telemetry } from '../../lib/db/models';

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(400).end();
        return;
    }

    const body = req.body;

    const doc = await Telemetry.findOneAndUpdate(
        { _id: `${body._id}` },
        {
            ...body,
            updatedAt: Date.now(),
        },
        {
            new: true,
            upsert: true,
        }
    );

    res.status(201).json(doc);
};
export default handler;
