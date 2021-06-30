import { Contact } from '../../db/Contact';
import { Resolvers } from '../../generated/graphql';
import { ApplicationContext } from '../applicationContext';

export const contactResolvers: Resolvers<ApplicationContext> = {
    Query: {
        async getContact(_, { id }) {
            const contact = await Contact.findById(id).lean();
            if (!contact) {
                return null;
            }
            return contact;
        },

        async getContacts() {
            const contacts = await Contact.find().sort('name').lean();
            return contacts;
        },
    },
    Mutation: {
        async saveContact(_, { contact: contactInput }) {
            if (!contactInput._id) {
                const doc = new Contact({
                    ...contactInput,
                    updatedAt: new Date(),
                    _id: undefined,
                });
                await doc.save();
                return doc;
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
            return doc;
        },
    },
};
