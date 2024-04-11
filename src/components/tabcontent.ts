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
    this.contentEl = this.createTabContentEl(content, app, context);
  }

  createTabContentEl(content: string, app: App, context: MarkdownPostProcessorContext): HTMLElement {
    const element = document.createElement('div');
    element.className = "tab-content";
    const tabComponent = new MarkdownRenderChild(this.contentEl);
    MarkdownRenderer.render(
      app,
      content,
      element,
      context.sourcePath,
      tabComponent
    );
    return element;
  }
}