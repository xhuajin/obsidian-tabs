---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tabs"
  text: "Obsidian 插件"
  tagline: '开发者 Huajin'
  image: {light: '/tabs-light.svg', dark: '/tabs-dark.svg'}
  actions:
    - theme: brand
      text: 文档
      link: /zh/tabs
    - theme: alt
      text: Github
      link: https://github.com/xhuajin/obsidian-tabs

features:
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5086A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-panel-top"><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
    title: 内容分段
    details: Tabs 组件可以将你的笔记内容分成多个部分，通过点击导航栏切换内容。
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5086A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
    title: 语法简单
    details: 使用 tabs 代码块即可快速创建一个 Tabs 组件，用户可以自定义分隔符将内容分段。
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5086A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
    title: 快速编辑
    details: Tabs 插件提供了一个简易的编辑器用于快速编辑每个 tab，无需修改未渲染的 tabs 代码块源码。
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5086A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="#5086A1"/><circle cx="17.5" cy="10.5" r=".5" fill="#5086A1"/><circle cx="8.5" cy="7.5" r=".5" fill="#5086A1"/><circle cx="6.5" cy="12.5" r=".5" fill="#5086A1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
    title: 个性化
    details: 每个 Tabs 组件的导航栏和正文都可以自定义，例如导航栏的位置和颜色、正文的内外边距、Tabs 组件的边框样式等。
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5086A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grab"><path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"/><path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5"/><path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"/></svg>
    title: 拖拽编辑
    details: 你可以通过拖拽快速的修改 tab 的顺序。
  - icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5086A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-blocks"><rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/></svg>
    title: 插件支持
    details: 与其他插件搭配食用效果更佳，例如 Dataview, Tasks, Icon Shortcodes 等
---

<script setup>
import TabsComponent from '../.vitepress/components/TabsComponent.vue';
</script>

<TabsComponent 
  :tabsTitle="['红楼梦', '西游记', '三国演义', '水浒传']"
  :tabsContents="['中国古典小说的巅峰之作，由曹雪芹所著。小说以贾、史、王、薛四大家族的兴衰为背景，通过贾宝玉和林黛玉的爱情悲剧，揭示了封建社会的腐朽与衰败。小说细腻地描绘了众多人物形象，如聪明灵秀的黛玉、端庄贤惠的宝钗、刚烈勇敢的探春等，展现了他们在封建礼教束缚下的命运。作品以诗意的语言、深刻的思想和精湛的艺术技巧，展现了人性的光辉与阴暗，被誉为“中国封建社会的百科全书”', '《西游记》是吴承恩创作的一部神魔小说，讲述了唐僧师徒四人西天取经的传奇故事。小说以丰富的想象力和幽默诙谐的语言，塑造了孙悟空、猪八戒、沙僧等鲜明的人物形象，他们各自具有独特的性格和神通。在取经的过程中，师徒四人历经九九八十一难，展现了忠诚、勇敢、善良的品质。小说寓意深刻，传达了修心养性、战胜困难的精神，是一部深受广大读者喜爱的经典之作。', '《三国演义》是罗贯中创作的一部长篇历史小说，以三国时期的历史为背景，描绘了曹操、刘备、孙权等英雄人物的政治斗争和战争场景。小说情节跌宕起伏，人物性格鲜明，如忠诚耿直的关羽、智勇双全的诸葛亮、狡猾多疑的曹操等。作品通过战争与和平、忠诚与背叛的故事，展现了人性的复杂与历史的沧桑，具有很高的文学价值和历史价值。', '《水浒传》是施耐庵所著的武侠小说，讲述了宋江等一百零八位好汉聚集梁山泊，反抗封建统治的故事。小说塑造了一群英勇善战、忠诚正义的英雄形象，如豪爽直率的李逵、智勇双全的武松、仗义疏财的鲁智深等。他们因不堪忍受封建压迫，纷纷走上梁山，展开了一场场惊心动魄的斗争。作品歌颂了底层人民反抗压迫的斗争精神，具有强烈的现实主义色彩。']"
/>
