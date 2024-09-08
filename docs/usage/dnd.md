---

---

# Drag and drop

实现 tab 拖拽编辑的功能也挺麻烦的，主要是 editor 的 replaceRange 后已经创建的 tabs 组件由于被拖拽不会被刷新，同时原先我没有预留整个 Tabs 组件 refresh 的方法，因此这里得补上部分刷新。还要处理很多逻辑，非常麻烦。
