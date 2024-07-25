import { TabContent } from "./tabs/tabcontent";
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
    this.tabcontents[0].contentEl.classList.add("tabs-content-active");
  }

  createTabContentsEl(): HTMLElement {
    const element = document.createElement('div');
    element.className = "tabs-contents";
    this.tabcontents.forEach(tab => {
      element.appendChild(tab.contentEl);
    });
    return element;
  }

  // refresh tab contents
  refreshActiveTabContent(index: number) {
    this.tabcontents[this.currentTab].isActiveed = false;
    this.tabcontents[this.currentTab].contentEl.classList.remove("tabs-content-active");
    this.tabcontents[index].isActiveed = true;
    this.tabcontents[index].contentEl.classList.add("tabs-content-active");
    this.currentTab = index;
  }
}