import { NextApiHandler } from 'next';
import Ajv from 'ajv';

export const validate = (schema: any) => (
    handler: NextApiHandler
): NextApiHandler => {
    const ajv = new Ajv();
    return async (req, res) => {
        const schemaValidate = ajv.compile(schema);
        const valid = schemaValidate(req.body);
        if (!valid) {
            res.status(400).json({
                errors: schemaValidate.errors,
            });
        }

        handler(req, res);
    };
};
