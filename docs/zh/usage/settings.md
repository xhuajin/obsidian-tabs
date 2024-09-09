# 设置

## 基础设置

### Seperator 分隔符

分隔符用于标识每个 tab，默认为 `tab: `.

::: tip
你可以将其修改为 `## `，这样你就可以直接选中正文后，借助命令 [convert-selected-text-to-tabs](commands.md#tabs-convert-selected-text-to-tabs) 直接将正文转换为 Tabs 组件，无需修改正文。
:::

### Default tab title/content

新建 tab 时，默认的标题 title 和正文 content。

> 使用 [Paste tab](menu.md) 命令时，如果剪切板内容不以分隔符开头，新建的 tab 的 title 为默认 title
> 使用功能键（Action button 设置为 Add new tab）新建 tab 时默认的 title 和 content。

### Action button 功能键

导航栏 Nav 末尾的功能键，可以设\*为

- _none_：隐藏功能键
- _Add new tab_：新建 tab
- _Edit tab_：编辑当前 tab

### Ignore notice

隐藏 Tabs 组件相关的通知，例如删除、粘贴、新建 tab 时右上角的通知

### Autorefresh markdown view

- 当启用时，当你修改了 Tabs 相关的设置，**关闭设置面板时**会自动刷新**所有已打开**的 markdown 页面，目的是为了刷新所有 Tabs 组件
- 当禁用时，当你修改了 Tabs 相关的设置，你需要手动重新让 Tabs 组件渲染。方法有很多，例如光标移入再移出、重新打开当前标签页等

::: tip 通过代码块渲染的组件，它的各项属性在渲染的那一刻已经确定了
举个例子，你有一个已经在默认 top 布局下渲染好了的 Tabs 组件，此时你在设置中将默认布局修改为 left，这个布局并不会在这个已经渲染好了的组件上生效，新的设置只对修改了设置以后渲染的组件生效。

> 这是 obsidian 对于代码块渲染的逻辑，并非 Tabs 插件特地写的逻辑。

:::

### Drag and drop

是否启用[拖拽](dnd.md)功能

## 编辑器设置

### Double click to edit

启用时，可以通过双击 content 快速编辑当前 tab

### Show toolbar

启用时，Tabs 编辑器上方会提供一个工具栏方便编辑

### Tab size

在 Tabs 编辑器中按下 `Tab` 键时缩进的空格数，默认为 4

### Auto save interval

Tabs 编辑器会在你有修改内容时自动保存内容，你可以设置自动保存的间隔，单位为毫秒。默认为 5000，代表当你修改了内容，过了 5s 后编辑器会自动将内容保存至 markdown 文件中。

## 外观设置

在设置的 Appearance 区域提供了一个示例 Tabs 组件，你可以在修改设置的同时通过这个组件的最后一个 tab: Lorem ipsum 查看效果

### Tabs

#### Tabs border

Tabs 组件的边框

- _None_: 隐藏边框
- _Hover_: 鼠标悬浮时出现边框
- _Always_: 始终显示边框

#### Tabs border color

Tabs 组件边框的颜色

#### Hide tabs code block edit block button

一般情况下（不被主题和 css 影响的情况下），鼠标移动到代码块上时，右上角会有一个表示编辑的按钮，点击后可以编辑这个代码块。这个选项用于隐藏这个按钮。

### Tabs nav

#### Nav default position

导航栏 Nav 的默认位置，可选值有 Top, Left, bottom, right，可被[自定义配置](./customization.md)覆盖。

#### Nav line clamp

导航栏中的 title 过多时的排列方式（只对 top 和 bottom 布局有效）

- _One line_：所有 title 置于一行，超出部分按住 shift 后可横向滚动
- _Multiple lines_: 溢出的 title 将换行放置

#### Limit tab title width

限制单个 tab 的标题的宽度

obsidian 的标签页有个最大宽度，如果希望和 obsidian 默认的样式保持一致可以开启这个选项。开启后如果标题过长，则会以 ... 省略

### Tabs contents

#### Contents padding

正文的内边距，即正文到四周的距离（图中红橙框线之间的距离）

![padding](../../assets/padding.png)

取值规则与 css 中 padding 的取值一致，你可以输入 1-4 个值，不同个数的输入值代表设置不同位置的内边距，值与值之间用空格分隔

| 个数 |    作用位置     |       示例        |                      解释                      |
| :--: | :-------------: | :---------------: | :--------------------------------------------: |
|  1   |    `a b c d`    |      `10px`       |            a = b = c = d = 10 像素             |
|  2   |  `a c`, `b d`   |    `10px 5px`     |        a = c = 10 像素，b = d = 5 像素         |
|  3   | `a`, `b d`, `c` |  `5px 10px 20px`  |    a = 5 像素，b = d = 10 像素，c = 20 像素    |
|  4   | `a` `b` `c` `d` | `5px 6px 7px 8px` | a = 5 像素，b = 6 像素，c = 7 像素，d = 8 像素 |

取值单位和 css 一致，例如

- _px_: 像素；
- _em_: 字宽，例如 1em 为一个字的宽度，中文文本首行缩进两格通常会设置 `indent: 2em` 实现；
- _rem_: 相对单位，相对于子元素像素值的倍数

#### Contents max height

Tabs 正文过长时会出现一个滚动条，你可以在这里设置正文的最大长度，默认值为 60vh，代表当长度超过页面高度的 60% 时，高度不再增加，出现滚动条（vh 是 Viewport Height 的缩写）。你也可以使用其他的单位例如像素 px。

如果你希望全部都显示，不在过长时隐藏，可以将其设置为 `none`
