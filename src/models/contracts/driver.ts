/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectionConfig } from './connectionConfig';

export interface DriverWrapper {
    connectionPromise(connConfig: ConnectionConfig): Promise<void>;
    queryPromise(sql: string, optionalParam: any[]): Promise<any[] | void>;
    closeConnectionPromise(): Promise<void>;
}