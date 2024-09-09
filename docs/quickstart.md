# Quick Start

Since the readme is too long, I decided to write it as a document. If you just want to try it out or need a simple function, you can refer to this quick start tutorial. This tutorial will not cover all the features, only the content needed for simple use.

> See [Installation](./installation.md) for installation, this is not covered.

## Create a Tabs component

In obsidian, the Tabs component is rendered by the tabs code block. After installing and enabling the plugin, you can quickly create a Tabs component by the following methods:

**Method 1**：Use the shortcut key `ctrl p` to open the command panel, input `Tabs`, select the command `Tabs: Convert selected text to tabs`，then a Tabs component will be created;

**Method 2**：Copy the following content to your note

````md
```tabs
tab: Title 1
Content 1

tab: Title 2
Content 2
```
````

Both methods are essentially the same, each `tab: ` after the content is a tab title, and the content before the next `tab: ` (or to the end) is the content of this tab. You can modify the content of the existing tab, add or delete tabs.

## Edit Tabs component

**Method 1**：Directly modify the source code;

**Method 2**：Enable `Double click to edit` in the Tabs settings panel, then you can open the [editor](./usage/editor.md) by double clicking the content of the tab.

## Adjust layout

The default Tabs component has the nav at the top and the content at the bottom. You can modify the layout by adding custom configurations, for example

````md {2}
```tabs
left

tab: Title 1
Content 1
tab: Title 2
Content 2
```
````

更多配置请见[自定义](./usage/customization.md)

## Shortcut menu

Right-click the nav bar will pop up a shortcut menu, where you can quickly create, delete, copy and paste tabs.
