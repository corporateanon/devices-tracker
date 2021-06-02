import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { range } from 'lodash';
import { FC } from 'react';
import SvgBarrelMarkerVector from './generated/icons/BarrelMarkerVector';

export interface BarrelMarkerProps {
    level: number;
    batteryLow?: boolean;
    netOffline?: boolean;
}

const levelsList = (lim) =>
    range(0, lim)
        .map((l) => `.barrel-marker-vector_svg__barrel_${l}`)
        .join(',');

const stylesByLevel = Object.fromEntries(
    range(0, 8).map((l) => [
        `level_${l}`,
        { [`& ${levelsList(l + 1)}`]: { visibility: 'visible' } },
    ])
);

const useStyles = makeStyles({
    root: {
        height: 50,
        width: 50,
        [`& ${levelsList(8)}`]: {
            visibility: 'hidden',
        },
        '& .barrel-marker-vector_svg__bat': {
            visibility: 'hidden',
        },
        '& .barrel-marker-vector_svg__net_offline': {
            visibility: 'hidden',
        },
    },
    ...stylesByLevel,
    batteryLow: {
        '& .barrel-marker-vector_svg__bat': {
            visibility: 'visible',
            fill: 'red',
        },
    },
    netOffline: {
        '& .barrel-marker-vector_svg__net_offline': {
            visibility: 'visible',
            fill: 'red',
        },
    },
});

export const BarrelMarker: FC<BarrelMarkerProps> = ({
    level,
    batteryLow,
    netOffline,
}) => {
    const classes = useStyles();
    let normalizedLevel = Math.round(level * 8) - 1;
    if (normalizedLevel > 7) {
        normalizedLevel = 7;
    }
    if (normalizedLevel < -1) {
        normalizedLevel = -1;
    }
    const levelClass =
        normalizedLevel >= 0 ? classes[`level_${normalizedLevel}`] : null;

    const cls = clsx(classes.root, levelClass, {
        [classes.batteryLow]: batteryLow,
        [classes.netOffline]: netOffline,
    });
    return <SvgBarrelMarkerVector className={cls} />;
};
