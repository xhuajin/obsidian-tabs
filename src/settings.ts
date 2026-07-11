import { App, HexString, PluginSettingTab, Setting, setIcon } from 'obsidian';

import TabsPlugin from './main';
import { t } from './lang/helpers';

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
  sampleTabs: SampleTabs | null = null;
  needRefresh: boolean = false;

  constructor(app: App, plugin: TabsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    app.setting.onClose = () => {
      if (this.plugin.settings.autorefreshMarkdownView && this.needRefresh) {
        this.plugin.refreshOpenViews();
        this.needRefresh = false;
      }
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
      .setName(t('settings.separator.name'))
      .setDesc(t('settings.separator.desc'))
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
      .setName(t('settings.defaultTabTitle.name'))
      .setDesc(t('settings.defaultTabTitle.desc'))
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
      .setName(t('settings.defaultTabsContent.name'))
      .setDesc(t('settings.defaultTabsContent.desc'))
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
      .setName(t('settings.actionButton.name'))
      .setDesc(t('settings.actionButton.desc'))
      .addDropdown(dropdown =>
        dropdown
          .addOptions({
            'action-none': t('settings.actionButton.optionNone'),
            'action-add': t('settings.actionButton.optionAdd'),
            'action-edit': t('settings.actionButton.optionEdit'),
          })
          .setValue(this.plugin.settings.actionButtonType)
          .onChange((value: string) => {
            this.plugin.settings.actionButtonType = value as 'action-none' | 'action-add' | 'action-edit';
            this.needRefresh = true;
            this.plugin.saveSettings();
            if (this.sampleTabs) {
              this.sampleTabs.refresh();
            }
          })
      );

    new Setting(containerEl)
      .setName(t('settings.ignoreNotice.name'))
      .setDesc(t('settings.ignoreNotice.desc'))
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.ignoreNotice).onChange(value => {
          this.plugin.settings.ignoreNotice = value;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName(t('settings.autorefreshMarkdownView.name'))
      .setDesc(t('settings.autorefreshMarkdownView.desc'))
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.autorefreshMarkdownView).onChange(value => {
          this.plugin.settings.autorefreshMarkdownView = value;
          this.needRefresh = true;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName(t('settings.dragAndDrop.name'))
      .setDesc(t('settings.dragAndDrop.desc'))
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.dragAndDrop).onChange(value => {
          this.plugin.settings.dragAndDrop = value;
          this.needRefresh = true;
          this.plugin.saveSettings();
        })
      );
  }

  displayEditorSetting(containerEl: HTMLElement): void {
    new Setting(containerEl).setName(t('settings.editor.heading')).setHeading();

    new Setting(containerEl)
      .setName(t('settings.doubleClickToEdit.name'))
      .setDesc(t('settings.doubleClickToEdit.desc'))
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.doubleClickToEdit).onChange(value => {
          this.plugin.settings.doubleClickToEdit = value;
          this.needRefresh = true;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName(t('settings.showToolbar.name'))
      .setDesc(t('settings.showToolbar.desc'))
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.showToolbar).onChange(value => {
          this.plugin.settings.showToolbar = value;
          this.needRefresh = true;
          this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName(t('settings.tabSize.name'))
      .setDesc(t('settings.tabSize.desc'))
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
      .setName(t('settings.autoSaveInterval.name'))
      .setDesc(t('settings.autoSaveInterval.desc'))
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
    new Setting(containerEl).setName(t('settings.appearance.heading')).setHeading();
    this.sampleTabs = new SampleTabs(this.plugin, this, containerEl.createDiv());
  }

  addResetButton(settingElement: Setting, settingKey: keyof TabsSettings, refreshView: boolean = true) {
    settingElement.addExtraButton(button =>
      button
        .setIcon('reset')
        .setTooltip(t('settings.resetToDefault'))
        .onClick(() => {
          (this.plugin.settings[settingKey] as any) = DEFAULT_SETTINGS[settingKey];
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
  currentIndex: number = 0;

  constructor(plugin: TabsPlugin, settingsTab: TabsSettingsTab, containerEl: HTMLElement) {
    this.plugin = plugin;
    this.settingsTab = settingsTab;
    this.containerEl = containerEl;
    // 初始化
    this.tabscontainerEl = this.containerEl.createDiv('tabs-container');
    this.tabsnavEl = this.tabscontainerEl.createDiv();
    this.tabscontentsEl = this.tabscontainerEl.createDiv('tabs-contents');
    // 创建示例 tabs
    this.createTabsContainer();
    this.createSampleTabNav();
    this.createSampleTabContent();
  }

  private createTabsContainer(): void {
    this.containerEl.addClass('sample-tabs-container');
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

  private createSampleTabNav(): void {
    this.tabsnavEl.className = 'tabs-nav';

    const wrapper = this.tabsnavEl.createDiv();
    wrapper.className = 'tabs-nav-item-wrapper';

    const navitems = ['Tabs', 'Tabs nav', 'Tabs contents', 'Lorem ipsum'];
    this.currentIndex = 0;
    navitems.forEach((tab, index) => {
      const tabitem = wrapper.createDiv();
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
      const button = this.tabsnavEl.createDiv();
      button.className = 'tabs-nav-button';
      if (this.plugin.settings.actionButtonType === 'action-add') {
        setIcon(button, 'plus');
      } else if (this.plugin.settings.actionButtonType === 'action-edit') {
        setIcon(button, 'lucide-pencil');
      }
    }
  }

  private createSampleTabContent(): void {
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
      .setName(t('settings.tabsBorder.name'))
      .setDesc(t('settings.tabsBorder.desc'))
      .addDropdown(dropdown =>
        dropdown
          .addOptions({
            'border-none': t('settings.tabsBorder.optionNone'),
            'border-hover': t('settings.tabsBorder.optionHover'),
            'border-always': t('settings.tabsBorder.optionAlways'),
          })
          .setValue(this.plugin.settings.defaultTabsBorder)
          .onChange((value: string) => {
            if (value === this.plugin.settings.defaultTabsBorder) {
              return;
            }
            this.tabscontainerEl.removeClass('tabs-' + this.plugin.settings.defaultTabsBorder);
            this.plugin.settings.defaultTabsBorder = value as 'border-none' | 'border-hover' | 'border-always';
            this.settingsTab.needRefresh = true;
            this.tabscontainerEl.addClass('tabs-' + value);
            this.plugin.saveSettings();
          })
      );

    // 边框的颜色
    new Setting(containerEl)
      .setName(t('settings.tabsBorderColor.name'))
      .setDesc(t('settings.tabsBorderColor.desc'))
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
      .setName(t('settings.hideTabsEditBlockButton.name'))
      .setDesc(t('settings.hideTabsEditBlockButton.desc'))
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
      .setName(t('settings.tabsNavPosition.name'))
      .setDesc(t('settings.tabsNavPosition.desc'))
      .addDropdown(dropdown =>
        dropdown
          .addOptions({
            top: t('settings.tabsNavPosition.optionTop'),
            bottom: t('settings.tabsNavPosition.optionBottom'),
            left: t('settings.tabsNavPosition.optionLeft'),
            right: t('settings.tabsNavPosition.optionRight'),
          })
          .setValue(this.plugin.settings.defaultTitlePosition)
          .onChange((value: string) => {
            this.refreshNavPosition(this.plugin.settings.defaultTitlePosition, value);
            this.plugin.settings.defaultTitlePosition = value as 'top' | 'bottom' | 'left' | 'right';
            this.settingsTab.needRefresh = true;
            this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t('settings.tabsNavLineClamp.name'))
      .setDesc(t('settings.tabsNavLineClamp.desc'))
      .addDropdown(dropdown =>
        dropdown
          .addOptions({
            one: t('settings.tabsNavLineClamp.optionOne'),
            multi: t('settings.tabsNavLineClamp.optionMulti'),
          })
          .setValue(
            this.plugin.settings.defaultTitleLineClamp === 'one' ||
              this.plugin.settings.defaultTitleLineClamp === 'multi'
              ? this.plugin.settings.defaultTitleLineClamp
              : 'one'
          )
          .onChange((value: string) => {
            this.plugin.settings.defaultTitleLineClamp = value as 'one' | 'multi';
            this.settingsTab.needRefresh = true;
            this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t('settings.limitTabTitleWidth.name'))
      .setDesc(t('settings.limitTabTitleWidth.desc'))
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
      .setName(t('settings.tabsContentsPadding.name'))
      .setDesc(t('settings.tabsContentsPadding.desc'))
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
      .setName(t('settings.tabsContentsMaxHeight.name'))
      .setDesc(t('settings.tabsContentsMaxHeight.desc'))
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
      .then(setting => this.settingsTab.addResetButton(setting, 'defaultTabsContentsMaxHeight'));
  }

  refreshNavPosition(originPosition: string, newPositon: string): void {
    if (this.tabscontainerEl) {
      this.tabscontainerEl.classList.remove('tabs-nav-' + originPosition);
      this.tabscontainerEl.classList.add('tabs-nav-' + newPositon);
    }
  }

  refresh(): void {
    this.clear();
    // 初始化
    this.tabscontainerEl = this.containerEl.createDiv('tabs-container');
    this.tabsnavEl = this.tabscontainerEl.createDiv();
    this.tabscontentsEl = this.tabscontainerEl.createDiv('tabs-contents');
    this.createTabsContainer();
    this.createSampleTabNav();
    this.createSampleTabContent();
  }

  clear(): void {
    this.containerEl.empty();
    this.tabscontainerEl.empty();
    this.tabsnavEl.empty();
    this.tabscontentsEl.empty();
  }
}
