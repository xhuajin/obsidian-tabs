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
    this.registerCommands();
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async registerCommands() {
    // Convert selected text to tabs
    this.addCommand({
      id: "convert-to-tabs",
      name: "Convert selected text to tabs",
      editorCallback: (editor: any, view: any) => {
        const selectedText = editor.getSelection();
        if (selectedText.trim() === "") {
          editor.replaceSelection("```tabs\n" + this.settings.split + this.settings.defaultTabNavItem + "\n" + this.settings.defaultTabContent + "\n```");
        } else if (selectedText.includes("```")) {
          // if selected text contains code block, add one more backtick
          let maxCount = 0;
          for (let i = 0, count = 0; i < selectedText.length; i++) {
            if (selectedText[i] === "`") {
              count++;
              maxCount = Math.max(maxCount, count);
            } else {
              count = 0;
            }
          }
          if (selectedText.startsWith(this.settings.split)) {
            editor.replaceSelection("`".repeat(maxCount + 1) + "tabs\n" + 
              selectedText + "\n" + 
              "`".repeat(maxCount + 1));
          } else {
            editor.replaceSelection("`".repeat(maxCount + 1) + "tabs\n" + 
              this.settings.split + this.settings.defaultTabNavItem + "\n" + 
              selectedText + "\n" + 
              "`".repeat(maxCount + 1));
          }
        } else {
          if (selectedText.startsWith(this.settings.split)) {
            editor.replaceSelection("```" + "tabs\n" + 
              selectedText + "\n" + 
              "```");
          } else {
            editor.replaceSelection("```tabs\n" + 
              this.settings.split + this.settings.defaultTabNavItem + "\n" + 
              selectedText + "\n" + 
              "```");
          }
        }
      }
    })
  }
}
