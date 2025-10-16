import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';

import { EditorView } from 'codemirror';
import { Extension } from '@codemirror/state';
import { tags } from '@lezer/highlight';

// theme
export const baseTheme: Extension = EditorView.baseTheme({
  '&': {
    color: 'var(--text-normal)',
    backgroundColor: 'var(--background-primary)',
    outline: 'none',
    height: '100%',
  },

  '&.cm-focused': {
    outline: 'none',
  },

  '.cm-content': {
    'max-width': '100%',
    'text-wrap': 'wrap',
    outline: 'none',
    'caret-color': 'var(--caret-color)',
  },

  '.cm-content .cm-line': {
    padding: '0 1px',
    'font-family': 'var(--font-text)',
    'line-height': 'var(--line-height-normal)',
    'scroll-padding-block-end': 'var(--status-bar-scroll-padding)',
    'scrollbar-gutter': 'stable',
    'overflow-wrap': 'break-word',
  },

  '.cm-content .cm-header-1': {
    '--font-weight': 'var(--h1-weight)',
    'font-variant': 'var(--h1-variant)',
    'letter-spacing': '-0.015em',
    'line-height': 'var(--h1-line-height)',
    'font-size': 'var(--h1-size)',
    color: 'var(--h1-color)',
    'font-weight': 'var(--font-weight)',
    'font-style': 'var(--h1-style)',
    'font-family': 'var(--h1-font)',
  },

  '.cm-content .cm-header-2': {
    '--font-weight': 'var(--h2-weight)',
    'font-variant': 'var(--h2-variant)',
    'letter-spacing': '-0.015em',
    'line-height': 'var(--h2-line-height)',
    'font-size': 'var(--h2-size)',
    color: 'var(--h2-color)',
    'font-weight': 'var(--font-weight)',
    'font-style': 'var(--h2-style)',
    'font-family': 'var(--h2-font)',
  },

  '.cm-content .cm-header-3': {
    '--font-weight': 'var(--h3-weight)',
    'font-variant': 'var(--h3-variant)',
    'letter-spacing': '-0.015em',
    'line-height': 'var(--h3-line-height)',
    'font-size': 'var(--h3-size)',
    color: 'var(--h3-color)',
    'font-weight': 'var(--font-weight)',
    'font-style': 'var(--h3-style)',
    'font-family': 'var(--h3-font)',
  },

  '.cm-content .cm-header-4': {
    '--font-weight': 'var(--h4-weight)',
    'font-variant': 'var(--h4-variant)',
    'letter-spacing': '-0.015em',
    'line-height': 'var(--h4-line-height)',
    'font-size': 'var(--h4-size)',
    color: 'var(--h4-color)',
    'font-weight': 'var(--font-weight)',
    'font-style': 'var(--h4-style)',
    'font-family': 'var(--h4-font)',
  },

  '.cm-content .cm-header-5': {
    '--font-weight': 'var(--h5-weight)',
    'font-variant': 'var(--h5-variant)',
    'letter-spacing': '-0.015em',
    'line-height': 'var(--h5-line-height)',
    'font-size': 'var(--h5-size)',
    color: 'var(--h5-color)',
    'font-weight': 'var(--font-weight)',
    'font-style': 'var(--h5-style)',
    'font-family': 'var(--h5-font)',
  },

  '.cm-content .cm-header-6': {
    '--font-weight': 'var(--h6-weight)',
    'font-variant': 'var(--h6-variant)',
    'letter-spacing': '-0.015em',
    'line-height': 'var(--h6-line-height)',
    'font-size': 'var(--h6-size)',
    color: 'var(--h6-color)',
    'font-weight': 'var(--font-weight)',
    'font-style': 'var(--h6-style)',
    'font-family': 'var(--h6-font)',
  },

  '.cm-em': {
    'font-style': 'italic',
    color: 'var(--italic-color)',
    'font-weight': 'var(--italic-weight)',
  },
  '.cm-strong': {
    'font-weight': 'bold',
    color: 'var(--bold-color)',
  },
  '.cm-strikethrough': {
    'text-decoration': 'line-through',
    color: 'var(--strikethrough-color)',
  },
  '.cm-quote': {
    'border-left': '2px solid var(--blockquote-border-color)',
    'padding-left': '10px',
  },
});

export const baseHighlightStyle = HighlightStyle.define([
  // headings
  { tag: tags.heading1, class: 'cm-header cm-header-1' },
  { tag: tags.heading2, class: 'cm-header cm-header-2' },
  { tag: tags.heading3, class: 'cm-header cm-header-3' },
  { tag: tags.heading4, class: 'cm-header cm-header-4' },
  { tag: tags.heading5, class: 'cm-header cm-header-5' },
  { tag: tags.heading6, class: 'cm-header cm-header-6' },
  // pairs
  { tag: tags.angleBracket, class: 'cm-html-embed cm-embed-block' },
  { tag: tags.squareBracket, class: 'cm-hmd-barelink cm-link' },
  { tag: tags.paren, class: 'cm-inline-code' },
  // format
  { tag: tags.emphasis, class: 'cm-em' },
  { tag: tags.strong, class: 'cm-strong' },
  // { tag: tags.strikethrough, class: "cm-strikethrough" },
  // { tag: tags.list, class: "cm-formatting cm-formatting-list cm-list" },
  { tag: tags.quote, class: 'cm-formatting cm-formatting-quote cm-quote' },
]);

export const baseHighlight: Extension = syntaxHighlighting(baseHighlightStyle);
