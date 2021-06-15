import { useSession } from 'next-auth/client';
import { createContext, useContext } from 'react';

type SessionData = ReturnType<typeof useSession>;

const SessionContext = createContext<SessionData>([null, false]);

export const SessionContextProvider = SessionContext.Provider;
export const useSessionContext = () => useContext(SessionContext);
