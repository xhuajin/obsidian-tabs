# Tabs's structure

A Tabs component consists of a navigation bar Nav and a content area Contents. When the default top layout is used, the navigation bar Nav is at the top, and the content area Contents is below the Nav.

![tabs-modal](./assets/tabs-modal.png)

A tab page contains a title and a content area. Multiple tab pages form a Tabs component. The titles of all tab pages form the navigation bar Nav, and the content of the tab pages form the Contents.

![tab-modal](./assets/tab-modal.png)

> [!IMPORTANT] About the rendering of title and content
> Both title and content are rendered using obsidian's api [`MarkdownRenderer.render()`](<https://docs.obsidian.md/Reference/TypeScript+API/MarkdownRenderer/render#MarkdownRenderer.render()+method>), so the rendered styles are consistent with the styles of other markdown content in the reading mode.
