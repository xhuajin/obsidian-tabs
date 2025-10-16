import { App, EditorPosition, Modal } from 'obsidian';

import { TabEditor } from './tabeditor';
import { Tabs } from '../tabs/tabs';
import TabsPlugin from '../../main';

export class TabsEditorModal extends Modal {
  app: App;
  plugin: TabsPlugin;
  editor: TabEditor;
  tabs: Tabs;
  timer: number;

  constructor(plugin: TabsPlugin, app: App) {
    super(app);
    this.app = app;
    this.plugin = plugin;
    this.modalEl.addClass('tabs-editor-modal');
  }

  startEditing(tabs: Tabs) {
    this.contentEl.empty();
    this.tabs = tabs;
    const newDoc =
      tabs.split +
      tabs.tabsNav.navItems[tabs.currentIndex].title +
      '\n' +
      tabs.tabsContents.tabcontents[tabs.currentIndex].content.trim();
    this.editor = new TabEditor(this.plugin, this.contentEl, newDoc);
    this.open();
  }

  onOpen(): void {
    // 每秒检查一次，当用户一定时间内没有操作时，自动保存
    if (this.plugin.settings.editorAutoSaveInterval !== 0) {
      this.timer = setInterval(() => {
        if (
          this.editor.docChange &&
          this.editor.lastEditTime &&
          Date.now() - this.editor.lastEditTime > this.plugin.settings.editorAutoSaveInterval
        ) {
          this.saveEditorData();
        }
      }, 1000);
    }
  }

  onClose(): void {
    this.saveEditorData();
    clearInterval(this.timer);
  }

  saveEditorData() {
    this.editor.docChange = false;
    const newTabs = this.getUpdatedTabsByIndex(this.tabs.currentIndex);
    this.tabs.activeView?.editor.replaceRange(
      newTabs,
      { line: this.tabs.sectionInfo.lineStart, ch: 0 } as EditorPosition,
      {
        line: this.tabs.sectionInfo.lineEnd,
        ch: this.tabs.activeView?.editor.getLine(this.tabs.sectionInfo.lineEnd).length,
      } as EditorPosition
    );
  }

  getUpdatedTabsByIndex(index: number): string {
    // replace current tab with editor content
    const doc = this.editor.view.state.doc.toString();
    let newTabs = '';
    for (let i = 0; i < this.tabs.tabsNav.navItems.length; i++) {
      if (i !== index) {
        newTabs +=
          this.tabs.split +
          this.tabs.tabsNav.navItems[i].title.trim() +
          '\n' +
          this.tabs.tabsContents.tabcontents[i].content.trim() +
          '\n';
      } else {
        newTabs += doc + '\n';
        // if doc contains code block, add one more backtick
        if (doc.includes('```') || doc.includes('~~~')) {
          this.tabs.updateBackquote(doc);
        }
      }
    }
    newTabs =
      this.tabs.backquote.repeat(this.tabs.backquoteCount) +
      'tabs\n' +
      this.tabs.tabsConfig.rawConfig +
      '\n' +
      newTabs +
      this.tabs.backquote.repeat(this.tabs.backquoteCount);
    return newTabs;
  }
}
