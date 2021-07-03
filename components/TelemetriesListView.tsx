import { Grid, makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MUILink from '@material-ui/core/Link';
import clsx from 'clsx';
import 'moment/locale/ru';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import ReactDataGrid, { Column } from 'react-data-grid';
import {
    createColumnFormatter,
    dateColumnFormatter,
    percentFormatter,
} from '../lib/formatters';
import {
    GetTelemetriesQuery,
    Maybe,
    Telemetry,
    useGetTelemetriesQuery,
} from '../lib/generated/graphql';
import { isBatteryLow, isLevelHigh, isOffline } from '../lib/telemetryUtils';
import { queryToTelemetryFilters } from './filters/telemetryFilters';
import classes from './ListView.module.css';
import { TelemetryToolbar } from './TelemetryToolbar';

const columns: readonly Column<
    Telemetry & {
        contact: Maybe<
            GetTelemetriesQuery['getTelemetries'][number]['meta']['contact']
        >;
    }
>[] = [
    {
        key: 'deviceId',
        name: 'ID устройства',
        resizable: true,
        // eslint-disable-next-line react/display-name
        formatter: ({ row, column: { key } }) => (
            <Link href={`/t/${row._id}`} passHref>
                <MUILink>{row[key]}</MUILink>
            </Link>
        ),
    },
    {
        key: 'contact',
        name: 'Контакт',
        resizable: true,
        width: 200,
        // eslint-disable-next-line react/display-name
        formatter: ({ row: { contact } }) => (
            <Box>
                {contact?.name && (
                    <Typography color="textPrimary" variant="body1">
                        {contact.name}
                    </Typography>
                )}
                {contact?.phone && (
                    <Typography color="textSecondary" variant="body1">
                        {contact.phone}
                    </Typography>
                )}
            </Box>
        ),
    },
    {
        key: 'level',
        name: 'Уровень, %',
        resizable: true,
        width: 100,
        cellClass: (row) =>
            clsx(classes.cellNumber, {
                [classes.cellSuccess]: isLevelHigh(row),
            }),
        formatter: createColumnFormatter(percentFormatter),
    },
    {
        key: 'battery',
        name: 'Акк., %',
        resizable: true,
        width: 100,
        cellClass: (row) =>
            clsx(classes.cellNumber, {
                [classes.cellDanger]: isBatteryLow(row),
            }),
        formatter: createColumnFormatter(percentFormatter),
    },
    {
        key: 'updatedAt',
        name: 'Онлайн',
        resizable: true,
        formatter: dateColumnFormatter,
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

export const TelemetriesListView: FC = () => {
    const classes = useStyles();
    const { query } = useRouter();
    const { data } = useGetTelemetriesQuery({
        pollInterval: 60000,
        ssr: false,
        fetchPolicy: 'cache-and-network',
        variables: {
            filter: queryToTelemetryFilters(query),
        },
    });

    const rows = useMemo(() => {
        return (
            data?.getTelemetries?.map((telemetryWithMetadata) => ({
                ...telemetryWithMetadata.telemetry,
                contact: telemetryWithMetadata.meta.contact,
            })) ?? []
        );
    }, [data]);

    return (
        <Grid container direction="column" className={classes.root} spacing={2}>
            <Grid item>
                <TelemetryToolbar />
            </Grid>
            <Grid item className={classes.gridWrapper}>
                <ReactDataGrid
                    columns={columns}
                    rows={rows}
                    rowHeight={50}
                    className={classes.grid}
                />
            </Grid>
        </Grid>
    );
};
