import { App, EditorPosition, MarkdownPostProcessorContext, MarkdownSectionInformation, MarkdownView, Notice, setIcon } from 'obsidian';

import { TabContent } from './tabcontent';
import { TabContents } from './tabcontents';
import { TabEditorWrapper } from './tabeditorwrapper';
import { TabMenu } from './tabmenu';
import { TabNav } from './tabnav';
import TabsPlugin from '../main';
import { TabsSettings } from '../settings';

// After editing content inside tabs, the code block will rerender. So we need to save the last active tab for the next rerender.
let lastActiveTabIndex: number = 0;
// Used to distinguish innerTabs and outerTabs. (render from outside to inside)
let hasInnerTabs: boolean = false;

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
  context: MarkdownPostProcessorContext;
  currentIndex: number = 0;
  isInnerTabs: boolean = false;

  constructor(source: string, element: HTMLElement, context: MarkdownPostProcessorContext, app: App, plugin: TabsPlugin, settings: TabsSettings) {
    element.className = "tab-container";
    this.plugin = plugin;
    this.tabsEl = element;
    this.split = settings.split;
    this.app = app;
    this.activeView = app.workspace.getActiveViewOfType(MarkdownView);
    this.sectioninfo = context.getSectionInfo(element);
    this.context = context;

    if (hasInnerTabs) {
      this.isInnerTabs = true;
    }
    const [tabnavitemtitle, tabcontent] = this.parseTabs(source, settings.defaultTabNavItem, settings.defaultTabContent);
    this.tabnav = new TabNav(tabnavitemtitle.slice(1), this.split, this.sectioninfo);
    this.tabContents = new TabContents(plugin, tabcontent.map((content, index) => {
      return new TabContent(index, tabnavitemtitle[index], content, app, context);
    }).slice(1));
    this.editorWrapper = new TabEditorWrapper();

    element.appendChild(this.tabnav.tabnavEl);
    element.appendChild(this.tabContents.tabcontentsEl);
    element.appendChild(this.editorWrapper.tabEditorWrapperEl);

    this.registerEventHandlers();

    // switch to the last active tab
    lastActiveTabIndex = lastActiveTabIndex >= this.tabnav.tabnavitems.length ? 0 : lastActiveTabIndex;
    this.currentIndex = lastActiveTabIndex;
    this.tabnav.refreshActiveTabNav(lastActiveTabIndex);
    this.tabContents.refreshActiveTabContent(lastActiveTabIndex);
  }

  parseTabs(source: string, defaultTabNavItem: string, defaultTabContent: string): [string[], string[]] {
    const tabnavitemtitle = [];
    const tabcontent = [];
    let title = "";
    let content = "";
    
    if (!source.contains(this.split)) {
      tabnavitemtitle.push("");
      tabcontent.push("");
      tabnavitemtitle.push(defaultTabNavItem);
      tabcontent.push(source.trim() === "" ? defaultTabContent : source);
    } else {
      let lines = source.split('\n');
      let temp_hasInnerTabs = false; // If a tabs does't have inner tabs
      for (let i = 0, innerTabs = 0; i < lines.length; i++) {
        if (!innerTabs && lines[i].startsWith(this.split)) {
          tabnavitemtitle.push(title);
          tabcontent.push(content);
          title = lines[i].substring(this.split.length);
          content = "";
        } else {
          content += lines[i] + "\n";
          if (lines[i].trim().startsWith('```')) {
            if (!innerTabs && lines[i].trim().endsWith('tabs')) {
              innerTabs = lines[i].trim().length - 4;
              temp_hasInnerTabs = true; // If a tabs has inner tabs
            } else if (innerTabs && lines[i].trim().endsWith('`'.repeat(innerTabs))) {
              innerTabs = 0;
            }
          }
        }
      }
      // ensure the innertab will not enter editing mode
      hasInnerTabs = temp_hasInnerTabs;
      tabnavitemtitle.push(title);
      tabcontent.push(content);
    }
    return [tabnavitemtitle, tabcontent];
  }
  
  async registerEventHandlers() {
    // switch tab event
    this.tabnav.tabnavitems.forEach((tab, index) => {
      this.plugin.registerDomEvent(tab.tabitemEl, "click", (e: MouseEvent) => {
        if (this.editorWrapper.isEditing) {
          const content =this.tabnav.tabnavitems[this.currentIndex].title + "\n" + this.tabContents.tabcontents[this.currentIndex].content
          const editorContent = this.editorWrapper.editor.view.state.doc.toString().trim().substring(this.split.length)
          if (content.trim() !== editorContent.trim()) {
            !this.plugin.settings.ignoreNotice && new Notice("🟠 Please save the current tab.");
            return;
          }
        }
        this.tabnav.refreshActiveTabNav(index);
        this.tabContents.refreshActiveTabContent(index);
        this.editorWrapper.refreshActiveTabEditor(index, this.split + this.tabnav.tabnavitems[index].title + "\n" + this.tabContents.tabcontents[index].content);
        this.currentIndex = index;
        lastActiveTabIndex = index;
      });
    });

    // double click event
    this.plugin.registerDomEvent(this.tabContents.tabcontentsEl, "dblclick", (e: MouseEvent) => {
      e.preventDefault();
      
      if (!this.activeView || this.isPreviewMode() || this.isInnerTabs) {
        return;
      }

      this.enterEditingMode();
      
      const editor = this.editorWrapper.editor;
      editor.view.dispatch({
        changes: {
          from: 0, to: editor.view.state.doc.length,
          insert: this.split + this.tabnav.tabnavitems[this.currentIndex].title + "\n" +
            this.tabContents.tabcontents[this.currentIndex].content.trim()
        }
      });
      editor.view.focus();
    });

    // button click event
    this.plugin.registerDomEvent(this.tabnav.tabbutton.buttonEl, "click", (e: MouseEvent) => {
      if (!this.activeView || this.isPreviewMode()) { return; }

      if (this.tabnav.tabbutton.type == "add-new-tab") {
        // Add new tab to the file
        lastActiveTabIndex = this.tabnav.tabnavitems.length;
        const activeEditor = this.activeView?.editor;
        activeEditor.setLine(this.sectioninfo.lineEnd, 
          this.split + this.plugin.settings.defaultTabNavItem + "\n" + 
          this.plugin.settings.defaultTabContent + "\n" + 
          activeEditor.getLine(this.sectioninfo.lineEnd));
      } else {
        this.saveEditorData();
        this.exitEditingMode();
      }
    });

    // right click menu event
    this.plugin.registerDomEvent(this.tabnav.tabnavEl, "contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      const tabmenu = new TabMenu(this, e);
      tabmenu.showAtMouseEvent(e);
    });
  }

  saveEditorData() {
    const newDoc = this.getNewDocByIndex(this.currentIndex);
    this.activeView?.editor.replaceRange(newDoc, 
      { line: (this.sectioninfo.lineStart + 1), ch: 0 } as EditorPosition,
      { line: this.sectioninfo.lineEnd, ch: 0 } as EditorPosition);
  }

  getNewDocByIndex(index: number, doc?: string): string {
    doc = doc == "" ? doc : this.editorWrapper.editor.view.state.doc.toString();
    let newDoc = "";
    for (let i = 0; i < this.tabnav.tabnavitems.length; i++) {
      if (i !== index) {
        newDoc += "\n" + this.split + this.tabnav.tabnavitems[i].title.trim() + "\n" + this.tabContents.tabcontents[i].content.trim() + "\n";
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
    this.tabnav.tabbutton.buttonEl.classList.remove('tab-nav-button-add');
    this.tabnav.tabbutton.buttonEl.classList.add('tab-nav-button-save');
  }

  exitEditingMode() {
    this.editorWrapper.isEditing = false;
    this.editorWrapper.tabEditorWrapperEl.classList.add('tab-editor-wrapper-hidden');
    this.tabContents.tabcontentsEl.removeClass('tab-contents-hidden');
    this.tabnav.tabbutton.type = "add-new-tab";
    setIcon(this.tabnav.tabbutton.buttonEl, "plus");
    this.tabnav.tabbutton.buttonEl.classList.add('tab-nav-button-add');
    this.tabnav.tabbutton.buttonEl.classList.remove('tab-nav-button-save');
  }

  isPreviewMode() {
    return this.activeView?.leaf.getViewState().state.mode === "preview";
  }
}