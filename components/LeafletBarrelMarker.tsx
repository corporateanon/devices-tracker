import L from 'leaflet';
import { FC } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import { Telemetry } from '../lib/generated/graphql';
import { isBatteryLow, isOffline } from '../lib/telemetryUtils';
import { BarrelMarker } from './BarrelMarker';

export const LeafletBarrelMarker: FC<{ telemetry: Telemetry }> = ({
    telemetry,
}) => {
    const icon = L.divIcon({
        iconSize: [52, 65],
        iconAnchor: [27, 65],
        popupAnchor: [0, -65],
        className: '',
        html: ReactDOMServer.renderToString(
            <BarrelMarker
                level={telemetry.level}
                battery={isBatteryLow(telemetry)}
                offline={isOffline(telemetry)}
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
                    <b>Уровень:</b> <span>{telemetry.level}</span>
                </p>
                <p>
                    <b>Батарея:</b> <span>{telemetry.battery}</span>
                </p>
            </Popup>
        </Marker>
    );
};
