import { Document } from 'mongoose';
import { Contact, IContact } from '../../db/Contact';
import { Contact as GQLContact, Resolvers } from '../../generated/graphql';

function adaptContact(_contact: any): GQLContact {
    const contact = _contact.toJSON();
    return {
        ...contact,
        _id: contact._id.toString(),
        updatedAt: contact.updatedAt.toISOString(),
    };
}

export const contactResolvers: Resolvers<any> = {
    Query: {
        async getContact(_, { id }) {
            const contact = await Contact.findById(id);
            if (!contact) {
                return null;
            }
            return adaptContact(contact);
        },

        async getContacts() {
            const contacts = await Contact.find();
            return contacts.map(adaptContact);
        },

        async saveContact(_, { contact: contactInput }) {
            if (!contactInput._id) {
                const doc = new Contact({
                    ...contactInput,
                    updatedAt: new Date(),
                });
                await doc.save();
                return adaptContact(doc);
            }

            const doc = await Contact.findByIdAndUpdate(
                contactInput._id,
                {
                    ...contactInput,
                    updatedAt: new Date(),
                },
                {
                    new: true,
                }
            );
            if (!doc) {
                return null;
            }
            return adaptContact(doc);
        },
    },
};
