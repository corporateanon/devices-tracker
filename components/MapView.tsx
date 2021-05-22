import { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useEventEmitter } from '../hooks/useEventEmitter';
import { useGetFeaturesQuery } from '../lib/generated/graphql';

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
    const { error, data, loading } = useGetFeaturesQuery({
        pollInterval: 60000,
        ssr: false,
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
                    data.getFeatures.map((feature) => (
                        <Marker
                            key={feature.id}
                            position={[feature.lat, feature.lng]}
                        >
                            <Popup>
                                <p>
                                    <b>Наполнение:</b>{' '}
                                    <span>{feature.level}</span>
                                </p>
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </>
    );
};