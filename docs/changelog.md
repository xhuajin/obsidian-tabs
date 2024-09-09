# Changelog

## 1.1 - Editor optimization, component nesting, drag and drop function

### 1.1.7 (2024-07-31)

- Fix conflict with plugins Virtual Linker l Glossary and Supercharged Links

### 1.1.6 (2024-07-31)

- Fix setting target display exception bug
- Fix drag tab position exception bug

### 1.1.5 (2024-07-31)

- Implement tab drag and drop function
- Optimize the logic of automatically refreshing when the settings are modified, and add an option to close automatic refresh
- Add tab title rendering

### 1.1.4 (2024-07-25)

- Fix _Readable line length_ width exception bug when closed
- Fix tab title width exception bug

### 1.1.3 (2024-07-22)

- Add different layouts of Tabs, Nav can be placed on the left, right, bottom.
- Tabs editor cancels the use of basicSetup extension, writes a set of extensions according to markdown syntax

### 1.1.1 (2024-07-14)

- Add function to automatically update the number of backticks after editing tabs code block

### 1.1.0 (2024-07-14)

- Implement Tabs nesting function
- Optimize the pasting of tabs, which can be parsed into title + content
- Add quick add tabs code block command
- Add Tabs settings

## 1.0 - Implement basic functions of components, provide editor

### 1.0.5 (2024-06-28)

- Compatible with minimal theme: border hidden problem

### 1.0.4 (2024-04-17)

- Icon modification: circle-plus -> plus, strike -> strikethrough.
- Replace all ui names in the plugin with sentence case, such as New Tab -> New tab

### **1.0.3 (2024-04-12)**

- Replace `innerHTML` with `createEl`
- Avoid using style to add styles, try to use css classes to control styles

### **1.0.2 (2024-04-11)**

Tabs goes online on Github.

- Double-click to edit, the editor uses the basicSetup extension of codemirror6
- Right-click menu
