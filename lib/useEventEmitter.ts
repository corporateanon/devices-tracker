import { EventEmitter } from 'events';
import { createContext, useContext, useEffect } from 'react';

export const EventEmitterContext = createContext<EventEmitter | null>(null);

export const useEventEmitter = (eventsMap: { [event: string]: () => void }) => {
    const ee = useContext(EventEmitterContext);
    useEffect(() => {
        for (const [event, handler] of Object.entries(eventsMap)) {
            ee.on(event, handler);
        }
        return () => {
            for (const [event, handler] of Object.entries(eventsMap)) {
                ee.off(event, handler);
            }
        };
    }, []);
};
