import { App, MarkdownPostProcessorContext, MarkdownSectionInformation, MarkdownView, Notice } from 'obsidian';

import { TabContent } from './tabcontent';
import { TabContents } from './tabcontents';
import { TabMenu } from './tabmenu';
import { TabsConfig } from './tabsconfig';
import { TabsNav } from './tabsnav';
import TabsPlugin from '../../main';

// After editing content inside tabs, the code block will rerender. So we need to save the last active tab for the next rerender.
// export let lastActiveTabIndex: number = 0;

export class Tabs {
  tabsId: string;
  plugin: TabsPlugin;
  tabsEl: HTMLElement;
  split: string;
  app: App;
  activeView: MarkdownView;
  tabsConfig: TabsConfig;
  tabsNav: TabsNav;
  tabsContents: TabContents;
  context: MarkdownPostProcessorContext;
  sectionInfo: MarkdownSectionInformation;
  currentIndex: number = 0;
  tabsType: string = 'outertabs';
  backquote: string = '`';
  backquoteCount: number = 3;

  constructor(
    source: string,
    element: HTMLElement,
    context: MarkdownPostProcessorContext,
    app: App,
    plugin: TabsPlugin
  ) {
    element.className = 'tabs-container';
    this.plugin = plugin;
    this.tabsEl = element;
    this.split = this.plugin.settings.split;
    this.app = app;
    this.activeView = app.workspace.getActiveViewOfType(MarkdownView);
    this.sectionInfo = context?.getSectionInfo(element);
    this.context = context;
    this.updateBackquote(source);
    if (!this.sectionInfo) {
      this.tabsType = 'innertabs';
      this.tabsEl.classList.add('tabs-innertabs');
    }

    const [tabnavitemtitle, tabcontent] = this.parseTabs(
      source,
      this.plugin.settings.defaultTabNavItem,
      this.plugin.settings.defaultTabContent
    );
    this.tabsConfig = new TabsConfig(tabcontent[0], this.tabsEl, this.plugin.settings);

    this.tabsNav = new TabsNav(
      this,
      tabnavitemtitle.slice(1),
      this.tabsType === 'innertabs' ? 'action-none' : this.tabsConfig.actionButton,
      this.sectionInfo
    );
    this.tabsContents = new TabContents(
      plugin,
      tabcontent
        .map((content, index) => {
          return new TabContent(index, tabnavitemtitle[index], content, app, context);
        })
        .slice(1)
    );

    this.registerEventHandlers();

    element.appendChild(this.tabsNav.navEl);
    element.appendChild(this.tabsContents.tabcontentsEl);
    this.tabsConfig.decorate(this.tabsEl, this.tabsNav.navEl, this.tabsContents.tabcontentsEl);

    // switch to the last active tab
    this.tabsId = '/';
    if (this.context && this.sectionInfo) {
      this.tabsId = this.context.sourcePath + this.sectionInfo.lineStart;
    }
    if (!this.plugin.lastTabsCache.has(this.tabsId)) {
      this.plugin.lastTabsCache.set(this.tabsId, 0);
    }
    // lastActiveTabIndex = lastActiveTabIndex >= this.tabsNav.navItems.length ? 0 : lastActiveTabIndex;
    this.currentIndex = this.plugin.lastTabsCache.get(this.tabsId);
    this.tabsNav.refreshActiveTabNav(this.currentIndex);
    this.tabsContents.refreshActiveTabContent(this.currentIndex);
  }

  parseTabs(source: string, defaultTabNavItem: string, defaultTabContent: string): [string[], string[]] {
    const tabnavitemtitle = [];
    const tabcontent = [];
    let title = '';
    let content = '';

    if (!source.contains(this.split)) {
      tabnavitemtitle.push('');
      tabcontent.push('');
      tabnavitemtitle.push(defaultTabNavItem);
      tabcontent.push(source.trim() === '' ? defaultTabContent : source);
    } else {
      let lines = source.split('\n');
      for (let i = 0, innerTabs = 0; i < lines.length; i++) {
        if (!innerTabs && lines[i].startsWith(this.split)) {
          tabnavitemtitle.push(title);
          tabcontent.push(content);
          title = lines[i].substring(this.split.length);
          content = '';
        } else {
          content += lines[i] + '\n';
          if (lines[i].trim().startsWith('```')) {
            if (!innerTabs && lines[i].trim().endsWith('tabs')) {
              innerTabs = lines[i].trim().length - 4;
            } else if (innerTabs && lines[i].trim().endsWith('`'.repeat(innerTabs))) {
              innerTabs = 0;
            }
          } else if (lines[i].trim().startsWith('~~~')) {
            if (!innerTabs && lines[i].trim().endsWith('tabs')) {
              innerTabs = lines[i].trim().length - 4;
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
    this.tabsNav.navItems.forEach(tab => {
      this.plugin.registerDomEvent(tab.tabitemEl, 'click', () => {
        // 可能会插入新的tab，所以不能用固定的index，需要重新获取index
        const index = this.tabsNav.navItems.indexOf(tab);
        this.tabsNav.refreshActiveTabNav(index);
        this.tabsContents.refreshActiveTabContent(index);
        this.currentIndex = index;
        this.plugin.lastTabsCache.set(this.context.sourcePath + this.sectionInfo.lineStart, index);
      });
    });

    // double click event
    this.tabsType === 'outertabs' &&
      this.plugin.settings.doubleClickToEdit &&
      this.plugin.registerDomEvent(this.tabsContents.tabcontentsEl, 'dblclick', (e: MouseEvent) => {
        e.preventDefault();
        if (!this.activeView || this.isPreviewMode()) {
          return;
        }
        this.plugin.tabsEditorModal.startEditing(this);
      });

    // action button click event
    switch (this.tabsConfig.actionButton) {
      case 'action-none':
        break;
      case 'action-edit':
        if (
          this.activeView &&
          !this.isPreviewMode() &&
          this.tabsType !== 'innertabs' &&
          this.tabsNav.tabsButton.buttonEl
        ) {
          this.plugin.registerDomEvent(this.tabsNav.tabsButton.buttonEl, 'click', () => {
            this.plugin.tabsEditorModal.startEditing(this);
          });
        }
        break;
      case 'action-add':
        if (
          this.activeView &&
          !this.isPreviewMode() &&
          this.tabsType !== 'innertabs' &&
          this.tabsNav.tabsButton.buttonEl
        ) {
          this.plugin.registerDomEvent(this.tabsNav.tabsButton.buttonEl, 'click', () => {
            // lastActiveTabIndex = this.tabsNav.navItems.length;
            this.plugin.lastTabsCache[this.context.sourcePath + this.sectionInfo.lineStart] =
              this.tabsNav.navItems.length;
            const activeEditor = this.activeView?.editor;
            activeEditor.setLine(
              this.sectionInfo.lineEnd,
              this.split +
                this.plugin.settings.defaultTabNavItem +
                '\n' +
                this.plugin.settings.defaultTabContent +
                '\n' +
                activeEditor.getLine(this.sectionInfo.lineEnd)
            );
          });
        }
        break;
      default:
        this.plugin.settings.actionButtonType = 'action-none';
        this.plugin.saveSettings();
        new Notice("Invalid action button type. Set to 'None'.");
    }

    // right click menu event
    if (this.activeView && !this.isPreviewMode() && this.tabsType !== 'innertabs') {
      this.plugin.registerDomEvent(this.tabsNav.navEl, 'contextmenu', (e: MouseEvent) => {
        e.preventDefault();
        const tabmenu = new TabMenu(this, e);
        tabmenu.showAtMouseEvent(e);
      });
    }

    // drag and drop event
    this.tabsType !== 'innertabs' && this.plugin.settings.dragAndDrop && this.tabsNav.registerDragEvents();
  }

  isPreviewMode() {
    return this.activeView?.leaf.getViewState().state.mode === 'preview';
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

    let count = this.sectionInfo
      ? this.activeView?.editor.getLine(this.sectionInfo?.lineStart).trim().replace('tabs', '')?.length
      : 0;
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
