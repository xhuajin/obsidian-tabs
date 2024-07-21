import { MarkdownSectionInformation } from 'obsidian';
import { TabNavButton } from './tabnavbutton';
import { TabNavItem } from './tabnavitem';

export class TabNav {
  tabnavitems: TabNavItem[];
  tabbutton: TabNavButton;
  tabnavEl: HTMLElement;
  currentTab: number = 0;
  
  constructor(tabsNav: string[], actionbuttontype: string, sectioninfo: MarkdownSectionInformation) {
    this.tabnavitems = new Array() as TabNavItem[];
    
    if (tabsNav.length > 0) {
      this.tabnavitems = new Array(tabsNav.length) as TabNavItem[];
      this.tabbutton = new TabNavButton(this, actionbuttontype, sectioninfo);
      
      for (let i = 0; i < tabsNav.length; i++) {
        this.tabnavitems[i] = new TabNavItem(this, i, tabsNav[i]);
      }
      this.tabnavitems[0].isActiveed = true;
      this.tabnavitems[0].tabitemEl.classList.add("tab-nav-item-active");
      this.tabnavEl = this.createTabNavEl();
      this.currentTab = 0;
    }
  }

  createTabNavEl(): HTMLElement {
    const element = document.createElement('div');
    element.className = "tab-nav";
    const wrapper = document.createElement('div');
    wrapper.className = "tab-nav-item-wrapper";
    element.appendChild(wrapper);
    this.tabnavitems.length > 0 && this.tabnavitems.forEach(tab => {
      wrapper.appendChild(tab.tabitemEl);
    });
    this.tabbutton.buttonEl && element.appendChild(this.tabbutton.buttonEl);
    return element;
  }

  append(tab: TabNavItem) {
    this.tabnavitems.push(tab);
    this.tabnavEl.appendChild(tab.tabitemEl);
  }

  // refresh tab nav
  refreshActiveTabNav(index: number) {
    this.tabnavitems[this.currentTab].isActiveed = false;
    this.tabnavitems[this.currentTab].tabitemEl.classList.remove("tab-nav-item-active");
    this.tabnavitems[index].isActiveed = true;
    this.tabnavitems[index].tabitemEl.classList.add("tab-nav-item-active");
    this.currentTab = index;
  }
}
