import { TabNav } from "./tabnav";

export class TabNavItem {
  index: number;
  title: string;
  tabitemEl: HTMLElement;
  isActiveed: boolean = false;
  tabnav: TabNav;
  
  constructor(tabnav: TabNav, index: number, title: string) {
    this.index = index;
    this.title = title.trim();
    this.tabnav = tabnav;
    this.tabitemEl = this.createTabNavItemEl();
  }
  
  createTabNavItemEl(): HTMLElement {
    const element = document.createElement('div');
    element.className = "tab-nav-item";
    element.innerHTML = this.title;
    return element;
  }
}