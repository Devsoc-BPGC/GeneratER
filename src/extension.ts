import * as vscode from "vscode";
import { ActionsList, actionsList } from "./actions";
import { CommandCallback } from "./actions/AbstractAction";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext): void {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "generater-sidebar",
      sidebarProvider
    )
  );

  addCommand(context, 'extension.testAction');

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World from Extension!");
    })
  );
}

export function deactivate(): void {
  // This method is called when your extension is deactivated
}

function addCommand(context: vscode.ExtensionContext, name: keyof ActionsList) {
  // const func = getCommandFunction(name);
  const command = vscode.commands.registerCommand(name as string, getCommandFunction(name));
  context.subscriptions.push(command);
}

function getCommandFunction(name: keyof ActionsList): CommandCallback {
  const actionClass = actionsList[name];
  const actionObject = new actionClass();
  return actionObject.execution;
}
