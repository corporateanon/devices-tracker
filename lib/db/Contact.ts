import mongoose, { Model } from 'mongoose';

export interface IContact {
    _id: string;
    updatedAt: Date;
    name: string;
    phone?: string;
}

export const ContactSchema = new mongoose.Schema({
    name: { required: true, type: String },
    phone: { required: true, type: String },
    updatedAt: { required: true, type: Date },
});

const Contact: Model<IContact> =
    mongoose.models.Contact ?? mongoose.model('Contact', ContactSchema);

export { Contact };
