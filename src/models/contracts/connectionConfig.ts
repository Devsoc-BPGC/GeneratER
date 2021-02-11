import { DBType } from "./dbType";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ConnectionConfig {
    type: DBType;
    host: string;
    port: string;
    database: string;
    user: string;
    password: string;
    connectionString?: string;
    ssl?: any;
    types?: any; // Custom type parsers; not to be confused with type.
    connectionTimeoutMillis?: number;
}