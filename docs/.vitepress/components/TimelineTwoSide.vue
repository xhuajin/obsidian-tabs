<template>
  <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
    <li>
      <div class="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-content">
        <time class="font-mono italic">2024-09-09</time>
        <div class="text-lg font-black">文档上线</div>
        由于功能逐渐增多，单页 readme 会很长，因此将其拆分为文档。
      </div>
      <hr />
    </li>

    <li>
      <div class="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-content">
        <time class="font-mono italic">2024-07-31 v1.1.6</time>
        <div class="text-lg font-black">拖拽功能</div>
        对于 tab 与 tab 之间的修改变得更加方便，不仅可以在同个 Tabs 组件内部拖拽，还可以在不同 Tabs 组件之间拖拽。
      </div>
      <hr />
    </li>

    <li>
      <hr />
      <div class="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-content mb-10">
        <time class="font-mono italic">2024-07-22 v1.1.3</time>
        <div class="text-lg font-black">新增布局</div>
        Tabs 组件不再只有上下布局，新增了左导航栏右正文、左正文右导航栏、上正文下导航栏三种布局方式。这其实主要是通过 css 实现的。
      </div>
      <hr />
    </li>

    <li>
      <hr />
      <div class="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-content">
        <time class="font-mono italic">2024-07-14 v1.1.0</time>
        <div class="text-lg font-black">Tabs 嵌套</div>
        在早期版本中采用 <code>split('tab:')</code> 分隔 tab，而嵌套后内层的与外层的 tabs
        组件用的分隔符相同，会导致分隔的结果有误，通过优化分隔方式实现 Tabs 组件的嵌套功能。
      </div>
      <hr />
    </li>

    <li>
      <hr />
      <div class="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-content">
        <time class="font-mono italic">2024-06-07 v1.0.4</time>
        <div class="text-lg font-black">Tabs 上架官方市场</div>
        其实早在 2024-04-11 就给 obsidian 官方提交了本插件，根据官方要求修改了一些内容，例如不用<code>innerHTML</code>渲染组件改为使用 obsidian 提供的 DOM API、将 UI
        出现的名称全部改为仅首字母大写的格式等。等了好久终于在 2024-06-07 通过了审核，上架了官方市场。
      </div>
      <hr />
    </li>

    <li>
      <hr />
      <div class="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-content">
        <time class="font-mono italic">2024-04-11 v1.0.2</time>
        <div class="text-lg font-black">Tabs 诞生</div>
        基本功能编写完成，组件支持双击编辑，编辑器使用 codemirror6 的 basicSetup extension，右键弹出菜单。
      </div>
    </li>
  </ul>
  <ul>

  </ul>
</template>

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



.timeline-vertical:where(.timeline-snap-icon)>li {
  --timeline-col-start: minmax(0, 1fr);
  --timeline-row-start: .5rem;
}

:where(.timeline-snap-icon)>li,
.timeline-horizontal:where(.timeline-snap-icon)>li {
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
  grid-template-rows: var(--timeline-row-start, minmax(0, 1fr)) auto var(--timeline-row-end, minmax(0, 1fr));
  grid-template-columns: var(--timeline-col-start, minmax(0, 1fr)) auto var(--timeline-col-end, minmax(0, 1fr));
}

.w-5 {
  width: 1.25rem;
}

.h-5 {
  height: 1.25rem;
}

.timeline.timeline-vertical>li+li {
  margin-top: 0;
}

.timeline.timeline-vertical>li>hr {
  width: .25rem;
  height: 100%;
}

.timeline>li>hr {
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
  text-align: end;
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

ul.timeline-vertical>li:nth-child(2n+1) .timeline-content {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
  align-self: center;
  justify-self: end;
  margin: .25rem .25rem 2.5rem .25rem;
  text-align: end;
}

ul.timeline-vertical>li:nth-child(2n) .timeline-content {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
  align-self: center;
  justify-self: start;
}

/* .timeline-vertical .timeline-start {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
  align-self: center;
  justify-self: end;
  margin: .25rem .25rem 2.5rem .25rem;
}

.timeline-vertical .timeline-end {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
  align-self: center;
  justify-self: start;
  margin: .25rem;
  margin-bottom: 0.25rem;
} */

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
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Vazirmatn, Courier New, monospace;
}
</style>