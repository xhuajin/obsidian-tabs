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
      if (this.isRendered || !this.isActiveed || !this.contentEl.isConnected) {
        this.renderPending = false;
        return;
      }
      this.contentEl.empty();
      const tabComponent = new MarkdownRenderChild(this.contentEl);
      this.context?.addChild(tabComponent);

      MarkdownRenderer.render(
        this.app,
        this.content,
        this.contentEl,
        this.context?.sourcePath ?? '',
        tabComponent
      )
        .then(() => {
          if (!this.contentEl.isConnected) {
            return;
          }
          this.isRendered = true;
          this.triggerResize();
        })
        .finally(() => {
          this.renderPending = false;
        });
    };

    const waitForConnected = (attemptsLeft: number) => {
      if (!this.isActiveed) {
        this.renderPending = false;
        return;
      }
      if (this.contentEl.isConnected) {
        doRender();
      } else if (attemptsLeft <= 0) {
        this.renderPending = false;
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
      }
    });
  }
}
