import { EditorPosition, MarkdownView, Menu, Notice } from "obsidian";

import { Tabs } from "./tabs";

export class TabMenu extends Menu {
  
  constructor(tabs: Tabs, e: MouseEvent) {
    super();

    this.addItem((item) => {
      item.setTitle("Add new tab");
      item.setIcon("plus");
      item.onClick(() => {
        if (tabs.editorWrapper.isEditing) {
          const content = tabs.tabnav.tabnavitems[tabs.currentIndex].title + "\n" + tabs.tabContents.tabcontents[tabs.currentIndex].content;
          const editorContent = tabs.editorWrapper.editor.view.state.doc.toString().trim().substring(tabs.split.length);
          if (content.trim() !== editorContent.trim()) {
            !tabs.plugin.settings.ignoreNotice && new Notice("🟠 Please save the current tab before you adding a new tab.");
            return;
          }
        }
        // Add new tab to the file
        const activeView = tabs.app.workspace.getActiveViewOfType(MarkdownView);
        const activeEditor = activeView.editor;
        activeEditor.setLine(tabs.sectioninfo.lineEnd, 
          tabs.split + tabs.plugin.settings.defaultTabNavItem + "\n" + 
          tabs.plugin.settings.defaultTabContent + "\n" + 
          activeEditor.getLine(tabs.sectioninfo.lineEnd));
          !tabs.plugin.settings.ignoreNotice && new Notice("🟢 Add new tab successfully");
      });
    });
    this.addItem((item) => {
      item.setTitle("Delete tab");
      item.setIcon("trash");
      item.onClick(() => {
        let deleteIndex = -1;
        for (let i = 0; i < tabs.tabnav.tabnavitems.length; i++) {
          if (tabs.tabnav.tabnavitems[i].tabitemEl === e.target) {
            deleteIndex = i;
            break;
          }
        }
        if (deleteIndex === -1) {
          !tabs.plugin.settings.ignoreNotice && new Notice("🔴 Not a valid tab.");
          return;
        }
        const deleteTabTitle = tabs.tabnav.tabnavitems[deleteIndex].title;
        if (tabs.editorWrapper.isEditing) {
          const content = tabs.tabnav.tabnavitems[tabs.currentIndex].title + "\n" + tabs.tabContents.tabcontents[tabs.currentIndex].content;
          const editorContent = tabs.editorWrapper.editor.view.state.doc.toString().trim().substring(tabs.split.length);
          if (content.trim() !== editorContent.trim()) {
            !tabs.plugin.settings.ignoreNotice && new Notice("🟠 Please save the current tab before deleting: " + deleteTabTitle);
            return;
          }
        }
        const newDoc = tabs.getNewDocByIndex(deleteIndex, "");
        tabs.activeView?.editor.replaceRange(newDoc,
          { line: (tabs.sectioninfo.lineStart + 1), ch: 0 } as EditorPosition,
          { line: tabs.sectioninfo.lineEnd, ch: 0 } as EditorPosition);
          !tabs.plugin.settings.ignoreNotice && new Notice("🟢 Delete " + deleteTabTitle + " successfully");
      })
    });
    this.addItem((item) => {
      item.setTitle("Copy tab");
      item.setIcon("copy");
      item.onClick(() => {
        let copyIndex = -1;
        let copyContent = "";
        for (let i = 0; i < tabs.tabnav.tabnavitems.length; i++) {
          if (tabs.tabnav.tabnavitems[i].tabitemEl == e.target) {
            copyIndex = i;
            copyContent = tabs.split + tabs.tabnav.tabnavitems[i].title + "\n" + tabs.tabContents.tabcontents[i].content
            break;
          }
        }
        if (copyIndex === -1) {
          !tabs.plugin.settings.ignoreNotice && new Notice("🔴 Not a valid tab.");
          return;
        }
        navigator.clipboard.writeText(copyContent).then(() => {
          !tabs.plugin.settings.ignoreNotice && new Notice("🟢 Copied to clipboard successfully.");
        }).catch((err) => {
          !tabs.plugin.settings.ignoreNotice && new Notice("🔴 Failed to copy to clipboard");
          console.error(err);
        });
      });
    });
    this.addItem((item) => {
      item.setTitle("Paste tab");
      item.setIcon("paste");
      item.onClick(() => {
        navigator.clipboard.readText().then((text) => {
          if (tabs.editorWrapper.isEditing) {
            const content = tabs.tabnav.tabnavitems[tabs.currentIndex].title + "\n" + tabs.tabContents.tabcontents[tabs.currentIndex].content
            const editorContent = tabs.editorWrapper.editor.view.state.doc.toString().trim().substring(tabs.split.length)
            if (content.trim() !== editorContent.trim()) {
              !tabs.plugin.settings.ignoreNotice && new Notice("🟠 Please save the current tab.");
              return;
            }
          }
          if (!text || text.trim() === "" || (text.trim() == tabs.split)) {
            !tabs.plugin.settings.ignoreNotice && new Notice("🟠 No content in clipboard.");
            return;
          }
          let title = tabs.plugin.settings.defaultTabNavItem + "\n";
          let content = text.trim();
          if (text.startsWith(tabs.split)) {
            title = text.substring(tabs.split.length, text.indexOf("\n"));
            content = content.substring(text.indexOf("\n"));
          }
          const activeEditor = tabs.activeView?.editor;
          activeEditor.setLine(
            tabs.sectioninfo.lineEnd, tabs.split + title.trim() + "\n" + 
            content.trim() + "\n" + activeEditor.getLine(tabs.sectioninfo.lineEnd));
        }).catch((err) => {
          !tabs.plugin.settings.ignoreNotice && new Notice("🔴 Failed to paste from clipboard");
          console.error(err);
        });
      });
    });
  }
}