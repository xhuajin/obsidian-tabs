# Tabs Editor

For convenient editing, a simple CodeMirror 6 editor has been implemented. You can quickly edit the current tab content by double-clicking on the content to enter the Tabs editor.

![editor](../assets/editing.png)

## Features

The editor currently implements some simple features

- Keyboard shortcuts
  - Bold: `ctrl-b`
  - Undo and redo: `ctrl-z` `ctrl-y`
  - 转换为无序列表和任务：`ctrl-l`
  - Save: `ctrl-s`
  - Indent and cancel: `tab` `shift tab`
- Matching
  - After selecting text, enter the following values to match the start and end: `*` `=` `$` `[` `{`
- Toolbar
  - Provides a series of tools, such as converting text to code blocks and quickly creating tables.
  - When the Show toolbar item is enabled
- Auto-save
  - Every certain time will automatically save the edited content (if there is any modified content)
  - Auto-save when closed

Due to the use of the codemirror 6 editor, it is inevitable that there may be conflicts with other plugins, such as when using Codeblock Customizer, the background color of the selected content disappears.

## About the editor

obsidian uses [Codemirror 6](https://help.obsidian.md/Obsidian/Credits#CodeMirror) as the underlying text editor. In order to facilitate plugin development, obsidian provides an Editor object that can simultaneously support Codemirror 5 (old version) and Codemirror 6 (new version). This cm5+cm6 editor is the real-time rendering and reading mode. Unfortunately, the obsidian editor is not open source, and the developer provides a specific Editor instance, for example, we can get the Editor instance of the current markdown page like this

```typescript
const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
if (activeView) {
  const editor = activeView.editor;
}
```

However, this is a specific instance, we want to create a new obsidian editor and directly place it in the contents of Tabs to achieve the best effect. In order to obtain this editor, I have made two attempts

- A MarkdownView/WorkspaceLeaf generation must generate such an editor instance, you can try to use Monkey Patch related techniques to generate another editor. However, this editor is bound to the path, not an empty editor.
- Get the extensions of the Edtor when the current MarkdownView is generated, and then create a new Codemirror editor and add the obtained extensions to it. Although the extensions can be successfully obtained, they are all garbled and do not know what each one corresponds to. Adding the extensions to the newly created cm editor will not report an error, but it will also have no other effects.
