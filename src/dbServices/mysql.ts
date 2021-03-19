import { createPool,MysqlError,Pool , PoolConfig } from 'mysql';
import { ConnectionConfig } from '../models/contracts/connectionConfig';
import { DriverWrapper } from '../models/contracts/driver';
//import { injectable } from 'inversify';


export class MysqlService implements DriverWrapper {
    protected connection?: Pool;

    constructor(){
        this.connection = undefined ;
    }

    public connectionPromise(connConfig : ConnectionConfig) : Promise<void>{
        const poolconfig : PoolConfig = {
            host: connConfig.host,
            port: parseInt(connConfig.port, 10),
            database: connConfig.database,
            user: connConfig.user,
            password: connConfig.password,
            //connectionString: connConfig.connectionString,
            //ssl: connConfig.ssl,
            //types: connConfig.types, // Custom type parsers; not to be confused with type.
            connectTimeout: connConfig.connectionTimeoutMillis,
        }
        const connection: Pool = createPool(poolconfig);

        return new Promise<void>((resolve,reject)=>{
            connection.getConnection((err)=>{
                this.connection = connection ;
                if(err){
                    reject('Mysql Error: ' + err.stack);
                }
                resolve();
            })
        })
    }

    public queryPromise (sql:string ) : Promise<any[]|void>{
        return new Promise((resolve,reject)=>{
            if(this.connection == undefined){
                reject(new Error('Mysql: No active connections found!'));
            }
            this.connection!.query(sql,(err:MysqlError|null ,results)=>{
                if(err){
                    reject(new Error("Mysql Error :" + err.message));
                    return;
                }
                resolve(results);
            } );
        })
    }

    public closeConnectionPromise(): Promise<void>{
        return new Promise( (resolve,reject)=>{
            if(!this.connection){ 
                resolve();
            }

            this.connection!.end((err:MysqlError)=>{
                if(err){
                    reject(new Error('Mysql: Unexpected connection close problem!\n' + err))
                }
                this.connection = undefined;
                resolve();
            })
            
        } )
    }
}