import moment from 'moment';
import {
    BATTERY_LOW_FILTER_THRESHOLD,
    LEVEL_HIGH_FILTER_THRESHOLD,
    OFFLINE_ICON_TIMEOUT,
} from './constants';
import { Telemetry } from './generated/graphql';

export function isOffline(t: Telemetry): boolean {
    return (
        moment(t.updatedAt).toDate().valueOf() + OFFLINE_ICON_TIMEOUT <
        Date.now()
    );
}

export function isBatteryLow(t: Telemetry): boolean {
    return t.battery <= BATTERY_LOW_FILTER_THRESHOLD;
}

export function isLevelHigh(t: Telemetry): boolean {
    return t.level >= LEVEL_HIGH_FILTER_THRESHOLD;
}
