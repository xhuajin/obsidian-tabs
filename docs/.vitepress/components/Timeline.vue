<template>
  <ul class="timeline timeline-vertical">
    <li v-for="(item, index) in timelineItems" :key="item.year">
      <hr v-if="index !== 0">
      <div class="timeline-start">{{ item.year }}</div>
      <div class="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#2A6496" class="w-5 h-5">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="timeline-end timeline-box">{{ item.text }}</div>
      <hr v-if="index !== (timelineItems.length - 1)">
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      timelineItems: [
        { year: '2024-08-10', text: '下载量6k' },
        { year: '2024-07-31', text: '下载量5k' },
        { year: '2024-07-31', text: '文档上线' },
        { year: '2024-07-31', text: '拖拽功能' },
        { year: '2024-07-27', text: '下载量4k' },
        { year: '2024-07-20', text: '下载量3k' },
        { year: '2024-07-15', text: '下载量2k' },
        { year: '2024-07-14', text: 'Tabs嵌套' },
        { year: '2024-07-03', text: '下载量1k' },
        { year: '2024-06-07', text: '上线官方市场' },
        { year: '2024-04-11', text: 'Obsidian-tabs 诞生' },
      ],
    };
  },
};
</script>

<style scoped>
.timeline {
  position: relative;
  display: flex;
}

.timeline-vertical {
  flex-direction: column;
}

.timeline-vertical > li {
  --timeline-row-start: minmax(0, 1fr);
  --timeline-row-end: minmax(0, 1fr);
  justify-items: center;
  line-height: 1.75;
  margin: 0;
}

:where(.timeline > li) {
  position: relative;
  display: grid;
  flex-shrink: 0;
  align-items: center;
  grid-template-rows: var(--timeline-row-start, minmax(0, 1fr)) auto var(--timeline-row-end, minmax(0, 1fr) );
  grid-template-columns: var(--timeline-col-start, minmax(0, 1fr)) auto var(--timeline-col-end, minmax(0, 1fr) );
}

.timeline-vertical .timeline-start {
  margin: .25rem;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
  align-self: center;
  justify-self: end;
}

.timeline-middle {
  width: 1.25rem;
  height: 1.25rem;
  grid-column-start: 2;
  grid-row-start: 2;
}

.timeline-vertical .timeline-end {
  margin: .75rem;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
  align-self: center;
  justify-self: start;
}

.timeline-box {
  border-radius: var(--rounded-box,1rem);
  border-width: 1px;
  border-color: var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)));
  background-color: var(--vp-c-default-3);
  padding: .5rem 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.timeline-vertical > li > hr {
  width: .25rem;
  height: 100%;
  margin: 0;
  border-width: 0;
  background-color: var(--vp-c-default-3);
  border-radius: 0.1rem;
}

:where(.timeline hr) {
  margin: 0;
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)));
}

:where(.timeline-vertical:has(.timeline-middle) > li > hr):last-child {
  border-top-left-radius: var(--rounded-badge,1.9rem);
  border-top-right-radius: var(--rounded-badge,1.9rem);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

:where(.timeline-vertical > li > hr):last-child {
  grid-column-start: 2;
  grid-column-end: auto;
  grid-row-start: 3;
  grid-row-end: none;
}

:where(.timeline:has(.timeline-middle) hr):last-child {
  border-start-start-radius: var(--rounded-badge, 1.9rem);
  border-end-start-radius: var(--rounded-badge, 1.9rem);
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}


</style>
