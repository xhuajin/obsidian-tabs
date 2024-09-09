# 更新日志

## 一、详细更新

### 1.1 - 编辑器优化、组件嵌套、拖拽功能

#### 1.1.7 (2024-07-31)

- 修复与插件 Virtual Linker l Glossary 和 Supercharged Links 的冲突

#### 1.1.6 (2024-07-31)

- 修复设置目标显示异常 bug
- 修复拖拽 tab 位置异常 bug

#### 1.1.5 (2024-07-31)

- 实现 tab 拖拽功能
- 优化设置修改时自动刷新逻辑，增加关闭自动刷新选项
- 新增 tab title 渲染

#### 1.1.4 (2024-07-25)

- 修复 _Readable line length_ 关闭时的宽度异常 bug
- 修复 tab title 宽度异常 bug

#### 1.1.3 (2024-07-22)

- 新增不同布局的 Tabs，Nav 可以置于左右下侧。
- Tabs 编辑器取消使用 basicSetup extension，根据 markdown 语法写了一套 extension

#### 1.1.1 (2024-07-14)

- 增加编辑后自动更新 tabs 代码块反引号数量的功能

#### 1.1.0 (2024-07-14)

- 实现 Tabs 嵌套功能
- 优化粘贴 tab 解析，可以解析为 title + content
- 增加快速添加 tabs 代码块命令
- 增加 Tabs 设置

### 1.0 - 实现组件基础功能，提供编辑器

#### 1.0.5 (2024-06-28)

- 兼容 minimal 主题：border 隐藏问题

#### 1.0.4 (2024-04-17)

- 图标修改 circle-plus -> plus, strike -> strikethrough.
- 插件中出现所有 ui 的名字替换为 sentence case，如 New Tab -> New tab

#### **1.0.3 (2024-04-12)**

- 用 `createEl` 替换 `innerHTML`
- 避免使用 style 添加样式，尽量使用 css 类控制样式

#### **1.0.2 (2024-04-11)**

Tabs 上线 Github

- 双击编辑，编辑器使用 codemirror6 的 basicSetup extension
- 右键菜单

## 二、节点

<TimelineTwoSide />

<script setup>
import TimelineTwoSide from '../.vitepress/components/TimelineTwoSide.vue'
</script>
