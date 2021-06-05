import { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Telemetry } from '../lib/generated/graphql';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { BarrelMarker } from './BarrelMarker';
import { BATTERY_ICON_THRESHOLD } from '../lib/constants';

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
                battery={telemetry.battery < BATTERY_ICON_THRESHOLD}
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
