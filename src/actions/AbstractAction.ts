import * as vscode from 'vscode';

export type CommandCallback = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]) => void;

export interface Action {
  execution: CommandCallback;
}
export class AbstractAction implements Action
{
  constructor() {
    this.execution = this.execution.bind(this);
  }
  
  execution(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, ...args: any[]): void {}
}