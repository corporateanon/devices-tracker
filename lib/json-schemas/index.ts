import { JSONSchema6 } from 'json-schema';
import _schemaPostTelemetryBatchBody from './schema-post-telemetry-batch-body.json';
import _schemaPostTelemetryBody from './schema-post-telemetry-body.json';

const schemaPostTelemetryBatchBody = _schemaPostTelemetryBatchBody as JSONSchema6;
const schemaPostTelemetryBody = _schemaPostTelemetryBody as JSONSchema6;

export { schemaPostTelemetryBatchBody, schemaPostTelemetryBody };
