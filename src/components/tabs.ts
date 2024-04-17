import { App, EditorPosition, MarkdownPostProcessorContext, MarkdownSectionInformation, MarkdownView, Menu, Notice, setIcon } from 'obsidian';

import { TabContent } from './tabcontent';
import { TabContents } from './tabcontents';
import { TabEditorWrapper } from './tabeditorwrapper';
import { TabNav } from './tabnav';
import { TabNavItem } from './tabnavitem';
import TabsPlugin from '../main';
import { TabsSettings } from '../settings';

export class Tabs {
  plugin: TabsPlugin;
  tabsEl: HTMLElement;
  split: string;
  app: App;
  activeView: MarkdownView;
  tabnav: TabNav;
  tabContents: TabContents;
  editorWrapper: TabEditorWrapper;
  sectioninfo: MarkdownSectionInformation;
  currentIndex: number = 0;

  constructor(source: string, element: HTMLElement, context: MarkdownPostProcessorContext, app: App, plugin: TabsPlugin, settings: TabsSettings) {
    element.className = "tab-container";
    this.plugin = plugin;
    this.tabsEl = element;
    this.split = settings.split;
    this.app = app;
    this.activeView = app.workspace.getActiveViewOfType(MarkdownView);
    this.sectioninfo = context.getSectionInfo(element);

    const splitContent = source.split(this.split);
    const tabnavitemtitle = [];
    const tabcontent = [];
    for (let i = 1; i < splitContent.length; i++) {
      const j = splitContent[i].indexOf("\n");
      tabnavitemtitle.push(splitContent[i].substring(0, j));
      tabcontent.push(splitContent[i].substring(j + 1));
    }
    this.tabnav = new TabNav(tabnavitemtitle, this.split, this.sectioninfo);
    this.tabContents = new TabContents(plugin, tabcontent.map((content, index) => {
      return new TabContent(index, tabnavitemtitle[index], content, app, context);
    }));
    this.editorWrapper = new TabEditorWrapper();

    element.appendChild(this.tabnav.tabnavEl);
    element.appendChild(this.tabContents.tabcontentsEl);
    element.appendChild(this.editorWrapper.tabEditorWrapperEl);

    this.registerEventHandlers();
  }

  async registerEventHandlers() {
    // switch tab event
    this.tabnav.tabnavitems.forEach((tab, index) => {
      this.plugin.registerDomEvent(tab.tabitemEl, "click", (e: MouseEvent) => {
        if (this.currentIndex == index) {
          return;
        }
        if (this.editorWrapper.isEditing) {
          const content =this.tabnav.tabnavitems[this.currentIndex].title + "\n" + this.tabContents.tabcontents[this.currentIndex].content
          const editorContent = this.editorWrapper.editor.view.state.doc.toString().trim().substring(this.split.length)
          if (content.trim() !== editorContent.trim()) {
            new Notice("🟠 Please save the current tab.");
            return;
          }
        }
        this.tabnav.refreshActiveTabNav(index);
        this.tabContents.refreshActiveTabContent(index);
        this.editorWrapper.refreshActiveTabEditor(index, this.split + " " + this.tabnav.tabnavitems[index].title + "\n" + this.tabContents.tabcontents[index].content);
        this.currentIndex = index;
      });
    });

    // double click event
    this.plugin.registerDomEvent(this.tabContents.tabcontentsEl, "dblclick", (e: MouseEvent) => {
      e.preventDefault();

      if (!this.activeView || this.isPreviewMode()) {
        return;
      }

      this.enterEditingMode();

      const editor = this.editorWrapper.editor;
      const transaction = editor.state.update({
        changes: {
          from: 0, to: editor.state.doc.length,
          insert: this.split + " " + this.tabnav.tabnavitems[this.currentIndex].title + "\n" +
            this.tabContents.tabcontents[this.currentIndex].content.trim()
        }
      });
      editor.view.dispatch(transaction);
      editor.view.focus();
    });

    // button click event
    this.plugin.registerDomEvent(this.tabnav.tabbutton.buttonEl, "click", (e: MouseEvent) => {
      if (!this.activeView || this.isPreviewMode()) { return; }

      if (this.tabnav.tabbutton.type == "add-new-tab") {
        const newTabItem = new TabNavItem(this.tabnav, this.tabnav.tabnavitems.length, "New Tab");
        this.tabnav.append(newTabItem);

        // Add new tab to the file
        const activeEditor = this.activeView?.editor;
        activeEditor.setLine(this.sectioninfo.lineEnd, this.split + " new tab\nNew Tab Content\n" + activeEditor.getLine(this.sectioninfo.lineEnd));
      } else {
        this.saveEditorData();
        this.exitEditingMode();
      }
    });

    // right click menu event
    this.plugin.registerDomEvent(this.tabnav.tabnavEl, "contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      const menu = new Menu();

      menu.addItem((item) => {
        item.setTitle("Add new tab");
        item.setIcon("plus");
        item.onClick(() => {
          if (this.editorWrapper.isEditing) {
            const content = this.tabnav.tabnavitems[this.currentIndex].title + "\n" + this.tabContents.tabcontents[this.currentIndex].content
            const editorContent = this.editorWrapper.editor.view.state.doc.toString().trim().substring(this.split.length)
            if (content.trim() !== editorContent.trim()) {
              new Notice("🟠 Please save the current tab before you adding a new tab.");
              return;
            }
          }
          // Add new tab to the file
          const activeView = this.app.workspace.getActiveViewOfType(MarkdownView)
          const activeEditor = activeView.editor;
          activeEditor.setLine(this.sectioninfo.lineEnd, this.split + " new tab\nNew Tab Content\n" + activeEditor.getLine(this.sectioninfo.lineEnd));
          new Notice("🟢 Add new tab successfully");
        });
      });
      menu.addItem((item) => {
        item.setTitle("Delete tab");
        item.setIcon("trash");
        item.onClick(() => {
          let deleteIndex = -1;
          for (let i = 0; i < this.tabnav.tabnavitems.length; i++) {
            if (this.tabnav.tabnavitems[i].tabitemEl == e.target) {
              deleteIndex = i;
              break;
            }
          }
          if (deleteIndex === -1) {
            new Notice("🔴 Not a valid tab.");
            return;
          }
          const deleteTabTitle = this.tabnav.tabnavitems[deleteIndex].title;
          if (this.editorWrapper.isEditing) {
            const content = this.tabnav.tabnavitems[this.currentIndex].title + "\n" + this.tabContents.tabcontents[this.currentIndex].content
            const editorContent = this.editorWrapper.editor.view.state.doc.toString().trim().substring(this.split.length)
            if (content.trim() !== editorContent.trim()) {
              new Notice("🟠 Please save the current tab before deleting: " + deleteTabTitle);
              return;
            }
          }
          const newDoc = this.getNewDocByIndex(deleteIndex, "");
          this.activeView?.editor.replaceRange(newDoc,
            { line: (this.sectioninfo.lineStart + 1), ch: 0 } as EditorPosition,
            { line: this.sectioninfo.lineEnd, ch: 0 } as EditorPosition);
          new Notice("🟢 Delete " + deleteTabTitle + " successfully");
        })
      });
      menu.addItem((item) => {
        item.setTitle("Copy tab");
        item.setIcon("copy");
        item.onClick(() => {
          let copyIndex = -1;
          let copyContent = "";
          for (let i = 0; i < this.tabnav.tabnavitems.length; i++) {
            if (this.tabnav.tabnavitems[i].tabitemEl == e.target) {
              copyIndex = i;
              copyContent = this.split + " " + this.tabnav.tabnavitems[i].title + "\n" + this.tabContents.tabcontents[i].content
              break;
            }
          }
          if (copyIndex === -1) {
            new Notice("🔴 Not a valid tab.");
            return;
          }
          navigator.clipboard.writeText(copyContent).then(() => {
            new Notice("🟢 Copied to clipboard successfully.");
          }).catch((err) => {
            new Notice("🔴 Failed to copy to clipboard");
          });
        });
      });
      menu.addItem((item) => {
        item.setTitle("Paste tab");
        item.setIcon("paste");
        item.onClick(() => {
          navigator.clipboard.readText().then((text) => {
            if (this.editorWrapper.isEditing) {
              const content = this.tabnav.tabnavitems[this.currentIndex].title + "\n" + this.tabContents.tabcontents[this.currentIndex].content
              const editorContent = this.editorWrapper.editor.view.state.doc.toString().trim().substring(this.split.length)
              if (content.trim() !== editorContent.trim()) {
                new Notice("🟠 Please save the current tab.");
                return;
              }
            }
            if (!text || text.trim() === "" || (text.trim() == this.split)) {
              new Notice("🟠 No content in clipboard.");
              return;
            }
            let title = "New tab\n";
            let content = text.trim();
            if (text.startsWith(this.split)) {
              title = text.substring(this.split.length, text.indexOf("\n"));
              content = content.substring(text.indexOf("\n"));
            }
            
            const activeEditor = this.activeView?.editor;
            activeEditor.setLine(
              this.sectioninfo.lineEnd, this.split + " " + title.trim() + "\n" + 
              content.trim() + "\n" + activeEditor.getLine(this.sectioninfo.lineEnd));
          }).catch((err) => {
            new Notice("🔴 Failed to paste from clipboard");
          });
        });
      });
      menu.showAtMouseEvent(e);
    });
  }

  saveEditorData() {
    const newDoc = this.getNewDocByIndex(this.currentIndex);
    this.activeView?.editor.replaceRange(newDoc, { line: (this.sectioninfo.lineStart + 1), ch: 0 } as EditorPosition, { line: this.sectioninfo.lineEnd, ch: 0 } as EditorPosition);
  }

  getNewDocByIndex(index: number, doc?: string): string {
    doc = doc == "" ? doc : this.editorWrapper.editor.view.state.doc.toString();
    let newDoc = "";
    for (let i = 0; i < this.tabnav.tabnavitems.length; i++) {
      if (i !== index) {
        newDoc += "\n" + this.split + " " + this.tabnav.tabnavitems[i].title.trim() + "\n" + this.tabContents.tabcontents[i].content.trim() + "\n";
      } else {
        newDoc += "\n" + doc + "\n";
      }
    }
    return newDoc;
  }

  enterEditingMode() {
    this.editorWrapper.isEditing = true;
    this.editorWrapper.tabEditorWrapperEl.classList.remove('tab-editor-wrapper-hidden');
    this.tabContents.tabcontentsEl.addClass('tab-contents-hidden');
    this.tabnav.tabbutton.type = "save";
    setIcon(this.tabnav.tabbutton.buttonEl, "save");
  }

  exitEditingMode() {
    this.editorWrapper.isEditing = false;
    this.editorWrapper.tabEditorWrapperEl.classList.add('tab-editor-wrapper-hidden');
    this.tabContents.tabcontentsEl.removeClass('tab-contents-hidden');
    this.tabnav.tabbutton.type = "add-new-tab";
    setIcon(this.tabnav.tabbutton.buttonEl, "plus");
  }

  isPreviewMode() {
    return this.activeView?.leaf.getViewState().state.mode === "preview";
  }
}