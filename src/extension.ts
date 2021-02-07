import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext): void {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "generater-sidebar",
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World from Extension!");
    })
  );
}

export function deactivate(): void {
  // This method is called when your extension is deactivated.
}
