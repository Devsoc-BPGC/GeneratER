import * as vscode from 'vscode';
import { ConnectionConfig } from '../models/contracts/connectionConfig';
import { AbstractManager } from './abstractManager';

export class TestAction extends AbstractManager {

  constructor(connConfig: ConnectionConfig) {
    super(connConfig);
  }

  execution(): void {
    vscode.window.showInformationMessage('Test Action Success');
    super.dbService.connectionPromise(super.connConfig).then(() => {
      vscode.window.showInformationMessage('DB Service Started');
    });
  }
}