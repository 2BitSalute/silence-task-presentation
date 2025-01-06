import * as assert from 'assert';
import * as vscode from 'vscode';
import * as silenceExtension from '../extension';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Not a real test', () => {
        silenceExtension.deactivate();
        assert.equal(true, true, "OK, what now?")
    });
});
