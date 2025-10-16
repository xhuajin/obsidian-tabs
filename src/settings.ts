import { App, HexString, PluginSettingTab, Setting, setIcon } from 'obsidian';

import TabsPlugin from './main';

export interface TabsSettings {
  split: string;
  defaultTabNavItem: string;
  defaultTabContent: string;
  actionButtonType: 'action-none' | 'action-add' | 'action-edit';
  ignoreNotice: boolean;
  autorefreshMarkdownView: boolean;
  dragAndDrop: boolean;

  // default editor settings
  doubleClickToEdit: boolean;
  showToolbar: boolean;
  tabSize: number;
  editorAutoSaveInterval: number;

  // default style settings
  defaultTabsBorder: 'border-none' | 'border-hover' | 'border-always';
  defaultTabsBorderColor: HexString;
  hideTabsEditBlockButton: boolean;

  defaultTitlePosition: 'top' | 'bottom' | 'left' | 'right';
  defaultTitleLineClamp: 'one' | 'multi';
  defaultTitleLimited: boolean;

  defaultTabsContentsPadding: string;
  defaultTabsContentsMaxHeight: string;
}

export const DEFAULT_SETTINGS: TabsSettings = {
  split: 'tab: ',
  defaultTabNavItem: 'New tab',
  defaultTabContent: 'New tab content',
  actionButtonType: 'action-add',
  ignoreNotice: false,
  autorefreshMarkdownView: true,
  dragAndDrop: false,

  // default editor settings
  doubleClickToEdit: false,
  showToolbar: true,
  tabSize: 4,
  editorAutoSaveInterval: 5000,

  // default style settings
  defaultTabsBorder: 'border-hover',
  defaultTabsBorderColor: '#e0e0e0',
  hideTabsEditBlockButton: true,

  defaultTitleLineClamp: 'one',
  defaultTitlePosition: 'top',
  defaultTitleLimited: false,

  defaultTabsContentsPadding: '1em 2em',
  defaultTabsContentsMaxHeight: 'none',
};

export class TabsSettingsTab extends PluginSettingTab {
  plugin: TabsPlugin;
  sampleTabs: SampleTabs;
  needRefresh: boolean = false;

  constructor(app: App, plugin: TabsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    app.setting.onClose = () => {
      this.plugin.settings.autorefreshMarkdownView &&
        this.needRefresh &&
        this.plugin.refreshOpenViews() &&
        (this.needRefresh = false);
      app.setting.closeActiveTab();
    };
  }

  display(): void {
    let { containerEl } = this;
    containerEl.empty();

    this.displayNormalSetting(containerEl);
    this.displayEditorSetting(containerEl);
    this.displayAppearanceSetting(containerEl);
  }

  displayNormalSetting(containerEl: HTMLElement): void {
    new Setting(containerEl)
      .setName('Separator')
      .setDesc('The symbols to split each tab')
      .addText(text =>
        text
          .setValue(this.plugin.settings.split)
          .setPlaceholder('tab:')
          .onChange(value => {
            if (value == '') {
              value = 'tab:';
            }
            this.plugin.settings.split = value;
            this.plugin.saveSettings();
            this.needRefresh = true;
          })
      )
      .then(setting => this.addResetButton(setting, 'defaultTabContent'));

    new Setting(containerEl)
      .setName('Default tab title')
      .setDesc('Default title of new tab')
      .addText(text =>
        text
          .setValue(this.plugin.settings.defaultTabNavItem)
          .setPlaceholder('New tab')
          .onChange(value => {
            if (value == '') {
              value = 'New tab';
            }
            this.plugin.settings.defaultTabNavItem = value;
            this.plugin.saveSettings();
          })
      )
      .then(setting => this.addResetButton(setting, 'defaultTabNavItem'));

    new Setting(containerEl)
      .setName('Default tabs content')
      .setDesc('Default content of new content')
      .addTextArea(text =>
        text
          .setValue(this.plugin.settings.defaultTabContent)
          .setPlaceholder('New tab content')
          .onChange(value => {
            if (value == '') {
              value = 'New tab content';
            }
            this.plugin.settings.defaultTabContent = value;
          })
      )
      .then(setting => this.addResetButton(setting, 'defaultTabContent'));

    new Setting(containerEl)
      .setName('Action button')
      .setDesc("Function of top right button. Select 'None' if you don't need it.")
      .addDropdown(dropdown =>
        dropdown
          .addOptions({
            'action-none': 'None',
            'action-add': 'Add new tab',
            'action-edit': 'Edit tab',
          })
          .setValue(this.plugin.settings.actionButtonType)
          .onChange((value: 'action-none' | 'action-add' | 'action-edit') => {
            this.plugin.settings.actionButtonType = value;
            this.needRefresh = true;
            this.plugin.saveSettings();
            this.sampleTabs.refresh();
          })
      );

    new Setting(containerEl)
      .setName('Ignore notice')
      .setDesc('Ignore notice when adding, deleting tabs and so on.')
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.ignoreNotice).onChange(value => {
          this.plugin.settings.ignoreNotice = value;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Autorefresh markdown view')
      .setDesc(
        'When enabled, after you modify the settings of the tabs, all markdown files that opened will automatically refresh when you close the settings panel. If disabled, the changes will not take effect immediately on the Tabs in opened markdown file, and you will need to re-render them matually.'
      )
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.autorefreshMarkdownView).onChange(value => {
          this.plugin.settings.autorefreshMarkdownView = value;
          this.needRefresh = true;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Drag and drop')
      .setDesc('You can drag and drop tabs to reorder them in the same file.')
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.dragAndDrop).onChange(value => {
          this.plugin.settings.dragAndDrop = value;
          this.needRefresh = true;
          this.plugin.saveSettings();
        })
      );
  }

  displayEditorSetting(containerEl: HTMLElement): void {
    new Setting(containerEl).setName('Editor').setHeading();

    new Setting(containerEl)
      .setName('Double click to edit')
      .setDesc('Double click tab content to edit')
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.doubleClickToEdit).onChange(value => {
          this.plugin.settings.doubleClickToEdit = value;
          this.needRefresh = true;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Show toolbar')
      .setDesc('Show toolbar in tabs editor')
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.showToolbar).onChange(value => {
          this.plugin.settings.showToolbar = value;
          this.needRefresh = true;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Tab size')
      .setDesc('Tab size in tabs editor')
      .addSlider(slider => {
        slider.setLimits(1, 8, 1);
        slider.setValue(this.plugin.settings.tabSize);
        slider.onChange(value => {
          this.plugin.settings.tabSize = value;
          this.needRefresh = true;
          this.plugin.saveSettings();
        });
        slider.setDynamicTooltip();
      })
      .then(setting => this.addResetButton(setting, 'defaultTabContent'));

    new Setting(containerEl)
      .setName('Auto save interval')
      .setDesc(
        'Set the duration of inactivity after which the editor will automatically save your work. (default: 5000ms, 0 means only save on exit)'
      )
      .addText(text =>
        text
          .setValue(this.plugin.settings.editorAutoSaveInterval.toString())
          .setPlaceholder(DEFAULT_SETTINGS.editorAutoSaveInterval.toString())
          .onChange(value => {
            const interval = parseInt(value);
            if (isNaN(interval)) {
              return;
            }
            this.plugin.settings.editorAutoSaveInterval = interval;
            this.needRefresh = true;
            this.plugin.saveSettings();
          })
      )
      .then(setting => this.addResetButton(setting, 'defaultTabContent'));
  }

  displayAppearanceSetting(containerEl: HTMLElement): void {
    new Setting(containerEl).setName('Appearance').setHeading();
    this.sampleTabs = new SampleTabs(this.plugin, this, containerEl.createDiv());
  }

  addResetButton(settingElement: Setting, settingKey: string, refreshView: boolean = true) {
    settingElement.addExtraButton(button =>
      button
        .setIcon('reset')
        .setTooltip('Reset to default')
        .onClick(() => {
          this.plugin.settings[settingKey] = DEFAULT_SETTINGS[settingKey];
          this.needRefresh = true;
          this.plugin.saveSettings();
          if (refreshView) {
            this.display();
          }
        })
    );
  }
}

class SampleTabs {
  plugin: TabsPlugin;
  settingsTab: TabsSettingsTab;
  containerEl: HTMLElement; // sample-tabs-container
  tabscontainerEl: HTMLElement;
  tabsnavEl: HTMLElement;
  tabsnavItems: HTMLElement[] = [];
  tabscontentsEl: HTMLElement;
  tabscontentsItems: HTMLElement[] = [];
  currentIndex: number;

  constructor(plugin: TabsPlugin, settingsTab: TabsSettingsTab, containerEl: HTMLElement) {
    this.plugin = plugin;
    this.settingsTab = settingsTab;
    this.containerEl = containerEl;
    this.createTabsContainer();
    this.createSampleTabNav(this.tabscontainerEl);
    this.createSampleTabContent(this.tabscontainerEl);
  }

  private createTabsContainer(): void {
    this.containerEl.addClass('sample-tabs-container');
    this.tabscontainerEl = this.containerEl.createDiv('tabs-container');

    // tabs
    this.tabscontainerEl.classList.add('tabs-' + this.plugin.settings.defaultTabsBorder);
    this.tabscontainerEl.style.setProperty('--tabs-border-color', this.plugin.settings.defaultTabsBorderColor);
    // this.tabscontainerEl.setAttribute("style", "--tabs-max-height: " + this.plugin.settings.defaultTabsContentsMaxHeight + ";");
    this.tabscontainerEl.style.setProperty('--tabs-max-height', this.plugin.settings.defaultTabsContentsMaxHeight);

    // tabs nav
    this.tabscontainerEl.classList.add('tabs-nav-' + this.plugin.settings.defaultTitlePosition);
    if (this.plugin.settings.defaultTitlePosition === 'top' || this.plugin.settings.defaultTitlePosition === 'bottom') {
      this.tabscontainerEl.classList.add('tabs-nav-line-clamp-' + this.plugin.settings.defaultTitleLineClamp);
    }

    // tabs contents
    this.tabscontainerEl.style.setProperty('--tabs-contents-padding', this.plugin.settings.defaultTabsContentsPadding);

    // tabs code block edit button
    const codeblockEditButton = this.containerEl.createDiv('edit-block-button');
    codeblockEditButton.setAttribute('aria-label', 'Edit this block');
    setIcon(codeblockEditButton, 'lucide-code-2');
  }

  private createSampleTabNav(tabsContainerEl: HTMLElement): void {
    this.tabsnavEl = tabsContainerEl.createEl('div');
    this.tabsnavEl.className = 'tabs-nav';

    const wrapper = this.tabsnavEl.createEl('div');
    wrapper.className = 'tabs-nav-item-wrapper';

    const navitems = ['Tabs', 'Tabs nav', 'Tabs contents', 'Lorem ipsum'];
    this.currentIndex = 0;
    navitems.forEach((tab, index) => {
      const tabitem = wrapper.createEl('div');
      tabitem.classList.add('tabs-nav-item');
      tabitem.textContent = tab;
      if (index === 0) {
        tabitem.classList.add('tabs-nav-item-active');
      }
      tabitem.addEventListener('click', () => {
        wrapper.children[this.currentIndex].classList.remove('tabs-nav-item-active');
        this.tabscontentsItems[this.currentIndex].classList.remove('tabs-content-active');
        this.currentIndex = index;
        wrapper.children[index].classList.add('tabs-nav-item-active');
        this.tabscontentsItems[index].classList.add('tabs-content-active');
      });
    });

    if (this.plugin.settings.actionButtonType !== 'action-none') {
      const button = this.tabsnavEl.createEl('div');
      button.className = 'tabs-nav-button';
      if (this.plugin.settings.actionButtonType === 'action-add') {
        setIcon(button, 'plus');
      } else if (this.plugin.settings.actionButtonType === 'action-edit') {
        setIcon(button, 'lucide-pencil');
      }
    }
  }

  private createSampleTabContent(tabsContainerEl: HTMLElement): void {
    this.tabscontentsEl = tabsContainerEl.createDiv('tabs-contents');

    const TABS_Tabs = this.tabscontentsEl.createDiv('tabs-content');
    this.generateTabsStyleSettings(TABS_Tabs);
    TABS_Tabs.classList.add('tabs-content-active');

    const TABS_TabsNav = this.tabscontentsEl.createDiv('tabs-content');
    this.generateTabsNavStyleSettings(TABS_TabsNav);

    const TABS_TabsContents = this.tabscontentsEl.createDiv('tabs-content');
    this.generateTabsContentStyleSettings(TABS_TabsContents);

    const TABS_LoremIpsum = this.tabscontentsEl.createDiv('tabs-content');
    const loremIpsum = TABS_LoremIpsum.createEl('p');
    loremIpsum.style.userSelect = 'text';
    loremIpsum.textContent =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    this.tabscontentsItems = [TABS_Tabs, TABS_TabsNav, TABS_TabsContents, TABS_LoremIpsum];
  }

  private generateTabsStyleSettings(containerEl: HTMLElement): void {
    // 边框：无边框、悬停显示、始终显示
    new Setting(containerEl)
      .setName('Tabs border')
      .setDesc('Show tabs border when hover or always.')
      .addDropdown(dropdown =>
        dropdown
          .addOptions({
            'border-none': 'None',
            'border-hover': 'Hover',
            'border-always': 'Always',
          })
          .setValue(this.plugin.settings.defaultTabsBorder)
          .onChange((value: 'border-none' | 'border-hover' | 'border-always') => {
            if (value === this.plugin.settings.defaultTabsBorder) {
              return;
            }
            this.tabscontainerEl.removeClass('tabs-' + this.plugin.settings.defaultTabsBorder);
            this.plugin.settings.defaultTabsBorder = value;
            this.settingsTab.needRefresh = true;
            this.tabscontainerEl.addClass('tabs-' + value);
            this.plugin.saveSettings();
          })
      );

    // 边框的颜色
    new Setting(containerEl)
      .setName('Tabs border color')
      .setDesc("Takes effect when 'Tabs border' set 'Hover' or 'Always")
      .addColorPicker(colorPicker =>
        colorPicker.setValue(this.plugin.settings.defaultTabsBorderColor).onChange((value: HexString) => {
          this.tabscontainerEl.style.setProperty('--tabs-border-color', value);
          this.plugin.settings.defaultTabsBorderColor = value;
          this.settingsTab.needRefresh = true;
          this.plugin.saveSettings();
        })
      )
      .then(setting => this.settingsTab.addResetButton(setting, 'defaultTabsBorderColor'));

    // Tabs 代码块右上角的编辑按钮
    new Setting(containerEl)
      .setName('Hide tabs code block edit block button')
      .setDesc(
        "It's just a decorative setting. If you turn on it, you can still control the cursor into tabs to edit the source code."
      )
      .addToggle(toggel =>
        toggel.setValue(this.plugin.settings.hideTabsEditBlockButton).onChange(value => {
          if (value) {
            document.body.addClass('hide-tabs-edit-block-button');
          } else {
            document.body.removeClass('hide-tabs-edit-block-button');
          }
          this.plugin.settings.hideTabsEditBlockButton = value;
          this.plugin.saveSettings();
        })
      );
  }

  private generateTabsNavStyleSettings(containerEl: HTMLElement): void {
    new Setting(containerEl)
      .setName('Tabs nav default posi tion')
      .setDesc('Show tabs nav at the top, bottom, left or right.')
      .addDropdown(dropdown =>
        dropdown
          .addOptions({
            top: 'Top',
            bottom: 'Bottom',
            left: 'Left',
            right: 'Right',
          })
          .setValue(this.plugin.settings.defaultTitlePosition)
          .onChange((value: 'top' | 'bottom' | 'left' | 'right') => {
            this.refreshNavPosition(this.plugin.settings.defaultTitlePosition, value);
            this.plugin.settings.defaultTitlePosition = value;
            this.settingsTab.needRefresh = true;
            this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Tabs nav line clamp')
      .setDesc("Show tabs nav in one line or multiple lines. Only works when the position is 'top' or 'bottom'")
      .addDropdown(dropdown =>
        dropdown
          .addOptions({
            one: 'One line',
            multi: 'Multiple lines',
          })
          .setValue(
            this.plugin.settings.defaultTitleLineClamp === 'one' ||
              this.plugin.settings.defaultTitleLineClamp === 'multi'
              ? this.plugin.settings.defaultTitleLineClamp
              : 'one'
          )
          .onChange((value: 'one' | 'multi') => {
            this.plugin.settings.defaultTitleLineClamp = value;
            this.settingsTab.needRefresh = true;
            this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Limit tab title width')
      .setDesc(
        'If set true, tab title will be limited to the width of the tab. Otherwise, the tab title will be displayed the full width.'
      )
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.defaultTitleLimited).onChange(value => {
          if (value) {
            this.tabsnavEl.addClass('tabs-nav-title-limited');
          } else {
            this.tabsnavEl.removeClass('tabs-nav-title-limited');
          }
          this.plugin.settings.defaultTitleLimited = value;
          this.settingsTab.needRefresh = true;
          this.plugin.saveSettings();
        })
      );
  }

  private generateTabsContentStyleSettings(containerEl: HTMLElement): void {
    // Tabs contents 的 padding
    new Setting(containerEl)
      .setName('Tabs contents padding')
      .setDesc(
        'The padding of tabs contents. You can set one to four values(same as css padding). For example, "0" means no padding. "10px" means 10 pixels on all sides. "10px 20px" means 10 pixels on top and bottom, 20 pixels on left and right.Not only "px" but also "em", "rem" and other units are supported.'
      )
      .addText(text =>
        text
          .setValue(this.plugin.settings.defaultTabsContentsPadding)
          .setPlaceholder('1em 2em')
          .onChange(value => {
            this.tabscontainerEl.style.setProperty('--tabs-contents-padding', value);
            this.plugin.settings.defaultTabsContentsPadding = value;
            this.settingsTab.needRefresh = true;
            this.plugin.saveSettings();
          })
      )
      .then(setting => this.settingsTab.addResetButton(setting, 'defaultTabsContentsPadding'));

    // 是否限制 Tabs contents 的高度，例如 250px, 20em 等（取值为 0 时不限制）
    new Setting(containerEl)
      .setName('Tabs contents max height')
      .setDesc(
        'If a feasible CSS size is set (for example, 250px, 15em, 50vh, etc.), then when the height of the tabs reaches this size, the excess part can be scrolled. Note that the value should not be set too small, otherwise the tabs will not display properly.'
      )
      .addText(text =>
        text
          .setValue(this.plugin.settings.defaultTabsContentsMaxHeight)
          .setPlaceholder('none')
          .onChange(value => {
            if (value !== 'none') {
              this.tabscontainerEl.addClass('tabs-height-limited');
              this.tabscontainerEl.setAttribute('style', '--tabs-max-height: none;');
            } else {
              this.tabscontainerEl.removeClass('tabs-height-limited');
              this.tabscontainerEl.style.removeProperty('--tabs-max-height');
            }
            this.plugin.settings.defaultTabsContentsMaxHeight = value;
            this.settingsTab.needRefresh = true;
            this.plugin.saveSettings();
          })
      )
      .then(setting => this.settingsTab.addResetButton(setting, 'defaultTabsMaxHeight'));
  }

  refreshNavPosition(originPosition: string, newPositon: string): void {
    if (this.tabscontainerEl) {
      this.tabscontainerEl.classList.remove('tabs-nav-' + originPosition);
      this.tabscontainerEl.classList.add('tabs-nav-' + newPositon);
    }
  }

  refresh(): void {
    this.clear();
    this.createTabsContainer();
    this.createSampleTabNav(this.tabscontainerEl);
    this.createSampleTabContent(this.tabscontainerEl);
  }

  clear(): void {
    this.containerEl.empty();
  }
}
