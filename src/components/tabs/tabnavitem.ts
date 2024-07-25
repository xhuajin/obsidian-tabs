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
    this.tabitemEl = createEl("div", { text: this.title });
    this.tabitemEl.className = "tabs-nav-item";
  }
}