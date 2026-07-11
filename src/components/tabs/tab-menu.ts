import { EditorPosition, MarkdownView, Menu, Notice } from 'obsidian';

import { t } from '../../lang/helpers';
import { Tabs } from './tabs';

export class TabMenu extends Menu {
  constructor(tabs: Tabs, e: MouseEvent) {
    super();

    this.addItem(item => {
      item.setTitle(t('menu.addNewTab'));
      item.setIcon('plus');
      item.onClick(() => {
        // Add new tab to the file
        const activeView = tabs.app.workspace.getActiveViewOfType(MarkdownView);
        const activeEditor = activeView?.editor;
        if (activeEditor) {
          activeEditor.setLine(
            tabs.sectionInfo.lineEnd,
            tabs.split +
              tabs.plugin.settings.defaultTabNavItem +
              '\n' +
              tabs.plugin.settings.defaultTabContent +
              '\n' +
              activeEditor.getLine(tabs.sectionInfo.lineEnd)
          );
        }
        if (!tabs.plugin.settings.ignoreNotice) {
          new Notice(t('notice.addNewTabSuccess'));
        }
      });
    });
    this.addItem(item => {
      item.setTitle(t('menu.deleteTab'));
      item.setIcon('trash');
      item.onClick(() => {
        let deleteIndex = -1;
        for (let i = 0; i < tabs.tabsNav.navItems.length; i++) {
          if (tabs.tabsNav.navItems[i].tabitemEl === e.target) {
            deleteIndex = i;
            break;
          }
        }
        if (deleteIndex === -1) {
          if (!tabs.plugin.settings.ignoreNotice) {
            new Notice(t('notice.invalidTab'));
          }
          return;
        }
        const deleteTabTitle = tabs.tabsNav.navItems[deleteIndex].title;
        let newDoc = '';
        for (let i = 0; i < tabs.tabsNav.navItems.length; i++) {
          if (i !== deleteIndex) {
            newDoc +=
              tabs.split +
              tabs.tabsNav.navItems[i].title.trim() +
              '\n' +
              tabs.tabsContents.tabcontents[i].content.trim() +
              '\n';
          }
        }
        newDoc =
          tabs.backquote.repeat(tabs.backquoteCount) +
          'tabs\n' +
          tabs.tabsConfig.rawConfig +
          '\n' +
          newDoc +
          tabs.backquote.repeat(tabs.backquoteCount);

        tabs.activeView?.editor.replaceRange(
          newDoc,
          { line: tabs.sectionInfo.lineStart, ch: 0 } as EditorPosition,
          {
            line: tabs.sectionInfo.lineEnd,
            ch: tabs.activeView?.editor.getLine(tabs.sectionInfo.lineEnd).length,
          } as EditorPosition
        );
        if (!tabs.plugin.settings.ignoreNotice) {
          new Notice(t('notice.deleteTabSuccess', deleteTabTitle));
        }
      });
    });
    this.addItem(item => {
      item.setTitle(t('menu.copyTab'));
      item.setIcon('copy');
      item.onClick(() => {
        let copyIndex = -1;
        let copyContent = '';
        for (let i = 0; i < tabs.tabsNav.navItems.length; i++) {
          if (tabs.tabsNav.navItems[i].tabitemEl == e.target) {
            copyIndex = i;
            copyContent = tabs.split + tabs.tabsNav.navItems[i].title + '\n' + tabs.tabsContents.tabcontents[i].content;
            break;
          }
        }
        if (copyIndex === -1) {
          if (!tabs.plugin.settings.ignoreNotice) {
            new Notice(t('notice.invalidTab'));
          }
          return;
        }
        navigator.clipboard
          .writeText(copyContent)
          .then(() => {
            if (!tabs.plugin.settings.ignoreNotice) {
              new Notice(t('notice.copyTabSuccess'));
            }
          })
          .catch(err => {
            if (!tabs.plugin.settings.ignoreNotice) {
              new Notice(t('notice.copyTabFailed'));
            }
            console.error(err);
          });
      });
    });
    this.addItem(item => {
      item.setTitle(t('menu.pasteTab'));
      item.setIcon('paste');
      item.onClick(() => {
        navigator.clipboard
          .readText()
          .then(text => {
            if (!text || text.trim() === '' || text.trim() == tabs.split) {
              if (!tabs.plugin.settings.ignoreNotice) {
                new Notice(t('notice.noClipboardContent'));
              }
              return;
            }
            let title = tabs.plugin.settings.defaultTabNavItem + '\n';
            let content = text.trim();
            if (text.startsWith(tabs.split)) {
              title = text.substring(tabs.split.length, text.indexOf('\n'));
              content = content.substring(text.indexOf('\n'));
            }
            const activeEditor = tabs.activeView?.editor;
            activeEditor.setLine(
              tabs.sectionInfo.lineEnd,
              tabs.split + title.trim() + '\n' + content.trim() + '\n' + activeEditor.getLine(tabs.sectionInfo.lineEnd)
            );
          })
          .catch(err => {
            if (!tabs.plugin.settings.ignoreNotice) {
              new Notice(t('notice.pasteTabFailed'));
            }
            console.error(err);
          });
      });
    });
  }
}
