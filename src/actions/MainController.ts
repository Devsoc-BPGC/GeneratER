import * as vscode from 'vscode';
import { TestAction } from './extension.testAction';

export class MainController {

  context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }
  
  public activateExtension(): void {
    const testAction = new TestAction();
    this.context.subscriptions.push(
      vscode.commands.registerCommand('extension.testAction', () => testAction.execution())
    )
  }
}