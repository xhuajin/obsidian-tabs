import{_ as s}from"./chunks/tabs-5.Cf5_1P3o.js";import{_ as a}from"./chunks/tabs-3.C6Hq_LmE.js";import{_ as n}from"./chunks/tabs-showcase-01-by-DeusEx01.eVxSlfVR.js";import{_ as i,c as p,o as e,a5 as l}from"./chunks/framework.D-ihIdkc.js";const t="/obsidian-tabs/assets/with-mermaid-en.g0szH3s8.png",v=JSON.parse('{"title":"Using with Other Plugins","description":"","frontmatter":{},"headers":[],"relativePath":"usage/pluginssupport.md","filePath":"usage/pluginssupport.md"}'),h={name:"usage/pluginssupport.md"},E=l('<h1 id="using-with-other-plugins" tabindex="-1">Using with Other Plugins <a class="header-anchor" href="#using-with-other-plugins" aria-label="Permalink to &quot;Using with Other Plugins&quot;">​</a></h1><p>Tab content is rendered using <a href="https://docs.obsidian.md/Reference/TypeScript+API/MarkdownRenderer/render#MarkdownRenderer.render()+method" target="_blank" rel="noreferrer"><code>MarkdownRenderer.render()</code></a>, which uses Obsidian&#39;s reading mode rendering. Therefore, it can be used in combination with many plugins.</p><details class="details custom-block"><summary>Nesting Code Blocks in Markdown</summary><p>Markdown has two formats for nesting code blocks:</p><p>When using only one type of backtick, the outer code block must use more backticks than the inner code block.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>````tabs</span></span>\n<span class="line"><span>tab: python</span></span>\n<span class="line"><span>```python</span></span>\n<span class="line"><span>print(&quot;Hello Tabs&quot;)</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>tab: javascript</span></span>\n<span class="line"><span>```javascript</span></span>\n<span class="line"><span>console.log(&#39;Hello Tabs&#39;);</span></span>\n<span class="line"><span>````</span></span></code></pre></div><p><img src="'+s+'" alt="tabs-5"></p><p>When using two types of backticks to generate code blocks, only the same type of backtick needs to be used to ensure that the outer code block uses more backticks than the inner code block.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~~~tabs</span></span>\n<span class="line"><span>tab: python</span></span>\n<span class="line"><span>```python</span></span>\n<span class="line"><span>print(&quot;Hello Tabs&quot;)</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>tab: javascript</span></span>\n<span class="line"><span>```javascript</span></span>\n<span class="line"><span>console.log(&#39;Hello Tabs&#39;);</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span>~~~</span></span></code></pre></div></details><h2 id="with-dataview-tasks" tabindex="-1">With Dataview &amp; Tasks <a class="header-anchor" href="#with-dataview-tasks" aria-label="Permalink to &quot;With Dataview &amp; Tasks&quot;">​</a></h2><p><img src="'+a+'" alt="Tabs&amp;Dataview"></p><p><img src="'+n+'" alt="Tabs&amp;Dataview"></p><p>From <a href="https://github.com/xhuajin/obsidian-tabs/issues/28" target="_blank" rel="noreferrer">DeusEx01</a></p><h2 id="with-mermaid" tabindex="-1">With mermaid <a class="header-anchor" href="#with-mermaid" aria-label="Permalink to &quot;With mermaid&quot;">​</a></h2><p><img src="'+t+`" alt="Tabs&amp;Mermaid"></p><details class="details custom-block"><summary>Source code</summary><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`\`tabs</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: &lt;span style=&quot;color: transparent; background:-webkit-linear-gradient(120deg, #bd34fe 30%, #ff3670); -webkit-background-clip: text; -webkit-text-fill-color: transparent;&quot;&gt;Mermaid&lt;/span&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Mermaid allows you to create charts and visualizations using text and code.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">It is a chart drawing tool based on JavaScript that renders Markdown-inspired text definitions to dynamically create and modify charts.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: Flowchart</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`mermaid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A--&gt;B;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A--&gt;C;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B--&gt;D;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    C--&gt;D;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: Sequence Diagram</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: Git Diagram</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: User Journey Diagram</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: Quadrant Chart</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tab: XY Chart</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`mermaid</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xychart-beta</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    title &quot;Sales Revenue&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    y-axis &quot;Revenue (in $)&quot; 4000 --&gt; 11000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`\`</span></span></code></pre></div></details>`,10),k=[E];function r(c,o,d,g,m,y){return e(),p("div",null,k)}const f=i(h,[["render",r]]);export{v as __pageData,f as default};
