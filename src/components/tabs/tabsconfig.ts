import { TabsSettings } from "../../settings";

export class TabsConfig {
  rawConfig: string;
  titlePosition: "top" | "bottom" | "left" | "right";
  titleLineClamp: "one" | "multi";
  actionButton: "add" | "edit" | "none";
  
  
  constructor(config: string, element: HTMLElement, settings: TabsSettings) {
    this.rawConfig = config.trim();
    this.titlePosition = settings.defaultTitlePosition;
    this.titleLineClamp = settings.defaultTitleLineClamp;
    this.actionButton = settings.actionButtonType;
    this.parseConfig(config);
    this.addClassByConfig(element);
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
          case "add":
            this.actionButton = "add";
            break;
          case "edit":
            this.actionButton = "edit";
            break;
          case "none":
            this.actionButton = "none";
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

  private addClassByConfig(el: HTMLElement) {
    switch (this.titlePosition) {
      case "top":
        el.classList.add("tab-nav-top");
        break;
      case "bottom":
        el.classList.add("tab-nav-bottom");
        break;
      case "left":
        el.classList.add("tab-nav-left");
        break;
      case "right":
        el.classList.add("tab-nav-right");
        break;
      default:
        el.classList.add("tab-nav-top");
    };
    switch (this.titleLineClamp) {
      case "one":
        el.classList.add("tab-nav-line-clamp-one");
        break;
      case "multi":
        el.classList.add("tab-nav-line-clamp-multi");
        break;
      default:
        el.classList.add("tab-nav-line-clamp-one");
    };
  }
}
