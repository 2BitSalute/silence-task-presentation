import * as vscode from 'vscode';

// File system APIs
import * as fs from 'fs';

// Specifically for path stuff (join, etc.)
import * as path from 'path';

// To read non-compliant JSON with comments and trailing commas
import * as JSON5 from 'json5';

// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // This is the implementation of the command, registered with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('silence-task-presentation.doIt', () => {
        console.log('Starting to silence task presenation...');

        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showInformationMessage(
                'This action only works on .vscode/tasks.json in an active editor window'
            )
        }
        else {
            const document = editor.document;

            const filePath = document.uri.fsPath;

            const tasksSuffix = path.join('.vscode', 'tasks.json');

            if (filePath.endsWith(tasksSuffix)) {
                console.log('Yes, we are on the right file type...');

                try {
                    const tasksContent = fs.readFileSync(filePath, 'utf-8');
                    const tasks = JSON5.parse(tasksContent);

                    // Update tasks with the right presentation settings
                    if (tasks.tasks && Array.isArray(tasks.tasks)) {
                        tasks.tasks = tasks.tasks.map((task: any) => {
                            task.presentation = task.presentation || {};
                            task.presentation.reveal = 'silent';
                            task.presentation.close = true;
                            return task;
                        });

                        var replacer = null;
                        var indentation = 4;
                        fs.writeFileSync(filePath, JSON.stringify(tasks, replacer, indentation));
                        vscode.window.showInformationMessage(`Ensured tasks are silenced in ${filePath}`);
                    } else {
                        vscode.window.showErrorMessage(`No valid tasks found in ${filePath}.`);
                    }
                } catch (err) {
                    console.error(`Error reading or writing ${filePath}: ${err}`);
                    vscode.window.showErrorMessage(`Failed to update ${filePath}. Check the console for details.`);
                }
            }
            else {
                vscode.window.showInformationMessage(
                    'This action only works on .vscode/tasks.json in an active editor window');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    // Nothing to do here
}