import { EditorState, Extension } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { addIcon, setIcon } from "obsidian";
import { indentWithTab, standardKeymap } from "@codemirror/commands"

import { basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";

export class TabEditor {
  view: EditorView;
  state: EditorState;
  floatingEditor: HTMLElement;
  floatingMenuExtension: Extension;
  
  constructor(tabEditorWrapperEl: HTMLElement) {
    this.floatingMenuExtension = EditorView.updateListener.of((update) => {
      if (update.selectionSet) {
        this.updateFloatingEditor(update.view);
      }
    });
    this.state = EditorState.create({
      doc: "",
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        keymap.of(standardKeymap),
        markdown(),
        this.floatingMenuExtension,
        EditorView.lineWrapping,
      ],
    });
    
    this.view = new EditorView({
      state: this.state,
      parent: tabEditorWrapperEl,
    });
    this.floatingEditor = this.initFloatingEditor(tabEditorWrapperEl, this.view);
  }

  initFloatingEditor(editorWrapper: HTMLElement, editor: EditorView): HTMLElement {
    const floatingEditor = document.createElement("div");
    floatingEditor.className = "toolbar";
    editorWrapper.appendChild(floatingEditor);

    // Add toolbar buttons: bold, italic, underline, strike
    const boldButton = document.createElement("button");
    boldButton.addClass("toolbar-button", "bold-button");
    setIcon(boldButton, "bold");
    boldButton.onclick = () => {
      editor.dispatch({
        changes: {
          from: editor.state.selection.main.from,
          to: editor.state.selection.main.to,
          insert: this.getFormattedContent(editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to), "**"),
        }
      });
    };
    floatingEditor.appendChild(boldButton);

    const italicButton = document.createElement("button");
    italicButton.addClass("toolbar-button", "italic-button");
    setIcon(italicButton, "italic");
    italicButton.onclick = () => {
      editor.dispatch({
        changes: {
          from: editor.state.selection.main.from,
          to: editor.state.selection.main.to,
          insert: this.getFormattedContent(editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to), "*"),
        }
      });
    };
    floatingEditor.appendChild(italicButton);

    const underlineButton = document.createElement("button");
    underlineButton.addClass("toolbar-button", "underline-button");
    setIcon(underlineButton, "underline");
    underlineButton.onclick = () => {
      editor.dispatch({
        changes: {
          from: editor.state.selection.main.from,
          to: editor.state.selection.main.to,
          insert: this.getFormattedContent(editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to), "<u>", "</u>"),
        }
      });
    };
    floatingEditor.appendChild(underlineButton);

    const strikeButton = document.createElement("button");
    strikeButton.addClass("toolbar-button", "strike-button");
    addIcon("strike", '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-strikethrough"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>');
    setIcon(strikeButton, "strike");
    strikeButton.onclick = () => {
      editor.dispatch({
        changes: {
          from: editor.state.selection.main.from,
          to: editor.state.selection.main.to,
          insert: this.getFormattedContent(editor.state.doc.sliceString(editor.state.selection.main.from, editor.state.selection.main.to), "~~"),
        }
      });
    };
    floatingEditor.appendChild(strikeButton);
    return floatingEditor;
  }

  getFormattedContent(rowStr: string, format: string, tail?: string): string {
    tail = tail || format;
    if (rowStr.length <= format.length + tail.length) {
      return format + rowStr + tail;
    }
    if (rowStr.substring(0, format.length) == format && rowStr.substring(rowStr.length - tail.length) == tail) {
      return rowStr.substring(format.length, rowStr.length - tail.length);
    }
    return format + rowStr + tail;
  }

  updateFloatingEditor(view) {
    const selection = view.state.selection.main;
    if (!selection.empty) {
      const p = view.coordsAtPos(0);
      const pos = view.coordsAtPos(selection.from);
      this.floatingEditor.style.display = "block";
      this.floatingEditor.style.left = `${pos.left - p.left + 71}px`;
      this.floatingEditor.style.top = `${pos.top - p.top + 76}px`;
    } else {
      this.floatingEditor.style.display = "none";
    }
  }
}