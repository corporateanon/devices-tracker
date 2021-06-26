import { Tabs } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import { useMobile } from '../lib/useMobile';
import NextRouterTab from './NextRouterTab';
import { UserMenu } from './UserMenu';

export interface ApplicationBarProps {
    title?: string;
    currentTab?: 'devices' | 'contacts' | 'map';
}

export const ApplicationBar: FC<ApplicationBarProps> = ({
    title,
    currentTab,
}) => {
    const isMobile = useMobile();

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <Grid item style={{ alignSelf: 'center' }}>
                        <Typography variant="h6">{title}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Tabs value={currentTab}>
                            <NextRouterTab href="/" value="devices">
                                Устройства
                            </NextRouterTab>
                            {isMobile && (
                                <NextRouterTab href="/m" value="map">
                                    Карта
                                </NextRouterTab>
                            )}
                            <NextRouterTab href="/c" value="contacts">
                                Контакты
                            </NextRouterTab>
                        </Tabs>
                    </Grid>
                    <Grid item>
                        <Box height="100%" display="flex" alignItems="center">
                            <UserMenu />
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};
