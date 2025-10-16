import { MarkdownSectionInformation, setIcon } from 'obsidian';

import { TabsNav } from './tabsnav';

export class TabNavButton {
  tabnav: TabsNav;
  buttonEl: HTMLElement;
  actionbuttontype: string;
  sectioninfo: MarkdownSectionInformation;

  constructor(tabnav: TabsNav, actionbuttontype: string, sectioninfo: MarkdownSectionInformation) {
    this.tabnav = tabnav;
    this.sectioninfo = sectioninfo;
    this.buttonEl = this.createTabNavButtonEl(actionbuttontype);
  }

  createTabNavButtonEl(actionbuttontype: string): HTMLElement {
    if (actionbuttontype === 'action-none') {
      return null;
    }
    const actionButtonEl = document.createElement('div');
    actionButtonEl.className = 'tabs-nav-button';

    if (actionbuttontype === 'action-add') {
      setIcon(actionButtonEl, 'plus');
    } else if (actionbuttontype === 'action-edit') {
      setIcon(actionButtonEl, 'lucide-pencil');
    }
    return actionButtonEl;
  }
}
