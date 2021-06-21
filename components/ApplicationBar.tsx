import { Tabs } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FC } from 'react';
import { UserMenu } from './UserMenu';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';

export interface ApplicationBarProps {
    title?: string;
    currentTab?: 'devices' | 'contacts';
}

export const ApplicationBar: FC<ApplicationBarProps> = ({
    title,
    currentTab,
}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <Grid item style={{ alignSelf: 'center' }}>
                        <Typography variant="h6">{title}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Tabs value={currentTab}>
                            <Link href={`/`} passHref>
                                <Tab label="Устройства" value="devices" />
                            </Link>
                            <Link href={`/c`} passHref>
                                <Tab label="Контакты" value="contacts" />
                            </Link>
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
