/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, QueryResult } from 'pg';
import { ConnectionConfig } from '../models/contracts/connectionConfig';
import { DriverWrapper } from '../models/contracts/driver';
import { injectable } from 'inversify';

@injectable()
export class PostgresService implements DriverWrapper {
    protected connection?: Pool;
    protected release: () => void;

    constructor () {
        this.connection = undefined;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.release = () => {};
    }

    /**
     *
     * @param {ConnectionConfig} connConfig
     * @returns {Promise<void>}
     * 
     * @description Annoints the class property connection
     */
    public connectionPromise (connConfig: ConnectionConfig): Promise<void> {
        const connection: Pool = new Pool({
            host: connConfig.host,
            port: parseInt(connConfig.port, 10),
            database: connConfig.database,
            user: connConfig.user,
            password: connConfig.password,
            connectionString: connConfig.connectionString,
            ssl: connConfig.ssl,
            types: connConfig.types, // Custom type parsers; not to be confused with type.
            connectionTimeoutMillis: connConfig.connectionTimeoutMillis,
        });
        return new Promise((resolve, reject) => {
            connection.connect((err, client, release) => {
                this.connection = connection; // set class property connection
                this.release = release; // set release method to class property release
                this.release();
                if (err) {
                    reject('PostgreSQL Error: ' + err.stack);
                    return;
                }
                resolve();
            });
        })
    }

    /**
     * 
     * @param {string} sql 
     * @param {any[]} optionalParam
     * @returns {Promise<any[] | void>}
     * 
     * @description Runs PostgreSQL queries and returns the result as a Promise 
     */
    public queryPromise (sql: string, optionalParam: any[]): Promise<any[] | void> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                return reject(new Error('PostgreSQL: No active connections found!'));
            }
            this.connection.query(sql, optionalParam, (err: Error, result: QueryResult) => {
                this.release();
                if (err) {
                    reject(new Error('PostgreSQL Error: ' + err.message));
                    return;
                }
                resolve(result.rows);
            });
        })
    }

    /**
     * 
     * @returns {Promise<void>}
     * 
     * @description Closses the connection and sets class property connection to undefined
     */
    public closeConnectionPromise(): Promise<void> {
        return new Promise((resolve, reject) => {
            if(!this.connection) {
                return resolve();
            }
            this.connection.end().then(() => {
                this.connection = undefined;
                return resolve();
            }).catch(err => {
                return reject(new Error('PostgresSQL: Unexpected connection close problem!\n' + err));
            });
        });
    } 
}