import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate, keymap } from "@codemirror/view";
import { EditorState, Extension } from "@codemirror/state";
import { baseHighlight, baseTheme } from "./tabeditorstyle";
import { createCodeBlock, getFormattedContent } from "../../util";
import { redo, undo } from "@codemirror/commands";

import { ButtonComponent } from "obsidian";
import { TableMenu } from "./tablemenu";
import TabsPlugin from "../../main";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { minimalSetup } from "codemirror";

// import { Emoji, Strikethrough, Table, TaskList } from "@lezer/markdown";

export class TabEditor {
  plugin: TabsPlugin;
  view: EditorView;
  state: EditorState;
  editToolbarEl: HTMLElement;
  tabseditorEl: HTMLElement;
  historyTools: ButtonComponent[] = [];
  formatTools: ButtonComponent[] = [];
  paragraphTools: ButtonComponent[] = [];
  insertTools: ButtonComponent[] = [];
  saveButton: ButtonComponent;
  lastEditTime: number = 0;
  docChange: boolean = false;
  
  constructor(plugin: TabsPlugin, containerEl: HTMLElement, doc: string = "") {
    this.plugin = plugin;
    // Toolbar
    plugin.settings.showToolbar && this.initToolbar(containerEl);
    // Editor init state
    this.initEditor(containerEl, doc);
    // register events
    plugin.settings.showToolbar && this.registerToolbarEvents();
  }

  private addButton(icon: string, tooltip: string, buttonclass: string): ButtonComponent {
    const button = new ButtonComponent(this.editToolbarEl)
      .setIcon(icon)
      .setTooltip(tooltip)
      .setClass("toolbar-button")
      .setClass(buttonclass);
    return button;
  }

  private addSplitLine() {
    const splitLine = this.editToolbarEl.createEl('span');
    splitLine.addClass('split-line');
  }

  private initToolbar(containerEl: HTMLElement) {
    this.editToolbarEl = containerEl.createEl('div');
    this.editToolbarEl.addClass('toolbar');
    
    this.initHistoryTool();
    this.addSplitLine();
    
    this.initFormatTool();
    this.addSplitLine();
    
    this.initParagraphTool();
    this.addSplitLine();
    
    this.initInsertTool();
    // this.addSplitLine();

    // this.initSaveButton();
  }

  private initEditor(containerEl: HTMLElement, doc: string = "") {
    this.tabseditorEl = containerEl.createEl('div');
    this.tabseditorEl.addClass('tabs-editor');
    const lastTimeExtension = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        this.lastEditTime = Date.now();
        this.docChange = true;
      }
    })
    // Create editor state
    this.state = EditorState.create({
      doc: doc,
      extensions: [
        minimalSetup,
        baseHighlight,
        baseTheme,
        // markdown({
        //   extensions: [Strikethrough, Table, TaskList, Emoji],
        // }),
        markdown(),
        html(),
        keymap.of(this.basicMDKeymap),
        this.activeLineHighlighter,
        lastTimeExtension,
      ],
    });
    // Create editor view by state
    this.view = new EditorView({
      state: this.state,
      parent: this.tabseditorEl,
      extensions: EditorView.lineWrapping,
    });
  }

  private initHistoryTool() {
    // add history buttons: undo, redo
    this.historyTools.push(
      this.addButton("undo", "Undo (Ctrl+Z)", "undo-button"), 
      this.addButton("redo", "Redo (Ctrl+Shift+Z)", "redo-button")
    );
  }

  private initFormatTool() {
    // add format buttons: bold, italic, underline, strike
    this.formatTools = [
      this.addButton("bold", "Bold (Ctrl+B)", "bold-button"),
      this.addButton("italic", "Italic (Ctrl+I)", "italic-button"),
      this.addButton("underline", "Underline (Ctrl+U)", "underline-button"),
      this.addButton("strikethrough", "Strike (Ctrl+Shift+S)", "strike-button"),
    ]
  }

  private initParagraphTool() {
    // unordered list, ordered list, quote
    this.paragraphTools = [
      this.addButton("lucide-list", "Unordered List", "unordered-list-button"),
      this.addButton("lucide-list-ordered", "Ordered List", "ordered-list-button"),
      this.addButton("quote", "Quote", "quote-button"),

    ]
  }

  private initInsertTool() {
    // code, callout, table
    this.insertTools = [
      this.addButton("code", "Code", "code-button"),
      this.addButton("lucide-quote", "Callout", "callout-button"),
      this.addButton("table", "Table", "table-button"),
    ]
  }

  // private initSaveButton() {
  //   this.saveButton = new ButtonComponent(this.editToolbarEl)
  //     .setIcon("save")
  //     .setTooltip("Save (Ctrl+S)")
  //     .setClass("toolbar-button")
  //     .setClass("save-button")
  //     .onClick(() => {
  //       this.plugin.tabsEditorModal.saveEditorData();
  //     });
  // }

  private registerToolbarEvents() {
    // Toolbar events
    this.registerHistoryToolEvents();
    this.registerFormatToolEvents();
    this.registerPragraphToolEvents();
    this.registerInsertToolEvents();
  }

  private registerHistoryToolEvents() {
    // undo, redo buttons
    this.historyTools[0].onClick(() => {
      undo({
        state: this.view.state,
        dispatch: this.view.dispatch,
      })
    })
    this.historyTools[1].onClick(() => {
      redo({
        state: this.view.state,
        dispatch: this.view.dispatch,
      });
    })
  }

  private registerFormatToolEvents() {
    // bold, italic, underline, strike
    this.formatTools[0].onClick(() => {
      const {from, to} = this.view.state.selection.main;
      const fromLine = this.view.state.doc.lineAt(from);
      const toLine = this.view.state.doc.lineAt(to);
      if (fromLine.number === toLine.number) {
        this.view.dispatch({
          changes: {
            from: from,
            to: to,
            insert: getFormattedContent(this.view.state.doc.sliceString(this.view.state.selection.main.from, this.view.state.selection.main.to), "**"),
          }
        });
      } else {
        // 多行文本加粗
        let newText = getFormattedContent(this.view.state.doc.sliceString(this.view.state.selection.main.from, fromLine.to), "**");
        for (let i = fromLine.number; i < toLine.number; i++) {
          const line = this.view.state.doc.line(i);
          newText += "\n" + getFormattedContent(line.text, "**");
        }
        newText += "\n" + getFormattedContent(this.view.state.doc.sliceString(toLine.from, this.view.state.selection.main.to), "**");
        this.view.dispatch({
          changes: {
            from: from,
            to: to,
            insert: newText,
          }
        })
      }
    });
    this.formatTools[1].onClick(() => {
      const {from, to} = this.view.state.selection.main;
      const fromLine = this.view.state.doc.lineAt(from);
      const toLine = this.view.state.doc.lineAt(to);
      if (fromLine.number === toLine.number) {
        this.view.dispatch({
          changes: {
            from: from,
            to: to,
            insert: getFormattedContent(this.view.state.doc.sliceString(this.view.state.selection.main.from, this.view.state.selection.main.to), "*"),
          }
        });
      } else {
        // 多行文本加粗
        let newText = getFormattedContent(this.view.state.doc.sliceString(this.view.state.selection.main.from, fromLine.to), "*");
        for (let i = fromLine.number; i < toLine.number; i++) {
          const line = this.view.state.doc.line(i);
          newText += "\n" + getFormattedContent(line.text, "*");
        }
        newText += "\n" + getFormattedContent(this.view.state.doc.sliceString(toLine.from, this.view.state.selection.main.to), "*");
        this.view.dispatch({
          changes: {
            from: from,
            to: to,
            insert: newText,
          }
        })
      }
    });
    this.formatTools[2].onClick(() => {
      this.view.dispatch({
        changes: {
          from: this.view.state.selection.main.from,
          to: this.view.state.selection.main.to,
          insert: getFormattedContent(this.view.state.doc.sliceString(this.view.state.selection.main.from, this.view.state.selection.main.to), "<u>", "</u>"),
        }
      });
    });
    this.formatTools[3].onClick(() => {
      this.view.dispatch({
        changes: {
          from: this.view.state.selection.main.from,
          to: this.view.state.selection.main.to,
          insert: getFormattedContent(this.view.state.doc.sliceString(this.view.state.selection.main.from, this.view.state.selection.main.to), "~~"),
        }
      });
    });
  }

  private registerPragraphToolEvents() {
    // unordered list, ordered list, quote, code, callout, table
    this.paragraphTools[0].onClick(() => {
      const selection = this.view.state.selection.main;
      const fromLine = this.view.state.doc.lineAt(selection.from);
      const toLine = this.view.state.doc.lineAt(selection.to);
      
      // 遍历选中的行，判断是转换为列表还是取消列表
      let toList = false;
      for (let i = fromLine.number; i <= toLine.number; i++) {
        const line = this.view.state.doc.line(i);
        if (!line.text.trimStart().startsWith("- ")) {
          toList = true;
          break;
        }
      }

      if (toList) {
        for (let i = fromLine.number; i <= toLine.number; i++) {
          const line = this.view.state.doc.line(i);
          if (line.text.trimStart().startsWith("- ")) {
            continue;
          }
          this.view.dispatch({
            changes: {
              from: line.from,
              to: line.to,
              insert: " ".repeat(line.text.length - line.text.trimStart().length) + "- " + line.text.trimStart(),
            }
          })
        }
      } else {
        for (let i = fromLine.number; i <= toLine.number; i++) {
          const line = this.view.state.doc.line(i);
          if (!line.text.trimStart().startsWith("- ")) {
            continue;
          }
          this.view.dispatch({
            changes: {
              from: line.from,
              to: line.to,
              insert: line.text.slice(0, line.text.indexOf("- ")) + line.text.slice(line.text.indexOf("- ") + 2),
            }
          })
        }
      }
    });

    this.paragraphTools[1].onClick(() => {
      const selection = this.view.state.selection.main;
      const fromLine = this.view.state.doc.lineAt(selection.from);
      const toLine = this.view.state.doc.lineAt(selection.to);

      // 遍历选中的行，判断是否存在有序列表
      let toList = false;
      const isList = (line: string) => {
        const split = line.indexOf(". ");
        return split > 0 && !isNaN(parseInt(line.slice(0, split)))
      }

      for (let i = fromLine.number; i <= toLine.number; i++) {
        const line = this.view.state.doc.line(i);
        if (!isList(line.text.trimStart())) {
          toList = true;
          break;
        }
      }
      
      const nextNum = {};

      let indent = fromLine.text.length - fromLine.text.trimStart().length;
      // 如果这行为列表的后继部分，记录之前缩进大于等于当前缩进的列表
      if (fromLine.number > 1) {
        for (let i = fromLine.number - 1; i > 0; i--) {
          if (!isList(this.view.state.doc.line(i).text.trimStart())) {
            break;
          }
          const text = this.view.state.doc.line(i).text;
          const lastIndent = text.length - text.trimStart().length;
          if (lastIndent > indent) {
            nextNum[lastIndent] = 1;
            continue;
          } else if (lastIndent === indent) {
            const lastNum = parseInt(text.slice(0, text.indexOf(". ")));
            if (!nextNum[indent]) {
              nextNum[indent] = lastNum + 1;
            }
          } else {
            indent = lastIndent;
            nextNum[indent] = parseInt(text.slice(0, text.indexOf(". "))) + 1;
          }
        }
      }

      if (toList) {
        for (let i = fromLine.number; i <= toLine.number; i++) {
          const line = this.view.state.doc.line(i);
          let newline = line.text;
          const lineIndent = line.text.length - line.text.trimStart().length;
          if (nextNum[lineIndent] === undefined) {
            nextNum[lineIndent] = 1;
          }
          newline = isList(line.text.trimStart()) ? 
            nextNum[lineIndent].toString() + line.text.slice(line.text.indexOf(". ") + 2) :
            newline = nextNum[lineIndent].toString() + ". " + line.text.trimStart();
          nextNum[lineIndent]++;
          // 把缩进多的行的数字重置为1
          for (let indent in nextNum) {
            if (parseInt(indent) > lineIndent) {
              nextNum[indent] = 1;
            }
          }
          this.view.dispatch({
            changes: {
              from: line.from,
              to: line.to,
              insert: " ".repeat(lineIndent) + newline,
            }
          })
        }
      } else {
        // 取消有序列表
        for (let i = fromLine.number; i <= toLine.number; i++) {
          const line = this.view.state.doc.line(i);
          const indent = line.text.length - line.text.trimStart().length;
          this.view.dispatch({
            changes: {
              from: line.from,
              to: line.to,
              insert: " ".repeat(indent) + line.text.slice(line.text.indexOf(". ") + 2),
            }
          })
        }
      }
    });

    // quote
    this.paragraphTools[2].onClick(() => {
      const selection = this.view.state.selection.main;
      const fromLine = this.view.state.doc.lineAt(selection.from);
      const toLine = this.view.state.doc.lineAt(selection.to);

      let toQuote = false;
      for (let i = fromLine.number; i <= toLine.number; i++) {
        const line = this.view.state.doc.line(i);
        if (!line.text.trimStart().startsWith("> ")) {
          toQuote = true;
          break;
        }
      }

      if (toQuote) {
        for (let i = fromLine.number; i <= toLine.number; i++) {
          const line = this.view.state.doc.line(i);
          this.view.dispatch({
            changes: {
              from: line.from,
              to: line.to,
              insert: "> " + line.text,
            }
          })
        }
      } else {
        for (let i = fromLine.number; i <= toLine.number; i++) {
          const line = this.view.state.doc.line(i);
          this.view.dispatch({
            changes: {
              from: line.from,
              to: line.to,
              insert: line.text.slice(2),
            }
          })
        }
      }
    });
  }

  private registerInsertToolEvents() {
        // code
        this.insertTools[0].onClick(() => {
          const selection = this.view.state.selection.main;
          const newText = createCodeBlock(this.view.state.doc.sliceString(selection.from, selection.to));
          this.view.dispatch({
            changes: {
              from: selection.from,
              to: selection.to,
              insert: newText,
            }
          });
          // 光标移动到代码块
        });
    
        // callout
        this.insertTools[1].onClick(() => {
          const selection = this.view.state.selection.main;
          const fromLine = this.view.state.doc.lineAt(selection.from);
          const toLine = this.view.state.doc.lineAt(selection.to);
          
          for (let i = fromLine.number; i <= toLine.number; i++) {
            const line = this.view.state.doc.line(i);
            this.view.dispatch({
              changes: {
                from: line.from,
                to: line.to,
                insert: "> " + line.text,
              }
            })
          }
          this.view.dispatch({
            changes: {
              from: fromLine.from,
              to: fromLine.from,
              insert: "> [!NOTE] Title\n",
            }
          })
        })
    
        // table
        this.insertTools[2].onClick(() => {
          const tablemenu = new TableMenu(this);
          const x = this.insertTools[2].buttonEl.getBoundingClientRect().left;
          const y = this.insertTools[2].buttonEl.getBoundingClientRect().bottom;
          tablemenu.showAtPosition({x: x, y: y});
        })
  }

  createEmptyTable(row: number, col: number) {
    const table = [];
    table.push(Array(col).fill("   "));
    table.push(Array(col).fill(":-:"));
    
    for (let i = 0; i < row; i++) {
      const row = [];
      for (let j = 0; j < col; j++) {
        row.push("   ");
      }
      table.push(row);
    }
    const tableStr = table.map(row => "| " + row.join(" | ") + " |").join("\n");
    const selection = this.view.state.selection;
    const hasSelection = selection.ranges.some(range => range.empty === false);
    if (!hasSelection) {
      
      this.view.dispatch({
        changes: {
          from: this.view.state.doc.length,
          to: this.view.state.doc.length,
          insert: "\n\n" + tableStr,
        }
      });
      return;
    } else {
      if (this.view.state.doc.lineAt(selection.main.from).from !== selection.main.from) {
        this.view.dispatch({
          changes: {
            from: this.view.state.selection.main.from,
            to: this.view.state.selection.main.to,
            insert: '\n\n' + tableStr,
          }
        });
      } else {
        this.view.dispatch({
          changes: {
            from: this.view.state.selection.main.from,
            to: this.view.state.selection.main.to,
            insert: tableStr,
          }
        });
      }
    }
  }

  // extension: active line highlighter
  activeLineHighlighter: Extension = ViewPlugin.fromClass(class {
    decorations: DecorationSet
  
    constructor(view: EditorView) {
      this.decorations = this.getDeco(view)
    }
  
    update(update: ViewUpdate) {
      if (update.docChanged || update.selectionSet) this.decorations = this.getDeco(update.view)
    }
  
    getDeco(view: EditorView) {
      let lastLineStart = -1, deco = []
      for (let r of view.state.selection.ranges) {
        let line = view.lineBlockAt(r.head)
        if (line.from > lastLineStart) {
          deco.push(Decoration.line({class: "cm-active"}).range(line.from))
          lastLineStart = line.from
        }
      }
      return Decoration.set(deco)
    }
  }, {
    decorations: v => v.decorations
  })

  // keymap: ctrl+b, ctrl+i, ctrl+u, ctrl+l, $, []
  basicMDKeymap = [
    {
      key: "Mod-b",
      run: (editor) => {
        editor.dispatch({
          changes: {
            from: editor.state.selection.main.from,
            to: editor.state.selection.main.to,
            insert: getFormattedContent(editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to), "**"),
          },
        });
        return true;
      }
    },
    {
      key: "*",
      run: (editor) => {
        editor.dispatch({
          changes: {
            from: editor.state.selection.main.from,
            to: editor.state.selection.main.to,
            insert: "*" + editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to) + "*",
          }
        });
        return true;
      }
    },
    {
      key: "Mod-i",
      run: (editor) => {
        editor.dispatch({
          changes: {
            from: editor.state.selection.main.from,
            to: editor.state.selection.main.to,
            insert: getFormattedContent(editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to), "*"),
          }
        });
        return true;
      }
    },
    {
      key: "Mod-u",
      run: (editor) => {
        editor.dispatch({
          changes: {
            from: editor.state.selection.main.from,
            to: editor.state.selection.main.to,
            insert: getFormattedContent(editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to), "<u>", "</u>"),
          }
        });
        return true;
      }
    },
    {
      key: "Ctrl-l",
      run: (editor) => {
        const { from, to } = editor.state.selection.main;
        const line = editor.state.doc.lineAt(from);
        const text = line.text;
        if (text.length < 2) {
          editor.dispatch({
            changes: { from, to, insert: "- " + text }
          })
          return true;
        }
        if (text.startsWith("- [ ] ")) {
          editor.dispatch({
            changes: { from: line.from, to: line.to, insert: "- [x] " + text.slice(6) }
          })
        } else if (text.startsWith("* [ ] ")) {
          editor.dispatch({
            changes: { from: line.from, to: line.to, insert: "* [x]" + text.slice(6) }
          })
        } else if (text.startsWith("- [x] ")) {
          editor.dispatch({
            changes: { from: line.from, to: line.to, insert: "- " + text.slice(6) }
          })
        } else if (text.startsWith("* [x] ")) {
          editor.dispatch({
            changes: { from: line.from, to: line.to, insert: "* " + text.slice(6) }
          })
        } else if (text.startsWith("* ")) {
          editor.dispatch({
            changes: { from: line.from, to: line.to, insert: "* [ ] " + text.slice(2) }
          })
          return true;
        } else if (text.startsWith("- ")) {
          editor.dispatch({
            changes: { from: line.from, to: line.to, insert: "- [ ] " + text.slice(2) }
          })
          return true;
        } else {
          editor.dispatch({
            changes: { from: line.from, to: line.to, insert: "- " + text }
          })
        }
      return true;
      }
    },
    {
      key: "$",
      run: (editor) => {
        editor.dispatch({
          changes: {
            from: editor.state.selection.main.from,
            to: editor.state.selection.main.to,
            insert: "$" + editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to) + "$",
          }
        });
        return true;
      }
    },
    {
      key: "[",
      run: (editor) => {
        editor.dispatch({
          changes: {
            from: editor.state.selection.main.from,
            to: editor.state.selection.main.to,
            insert: "[" + editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to) + "]",
          }
        });
        editor.dispatch({
          selection: {anchor: editor.state.selection.main.anchor + 1, head: editor.state.selection.main.head + 1}
        });
        
        return true;
      }
    },
    {
      key: "{",
      run: (editor) => {
        editor.dispatch({
          changes: {
            from: editor.state.selection.main.from,
            to: editor.state.selection.main.to,
            insert: "{" + editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to) + "}",
          }
        });
        editor.dispatch({
          selection: {anchor: editor.state.selection.main.anchor + 1, head: editor.state.selection.main.head + 1}
        });
        return true;
      }
    },
    {
      key: "Tab",
      run: (editor) => {
        // 遍历选中的所有行，添加缩进
        const selection = editor.state.selection.main;
        const fromLine = editor.state.doc.lineAt(selection.from);
        const toLine = editor.state.doc.lineAt(selection.to);
        let newText = " ".repeat(this.plugin.settings.tabSize) + fromLine.text;
        for (let i = fromLine.number+1; i <= toLine.number; i++) {
          const line = editor.state.doc.line(i);
          newText += "\n" + " ".repeat(this.plugin.settings.tabSize) + line.text;
        }
        editor.dispatch({
          changes: {
            from: fromLine.from,
            to: toLine.to,
            insert: newText,
          }
        });
        if (selection.from === selection.to) {
          editor.dispatch({
            selection: {anchor: selection.from + this.plugin.settings.tabSize, head: selection.to + this.plugin.settings.tabSize}
          });
        }
        return true;
      }
    },
    {
      key: "Shift-Tab",
      run: (editor) => {
        // 遍历选中的所有行，去除缩进
        const selection = editor.state.selection.main;
        const fromLine = editor.state.doc.lineAt(selection.from);
        const toLine = editor.state.doc.lineAt(selection.to);
        let newText = fromLine.text.startsWith(" ".repeat(this.plugin.settings.tabSize)) ? fromLine.text.slice(this.plugin.settings.tabSize) : fromLine.text;
        for (let i = fromLine.number + 1; i <= toLine.number; i++) {
          const line = editor.state.doc.line(i);
          if (!line.text.startsWith(" ")) {
              newText += "\n" + line.text;
          } else if (line.text.length - line.text.trimStart().length >= this.plugin.settings.tabSize) {
            newText += "\n" + line.text.slice(this.plugin.settings.tabSize);
          } else {
            newText += "\n" + line.text.trimStart();
          }
        }
        editor.dispatch({
          changes: {
            from: fromLine.from,
            to: toLine.to,
            insert: newText,
          }
        });
        return true;
      }
    },
    {
      key: "Ctrl-s",
      run: (editor) => {
        this.plugin.tabsEditorModal.saveEditorData();
        return true;
      }
    }
  ];
}

