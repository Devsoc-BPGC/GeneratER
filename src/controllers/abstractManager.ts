/* eslint-disable @typescript-eslint/no-explicit-any */
import { myContainer } from '../inversify.config';
import { ConnectionConfig } from '../models/contracts/connectionConfig';
import { DriverWrapper } from '../models/contracts/driver';
import { TYPES } from '../models/types';
import { DBType } from '../models/contracts/dbType';

export class AbstractManager {
    protected dbService: DriverWrapper;
    private type: DBType;
    public connConfig: ConnectionConfig;

    constructor(connConfig: ConnectionConfig) {
        this.connConfig = connConfig;
        // this.type = connConfig.type;
        this.type = 'postgres'; // Get type from connConfig and provide it here
        this.dbService = myContainer.get<DriverWrapper>(TYPES[this.type]); // Getting a specific dbService here
        // this.connection(); better to do this in individual action files
    }

    /**
     * @param {void}
     * 
     * @description Will activate the connection property of respective Db Service
     */
    protected connection (): void {
        this.dbService.connectionPromise(this.connConfig);
    }
}