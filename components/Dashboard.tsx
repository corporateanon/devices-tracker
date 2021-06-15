import { Grid } from '@material-ui/core';
import { EventEmitter } from 'events';
import { FC, useCallback, useEffect } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { EventEmitterContext } from '../hooks/useEventEmitter';
import { ListView } from './ListView';
import { MapView } from './MapView';
import { NavigationPane } from './NavigationPane';
import classes from './Dashboard.module.css';
import { useSession } from 'next-auth/client';

export const Dashboard: FC = () => {
    const events = new EventEmitter();

    const handleResize = useCallback(() => events.emit('resize'), []);
    useEffect(() => {
        setTimeout(() => events.emit('resize'), 300);
    }, []);

    return (
        <Grid container className={classes.root}>
            <Grid item>
                <SplitterLayout onDragEnd={handleResize}>
                    <ListView />
                    <EventEmitterContext.Provider value={events}>
                        <MapView />
                    </EventEmitterContext.Provider>
                </SplitterLayout>
            </Grid>
        </Grid>
    );
};
