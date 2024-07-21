import { PluginSettingTab, Setting } from "obsidian";

import TabsPlugin from "./main";

export interface TabsSettings {
  split: string;
  defaultTabNavItem: string;
  defaultTabContent: string;
  ignoreNotice: boolean;
  actionButtonType: "none" | "add" | "edit";
  doubleClickToEdit: boolean;
  showToolbar: boolean;
  tabSize: number;
  editorAutoSaveInterval: number;
  defaultTitlePosition: "top" | "bottom" | "left" | "right";
  defaultTitleLineClamp: "one" | "multi";
}

export const DEFAULT_SETTINGS: TabsSettings = {
  split: "tab: ",
  defaultTabNavItem: "New tab",
  defaultTabContent: "New tab content",
  ignoreNotice: false,
  actionButtonType: "none",
  doubleClickToEdit: false,
  showToolbar: true,
  tabSize: 4,
  editorAutoSaveInterval: 5000,
  defaultTitleLineClamp: "one",
  defaultTitlePosition: "top",
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
          this.plugin.refreshOpenViews();
        })
      )
      .then(setting => this.addResetButton(setting, 'defaultTabContent'));

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
      )
      .then(setting => this.addResetButton(setting, 'defaultTabNavItem'));

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
        })
      )
      .then(setting => this.addResetButton(setting, 'defaultTabContent'));

    new Setting(containerEl)
      .setName("Ignore notice")
      .setDesc("Ignore notice when adding, deleting tabs and so on.")
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.ignoreNotice)
        .onChange((value) => {
          this.plugin.settings.ignoreNotice = value;
          this.plugin.saveSettings();
          this.plugin.refreshOpenViews();
        })
      );

    new Setting(containerEl)
      .setName("Action button")
      .setDesc("Function of top right button. Select 'None' if you don't need it.")
      .addDropdown(dropdown => dropdown
        .addOptions({
          "none": "None",
          "add": "Add new tab",
          "edit": "Edit tab",
        })
        .setValue(this.plugin.settings.actionButtonType)
        .onChange((value: "none" | "add" | "edit") => {
          this.plugin.settings.actionButtonType = value;
          this.plugin.saveSettings();
          this.plugin.refreshOpenViews();
        })
      );
      
    new Setting(containerEl).setName('Editor').setHeading();

    new Setting(containerEl)
      .setName("Double click to edit")
      .setDesc("Double click tab content to edit")
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.doubleClickToEdit)
        .onChange((value) => {
          this.plugin.settings.doubleClickToEdit = value;
          this.plugin.saveSettings();
          this.plugin.refreshOpenViews();
        })
      );

    new Setting(containerEl)
      .setName("Show toolbar")
      .setDesc("Show toolbar in tabs editor")
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showToolbar)
        .onChange((value) => {
          this.plugin.settings.showToolbar = value;
          this.plugin.saveSettings();
          this.plugin.refreshOpenViews();
        })
      );
    
    new Setting(containerEl)
      .setName("Tab size")
      .setDesc("Tab size in tabs editor")
      .addSlider(slider => {
        slider.setLimits(1, 8, 1);
        slider.setValue(this.plugin.settings.tabSize);
        slider.onChange(value => {
          this.plugin.settings.tabSize = value;
          this.plugin.saveSettings();
          this.plugin.refreshOpenViews();
        });
        slider.setDynamicTooltip();
      })
      .then(setting => this.addResetButton(setting, 'defaultTabContent'));

    new Setting(containerEl)
      .setName("Auto save interval")
      .setDesc("Set the duration of inactivity after which the editor will automatically save your work. (default: 5000ms)")
      .addText(text => text
        .setValue(this.plugin.settings.editorAutoSaveInterval.toString())
        .setPlaceholder(DEFAULT_SETTINGS.editorAutoSaveInterval.toString())
        .onChange((value) => {
          const interval = parseInt(value);
          if (isNaN(interval)) {
            return;
          }
          this.plugin.settings.editorAutoSaveInterval = interval;
          this.plugin.saveSettings();
          this.plugin.refreshOpenViews();
        })
      )
      .then(setting => this.addResetButton(setting, 'defaultTabContent'));

      
    new Setting(containerEl).setName('Appearance').setHeading();
    
    const positonsetting = new Setting(containerEl)
      .setName("Tabs nav item default position")
      .setDesc("Show tabs nav items at the top, bottom, left or right.")
      .setClass("tabs-setting-" + this.plugin.settings.defaultTitlePosition)
      .addDropdown(dropdown => dropdown
        .addOptions({
          "top": "Top",
          "bottom": "Bottom",
          "left": "Left",
          "right": "Right",
        })
        .setValue(this.plugin.settings.defaultTitlePosition)
        .onChange((value: "top" | "bottom" | "left" | "right") => {
          positonsetting.settingEl.classList.remove("tabs-setting-" + this.plugin.settings.defaultTitlePosition);
          positonsetting.settingEl.classList.add("tabs-setting-" + value);
          this.plugin.settings.defaultTitlePosition = value;
          this.plugin.saveSettings();
          this.plugin.refreshOpenViews();
        })
      );

      new Setting(containerEl)
        .setName("Tabs nav item arrangement")
        .setDesc("Show tabs nav items in one line or multiple lines.")
        .setClass("tabs-setting-line-clamp")
        .addDropdown(dropdown => dropdown
          .addOptions({
            "one": "One line",
            "multi": "Multiple lines",
          })
          .setValue(this.plugin.settings.defaultTitleLineClamp === "one" || 
            this.plugin.settings.defaultTitleLineClamp === "multi" ? this.plugin.settings.defaultTitleLineClamp : "one")
          .onChange((value: "one" | "multi") => {
            this.plugin.settings.defaultTitleLineClamp = value;
            this.plugin.saveSettings();
            this.plugin.refreshOpenViews();
          })
        );


    

  }

  addResetButton(settingElement: Setting, settingKey: string, refreshView: boolean = true) {
    settingElement
      .addExtraButton((button) => button
        .setIcon('reset')
        .setTooltip('Reset to default')
        .onClick(() => {
          this.plugin.settings[settingKey] = DEFAULT_SETTINGS[settingKey]
          this.plugin.saveSettings()
          if (refreshView) { this.display() }
        }))
  }
}