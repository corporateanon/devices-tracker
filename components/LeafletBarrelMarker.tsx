import L from 'leaflet';
import { FC } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import { Telemetry } from '../lib/generated/graphql';
import { isBatteryLow, isOffline } from '../lib/telemetryUtils';
import { BarrelMarker } from './BarrelMarker';
import { TelemetryCard } from './TelemetryCard';

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
            key={telemetry._id}
            position={[telemetry.lat, telemetry.lng]}
            icon={icon}
        >
            <Popup>
                <TelemetryCard item={telemetry} />
            </Popup>
        </Marker>
    );
};
