import mongoose, { Schema, Model, ObjectId } from 'mongoose';

export interface ITelemetry {
    _id: string;
    deviceId: string;
    lat: number;
    lng: number;
    level: number;
    battery: number;
    updatedAt: Date;
    contactID?: ObjectId;
}

export const TelemetrySchema = new Schema({
    deviceId: { required: true, type: String, unique: true },
    lat: { required: true, type: Number },
    lng: { required: true, type: Number },
    level: { required: true, type: Number, index: true },
    battery: { required: true, type: Number, index: true },
    updatedAt: { required: true, type: Date, index: true },
    contactID: { type: Schema.Types.ObjectId, index: true },
});

const Telemetry: Model<ITelemetry> =
    mongoose.models.Telemetry ?? mongoose.model('Telemetry', TelemetrySchema);

export { Telemetry };
