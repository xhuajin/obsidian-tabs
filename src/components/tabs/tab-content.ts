import { App, MarkdownPostProcessorContext, MarkdownRenderChild, MarkdownRenderer } from 'obsidian';

export class TabContent {
  index: number;
  title: string;
  content: string;
  contentEl: HTMLElement;
  isActiveed: boolean = false;
  isRendered: boolean = false;
  private renderPending: boolean = false;
  private app: App;
  private context: MarkdownPostProcessorContext;
  private tabComponent: MarkdownRenderChild | null = null;

  constructor(index: number, title: string, content: string, app: App, context: MarkdownPostProcessorContext) {
    this.index = index;
    this.title = title;
    this.content = content;
    this.app = app;
    this.context = context;
    this.contentEl = createDiv();
    this.contentEl.className = 'tabs-content';
  }

  ensureRendered() {
    if (this.isRendered) {
      this.triggerResize();
      return;
    }
    if (this.renderPending) {
      return;
    }
    this.renderPending = true;

    const doRender = () => {
      this.renderPending = false;
      if (this.isRendered || !this.isActiveed) {
        return;
      }
      this.isRendered = true;
      this.tabComponent = new MarkdownRenderChild(this.contentEl);
      this.context?.addChild(this.tabComponent);

      MarkdownRenderer.render(
        this.app,
        this.content,
        this.contentEl,
        this.context?.sourcePath ?? '',
        this.tabComponent
      ).then(() => {
        this.triggerResize();
      });
    };

    const waitForConnected = (attemptsLeft: number) => {
      if (!this.isActiveed) {
        this.renderPending = false;
        return;
      }
      if (this.contentEl.isConnected || attemptsLeft <= 0) {
        doRender();
      } else {
        requestAnimationFrame(() => {
          waitForConnected(attemptsLeft - 1);
        });
      }
    };

    waitForConnected(20);
  }

  triggerResize() {
    requestAnimationFrame(() => {
      if (this.isActiveed && this.contentEl.isConnected) {
        this.app.workspace.trigger('resize');
        activeWindow.dispatchEvent(new Event('resize'));
      }
    });
  }
}
