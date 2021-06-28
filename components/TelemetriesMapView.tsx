import { useRouter } from 'next/router';
import { FC } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEventEmitter } from '../hooks/useEventEmitter';
import { useGetTelemetriesQuery } from '../lib/generated/graphql';
import { queryToTelemetryFilters } from './filters/telemetryFilters';
import { LeafletBarrelMarker } from './LeafletBarrelMarker';

export const TelemetriesMapView: FC = () => {
    const { query } = useRouter();
    const { data } = useGetTelemetriesQuery({
        pollInterval: 60000,
        ssr: false,
        variables: {
            filter: queryToTelemetryFilters(query),
        },
    });

    return (
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
            />

            <MapContainer
                center={[49.98843434273719, 36.20908579197663]}
                zoom={13}
                style={{ height: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data &&
                    data.getTelemetries.map((telemetry) => (
                        <LeafletBarrelMarker
                            key={telemetry._id}
                            telemetry={telemetry}
                        />
                    ))}
            </MapContainer>
        </>
    );
};
