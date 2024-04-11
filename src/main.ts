import { DEFAULT_SETTINGS, TabsSettings, TabsSettingsTab } from "./settings";

import { Plugin } from "obsidian";
import { Tabs } from "./components/tabs";

export default class TabsPlugin extends Plugin {
  settings: TabsSettings;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new TabsSettingsTab(this.app, this));
    this.registerMarkdownCodeBlockProcessor("tabs", (source, el, ctx) => {
      new Tabs(source, el, ctx, this.app, this, this.settings);
    });
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
