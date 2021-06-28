import mongoose, { Model } from 'mongoose';

export interface IContact {
    _id: string;
    updatedAt: Date;
    name: string;
    phone?: string;
    archived?: boolean;
}

export const ContactSchema = new mongoose.Schema({
    name: { required: true, type: String },
    phone: { type: String },
    updatedAt: { required: true, type: Date },
    archived: { type: Boolean, index: true },
});

const Contact: Model<IContact> =
    mongoose.models.Contact ?? mongoose.model('Contact', ContactSchema);

export { Contact };
