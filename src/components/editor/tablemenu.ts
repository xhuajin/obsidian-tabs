import { Menu } from 'obsidian';
import { TabEditor } from './tabeditor';

/**
 * From plugin: table enhancer
 * url: https://github.com/Stardusten/ob-table-enhancer/
 */

export class TableMenu extends Menu {
  editor: TabEditor;

  constructor(editor: TabEditor) {
    super();
    this.editor = editor;
    this.addItem(item => item.setDisabled(true)); // 添加一个空 item，防止不显示
  }

  onload() {
    super.onload();
    const menuDom = (this as any).dom as HTMLElement;
    const frag = activeDocument.createDocumentFragment();
    const containerEl = frag.createDiv({ cls: 'table-generator-container' });
    // 行列计数器加上 menu-item，使样式和 menu 更搭
    const counter = frag.createDiv({ cls: ['table-generator-counter', 'menu-item'] });
    // TODO 行列数如何确定 j 列对应的格子 el
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const gridEl = createDiv({ cls: 'table-generator-grid' });
        gridEl.setAttr('i', i);
        gridEl.setAttr('j', j);
        // 点击格子时，创建对应大小的表格
        gridEl.addEventListener('click', async () => {
          // i + 1 行，j + 1 列
          await this.editor.createEmptyTable(i + 1, j + 1);
        });
        // 鼠标进入格子时，更新格子高亮
        this.editor.plugin.registerDomEvent(gridEl, 'mouseenter', async () => {
          containerEl.querySelectorAll('.table-generator-grid').forEach(gridEl => {
            const i2 = parseInt(gridEl.getAttr('i')!);
            const j2 = parseInt(gridEl.getAttr('j')!);
            if (i2 > i || j2 > j) gridEl.removeClass('select');
            else gridEl.addClass('select');
          });
          counter.innerText = `${i + 1} rows ${j + 1} columns`;
        });
        containerEl.append(gridEl);
      }
    }
    menuDom.append(frag);
  }
}
