import { EditorPosition, MarkdownSectionInformation, MarkdownView } from 'obsidian';

import { TabContent } from './tabcontent';
import { TabNavButton } from './tabnavbutton';
import { TabNavItem } from './tabnavitem';
import { Tabs } from './tabs';

export class TabsNav {
  tabs: Tabs;
  navEl: HTMLElement;
  navWrapperEl: HTMLElement;
  navItems: TabNavItem[];
  tabsButton: TabNavButton;
  sourcePath: string;
  currentTab: number = 0;

  constructor(tabs: Tabs, tabsNav: string[], actionbuttontype: string, sectioninfo: MarkdownSectionInformation) {
    this.tabs = tabs;
    this.navItems = new Array() as TabNavItem[];
    if (tabsNav.length > 0) {
      this.navItems = new Array(tabsNav.length) as TabNavItem[];
      this.tabsButton = new TabNavButton(this, actionbuttontype, sectioninfo);
      this.createTabNavEl(tabsNav);
      this.currentTab = 0;
    }
  }

  createTabNavEl(tabsNav: string[]): void {
    for (let i = 0; i < tabsNav.length; i++) {
      this.navItems[i] = new TabNavItem(this, i, tabsNav[i]);
    }
    this.navItems[0].isActiveed = true;
    this.navItems[0].tabitemEl.classList.add("tabs-nav-item-active");

    this.navEl = document.createElement('div');
    this.navEl.classList.add("tabs-nav");
    this.navWrapperEl = this.navEl.createDiv('tabs-nav-item-wrapper');
    this.navItems.length > 0 && this.navItems.forEach(tab => {
      this.navWrapperEl.appendChild(tab.tabitemEl);
    });
    this.tabsButton.buttonEl && this.navEl.appendChild(this.tabsButton.buttonEl);
  }

  // refresh tab nav
  refreshActiveTabNav(index: number) {
    this.navItems[this.currentTab].isActiveed = false;
    this.navItems[this.currentTab].tabitemEl.classList.remove("tabs-nav-item-active");
    this.navItems[index].isActiveed = true;
    this.navItems[index].tabitemEl.classList.add("tabs-nav-item-active");
    this.currentTab = index;
  }

  registerDragEvents() {
    this.navItems.forEach((tab) => {
      tab.registerdndEvents();
    });
  }
}
