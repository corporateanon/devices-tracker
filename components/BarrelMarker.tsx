import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { range } from 'lodash';
import { FC } from 'react';
import SvgMarker from './generated/icons/Marker';

export interface BarrelMarkerProps {
    level: number;
    battery?: boolean;
    offline?: boolean;
    unknown?: boolean;
}

const C_LEVEL = 'marker_svg__level';
const C_OFFLINE = 'marker_svg__offline';
const C_BATTERY = 'marker_svg__battery';
const C_UNKNOWN = 'marker_svg__unknown';
const SCALE_FACTOR = 0.5;

const levelsList = (lim) =>
    range(1, lim + 1)
        .map((l) => `.${C_LEVEL}${l}`)
        .join(',');

const stylesByLevel = Object.fromEntries(
    range(1, 7).map((l) => [
        `level_${l}`,
        { [`& .${C_LEVEL}${l}`]: { visibility: 'visible' } },
    ])
);

const useStyles = makeStyles({
    root: {
        height: 129 * SCALE_FACTOR,
        width: 104 * SCALE_FACTOR,
        [`& ${levelsList(6)}`]: {
            visibility: 'hidden',
        },
        [`& .${C_BATTERY}`]: {
            visibility: 'hidden',
        },
        [`& .${C_OFFLINE}`]: {
            visibility: 'hidden',
        },
        [`& .${C_UNKNOWN}`]: {
            visibility: 'hidden',
        },
    },
    battery: {
        [`& .${C_BATTERY}`]: {
            visibility: 'visible',
        },
    },
    offline: {
        [`& .${C_OFFLINE}`]: {
            visibility: 'visible',
        },
    },
    unknown: {
        [`& .${C_UNKNOWN}`]: {
            visibility: 'visible',
        },
    },
    ...stylesByLevel,
});

export const BarrelMarker: FC<BarrelMarkerProps> = ({
    level,
    battery,
    offline,
    unknown,
}) => {
    const classes = useStyles();
    if (level > 1) {
        level = 1;
    }
    if (level < 0) {
        level = 0;
    }
    const normalizedLevel = Math.round(level * 5);

    const levelClass =
        normalizedLevel > 0 ? classes[`level_${normalizedLevel}`] : null;

    const cls = clsx(classes.root, levelClass, {
        [classes.battery]: battery,
        [classes.offline]: offline,
        [classes.unknown]: unknown,
    });
    return <SvgMarker className={cls} />;
};
