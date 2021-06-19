import { Grid, Hidden, makeStyles } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { TelemetriesListView } from './TelemetriesListView';

const DynamicMapView = dynamic(
    () => import('./TelemetriesMapView').then((m) => m.TelemetriesMapView),
    { ssr: false }
);
const useStyles = makeStyles((theme) => ({
    root: { height: '100vh' },
}));

export const Dashboard: FC = () => {
    const classes = useStyles();

    return (
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
    );
};
