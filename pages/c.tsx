import { NextPage } from 'next';
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';
import { ContactsListView } from '../components/ContactsListView';

const ContactsPage: NextPage = () => {
    return (
        <ApplicationLayout currentTab="contacts">
            <ContactsListView />
        </ApplicationLayout>
    );
};

export default ContactsPage;
