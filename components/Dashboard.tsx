import { Grid, Hidden, makeStyles } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { ApplicationLayout } from './ApplicationLayout';
import { TelemetriesListView } from './TelemetriesListView';

const DynamicMapView = dynamic(
    () => import('./TelemetriesMapView').then((m) => m.TelemetriesMapView),
    { ssr: false }
);
const useStyles = makeStyles(() => ({
    root: { height: '100%' },
}));

export const Dashboard: FC = () => {
    const classes = useStyles();

    return (
        <ApplicationLayout currentTab="devices">
            <Grid container className={classes.root} direction="row">
                <Grid item xs={12} sm={6}>
                    <TelemetriesListView />
                </Grid>
                <Hidden only="xs">
                    <Grid item sm={6}>
                        <DynamicMapView />
                    </Grid>
                </Hidden>
            </Grid>
        </ApplicationLayout>
    );
};
