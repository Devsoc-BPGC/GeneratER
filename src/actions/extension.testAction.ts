import * as vscode from 'vscode';

export class TestAction {
  execution(): void {
    vscode.window.showInformationMessage('Test Action Success');
  }
}