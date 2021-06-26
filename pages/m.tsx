import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import React from 'react';
import { ApplicationLayout } from '../components/ApplicationLayout';

const DynamicMapView = dynamic(
    () =>
        import('../components/TelemetriesMapView').then(
            (m) => m.TelemetriesMapView
        ),
    { ssr: false }
);

const MapPage: NextPage = () => {
    return (
        <ApplicationLayout currentTab="map">
            <DynamicMapView />
        </ApplicationLayout>
    );
};

export default MapPage;
