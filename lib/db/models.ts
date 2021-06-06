import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export { Telemetry } from './Telemetry';
export { Contact } from './Contact';
