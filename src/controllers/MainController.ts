import * as vscode from 'vscode';
import { ConnectionConfig } from '../models/contracts/connectionConfig';
import { TestAction } from './extension.testController';
import * as dotenv from 'dotenv';
dotenv.config();

export class MainController {

  context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }
  
  public activateExtension(): void {
    const testAction = new TestAction(connConfig);
    this.context.subscriptions.push(
      vscode.commands.registerCommand('extension.testAction', () => testAction.execution())
    )
  }
}

 // Test Connection
const connConfig: ConnectionConfig = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  database: 'mello',
  user: 'postgres',
  password: 'eatsleepcode',
}