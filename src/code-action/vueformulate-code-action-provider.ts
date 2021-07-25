import { disconnect } from 'node:process'
import {
  CancellationToken,
  CodeAction,
  CodeActionContext,
  CodeActionProvider,
  Command,
  ProviderResult,
  Selection,
  Range,
  TextDocument,
  Diagnostic,
  DiagnosticSeverity,
  CodeActionKind,
  Position,
  WorkspaceEdit,
  Uri
} from 'vscode'

export class VueformulateCodeActionProvider implements CodeActionProvider{

  provideCodeActions(document: TextDocument, range: Range | Selection, context: CodeActionContext, token: CancellationToken): ProviderResult<(Command | CodeAction)[]>{
    let action: CodeAction = new CodeAction('my title', CodeActionKind.QuickFix)
    
    // let diagnostic:Diagnostic = new Diagnostic(
    //   new Range(5,21, 5,31),
    //   'diagnostics message',
    //   DiagnosticSeverity.Error
    // )
    // diagnostic.code = 'type="text"'
    // action.diagnostics = [
    //   diagnostic
    // ]

    action.edit = new WorkspaceEdit()
    action.edit.replace(document.uri, new Range(5,21, 5,31), 'new demo')
    return [action]
  }

  resolveCodeAction(codeAction){
    return codeAction
  }
}