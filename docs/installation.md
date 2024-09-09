# How to Install

<TabsComponent :tabsTitle="['Obsidian Plugin Market', 'Github Release', 'Pkmer']" :tabsContents="[obsidianCommunity, githubRelease, pkmer]"/>

<DownloadChart />

<script setup>
import TabsComponent from './.vitepress/components/TabsComponent.vue';
import DownloadChart from './.vitepress/components/DownloadChart.vue'

const obsidianCommunity = `Install from <a href="https://obsidian.md/plugins?id=tabs">Obsidian's plugin market</a>.`;
const githubRelease = '<ol><li>Download the latest release in <a href="https://github.com/xhuajin/obsidian-tabs/releases" target="_blank" rel="noreferrer">Github/Release</a>. Download the three files: <code>main.js</code>, <code>style.css</code> 和 `manifest.json` 文件</li><li>Create a folder in <code>{your vault}/.obsidian/plugins</code>m(Folder name arbitrary). Put the three files you just downloaded into it.</li><li>Enable the plugin Tabs.</li><ol>';
const pkmer = 'Install from <a href="https://pkmer.cn/products/market/" target="_blank" rel="noreferrer">Pkmer-market</a> plugins.';
</script>
