import { useRouter } from 'next/router';
import { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useEventEmitter } from '../hooks/useEventEmitter';
import { useGetTelemetriesQuery } from '../lib/generated/graphql';
import { queryToFilters } from './filters/filters';
import { LeafletBarrelMarker } from './LeafletBarrelMarker';

const MapSizeUpdater: FC = () => {
    const map = useMap();
    useEventEmitter({
        resize: () => {
            map.invalidateSize();
        },
    });
    return null;
};

export const MapView: FC = () => {
    const { query } = useRouter();
    const { error, data, loading } = useGetTelemetriesQuery({
        pollInterval: 60000,
        ssr: false,
        variables: {
            filter: queryToFilters(query),
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
                <MapSizeUpdater />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data &&
                    data.getTelemetries.map((telemetry) => (
                        <LeafletBarrelMarker telemetry={telemetry} />
                    ))}
            </MapContainer>
        </>
    );
};
