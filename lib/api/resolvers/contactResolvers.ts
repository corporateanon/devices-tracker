import { FilterQuery } from 'mongoose';
import { Contact, IContact } from '../../db/Contact';
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

        async getContacts(_, { filter = {} }) {
            const query: FilterQuery<IContact> = filter.archived
                ? {
                      archived: true,
                  }
                : {
                      archived: { $ne: true },
                  };
            const contacts = await Contact.find(query).lean();
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
                    //TODO: use hook
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
        async updateContactArchived(_, { contact: contactInput }) {
            const doc = await Contact.findByIdAndUpdate(
                contactInput._id,
                {
                    archived: contactInput.archived,
                    //TODO: use hook
                    updatedAt: new Date(),
                },
                {
                    new: true,
                }
            );
            return Boolean(doc);
        },
    },
};
