import { compose } from 'lodash/fp';
import { NextApiHandler } from 'next';
import { Telemetry } from '../../../lib/db/models';
import { apiKey } from '../../../lib/middleware/apiKey';
import { method } from '../../../lib/middleware/method';
import { schemaPostTelemetryBatchBody } from '../../../lib/json-schemas';
import { validate } from '../../../lib/middleware/validate';

const handler: NextApiHandler = async (req, res) => {
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

export default compose(
    validate(schemaPostTelemetryBatchBody),
    apiKey(),
    method('post')
)(handler);
