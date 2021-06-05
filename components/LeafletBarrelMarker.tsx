import { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Telemetry } from '../lib/generated/graphql';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { BarrelMarker } from './BarrelMarker';

export const LeafletBarrelMarker: FC<{ telemetry: Telemetry }> = ({
    telemetry,
}) => {
    const icon = L.divIcon({
        iconSize: [50, 65],
        iconAnchor: [25, 65],
        className: '',
        html: ReactDOMServer.renderToString(
            <BarrelMarker
                level={telemetry.level}
                battery={telemetry.battery < 0.3}
            />
        ),
    });

    return (
        <Marker
            key={telemetry.id}
            position={[telemetry.lat, telemetry.lng]}
            icon={icon}
        >
            <Popup>
                <p>
                    <b>Наполнение:</b> <span>{telemetry.level}</span>
                </p>
            </Popup>
        </Marker>
    );
};
