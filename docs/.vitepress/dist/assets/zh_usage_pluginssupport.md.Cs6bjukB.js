import{_ as s}from"./chunks/tabs-5.Cf5_1P3o.js";import{_ as a}from"./chunks/tabs-3.C6Hq_LmE.js";import{_ as n}from"./chunks/tabs-showcase-01-by-DeusEx01.eVxSlfVR.js";import{_ as i}from"./chunks/with-mermaid.C3q576Zi.js";import{_ as p,c as l,o as t,a5 as e}from"./chunks/framework.D-ihIdkc.js";const f=JSON.parse('{"title":"搭配其他插件使用","description":"","frontmatter":{},"headers":[],"relativePath":"zh/usage/pluginssupport.md","filePath":"zh/usage/pluginssupport.md"}'),h={name:"zh/usage/pluginssupport.md"},E=e('<h1 id="搭配其他插件使用" tabindex="-1">搭配其他插件使用 <a class="header-anchor" href="#搭配其他插件使用" aria-label="Permalink to &quot;搭配其他插件使用&quot;">​</a></h1><p>tab content 使用 <a href="https://docs.obsidian.md/Reference/TypeScript+API/MarkdownRenderer/render#MarkdownRenderer.render()+method" target="_blank" rel="noreferrer"><code>MarkdownRenderer.render()</code></a> 渲染，即使用的是 ob 的阅读模式渲染，因此能够与许多插件搭配着使用。</p><details class="details custom-block"><summary>Markdown 嵌套使用代码块</summary><p>Markdown 有两种嵌套使用代码块的格式：</p><p>只用一种反引号时，外层代码块使用反引号的个数必须多于内层代码块使用的反引号个数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>````tabs</span></span>\n<span class="line"><span>tab: python</span></span>\n<span class="line"><span>```python</span></span>\n<span class="line"><span>print(&quot;Hello Tabs&quot;)</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>tab: javascript</span></span>\n<span class="line"><span>```javascript</span></span>\n<span class="line"><span>console.log(&#39;Hello Tabs&#39;);</span></span>\n<span class="line"><span>````</span></span></code></pre></div><p><img src="'+s+'" alt="tabs-5"></p><p>同时使用两种反引号生成代码块时，只需要同种反引号保持外层多于内层即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~~~tabs</span></span>\n<span class="line"><span>tab: python</span></span>\n<span class="line"><span>```python</span></span>\n<span class="line"><span>print(&quot;Hello Tabs&quot;)</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>tab: javascript</span></span>\n<span class="line"><span>```javascript</span></span>\n<span class="line"><span>console.log(&#39;Hello Tabs&#39;);</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span>~~~</span></span></code></pre></div></details><h2 id="with-dataview-tasks" tabindex="-1">With Dataview &amp; Tasks <a class="header-anchor" href="#with-dataview-tasks" aria-label="Permalink to &quot;With Dataview &amp; Tasks&quot;">​</a></h2><p><img src="'+a+'" alt="Tabs&amp;Dataview"></p><p><img src="'+n+'" alt="Tabs&amp;Dataview"></p><p>From <a href="https://github.com/xhuajin/obsidian-tabs/issues/28" target="_blank" rel="noreferrer">DeusEx01</a></p><h2 id="with-mermaid" tabindex="-1">With mermaid <a class="header-anchor" href="#with-mermaid" aria-label="Permalink to &quot;With mermaid&quot;">​</a></h2><p><img src="'+i+`" alt="Tabs&amp;Mermaid"></p><details class="details custom-block"><summary>源码</summary><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`\`tabs</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: &lt;span style=&quot;color: transparent; background:-webkit-linear-gradient(120deg, #bd34fe 30%, #ff3670); -webkit-background-clip: text; -webkit-text-fill-color: transparent;&quot;&gt;Mermaid&lt;/span&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Mermaid 允许你使用文本和代码创建图表和可视化。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">它是一个基于 JavaScript 的图表绘制工具，可渲染 Markdown 启发的文本定义以动态创建和修改图表。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: 流程图</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`mermaid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A--&gt;B;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A--&gt;C;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B--&gt;D;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C--&gt;D;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: 时序图</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`mermaid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant Alice</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    participant Bob</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Alice-&gt;&gt;John: Hello John, how are you?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    loop HealthCheck</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        John-&gt;&gt;John: Fight against hypochondria</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note right of John: Rational thoughts &lt;br/&gt;prevail!</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    John--&gt;&gt;Alice: Great!</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    John-&gt;&gt;Bob: How about you?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Bob--&gt;&gt;John: Jolly good!</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: Git 图</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`mermaid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    gitGraph</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       commit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       commit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       branch develop</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       commit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       commit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       commit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       checkout main</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       commit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       commit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: 用户旅程图</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`mermaid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">journey</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    title My working day</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    section Go to work</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      Make tea: 5: Me</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      Go upstairs: 3: Me</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      Do work: 1: Me, Cat</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    section Go home</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      Go downstairs: 5: Me</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      Sit down: 5: Me</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: 象限图</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`mermaid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">quadrantChart</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    title Reach and engagement of campaigns</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    x-axis Low Reach --&gt; High Reach</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    y-axis Low Engagement --&gt; High Engagement</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    quadrant-1 We should expand</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    quadrant-2 Need to promote</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    quadrant-3 Re-evaluate</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    quadrant-4 May be improved</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Campaign A: [0.3, 0.6]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Campaign B: [0.45, 0.23]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Campaign C: [0.57, 0.69]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Campaign D: [0.78, 0.34]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Campaign E: [0.40, 0.34]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Campaign F: [0.35, 0.78]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: XY图表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`mermaid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xychart-beta</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    title &quot;Sales Revenue&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    y-axis &quot;Revenue (in $)&quot; 4000 --&gt; 11000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`\`</span></span></code></pre></div></details>`,10),k=[E];function r(c,d,o,g,m,y){return t(),l("div",null,k)}const q=p(h,[["render",r]]);export{f as __pageData,q as default};
