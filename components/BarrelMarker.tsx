import { FC } from 'react';
import SvgBarrelMarkerVector from './generated/icons/BarrelMarkerVector';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { range } from 'lodash';
import { ClassNameMap } from '@material-ui/styles';

export interface BarrelMarkerProps {
    level: number;
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
    },
    ...stylesByLevel,
});

type RealStyles = (
    props?: any
) => ClassNameMap<
    | 'root'
    | 'level_0'
    | 'level_1'
    | 'level_2'
    | 'level_3'
    | 'level_4'
    | 'level_5'
    | 'level_6'
    | 'level_7'
>;

export const BarrelMarker: FC<BarrelMarkerProps> = ({ level }) => {
    const classes = (useStyles as RealStyles)();
    let normalizedLevel = Math.round(level * 7);
    if (normalizedLevel > 7) {
        normalizedLevel = 7;
    }
    if (normalizedLevel < 0) {
        normalizedLevel = 0;
    }
    const cls = clsx(classes.root, classes[`level_${normalizedLevel}`]);
    return <SvgBarrelMarkerVector className={cls} />;
};
