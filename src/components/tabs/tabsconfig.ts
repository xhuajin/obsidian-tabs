import { TabsSettings } from "../../settings";

export class TabsConfig {
  rawConfig: string;
  tabsborder: "border-none" | "border-hover" | "border-always";
  tabsBorderColor: string;
  hideTabsEditBlockButton: boolean;
  titlePosition: "top" | "bottom" | "left" | "right";
  titleLineClamp: "one" | "multi";
  actionButton: "action-add" | "action-edit" | "action-none";
  titleLimited: boolean;
  tabsMaxHeight: string;
  tabsContentsPadding: string;
  
  constructor(config: string, tabsEl: HTMLElement, settings: TabsSettings) {
    this.rawConfig = config.trim();

    // tabs
    this.tabsborder = settings.defaultTabsBorder;
    this.tabsBorderColor = settings.defaultTabsBorderColor;
    this.hideTabsEditBlockButton = settings.hideTabsEditBlockButton;
    
    // tabs nav
    this.titlePosition = settings.defaultTitlePosition;
    this.titleLineClamp = settings.defaultTitleLineClamp;
    this.actionButton = settings.actionButtonType;
    this.titleLimited = settings.defaultTitleLimited;
    
    this.tabsMaxHeight = settings.defaultTabsContentsMaxHeight;
    this.tabsContentsPadding = settings.defaultTabsContentsPadding;

    this.parseConfig(config);
  }
  
  private parseConfig(configs: string) {
    configs.trim().toLowerCase().split("\n").forEach((line) => {
      line.split(",").forEach((config) => {
        switch(config.trim()) {
          case "top":
            this.titlePosition = "top";
            break;
          case "bottom":
            this.titlePosition = "bottom";
            break;
          case "left":
            this.titlePosition = "left";
            break;
          case "right":
            this.titlePosition = "right";
            break;
          case "action-add":
            this.actionButton = "action-add";
            break;
          case "action-edit":
            this.actionButton = "action-edit";
            break;
          case "action-none":
            this.actionButton = "action-none";
            break;
          case "one":
            this.titleLineClamp = "one";
            break;
          case "multi":
            this.titleLineClamp = "multi";
            break;
          default:
            break;
        }
      });
    });
  }

  decorate(tabsEl: HTMLElement, tabsNavEl: HTMLElement, tabsContentsEl: HTMLElement) {
    tabsEl.classList.add("tabs-" + this.tabsborder);
    tabsEl.style.setProperty("--tabs-border-color", this.tabsBorderColor);
    tabsEl.style.setProperty("--tabs-max-height", this.tabsMaxHeight);

    if (this.hideTabsEditBlockButton) {
      document.body.classList.add("hide-tabs-edit-block-button");
    }

    tabsEl.classList.add("tabs-nav-" + (this.titlePosition || "top"))
    tabsEl.classList.add("tabs-nav-" + (this.titleLineClamp || "one"))
    
    if (this.titleLimited) {
      tabsNavEl.classList.add("tabs-nav-title-limited");
    }

    tabsContentsEl.style.setProperty("--tabs-contents-padding", this.tabsContentsPadding);
    
  }
}
