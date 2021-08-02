import { workspace, ExtensionContext } from 'vscode'
import * as vscode from 'vscode'
import * as path from 'path';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

import { ElementHoverProvier } from './hover-tips/element-hover-provider'
import { ElementCompletionItemProvider } from './completion/element-completion-item-povider'
import { VueformulateCodeActionProvider } from './code-action/vueformulate-code-action-provider'

export function activate(context: ExtensionContext): void {
  console.log('extension "vueformulate-helper" is now active!')

  // 注册 completion 提示
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      [
        {
          language: 'vue',
          scheme: 'file'
        }
      ],
      new ElementCompletionItemProvider(),
      '',
      ' ',
      ':',
      '<',
      '"',
      "'",
      '/',
      '@',
      '(',
      '-',
      '|'
    )
  )

  // 注册 hover 提示
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      [
        {
          language: 'vue',
          scheme: 'file'
        }
      ],
      new ElementHoverProvier()
    )
  )

  initLspClient(context)
}

function initLspClient(context: ExtensionContext){
  // The server is implemented in node
	let serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'vue' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

// this method is called when your extension is deactivated
export function deactivate() {}

export default {
  activate,
  deactivate
}
