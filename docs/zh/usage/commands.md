# 命令

Tabs 插件提供了两个命令，可以在命令面板(`ctrl-p`)中搜索使用，也可以在设置中添加快捷键

![commands](../../assets/tabs-commands.png)

![hotkeys](../../assets/tabs-hotkeys.png)

## Tabs: Convert selected text to tabs

使用该命令时

- 如果此时没有选中内容，会在光标处新建一个 Tabs 组件
- 如果有选中内容，则会给选中内容嵌套一层 \`\`\`tabs ... \`\`\`，反引号的数量会根据选中内容判断

## Tabs: Refresh all tabs in opened files

使用该命令可以刷新当前打开的所有 markdown 文件，你可以在修改了 Tabs 的设置后使用该命令刷新页面（修改 Tabs 设置后，功能需要重新渲染后才生效）
