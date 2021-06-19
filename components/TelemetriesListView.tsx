import moment from 'moment';
import 'moment/locale/ru';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import ReactDataGrid, { Column } from 'react-data-grid';
import { Telemetry, useGetTelemetriesQuery } from '../lib/generated/graphql';
import { isBatteryLow, isLevelHigh, isOffline } from '../lib/telemetryUtils';
import { queryToFilters } from './filters/filters';
import classes from './ListView.module.css';

import clsx from 'clsx';
import { NavigationPane } from './NavigationPane';
import { Grid, makeStyles } from '@material-ui/core';
import TelemetryRowEditor from './TelemetryRowEditor';
const formatter = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 0,
});

const percentFormatter = ({ row, column: { key } }) => (
    <>{formatter.format(row[key])}</>
);

const columns: readonly Column<Telemetry>[] = [
    { key: 'id', name: 'ID', editable: true, editor: TelemetryRowEditor },
    {
        key: 'level',
        name: 'Уровень, %',
        cellClass: (row) =>
            clsx(classes.cellNumber, {
                [classes.cellSuccess]: isLevelHigh(row),
            }),
        formatter: percentFormatter,
    },
    {
        key: 'battery',
        name: 'Аккумулятор, %',
        cellClass: (row) =>
            clsx(classes.cellNumber, {
                [classes.cellDanger]: isBatteryLow(row),
            }),
        formatter: percentFormatter,
    },
    {
        key: 'updatedAt',
        name: 'Онлайн',
        formatter({ row: { updatedAt } }) {
            return (
                <div title={moment(updatedAt).format('DD MMM YYYY HH:mm:ss')}>
                    {moment(updatedAt).fromNow()}
                </div>
            );
        },
        cellClass: (row) =>
            clsx({
                [classes.cellDanger]: isOffline(row),
            }),
    },
];

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
    gridWrapper: {
        flex: 1,
    },
    grid: {
        height: '100%',
    },
});

export function TelemetriesListView() {
    const classes = useStyles();
    const { query } = useRouter();
    const { error, data, loading } = useGetTelemetriesQuery({
        pollInterval: 60000,
        ssr: false,
        variables: {
            filter: queryToFilters(query),
        },
    });

    const rows = useMemo(() => {
        return data?.getTelemetries ?? [];
    }, [data]);

    return (
        <Grid container direction="column" className={classes.root} spacing={2}>
            <Grid item>
                <NavigationPane />
            </Grid>
            <Grid item className={classes.gridWrapper}>
                <ReactDataGrid
                    columns={columns}
                    rows={rows}
                    className={classes.grid}
                />
            </Grid>
        </Grid>
    );
}
