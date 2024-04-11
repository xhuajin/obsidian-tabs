import { MarkdownSectionInformation, addIcon, setIcon } from "obsidian";

import { TabNav } from "./tabnav";

export class TabNavButton {
  tabnav: TabNav;
  buttonEl: HTMLElement;
  type: string = "add-new-tab";
  split: string;
  sectioninfo: MarkdownSectionInformation;
  
  constructor(tabnav: TabNav, type: string, split: string, sectioninfo: MarkdownSectionInformation) {
    this.tabnav = tabnav;
    this.type = type;
    this.split = split;
    this.sectioninfo = sectioninfo;
    this.buttonEl = this.createTabNavButtonEl();
  }
  
  createTabNavButtonEl(): HTMLElement {
    const addButton = document.createElement('div');
    addButton.className = "tab-nav-button";
    const circleplus = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>`;
    addIcon("circle-plus", circleplus);
    setIcon(addButton, "circle-plus");
    return addButton;
  }
}
