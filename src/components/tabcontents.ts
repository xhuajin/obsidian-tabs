import { TabContent } from "./tabcontent";
import TabsPlugin from "../main";

export class TabContents {
  plugin: TabsPlugin;
  tabcontents: TabContent[];
  tabcontentsEl: HTMLElement;
  currentTab: number = 0;

  constructor(plugin: TabsPlugin, tabcontents: TabContent[]) {
    this.plugin = plugin;
    this.tabcontents = tabcontents;
    this.tabcontentsEl = this.createTabContentsEl();
    this.tabcontents[0].isActiveed = true;
    this.tabcontents[0].contentEl.classList.add("tab-content-active");
    
  }

  createTabContentsEl(): HTMLElement {
    const element = document.createElement('div');
    element.className = "tab-contents";
    this.tabcontents.forEach(tab => {
      
      element.appendChild(tab.contentEl);
    });
    return element;
  }

  // refresh tab contents
  refreshActiveTabContent(index: number) {
    this.tabcontents[this.currentTab].isActiveed = false;
    this.tabcontents[this.currentTab].contentEl.classList.remove("tab-content-active");
    this.tabcontents[index].isActiveed = true;
    this.tabcontents[index].contentEl.classList.add("tab-content-active");
    this.currentTab = index;
  }
}