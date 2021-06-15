import { Session } from 'next-auth';

export interface ApplicationContext {
    session?: Session;
}
