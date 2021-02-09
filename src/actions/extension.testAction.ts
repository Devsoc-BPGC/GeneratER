import * as vscode from 'vscode';
import { AbstractAction } from './AbstractAction';

export class TestAction extends AbstractAction {
  execution() {
    vscode.window.showInformationMessage('Test Action Success');
  }
}