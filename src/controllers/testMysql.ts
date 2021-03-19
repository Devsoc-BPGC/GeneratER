import { ConnectionConfig } from '../models/contracts/connectionConfig';

import {MysqlService} from '../dbServices/mysql';

 // Test Connection

const connConfig_Mysql: ConnectionConfig = {
  type: 'mysql',
  host: 'localhost',
  port: '3306',
  database: 'db212',
  user: 'root',
  password: '03102001',
}

async function testMysqlService() {
  const testObject : MysqlService = new MysqlService();
  const conn:void = await testObject.connectionPromise(connConfig_Mysql);
  const queryTest: void|any[] = await testObject.queryPromise('show databases');
  const closeConn:void = await testObject.closeConnectionPromise();
  console.log(queryTest,conn,closeConn);
}

/*const testOb:MysqlService = new MysqlService();
testOb.connectionPromise(connConfig_Mysql).then((value:any)=>{
  console.log(value);
  testOb.queryPromise('SHOW TABLES').then((value:any)=>{
    console.log('accepted:', value);
},(reason)=>{
    console.log('rejected', reason);
})
} , (reason)=>{
  console.log(reason);
});*/

/*testOb.queryPromise('SHOW TABLES').then((value:any)=>{
    console.log('accepted:', value);
},(reason)=>{
    console.log('rejected', reason);
}) */

testMysqlService();