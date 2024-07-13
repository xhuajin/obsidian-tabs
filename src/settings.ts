import { PluginSettingTab, Setting } from "obsidian";

import TabsPlugin from "./main";

export interface TabsSettings {
  split: string;
  defaultTabNavItem: string;
  defaultTabContent: string;
  ignoreNotice: boolean;
}

export const DEFAULT_SETTINGS: TabsSettings = {
  split: "tab: ",
  defaultTabNavItem: "New tab",
  defaultTabContent: "New tab content",
  ignoreNotice: false
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

    new Setting(containerEl)
      .setName("Default tab nav item")
      .setDesc("The default tab nav item")
      .addText(text => text
        .setValue(this.plugin.settings.defaultTabNavItem)
        .setPlaceholder("New tab")
        .onChange((value) => {
          if (value == "") {
            value = "New tab";
          }
          this.plugin.settings.defaultTabNavItem = value;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName("Default tab content")
      .setDesc("The default tab content")
      .addTextArea(text => text
        .setValue(this.plugin.settings.defaultTabContent)
        .setPlaceholder("New tab content")
        .onChange((value) => {
          if (value == "") {
            value = "New tab content";
          }
          this.plugin.settings.defaultTabContent = value;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName("Ignore notice")
      .setDesc("Ignore notice when adding, deleting tabs and so on.")
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.ignoreNotice)
        .onChange((value) => {
          this.plugin.settings.ignoreNotice = value;
          this.plugin.saveSettings();
        })
      );
      
  }
}