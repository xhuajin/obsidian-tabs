<template>
  <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
    <li>
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-start mb-10 md:text-end">
        <time class="font-mono italic">1984</time>
        <div class="text-lg font-black">First Macintosh computer</div>
        The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh
        personal computer. It played a pivotal role in establishing desktop publishing as a general
        office function. The motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were housed
        in a beige case with integrated carrying handle; it came with a keyboard and single-button
        mouse.
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-end mb-10">
        <time class="font-mono italic">1998</time>
        <div class="text-lg font-black">iMac</div>
        iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has
        been the primary part of Apple's consumer desktop offerings since its debut in August 1998,
        and has evolved through seven distinct forms
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-start mb-10 md:text-end">
        <time class="font-mono italic">2001</time>
        <div class="text-lg font-black">iPod</div>
        The iPod is a discontinued series of portable media players and multi-purpose mobile devices
        designed and marketed by Apple Inc. The first version was released on October 23, 2001, about
        8+1⁄2 months after the Macintosh version of iTunes was released. Apple sold an estimated 450
        million iPod products as of 2022. Apple discontinued the iPod product line on May 10, 2022. At
        over 20 years, the iPod brand is the oldest to be discontinued by Apple
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-end mb-10">
        <time class="font-mono italic">2007</time>
        <div class="text-lg font-black">iPhone</div>
        iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile
        operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on
        January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates. As
        of November 1, 2018, more than 2.2 billion iPhones had been sold. As of 2022, the iPhone
        accounts for 15.6% of global smartphone market share
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-start mb-10 md:text-end">
        <time class="font-mono italic">2015</time>
        <div class="text-lg font-black">Apple Watch</div>
        The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness
        tracking, health-oriented capabilities, and wireless telecommunication, and integrates with
        iOS and other Apple products and services
      </div>
    </li>
  </ul>
  <ul>

  </ul>
</template>

<script setup>
const timelineItems = ref([
  { year: '2024-07-31', version: '1.1.7', text: '- 修复与插件 Virtual Linker l Glossary 和 Supercharged Links 的冲突' },
  { year: '2024-07-31', version: '1.1.6', text: `- 修复设置目标显示异常 bug
- 修复拖拽 tab 位置异常 bug` },
  { year: '2024-07-31', version: '1.1.5', text: `- 实现 tab 拖拽功能
- 优化设置修改时自动刷新逻辑，增加关闭自动刷新选项
- 新增 tab title 渲染` },
  { year: '2024-07-25', version: '1.1.4', text: `- 修复 *Readable line length* 关闭时的宽度异常 bug
- 修复 tab title 宽度异常 bug` },
  { year: '2024-07-22', version: '1.1.3', text: `- 新增不同布局的 Tabs，Nav 可以置于左右下侧。
- Tabs 编辑器取消使用 basicSetup extension，根据 markdown 语法写了一套 extension` },
  { year: '2024-07-14', version: '1.1.1', text: `- 增加编辑后自动更新 tabs 代码块反引号数量的功能` },
  { year: '2024-07-14', version: '1.1.0', text: `- 实现 Tabs 嵌套功能
- 优化粘贴 tab 解析，可以解析为 title + content
- 增加快速添加 tabs 代码块命令
- 增加 Tabs 设置` },
]);


</script>

<style>
.timeline-vertical {
  flex-direction: column;
}
.timeline {
  position: relative;
  display: flex;
  text-wrap: wrap;
}

ul.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}

.timeline-middle {
  grid-column-start: 2;
  grid-row-start: 2;
}

.timeline-vertical .timeline-start {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
  align-self: center;
  justify-self: end;
  margin: .25rem .25rem 2.5rem .25rem;
}

.timeline-vertical:where(.timeline-snap-icon) > li {
  --timeline-col-start: minmax(0, 1fr);
  --timeline-row-start: .5rem;
}

:where(.timeline-snap-icon) > li,
.timeline-horizontal:where(.timeline-snap-icon) > li {
  --timeline-col-start: .5rem;
  --timeline-row-start: minmax(0, 1fr);
}

:where(.timeline-vertical > li) {
  --timeline-row-start: minmax(0, 1fr);
  --timeline-row-end: minmax(0, 1fr);
  justify-items: center;
}

:where(.timeline > li) {
  position: relative;
  display: grid;
  flex-shrink: 0;
  align-items: center;
  grid-template-rows: var(--timeline-row-start,minmax(0,1fr)) auto var( --timeline-row-end,minmax(0,1fr) );
  grid-template-columns: var(--timeline-col-start,minmax(0,1fr)) auto var( --timeline-col-end,minmax(0,1fr) );
}

.w-5 {
  width: 1.25rem;
}
.h-5 {
  height: 1.25rem;
}

.timeline.timeline-vertical > li + li {
  margin-top: 0;
}

.timeline.timeline-vertical > li > hr {
  width: .25rem;
  height: 100%;
}

.timeline > li > hr {
  width: 100%;
  margin: 0;
  border-width: 0;
  border-radius: 0;
  background-color: var(--vp-c-default-3);
}
.timeline hr {
  height: .25rem;
}

:where(.timeline.timeline-vertical > li > hr):last-child {
  grid-column-start: 2;
  grid-column-end: auto;
  grid-row-start: 3;
  grid-row-end: none;
}

:where(.timeline > li > hr):last-child {
  grid-column-start: 1;
  grid-column-end: none;
  grid-row-start: 3;
  grid-row-end: auto;
}


:where(.timeline.timeline-vertical > li > hr):first-child {
  grid-column-start: 2;
  grid-row-start: 1;
}

@media (min-width: 768px) {
  .md\:text-end {
    text-align: end;
  }
}

.timeline-vertical .timeline-end {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
  align-self: center;
  justify-self: start;
}

.timeline-end {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
  margin: .25rem;
  margin-bottom: 0.25rem;
  align-self: flex-start;
  justify-self: center;
}

.font-black {
  font-weight: 900;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.italic {
  font-style: italic;
}
.font-mono {
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Vazirmatn,Courier New,monospace;
}

</style>