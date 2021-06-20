import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { FC } from 'react';
import { ApplicationBar, ApplicationBarProps } from './AppBar';

const useStyles = makeStyles(
    (theme) => ({
        root: {
            height: '100vh',
        },
    }),
    { name: 'ApplicationLayout' }
);

interface ApplicationLayoutProps {
    currentTab: ApplicationBarProps['currentTab'];
}

export const ApplicationLayout: FC<ApplicationLayoutProps> = ({
    children,
    currentTab,
}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.root}>
            <Grid item>
                <ApplicationBar currentTab={currentTab} />
            </Grid>
            <Grid item xs>
                {children}
            </Grid>
        </Grid>
    );
};
