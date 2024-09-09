# 下载

<TabsComponent :tabsTitle="['官方市场', 'Github Release', 'Pkmer']" :tabsContents="[obsidianCommunity, githubRelease, pkmer]"/>

## 下载量

<DownloadChart />

<script setup>
import TabsComponent from '../.vitepress/components/TabsComponent.vue';
import DownloadChart from '../.vitepress/components/DownloadChart.vue'

const obsidianCommunity = '本插件于 2024-06-07 上架官方，可以直接在官方插件市场免费<a href="https://obsidian.md/plugins?id=tabs">下载</a>，在 obsidian 设置的第三方插件页面可以启用 Tabs 插件。';
const githubRelease = '<ol><li>在 <a href="https://github.com/xhuajin/obsidian-tabs/releases" target="_blank" rel="noreferrer">Github/Release</a> 中下载最新的 release 的 <code>main.js</code>, <code>style.css</code> 和 `manifest.json` 文件</li><li>在 <code>{ob库文件夹}/.obsidian/plugins</code> 中创建一个文件夹（名字随意），然后将刚刚下载的三个文件放入其中</li><li>打开 obsidian 的设置，在第三方插件页面中启用 Tabs 插件即可</li><ol>';
const pkmer = '如果你下载了 <a href="https://pkmer.cn/products/market/" target="_blank" rel="noreferrer">Pkmer-market</a> 插件，你可以直接在 Pkmer Market 中搜索 Tabs 下载本插件。';
</script>
