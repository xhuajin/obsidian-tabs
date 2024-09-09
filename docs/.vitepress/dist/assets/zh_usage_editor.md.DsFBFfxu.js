import{_ as i}from"./chunks/editing.Dl8cR0BV.js";import{_ as s,c as a,o as e,a5 as t}from"./chunks/framework.D-ihIdkc.js";const m=JSON.parse('{"title":"Tabs 编辑器","description":"","frontmatter":{},"headers":[],"relativePath":"zh/usage/editor.md","filePath":"zh/usage/editor.md"}'),l={name:"zh/usage/editor.md"},o=t('<h1 id="tabs-编辑器" tabindex="-1">Tabs 编辑器 <a class="header-anchor" href="#tabs-编辑器" aria-label="Permalink to &quot;Tabs 编辑器&quot;">​</a></h1><p>为了方便编辑，写了一个简单的 codemirror6 编辑器，你可以通过双击 content 进入 Tabs 编辑器从而快速编辑当前 tab content</p><p><img src="'+i+`" alt="editor"></p><h2 id="功能" tabindex="-1">功能 <a class="header-anchor" href="#功能" aria-label="Permalink to &quot;功能&quot;">​</a></h2><p>编辑器目前只实现了一些简单的功能</p><ul><li>快捷键 <ul><li>加粗：<code>ctrl-b</code></li><li>撤销与恢复：<code>ctrl-z</code> <code>ctrl-y</code></li><li>转换为无序列表和任务：<code>ctrl-l</code></li><li>保存 <code>ctrl-s</code></li><li>缩进与取消：<code>tab</code> <code>shift tab</code></li></ul></li><li>匹配 <ul><li>选中文本后输入以下值可以首尾匹配：<code>*</code> <code>=</code> <code>$</code> <code>[</code> <code>{</code></li></ul></li><li>工具栏 <ul><li>提供了一系列工具，例如文本转代码块、快速建立表格等。</li><li>当设置中的 Show toolbar 项开启时出现</li></ul></li><li>自动保存 <ul><li>每隔一定时间会自动保存编辑内容（如果有修改内容的话）</li><li>关闭时自动保存结果</li></ul></li></ul><p>由于使用的是 codemirror 6 编辑器，不可避免的可能会与其他插件有冲突，例如同时使用 Codeblock Customizer 时选中内容的背景色消失。</p><h2 id="关于编辑器" tabindex="-1">关于编辑器 <a class="header-anchor" href="#关于编辑器" aria-label="Permalink to &quot;关于编辑器&quot;">​</a></h2><p>obsidian 使用 <a href="https://help.obsidian.md/Obsidian/Credits#CodeMirror" target="_blank" rel="noreferrer">Codemirror 6</a> 作为底层文本编辑器。为了方便插件开发，obsidian 提供了一个 Editor 对象能同时兼容 Codemirror 5（旧版） 和 Codemirror 6（新版）。这个 cm5+cm6 编辑器就是实时渲染和阅读模式。可惜的是，obsidian 的编辑器并不开源，给开发者提供的是具体的 Editor 实例，例如我们可以这样获取当前 markdown 页面的 Editor 实例</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> activeView</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.app.workspace.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getActiveViewOfType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(MarkdownView);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (activeView) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> editor</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> activeView.editor;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>但是这是一个具体的实例，我们想要的是创建一个新的 obsidian 的编辑器，然后直接将它放置在 Tabs 的 contents 中以达到最佳的效果。为了获取到这个编辑器，目前我做了两种尝试</p><ul><li>一个 MarkdownView/WorkspaceLeaf 的生成必然需要生成这样的一个编辑器实例，可以尝试用 Monkey Patch 相关的技巧再生成一个编辑器。但是这样获取的编辑器与路径绑定，不是空的编辑器。</li><li>获取当前的 MarkdownView 生成时 Edtor 的 extensions，然后直接创建一个新的 Codemirror 编辑器后把获取到的拓展加上。虽然能够成功获取到 extensions，但是由于都是乱码不知道每个对应了什么。直接把拓展加到新建的 cm 编辑器中虽然不会报错，但是也没有其他任何效果。</li></ul>`,12),r=[o];function n(d,c,p,h,k,u){return e(),a("div",null,r)}const g=s(l,[["render",n]]);export{m as __pageData,g as default};