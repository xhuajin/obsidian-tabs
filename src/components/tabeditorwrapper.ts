import { TabEditor } from "./tabeditor";

export class TabEditorWrapper {
  editor: TabEditor;
  tabEditorWrapperEl: HTMLElement;
  isEditing: boolean = false;

  constructor() {
    this.tabEditorWrapperEl = this.createTabEditorWrapperEl();
    this.editor = new TabEditor(this.tabEditorWrapperEl);
  }

  createTabEditorWrapperEl(): HTMLElement {
    const element = document.createElement('div');
    element.classList.add('tab-editor-wrapper', 'tab-editor-wrapper-hidden');
    return element;
  }

  refreshActiveTabEditor(index: number, doc: string) {
    if (!this.isEditing) {
      return;
    }
    const state = this.editor.view.state;
    const transaction = this.editor.view.state.update({
      changes: { from: 0, to: state.doc.length, insert: doc }
    });
    this.editor.view.dispatch(transaction);
  }
}