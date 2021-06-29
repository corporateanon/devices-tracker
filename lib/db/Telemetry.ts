import mongoose, { Model } from 'mongoose';

export interface ITelemetry {
    _id: string;
    deviceId: string;
    lat: number;
    lng: number;
    level: number;
    battery: number;
    updatedAt: Date;
}

export const TelemetrySchema = new mongoose.Schema({
    deviceId: { required: true, type: String, unique: true },
    lat: { required: true, type: Number },
    lng: { required: true, type: Number },
    level: { required: true, type: Number, index: true },
    battery: { required: true, type: Number, index: true },
    updatedAt: { required: true, type: Date, index: true },
});

const Telemetry: Model<ITelemetry> =
    mongoose.models.Telemetry ?? mongoose.model('Telemetry', TelemetrySchema);

export { Telemetry };
