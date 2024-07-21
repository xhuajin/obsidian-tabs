import { App, MarkdownPostProcessorContext, MarkdownSectionInformation, MarkdownView, Notice } from 'obsidian';

import { TabContent } from './tabcontent';
import { TabContents } from './tabcontents';
import { TabMenu } from './tabmenu';
import { TabNav } from './tabnav';
import { TabsConfig } from './tabsconfig';
import TabsPlugin from '../../main';

// After editing content inside tabs, the code block will rerender. So we need to save the last active tab for the next rerender.
let lastActiveTabIndex: number = 0;

export class Tabs {
  plugin: TabsPlugin;
  tabsEl: HTMLElement;
  split: string;
  app: App;
  activeView: MarkdownView;
  tabsConfig: TabsConfig;
  tabNav: TabNav;
  tabContents: TabContents;
  sectionInfo: MarkdownSectionInformation;
  context: MarkdownPostProcessorContext;
  currentIndex: number = 0;
  tabsType: string = "outertabs";
  backquote: string = "`";
  backquoteCount: number = 3;

  constructor(source: string, element: HTMLElement, context: MarkdownPostProcessorContext, app: App, plugin: TabsPlugin) {
    element.className = "tab-container";
    this.plugin = plugin;
    this.tabsEl = element;
    this.split = this.plugin.settings.split;
    this.app = app;
    this.activeView = app.workspace.getActiveViewOfType(MarkdownView);
    this.sectionInfo = context.getSectionInfo(element);
    this.context = context;
    this.updateBackquote(source);
    if (!this.sectionInfo) {
      this.tabsType = "innertabs";
    }
    
    const [tabnavitemtitle, tabcontent] = this.parseTabs(source, this.plugin.settings.defaultTabNavItem, this.plugin.settings.defaultTabContent);
    this.tabsConfig = new TabsConfig(tabcontent[0], this.tabsEl, this.plugin.settings);
    this.tabNav = new TabNav(tabnavitemtitle.slice(1), this.tabsType === "innertabs" ? "none" : this.tabsConfig.actionButton, this.sectionInfo);
    this.tabContents = new TabContents(plugin, tabcontent.map((content, index) => {
      return new TabContent(index, tabnavitemtitle[index], content, app, context);
    }).slice(1));
    
    this.registerEventHandlers();
    
    element.appendChild(this.tabNav.tabnavEl);
    element.appendChild(this.tabContents.tabcontentsEl);
    
    // switch to the last active tab
    lastActiveTabIndex = lastActiveTabIndex >= this.tabNav.tabnavitems.length ? 0 : lastActiveTabIndex;
    this.currentIndex = lastActiveTabIndex;
    this.tabNav.refreshActiveTabNav(lastActiveTabIndex);
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
          } else if (lines[i].trim().startsWith('~~~')) {
            if (!innerTabs && lines[i].trim().endsWith('tabs')) {
              innerTabs = lines[i].trim().length - 4;
              temp_hasInnerTabs = true; // If a tabs has inner tabs
            } else if (innerTabs && lines[i].trim().endsWith('~'.repeat(innerTabs))) {
              innerTabs = 0;
            }
          }
        }
      }
      // ensure the innertab will not enter editing mode
      tabnavitemtitle.push(title);
      tabcontent.push(content);
    }
    return [tabnavitemtitle, tabcontent];
  }
  
  async registerEventHandlers() {
    // switch tab event
    this.tabNav.tabnavitems.forEach((tab, index) => {
      this.plugin.registerDomEvent(tab.tabitemEl, "click", (e: MouseEvent) => {
        this.tabNav.refreshActiveTabNav(index);
        this.tabContents.refreshActiveTabContent(index);
        this.currentIndex = index;
        lastActiveTabIndex = index;
      });
    });

    // double click event
    this.tabsType === "outertabs" && this.plugin.settings.doubleClickToEdit && this.plugin.registerDomEvent(this.tabContents.tabcontentsEl, "dblclick", (e: MouseEvent) => {
      e.preventDefault();
      if (!this.activeView || this.isPreviewMode()) {
        return;
      }
      this.plugin.tabsEditorModal.startEditing(this);
    });

    // action button click event
    switch (this.tabsConfig.actionButton) {
      case 'none':
        break;
      case 'edit':
        this.tabNav.tabbutton.buttonEl && this.plugin.registerDomEvent(this.tabNav.tabbutton.buttonEl, "click", () => {
          this.plugin.tabsEditorModal.startEditing(this);
        });
        break;
      case 'add':
        this.tabNav.tabbutton.buttonEl && this.plugin.registerDomEvent(this.tabNav.tabbutton.buttonEl, "click", () => {
          lastActiveTabIndex = this.tabNav.tabnavitems.length;
          const activeEditor = this.activeView?.editor;
          activeEditor.setLine(this.sectionInfo.lineEnd,
            this.split + this.plugin.settings.defaultTabNavItem + "\n" + 
            this.plugin.settings.defaultTabContent + "\n" + 
            activeEditor.getLine(this.sectionInfo.lineEnd));
        });
        break;
      default:
        this.plugin.settings.actionButtonType = 'none';
        this.plugin.saveSettings();
        new Notice("Invalid action button type. Set to 'None'.");
    }

    // right click menu event
    this.plugin.registerDomEvent(this.tabNav.tabnavEl, "contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      const tabmenu = new TabMenu(this, e);
      tabmenu.showAtMouseEvent(e);
    });
  }

  isPreviewMode() {
    return this.activeView?.leaf.getViewState().state.mode === "preview";
  }
  
  updateBackquote(doc: string) {
    if (this.activeView && this.sectionInfo) {
      const startLine = this.activeView?.editor.getLine(this.sectionInfo?.lineStart).trim();
      if (startLine.contains('```tabs')) {
        this.backquote = '`';
      } else if (startLine.contains('~~~tabs')) {
        this.backquote = '~';
      }
    }
    
    let count = this.sectionInfo ? this.activeView?.editor.getLine(this.sectionInfo?.lineStart).trim().replace('tabs', '')?.length : 0;
    this.backquoteCount = Math.max(this.backquoteCount, count);
    if (doc.contains('```') || doc.contains('~~~')) {
      count = 0;
      for (let i = 0; i < doc.length; i++) {
        if ((doc[i] === '`' || doc[i] === '~') && (doc[i + 1] === doc[i] || doc[i - 1] === doc[i])) {
          count++;
          this.backquoteCount = Math.max(this.backquoteCount, count + 1);
        } else {
          count = 0;
        }
      }
      this.backquoteCount = Math.max(this.backquoteCount, count + 1);
    }
  }
}