import{_ as s}from"./chunks/tabs-5.Cf5_1P3o.js";import{_ as a}from"./chunks/tabs-6.wrWuxAi8.js";import{_ as n}from"./chunks/editing.Dl8cR0BV.js";import{_ as e,c as t,o as i,a5 as l}from"./chunks/framework.D-ihIdkc.js";const T=JSON.parse('{"title":"Creating Tabs Component","description":"","frontmatter":{},"headers":[],"relativePath":"usage/index.md","filePath":"usage/index.md"}'),p={name:"usage/index.md"},o=l('<h1 id="creating-tabs-component" tabindex="-1">Creating Tabs Component <a class="header-anchor" href="#creating-tabs-component" aria-label="Permalink to &quot;Creating Tabs Component&quot;">​</a></h1><blockquote><p>You need to understand <a href="./../tabsmodal.html">the structure of Tabs</a></p></blockquote><p>The Tabs component is implemented by rendering tabs code blocks. Therefore, you only need to write the following content in any markdown note in Obsidian to create an empty Tabs component.</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">```tabs</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">```</span></span></code></pre></div><p>At this point, the rendered Tabs component has no content added. To optimize the visual effect, I put an empty tab as a placeholder, which is the &quot;New tab&quot; and &quot;New tab content&quot; you can see now.</p><blockquote><p>You can also use the command <a href="./commands.html#tabs-convert-selected-text-to-tabs"><code>Tabs: Convert selected text to tabs</code></a> in the command palette to quickly create a Tabs component at the cursor position.</p></blockquote><h2 id="i-creating-a-new-tab" tabindex="-1">I. Creating a new tab <a class="header-anchor" href="#i-creating-a-new-tab" aria-label="Permalink to &quot;I. Creating a new tab&quot;">​</a></h2><p>Use the <code>tab: </code> keyword to identify a tab.</p><ul><li>The content after <code>tab: </code> is the title, which will be displayed in the nav (note that there&#39;s a space after the colon, this keyword can be customized in the <a href="./settings.html">settings</a>)</li><li>The content from the <code>tab: </code> line to the next <code>tab: </code> is the content.</li></ul><p>Try copying the following content into your md note:</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">```tabs</span></span>\n<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: 📺 Music</span></span>\n<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">content in tab 1</span></span>\n<span class="line"></span>\n<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: 🎵 Movie</span></span>\n<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">content in tab 2</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">```</span></span></code></pre></div><div class="warning custom-block github-alert"><p class="custom-block-title">Don&#39;t write task lists directly in the content</p><p></p><p>The Tabs plugin is implemented by rendering tabs code blocks, but in Obsidian, text in code blocks is treated as plain text. Therefore, if you write <code>- [ ] a task</code> directly in the tabs code block, both the tasks plugin and the dataview plugin will not be able to retrieve them.</p></div><p>In addition to directly editing the tabs code block, you can also:</p><ul><li>Quickly create a new tab by clicking the plus sign at the end of the navigation bar (you need to set Action button to Add new tab in the plugin settings)</li><li>Quickly create a new tab through the menu that appears when right-clicking on the nav</li></ul><h2 id="ii-nested-tabs" tabindex="-1">II. Nested Tabs <a class="header-anchor" href="#ii-nested-tabs" aria-label="Permalink to &quot;II. Nested Tabs&quot;">​</a></h2><p>You can continue to use tabs code blocks to create Tabs components inside a Tabs component, but you need to ensure that the number of ` or ~ used in the outer layer is more than the number used in the inner layer.</p><details class="details custom-block"><summary>Nested use of code blocks in Markdown</summary><p>There are two formats for nested use of code blocks in Markdown:</p><p>When using only one type of backtick, the outer code block must use more backticks than the inner code block</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>````tabs</span></span>\n<span class="line"><span>tab: python</span></span>\n<span class="line"><span>```python</span></span>\n<span class="line"><span>print(&quot;Hello Tabs&quot;)</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>tab: javascript</span></span>\n<span class="line"><span>```javascript</span></span>\n<span class="line"><span>console.log(&#39;Hello Tabs&#39;);</span></span>\n<span class="line"><span>``</span></span>\n<span class="line"><span>````</span></span></code></pre></div><p><img src="'+s+'" alt="tabs-5"></p><p>When using two types of backticks to generate code blocks, you only need to keep the same type of backtick more in the outer layer than in the inner layer.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~~~tabs</span></span>\n<span class="line"><span>tab: python</span></span>\n<span class="line"><span>```python</span></span>\n<span class="line"><span>print(&quot;Hello Tabs&quot;)</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>tab: javascript</span></span>\n<span class="line"><span>```javascript</span></span>\n<span class="line"><span>console.log(&#39;Hello Tabs&#39;);</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span>~~~</span></span></code></pre></div></details><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-_TAm3" id="tab-PK3HVs8" checked><label for="tab-PK3HVs8">Using only one type of backtick</label><input type="radio" name="group-_TAm3" id="tab-l0SXLeN"><label for="tab-l0SXLeN">Using two type of backtick</label></div><div class="blocks"><div class="language-md vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">````tabs</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: TAB-ONE</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">An innerTab in TAB-ONE 👇</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">```tabs</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: inner tab one</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This is an inner tab.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: inner tab two</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This is an inner tab.</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">```</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: TAB-TWO</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">````</span></span></code></pre></div><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">````tabs</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: TAB-ONE</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">An innerTab in TAB-ONE 👇</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">```tabs</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: inner tab one</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This is an inner tab.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: inner tab two</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This is an inner tab.</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">```</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: TAB-TWO</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">````</span></span></code></pre></div></div></div><p><img src="'+a+'" alt="tabs-6"></p><h2 id="iii-editing-tabs" tabindex="-1">III. Editing tabs <a class="header-anchor" href="#iii-editing-tabs" aria-label="Permalink to &quot;III. Editing tabs&quot;">​</a></h2><ul><li>You can use the arrow keys to move the cursor into the tabs code block to directly edit the source code of the Tabs component.</li><li>If you have enabled &quot;Double click to edit&quot; in the Tabs plugin settings, you can directly double-click the content to enter the <a href="./editor.html">Tabs editor</a>.</li><li>If you have set &quot;Action button&quot; to &quot;Edit tab&quot;, you can enter the Tabs editor by clicking the edit button in the upper right corner of the Tabs component.</li></ul><p><img src="'+n+'" alt="tabs-editing"></p>',22),c=[o];function h(d,r,b,k,u,E){return i(),t("div",null,c)}const f=e(p,[["render",h]]);export{T as __pageData,f as default};