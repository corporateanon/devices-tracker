import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { FC } from 'react';
import { ApplicationBar, ApplicationBarProps } from './ApplicationBar';

const useStyles = makeStyles(
    () => ({
        root: {
            height: '100vh',
        },
    }),
    { name: 'ApplicationLayout' }
);

interface ApplicationLayoutProps {
    currentTab?: ApplicationBarProps['currentTab'];
    title?: ApplicationBarProps['title'];
}

export const ApplicationLayout: FC<ApplicationLayoutProps> = ({
    children,
    currentTab,
    title,
}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.root}>
            <Grid item>
                <ApplicationBar title={title} currentTab={currentTab} />
            </Grid>
            <Grid item xs>
                {children}
            </Grid>
        </Grid>
    );
};
