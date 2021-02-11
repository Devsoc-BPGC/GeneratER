import { Container } from 'inversify';
import { TYPES } from './models/types';
import { DriverWrapper } from './models/contracts/driver';
import { PostgresService } from './dbServices/postgres';

// Bind the services to the service type
// myContainer.bind<Interface-of-injected-service>(TYPE).to(ServiceClass)
const myContainer = new Container();
myContainer.bind<DriverWrapper>(TYPES.postgres).to(PostgresService);

export { myContainer };