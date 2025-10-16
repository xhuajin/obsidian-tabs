import { EditorPosition, MarkdownRenderChild, MarkdownRenderer, MarkdownView } from 'obsidian';

import { TabContent } from './tabcontent';
import { Tabs } from './tabs';
import { TabsNav } from './tabsnav';

export class TabNavItem {
  index: number;
  title: string;
  tabitemEl: HTMLElement;
  tabitemMDEl: HTMLElement;
  isActiveed: boolean = false;
  tabnav: TabsNav;
  tabs: Tabs;

  constructor(tabnav: TabsNav, index: number, title: string, draggable: boolean = true) {
    this.index = index;
    this.title = title.trim();
    this.tabnav = tabnav;
    this.tabs = tabnav.tabs;

    this.tabitemEl = createDiv();
    this.tabitemEl.className = 'tabs-nav-item';

    draggable && this.tabitemEl.setAttr('draggable', 'true');

    this.tabitemMDEl = this.tabitemEl.createDiv();
    this.tabitemMDEl.className = 'tabs-nav-item-md';

    const tabComponent = new MarkdownRenderChild(this.tabitemMDEl);
    // console.log(this.tabs.context);
    MarkdownRenderer.render(this.tabs.app, this.title, this.tabitemMDEl, this.tabs.context.sourcePath, tabComponent);
  }

  registerdndEvents() {
    this.tabs.plugin.registerDomEvent(this.tabitemEl, 'dragstart', (e: DragEvent) => {
      const index = this.tabs.tabsNav.navItems.indexOf(this);
      const tabText = this.title + '\n' + this.tabs.tabsContents.tabcontents[index].content;
      e.dataTransfer.setData('text/plain', tabText);
      e.dataTransfer.effectAllowed = 'copy';

      // 记录当前 drag 的 tab
      this.tabs.plugin.tabDragger = {
        fromTabs: this.tabnav.tabs,
        draggedTab: this,
        draggedContent: this.tabs.tabsContents.tabcontents[index],
        draggedContentLineCount: this.tabs.tabsContents.tabcontents[index].content.split('\n').length,
        draggedIndex: index,
      };
      this.tabitemEl.style.opacity = '0.9';
    });

    this.tabs.plugin.registerDomEvent(this.tabitemEl, 'drag', (e: DragEvent) => {
      e.preventDefault();
    });

    this.tabs.plugin.registerDomEvent(this.tabitemEl, 'dragenter', (e: DragEvent) => {
      e.preventDefault();
      if (
        this.tabs.plugin.tabDragger.draggedTab === this ||
        this.tabs.plugin.tabDragger.draggedTab.tabs.activeView !== this.tabs.activeView ||
        this.tabs.plugin.tabDragger.draggedTab.tabs.context.sourcePath !== this.tabs.context.sourcePath
      ) {
        return;
      }
      this.tabitemEl.classList.add('tabs-nav-item-dragover');
    });

    this.tabs.plugin.registerDomEvent(this.tabitemEl, 'dragover', (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      if (
        this.tabs.plugin.tabDragger.draggedTab === this ||
        this.tabs.plugin.tabDragger.draggedTab.tabs.activeView !== this.tabs.activeView ||
        this.tabs.plugin.tabDragger.draggedTab.tabs.context.sourcePath !== this.tabs.context.sourcePath
      ) {
        return;
      }
      this.tabitemEl.classList.add('tabs-nav-item-dragover');
      if (this.tabs.tabsConfig.titlePosition === 'top' || this.tabs.tabsConfig.titlePosition === 'bottom') {
        if (e.clientX - this.tabitemEl.getBoundingClientRect().left > this.tabitemEl.clientWidth * 0.5) {
          // 右半侧
          this.tabitemEl.classList.remove('tabs-nav-item-dragover-before');
          this.tabitemEl.classList.add('tabs-nav-item-dragover-after');
        } else if (e.clientX - this.tabitemEl.getBoundingClientRect().left < this.tabitemEl.clientWidth * 0.5) {
          // 左半侧
          this.tabitemEl.classList.remove('tabs-nav-item-dragover-after');
          this.tabitemEl.classList.add('tabs-nav-item-dragover-before');
        }
      } else {
        if (e.clientY - this.tabitemEl.getBoundingClientRect().top > this.tabitemEl.clientHeight * 0.5) {
          // 下半侧
          this.tabitemEl.classList.remove('tabs-nav-item-dragover-before');
          this.tabitemEl.classList.add('tabs-nav-item-dragover-after');
        } else if (e.clientY - this.tabitemEl.getBoundingClientRect().top < this.tabitemEl.clientHeight * 0.5) {
          // 上半侧
          this.tabitemEl.classList.remove('tabs-nav-item-dragover-after');
          this.tabitemEl.classList.add('tabs-nav-item-dragover-before');
        }
      }
    });

    this.tabs.plugin.registerDomEvent(this.tabitemEl, 'dragleave', (e: DragEvent) => {
      this.tabitemEl.classList.remove('tabs-nav-item-dragover');
      this.tabitemEl.classList.remove('tabs-nav-item-dragover-before');
      this.tabitemEl.classList.remove('tabs-nav-item-dragover-after');
    });

    this.tabs.plugin.registerDomEvent(this.tabitemEl, 'drop', (e: DragEvent) => {
      e.preventDefault();
      this.tabitemEl.classList.remove('tabs-nav-item-dragover');
      this.tabitemEl.classList.remove('tabs-nav-item-dragover-before');
      this.tabitemEl.classList.remove('tabs-nav-item-dragover-after');
      this.tabitemEl.style.opacity = '';
      if (this.tabs.plugin.tabDragger.draggedTab === this) {
        return;
      }
      this.tabs.plugin.tabDragger.toTabs = this.tabnav.tabs;
      const tabDragger = this.tabs.plugin.tabDragger;
      const dragIndex = this.tabs.plugin.tabDragger.draggedIndex;
      let dropIndex =
        this.tabs.tabsConfig.titlePosition === 'top' || this.tabs.tabsConfig.titlePosition === 'bottom'
          ? e.clientX - this.tabitemEl.getBoundingClientRect().left < this.tabitemEl.clientWidth / 2
            ? this.index
            : this.index + 1
          : e.clientY - this.tabitemEl.getBoundingClientRect().top < this.tabitemEl.clientHeight / 2
            ? this.index
            : this.index + 1;
      this.tabs.plugin.tabDragger.dropIndex = dropIndex;
      // 同一文件内的拖拽
      if (
        tabDragger.fromTabs.context.sourcePath === tabDragger.toTabs.context.sourcePath &&
        tabDragger.fromTabs.activeView === tabDragger.toTabs.activeView
      ) {
        // 在同一个 nav 上的拖拽
        if (tabDragger.fromTabs === tabDragger.toTabs) {
          if (this.index > tabDragger.draggedTab.index) {
            dropIndex -= 1;
          }
          tabDragger.dropIndex = dropIndex;
          if (dragIndex === dropIndex) {
            return;
          }
          let newDoc = '';
          // 删除 dragIndex 的 tab，插入到 dropIndex 的位置，content 也是
          const tabnavitem = this.tabs.tabsNav.navItems.splice(dragIndex, 1)[0];
          this.tabs.tabsNav.navItems.splice(dropIndex, 0, tabnavitem);
          const tabcontent = this.tabs.tabsContents.tabcontents.splice(dragIndex, 1)[0];
          this.tabs.tabsContents.tabcontents.splice(dropIndex, 0, tabcontent);
          // 更新 tabNav 和 tabContent 的 index，只用修改 dragIndex 和 dropIndex 之间的 tab 的 index。如果activeTab在拖拽范围内,需要修改currentIndex
          if (dragIndex < dropIndex) {
            for (let i = dragIndex; i <= dropIndex; i++) {
              this.tabs.tabsNav.navItems[i].index = i;
              this.tabs.tabsContents.tabcontents[i].index = i;
              if (this.tabs.tabsNav.navItems[i].isActiveed) {
                this.tabs.tabsNav.currentTab = i;
                this.tabs.tabsContents.currentTab = i;
                let key = '/';
                if (this.tabs.context && this.tabs.sectionInfo) {
                  key = this.tabs.context.sourcePath + this.tabs.sectionInfo.lineStart;
                }
                this.tabs.plugin.lastTabsCache.set(key, i);
              }
            }
          } else {
            for (let i = dropIndex; i <= dragIndex; i++) {
              this.tabs.tabsNav.navItems[i].index = i;
              this.tabs.tabsContents.tabcontents[i].index = i;
              if (this.tabs.tabsNav.navItems[i].isActiveed) {
                this.tabs.tabsNav.currentTab = i;
                this.tabs.tabsContents.currentTab = i;
                this.tabs.plugin.lastTabsCache.set(this.tabs.tabsId, i);
              }
            }
          }
          // 获取新的 doc
          for (let i = 0; i < this.tabs.tabsNav.navItems.length; i++) {
            newDoc +=
              this.tabs.split +
              this.tabs.tabsNav.navItems[i].title +
              '\n' +
              this.tabs.tabsContents.tabcontents[i].content;
          }
          newDoc =
            this.tabs.backquote.repeat(this.tabs.backquoteCount) +
            'tabs\n' +
            this.tabs.tabsConfig.rawConfig +
            '\n' +
            newDoc +
            this.tabs.backquote.repeat(this.tabs.backquoteCount);

          // obsidian eiditor 不会自动刷新，这里手动刷新一下，等 editor 下一次 focus 的时候会自动刷新
          this.tabs.tabsNav.navWrapperEl.removeChild(tabnavitem.tabitemEl);
          this.tabs.tabsContents.tabcontentsEl.removeChild(tabcontent.contentEl);

          if (dropIndex === this.tabs.tabsNav.navItems.length - 1) {
            this.tabs.tabsNav.navWrapperEl.appendChild(tabnavitem.tabitemEl);
            this.tabs.tabsContents.tabcontentsEl.appendChild(tabcontent.contentEl);
          } else {
            this.tabs.tabsNav.navWrapperEl.insertBefore(
              tabnavitem.tabitemEl,
              this.tabs.tabsNav.navItems[dropIndex + 1].tabitemEl
            );
            this.tabs.tabsContents.tabcontentsEl.insertBefore(
              tabcontent.contentEl,
              this.tabs.tabsContents.tabcontents[dropIndex + 1].contentEl
            );
          }

          this.tabs.activeView?.editor.replaceRange(
            newDoc,
            { line: this.tabs.sectionInfo.lineStart, ch: 0 } as EditorPosition,
            {
              line: this.tabs.sectionInfo.lineEnd,
              ch: this.tabs.activeView?.editor.getLine(this.tabs.sectionInfo.lineEnd).length,
            } as EditorPosition
          );
        }
        // 不同 nav 之间的拖拽
        else {
          // 更新 toTabs 的内容，将 draggedTab 插入到 toTabs.tabsNav 中，将 draggedTabContent 插入到 toTabs.tabsContents 中
          const tabDragger = this.tabs.plugin.tabDragger;
          tabDragger.draggedTab = new TabNavItem(
            tabDragger.toTabs.tabsNav,
            tabDragger.dropIndex,
            tabDragger.draggedTab.title
          );
          tabDragger.draggedContent = new TabContent(
            tabDragger?.dropIndex,
            tabDragger.draggedTab.title,
            tabDragger.draggedContent.content,
            tabDragger.toTabs.app,
            tabDragger.toTabs.context
          );
          tabDragger.toTabs.tabsNav.navItems.splice(tabDragger.dropIndex, 0, tabDragger.draggedTab);
          tabDragger.toTabs.tabsContents.tabcontents.splice(tabDragger.dropIndex, 0, tabDragger.draggedContent);
          // 更新 toTabs 的 index
          if (dropIndex <= tabDragger.toTabs.currentIndex) {
            tabDragger.toTabs.currentIndex += 1;
            this.tabs.plugin.lastTabsCache.set(tabDragger.toTabs.tabsId, tabDragger.toTabs.currentIndex);
          }
          for (let i = tabDragger.dropIndex; i < tabDragger.toTabs.tabsNav.navItems.length; i++) {
            tabDragger.toTabs.tabsNav.navItems[i].index = i;
            tabDragger.toTabs.tabsContents.tabcontents[i].index = i;
          }
          // 更新 dom 元素：如果是插入到最后一个 tab 后面，直接 appendChild，否则 insertBefore
          if (dropIndex === tabDragger.toTabs.tabsNav.navItems.length - 1) {
            tabDragger.toTabs.tabsNav.navWrapperEl.appendChild(tabDragger.draggedTab.tabitemEl);
            tabDragger.toTabs.tabsContents.tabcontentsEl.appendChild(tabDragger.draggedContent.contentEl);
          } else {
            tabDragger.toTabs.tabsNav.navWrapperEl.insertBefore(
              tabDragger.draggedTab.tabitemEl,
              tabDragger.toTabs.tabsNav.navItems[this.tabs.plugin.tabDragger.dropIndex + 1].tabitemEl
            );
            tabDragger.toTabs.tabsContents.tabcontentsEl.insertBefore(
              tabDragger.draggedContent.contentEl,
              tabDragger.toTabs.tabsContents.tabcontents[tabDragger.dropIndex + 1].contentEl
            );
          }
          // 增加点击事件
          tabDragger.toTabs.plugin.registerDomEvent(tabDragger.draggedTab.tabitemEl, 'click', () => {
            const index = tabDragger.toTabs.tabsNav.navItems.indexOf(tabDragger.draggedTab);
            tabDragger.toTabs.tabsNav.refreshActiveTabNav(index);
            tabDragger.toTabs.tabsContents.refreshActiveTabContent(index);
            tabDragger.toTabs.currentIndex = index;
          });
          // 如果有 double click 事件，需要重新注册
          if (this.tabs.plugin.settings.doubleClickToEdit) {
            tabDragger.toTabs.plugin.registerDomEvent(
              tabDragger.draggedContent.contentEl,
              'dblclick',
              (e: MouseEvent) => {
                e.preventDefault();
                if (!tabDragger.toTabs.activeView || tabDragger.toTabs.isPreviewMode()) {
                  return;
                }
                tabDragger.toTabs.plugin.tabsEditorModal.startEditing(tabDragger.toTabs);
              }
            );
          }
          // 增加 drag 事件
          tabDragger.draggedTab.registerdndEvents();

          // 获取新的 toTabs 的内容
          let toTabsNewDoc = '';
          for (let i = 0; i < tabDragger.toTabs.tabsNav.navItems.length; i++) {
            toTabsNewDoc +=
              tabDragger.toTabs.split +
              tabDragger.toTabs.tabsNav.navItems[i].title +
              '\n' +
              tabDragger.toTabs.tabsContents.tabcontents[i].content;
          }
          tabDragger.toTabs.updateBackquote(tabDragger.draggedContent.content);
          toTabsNewDoc =
            this.tabs.backquote.repeat(tabDragger.toTabs.backquoteCount) +
            'tabs\n' +
            tabDragger.toTabs.tabsConfig.rawConfig +
            '\n' +
            toTabsNewDoc +
            this.tabs.backquote.repeat(tabDragger.toTabs.backquoteCount);

          // 删除 fromTabs 中的 tab
          if (tabDragger.fromTabs.currentIndex === tabDragger.draggedIndex) {
            if (tabDragger.fromTabs.currentIndex > 0) {
              tabDragger.fromTabs.currentIndex -= 1;
            }
            tabDragger.fromTabs.tabsNav.refreshActiveTabNav(tabDragger.fromTabs.currentIndex);
            tabDragger.fromTabs.tabsContents.refreshActiveTabContent(tabDragger.fromTabs.currentIndex);
            this.tabs.plugin.lastTabsCache.set(tabDragger.fromTabs.tabsId, tabDragger.fromTabs.currentIndex);
          }
          tabDragger.fromTabs.tabsNav.navWrapperEl.removeChild(
            tabDragger.fromTabs.tabsNav.navItems[dragIndex].tabitemEl
          );
          tabDragger.fromTabs.tabsContents.tabcontentsEl.removeChild(
            tabDragger.fromTabs.tabsContents.tabcontents[dragIndex].contentEl
          );
          tabDragger.fromTabs.tabsNav.navItems.splice(dragIndex, 1);
          tabDragger.fromTabs.tabsContents.tabcontents.splice(dragIndex, 1);

          // 更新 fromTabs 的 index
          for (let i = 0; i < tabDragger.fromTabs.tabsNav.navItems.length; i++) {
            tabDragger.fromTabs.tabsNav.navItems[i].index = i;
            tabDragger.fromTabs.tabsContents.tabcontents[i].index = i;
          }

          let fromTabsNewDoc = '';
          for (let i = 0; i < tabDragger.fromTabs.tabsNav.navItems.length; i++) {
            fromTabsNewDoc +=
              tabDragger.fromTabs.split +
              tabDragger.fromTabs.tabsNav.navItems[i].title +
              '\n' +
              tabDragger.fromTabs.tabsContents.tabcontents[i].content;
          }
          fromTabsNewDoc =
            tabDragger.fromTabs.backquote.repeat(this.tabs.backquoteCount) +
            'tabs\n' +
            tabDragger.fromTabs.tabsConfig.rawConfig +
            '\n' +
            fromTabsNewDoc +
            tabDragger.fromTabs.backquote.repeat(tabDragger.fromTabs.backquoteCount);
          // 如果是同一个文件，先修改后面的 tabs 的内容，再修改前面的 tabs 的内容（避免行号变化导致修改错位）
          if (
            this.tabs.plugin.tabDragger.fromTabs.context.sourcePath ===
            this.tabs.plugin.tabDragger.toTabs.context.sourcePath
          ) {
            const activeView = this.tabs.app.workspace.getActiveViewOfType(MarkdownView);
            if (tabDragger.toTabs.sectionInfo.lineStart > tabDragger.fromTabs.sectionInfo.lineEnd) {
              // 从上到下
              activeView.editor.replaceRange(
                toTabsNewDoc,
                { line: tabDragger.toTabs.sectionInfo.lineStart, ch: 0 } as EditorPosition,
                {
                  line: tabDragger.toTabs.sectionInfo.lineEnd,
                  ch: tabDragger.toTabs.activeView?.editor.getLine(tabDragger.toTabs.sectionInfo.lineEnd).length,
                } as EditorPosition
              );
              activeView.editor.replaceRange(
                fromTabsNewDoc,
                { line: tabDragger.fromTabs.sectionInfo.lineStart, ch: 0 } as EditorPosition,
                {
                  line: tabDragger.fromTabs.sectionInfo.lineEnd,
                  ch: tabDragger.fromTabs.activeView?.editor.getLine(tabDragger.fromTabs.sectionInfo.lineEnd).length,
                } as EditorPosition
              );
              tabDragger.toTabs.sectionInfo.lineStart =
                tabDragger.toTabs.sectionInfo.lineStart - tabDragger.draggedContentLineCount;
              tabDragger.fromTabs.sectionInfo.lineEnd =
                tabDragger.fromTabs.sectionInfo.lineEnd - tabDragger.draggedContentLineCount;
            } else if (tabDragger.toTabs.sectionInfo.lineEnd < tabDragger.fromTabs.sectionInfo.lineStart) {
              // toTabs 在 fromTabs 上面，先修改 fromTabs 的内容，再修改 toTabs 的内容
              activeView.editor.replaceRange(
                fromTabsNewDoc,
                { line: tabDragger.fromTabs.sectionInfo.lineStart, ch: 0 } as EditorPosition,
                {
                  line: tabDragger.fromTabs.sectionInfo.lineEnd,
                  ch: tabDragger.fromTabs.activeView?.editor.getLine(tabDragger.fromTabs.sectionInfo.lineEnd).length,
                } as EditorPosition
              );
              activeView.editor.replaceRange(
                toTabsNewDoc,
                { line: tabDragger.toTabs.sectionInfo.lineStart, ch: 0 } as EditorPosition,
                {
                  line: tabDragger.toTabs.sectionInfo.lineEnd,
                  ch: tabDragger.toTabs.activeView?.editor.getLine(tabDragger.toTabs.sectionInfo.lineEnd).length,
                } as EditorPosition
              );
              tabDragger.fromTabs.sectionInfo.lineStart =
                tabDragger.fromTabs.sectionInfo.lineStart + tabDragger.draggedContentLineCount;
              tabDragger.toTabs.sectionInfo.lineEnd =
                tabDragger.toTabs.sectionInfo.lineEnd + tabDragger.draggedContentLineCount;
            }
          }
          this.tabs.plugin.tabDragger = null;
        }
      }
    });
  }
}
