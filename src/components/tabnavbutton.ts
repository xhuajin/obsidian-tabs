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
    addButton.className = "tab-nav-button tab-nav-button-add";
    setIcon(addButton, "plus");
    return addButton;
  }
}
