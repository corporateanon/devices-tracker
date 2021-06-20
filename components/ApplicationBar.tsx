import { Tabs } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FC } from 'react';
import { UserMenu } from './UserMenu';

export interface ApplicationBarProps {
    currentTab?: 'devices' | 'contacts';
}

export const ApplicationBar: FC<ApplicationBarProps> = ({ currentTab }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <Grid item xs>
                        <Tabs value={currentTab}>
                            <Tab label="Устройства" value="devices" />
                            <Tab label="Контакты" value="contacts" />
                        </Tabs>
                    </Grid>
                    <Grid item>
                        <UserMenu />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};
