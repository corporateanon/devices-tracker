import { FC, useCallback, useEffect } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { MapView } from './MapView';
import { EventEmitterContext } from './useEventEmitter';
import { EventEmitter } from 'events';

export const Dashboard: FC = () => {
    const ee = new EventEmitter();

    const handleResize = useCallback(() => ee.emit('resize'), []);
    useEffect(() => {
        setTimeout(() => ee.emit('resize'), 300);
    }, []);

    return (
        <SplitterLayout onDragEnd={handleResize}>
            <div>asd</div>
            <EventEmitterContext.Provider value={ee}>
                <MapView />
            </EventEmitterContext.Provider>
        </SplitterLayout>
    );
};
