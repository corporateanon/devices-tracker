import mongoose, { Model } from 'mongoose';

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

interface ITelemetry {
    _id: string;
    lat: number;
    lng: number;
    level: number;
    battery: number;
    updatedAt: Date;
}

export const TelemetrySchema = new mongoose.Schema({
    _id: { required: true, type: String },
    lat: { required: true, type: Number },
    lng: { required: true, type: Number },
    level: { required: true, type: Number },
    battery: { required: true, type: Number },
    updatedAt: { required: true, type: Date },
});

const Telemetry: Model<ITelemetry> =
    mongoose.models.Telemetry ?? mongoose.model('Telemetry', TelemetrySchema);

export { Telemetry };
