# 自定义

在设置中可以为所有 Tabs 组件设置默认配置，也可以在特定某个 Tab 上为其添加特定的配置

## Tabs 组件的全局配置

你可以在 Tabs 的设置中为组件添加一些全局配置，包括

- 使用的分隔符 Seperator，默认为 `tab: `
- Tabs 组件右上角的功能按钮 Action button 的功能
- Tabs 组件边框样式
- Tabs nav 的默认位置、过多的 title 是否换行
- Tabs content 的内边距，即内容与四周的距离

更详细解释见 [设置](./settings.md)

## Tabs 组件的特定配置

每个 tabs 代码块的第一个分隔符之前的部分为配置区，你可以在这里添加一些对当前 Tabs 组件的配置。

> [!important]
> 
> 1. 这里的配置优先级高于设置中的配置
> 2. 多个配置之间用英文逗号分隔
> 3. 配置不区分大小写，`Left`, `LEFT`, `left` 的效果一致

|      配置     |       解释        |
| :-----------: | :--------------: |
|      top      | Tabs nav 位于顶部 |
|     left      | Tabs nav 位于左侧 |
|     right     | Tabs nav 位于右侧 |
|    bottom     | Tabs nav 位于底部 |
|      one      | Tabs nav 中的 title 过多时不换行 |
|     multi     | Tabs nav 中的 title 过多时换行   |

假如你希望当前这个 Tabs 组件的导航栏处于顶部，并且当 nav 中的 title 过多时换行，你可以加上 `top` 和 `multi` 配置

````md {2}
```tabs
top, multi

tab: TAB 1
Tab content

tab: TAB 2
Tab content
```
````

你也可以将导航栏设置为 left

![tab-left](../../assets/tabs-nav-left.png)

> 更多配置还在路上

## 自定义标签页标题 title

每个 tab 的 title 也使用了 [`MarkdownRenderer.render()`](https://docs.obsidian.md/Reference/TypeScript+API/MarkdownRenderer/render#MarkdownRenderer.render()+method) 渲染，许多内容都可以被渲染，例如你可以

- 使用 markdown 语法为其添加加粗、斜体、高亮等样式，例如 `tab: **加粗的title**`。
- 使用 html 语法为其添加颜色，例如 `tab: <div style="color: red">红色的title</div>` 
- icon 相关的插件使用的短语也可以正常转换（例如 Icon Shortcodes `tab: Mouse :mouse:`）

![tabs-decorate-title](../../assets/tabs-decorate-title.png)
