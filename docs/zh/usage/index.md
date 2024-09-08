# 创建 Tabs 组件

> 你需要了解 [Tabs 的构造](../tabsmodal.md)

Tabs 组件是依靠渲染 tabs 代码块实现的，因此你只需要在 obsidian 的任意 markdown 笔记中写下以下内容即可创建一个空的 Tabs 组件。

````md
```tabs

```
````

此时渲染出的 Tabs 组件没有添加任何内容，为了优化视觉效果，我放了一个空的 tab 作为占位符，也就是你此时能够看到的 New tab 和 New tab content。

> 你也可以在命令面板中使用命令 [`Tabs: Convert selected text to tabs`](./commands.md#tabs-convert-selected-text-to-tabs) 来快速在光标处创建一个 Tabs 组件

## 一、新建 tab

通过 `tab: ` 关键字标识一个 tab。

- `tab: ` 后的内容为 title，将会显示在 nav 中（注意冒号后有个空格，这个关键字可以在[设置](./settings.md)中自定义）
- 从 `tab: ` 这行到下一个 `tab: ` 之前的内容为 content。

试试将下面这段内容复制到你的 md 笔记中

````md {2-3,5-6}
```tabs
tab: 📺 Music
content in tab 1

tab: 🎵 Movie
content in tab 2
```
````

> [!Warning] 不要直接把任务列表写在 content 中
>
> Tabs 插件是通过渲染 tabs 代码块实现的，但是在 Obsidian 中，代码块中的文本会被视为纯文本。因此，如果你直接把 `- [ ] 一个任务` 写在 tabs 代码块中，那么 tasks 插件和 dataview 插件都将无法检索到它们。

除了直接编辑 tabs 代码块，你还可以

- 通过点击导航栏末尾的加号可以快速新建 tab（需要在插件设置中将 Action button 设为 Add new tab）
- 通过右键 nav 出现的菜单快速新建 tab

## 二、嵌套 Tabs

你可以在 Tabs 组件内部继续使用 tabs 代码块创建 Tabs 组件，但是你需要确保外层使用的 \` 或者 \~ 的数量多于内层的数量。

::: details Markdown 嵌套使用代码块

Markdown 有两种嵌套使用代码块的格式：

只用一种反引号时，外层代码块使用反引号的个数必须多于内层代码块使用的反引号个数

`````
````tabs
tab: python
```python
print("Hello Tabs")
```

tab: javascript
```javascript
console.log('Hello Tabs');
````
`````

![tabs-5](../../assets/tabs-5.png)

同时使用两种反引号生成代码块时，只需要同种反引号保持外层多于内层即可

````
~~~tabs
tab: python
```python
print("Hello Tabs")
```

tab: javascript
```javascript
console.log('Hello Tabs');
```
~~~
````

:::

::: code-group

`````md [只用一种反引号]
````tabs
tab: TAB-ONE
An innerTab in TAB-ONE 👇

```tabs
tab: inner tab one
This is an inner tab.

tab: inner tab two
This is an inner tab.
```

tab: TAB-TWO
...
````
`````

`````md [使用两种反引号]
````tabs
tab: TAB-ONE
An innerTab in TAB-ONE 👇

```tabs
tab: inner tab one
This is an inner tab.

tab: inner tab two
This is an inner tab.
```

tab: TAB-TWO
...
````
`````

```

:::

![tabs-6](../../assets/tabs-6.png)

## 三、编辑 tab

- 你可以用方向键将光标移入 tabs 代码块直接编辑 Tabs 组件的源码。
- 如果你在 Tabs 的插件设置中启用了 『Double click to edit』，那么你可以直接双击 content 进入 [Tabs 编辑器](./editor.md)。
- 如果你将 『Action button』 设置为了『Edit tab 』，那么你可以通过点击 Tabs 组件右上角的编辑按钮进入 Tabs 编辑器。

![tabs-editing](../../assets/editing.png)
```
