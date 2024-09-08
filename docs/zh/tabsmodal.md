# Tabs 组件的构造

一个 Tabs 组件由导航栏 Nav 和正文 Contents 组成。在默认 top 布局时，Nav 导航栏处于顶部，Contents 正文处于 Nav 下方。

![tabs-modal](../assets/tabs-modal.png)

一个 tab 标签页包含标题 title 和正文 content 两部分，多个标签页 tab 构成一个 Tabs 组件。其中，所有标签页 tab 的标题 title 组成了导航栏 Nav，标签页 tab 的正文 content 组成了 Contents。

![tab-modal](../assets/tab-modal.png)

> [!IMPORTANT] 关于 title 和 content 的渲染
> title 和 content 都用 obsidian 提供的 api [`MarkdownRenderer.render()`](<https://docs.obsidian.md/Reference/TypeScript+API/MarkdownRenderer/render#MarkdownRenderer.render()+method>) 渲染，因此渲染后的样式与其他 markdown 内容在阅读模式下的样式一致。
