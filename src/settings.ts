import { PluginSettingTab, Setting } from "obsidian";

import TabsPlugin from "./main";

export interface TabsSettings {
  split: string;
}

export const DEFAULT_SETTINGS: TabsSettings = {
  split: "tab:",
}

export class TabsSettingsTab extends PluginSettingTab {
  plugin: TabsPlugin;
  
  constructor(app: any, plugin: TabsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  
  display(): void {
    let {containerEl} = this;
    containerEl.empty();
    
    new Setting(containerEl)
      .setName("Separator")
      .setDesc("The symbols to split each tab")
      .addText(text => text
        .setValue(this.plugin.settings.split)
        .setPlaceholder("tab:")
        .onChange((value) => {
          if (value == "") {
            value = "tab:";
          }
          this.plugin.settings.split = value;
          this.plugin.saveSettings();
        })
      );
  }
}