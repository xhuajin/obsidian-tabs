import{_ as s}from"./chunks/tabs-5.Cf5_1P3o.js";import{_ as a}from"./chunks/tabs-6.wrWuxAi8.js";import{_ as n,c as p,o as e,a5 as l}from"./chunks/framework.D-ihIdkc.js";const k=JSON.parse('{"title":"2. With other code block","description":"","frontmatter":{},"headers":[],"relativePath":"usage/pluginsSupport.md","filePath":"usage/pluginsSupport.md"}'),t={name:"usage/pluginsSupport.md"},i=l('<h1 id="_2-with-other-code-block" tabindex="-1">2. With other code block <a class="header-anchor" href="#_2-with-other-code-block" aria-label="Permalink to &quot;2. With other code block&quot;">​</a></h1><p>If your tab contents have code block, you need to use more `, like</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>````tabs</span></span>\n<span class="line"><span>tab: python</span></span>\n<span class="line"><span>```python</span></span>\n<span class="line"><span>print(&quot;Hello Tabs&quot;)</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>tab: javascript</span></span>\n<span class="line"><span>```javascript</span></span>\n<span class="line"><span>console.log(&#39;Hello Tabs&#39;);</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span>````</span></span></code></pre></div><p>Or you can use &#39;~&#39; to create code block, like</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~~~tabs</span></span>\n<span class="line"><span>tab: python</span></span>\n<span class="line"><span>```python</span></span>\n<span class="line"><span>print(&quot;Hello Tabs&quot;)</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>tab: javascript</span></span>\n<span class="line"><span>```javascript</span></span>\n<span class="line"><span>console.log(&#39;Hello Tabs&#39;);</span></span>\n<span class="line"><span>```</span></span>\n<span class="line"><span>~~~</span></span></code></pre></div><p><img src="'+s+`" alt="tabs-5"></p><p>With this feature, you can create tabs component nested.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>\`\`\`\`tabs</span></span>
<span class="line"><span>tab: TAB-ONE</span></span>
<span class="line"><span>An innerTab in TAB-ONE 👇</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`tabs</span></span>
<span class="line"><span>tab: inner tab one</span></span>
<span class="line"><span>This is an inner tab.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tab: inner tab two</span></span>
<span class="line"><span>This is an inner tab.</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tab: TAB-TWO</span></span>
<span class="line"><span>\`\`\`\`</span></span></code></pre></div><p>or use &#39;~&#39; to create code block(inside or outside).</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~~~tabs</span></span>
<span class="line"><span>tab: TAB-ONE</span></span>
<span class="line"><span>An innerTab in TAB-ONE 👇</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`tabs</span></span>
<span class="line"><span>tab: inner tab one</span></span>
<span class="line"><span>This is an inner tab.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tab: inner tab two</span></span>
<span class="line"><span>This is an inner tab.</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tab: TAB-TWO</span></span>
<span class="line"><span>~~~</span></span></code></pre></div><p><img src="`+a+'" alt="tabs-6"></p>',11),c=[i];function o(r,b,d,h,u,g){return e(),p("div",null,c)}const T=n(t,[["render",o]]);export{k as __pageData,T as default};
