import { NextApiHandler } from 'next';
import { Telemetry } from '../../lib/db/models';
import { apiKey } from '../../lib/middleware/apiKey';
import { method } from '../../lib/middleware/method';
import { compose } from 'lodash/fp';
import { schemaPostTelemetryBody } from '../../lib/json-schemas';
import { validate } from '../../lib/middleware/validate';

const handler: NextApiHandler = async (req, res) => {
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

export default compose(
    validate(schemaPostTelemetryBody),
    apiKey(),
    method('post')
)(handler);
