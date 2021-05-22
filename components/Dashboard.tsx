import { EventEmitter } from 'events';
import { FC, useCallback, useEffect } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { EventEmitterContext } from '../hooks/useEventEmitter';
import { ListView } from './ListView';
import { MapView } from './MapView';

export const Dashboard: FC = () => {
    const events = new EventEmitter();

    const handleResize = useCallback(() => events.emit('resize'), []);
    useEffect(() => {
        setTimeout(() => events.emit('resize'), 300);
    }, []);

    return (
        <SplitterLayout onDragEnd={handleResize}>
            <ListView />
            <EventEmitterContext.Provider value={events}>
                <MapView />
            </EventEmitterContext.Provider>
        </SplitterLayout>
    );
};
