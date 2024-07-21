import { MarkdownSectionInformation, setIcon } from "obsidian";

import { TabNav } from "./tabnav";

export class TabNavButton {
  tabnav: TabNav;
  buttonEl: HTMLElement;
  actionbuttontype: string;
  sectioninfo: MarkdownSectionInformation;
  
  constructor(tabnav: TabNav, actionbuttontype: string, sectioninfo: MarkdownSectionInformation) {
    this.tabnav = tabnav;
    this.sectioninfo = sectioninfo;
    this.buttonEl = this.createTabNavButtonEl(actionbuttontype);
  }
  
  createTabNavButtonEl(actionbuttontype: string): HTMLElement {
    if (actionbuttontype === "none") {
      return null;
    }
    const actionButtonEl = document.createElement('div');
    actionButtonEl.className = "tab-nav-button";

    if (actionbuttontype === "add" ) {
      setIcon(actionButtonEl, "plus");
    } else { // if (actionbuttontype === "edit" ) {
      setIcon(actionButtonEl, "lucide-pencil");
    }
    return actionButtonEl;
  }
}
