import { App, MarkdownPostProcessorContext, MarkdownRenderChild, MarkdownRenderer } from "obsidian";

export class TabContent {
  index: number;
  title: string;
  content: string;
  contentEl: HTMLElement;
  isActiveed: boolean = false;

  constructor(index: number, title: string, content: string, app: App, context: MarkdownPostProcessorContext) {
    this.index = index;
    this.title = title;
    this.content = content;
    this.createTabContentEl(content, app, context);
  }

  createTabContentEl(content: string, app: App, context: MarkdownPostProcessorContext) {
    this.contentEl = document.createElement('div');
    this.contentEl.className = "tabs-content";
    const tabComponent = new MarkdownRenderChild(this.contentEl);
    MarkdownRenderer.render(
      app,
      content,
      this.contentEl,
      context?.sourcePath,
      tabComponent
    );
  }
}