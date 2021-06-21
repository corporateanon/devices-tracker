import { NextPage } from 'next';
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';

const HomePage: NextPage = () => {
    return <ApplicationLayout currentTab="contacts">contacts</ApplicationLayout>;
};

export default HomePage;
