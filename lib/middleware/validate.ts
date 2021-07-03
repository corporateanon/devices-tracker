import { NextApiHandler } from 'next';
import Ajv from 'ajv';
import { JSONSchema6 } from 'json-schema';

export const validate = (schema: JSONSchema6) => (
    handler: NextApiHandler
): NextApiHandler => {
    const ajv = new Ajv();
    const schemaValidate = ajv.compile(schema);
    return async (req, res) => {
        const valid = schemaValidate(req.body);
        if (!valid) {
            res.status(400).json({
                errors: schemaValidate.errors,
            });
        }

        handler(req, res);
    };
};
