import { MarkdownRenderer, Notice, Plugin } from "obsidian";

export default class CodeTab extends Plugin {
    async onload() {
        this.registerMarkdownCodeBlockProcessor(
            "tab",
            (source, element, context) => {
                //create basic skeleton of tab-container
                element.className = "tab-container";
                let tabsTag = document.createElement("div");
                tabsTag.className = "tabs";
                let contentsTag = document.createElement("div");
                contentsTag.className = "tab-contents";
                element.appendChild(tabsTag);
                element.appendChild(contentsTag);
                let codeTagText = source;
                let codeTagTextArray = codeTagText.split("tab:");
                for (let i = 1; i < codeTagTextArray.length; i++) {
                    // fill up tabs
                    let language = codeTagTextArray[i].substring(
                        0,
                        codeTagTextArray[i].indexOf("\n")
                    );
                    let tabItemTag = document.createElement("div");
                    tabItemTag.className = "tab-item";
                    tabItemTag.innerHTML = language;
                    if (i === 1) tabItemTag.addClass("tab-item--active");
                    tabItemTag.onclick = (e) => handler(e);
                    tabsTag.appendChild(tabItemTag);

                    //fill up tab-contents
                    let codeText = codeTagTextArray[i].substring(
                        codeTagTextArray[i].indexOf("\n") + 1
                    );
                    let tabContentTag = document.createElement("div");
                    tabContentTag.className = "tab-content";
                    MarkdownRenderer.renderMarkdown(
                        codeText,
                        tabContentTag,
                        context.sourcePath
                    );
                    if (i === 1) tabContentTag.addClass("tab-content--active");
                    // tabContentTag.appendChild(preTag);
                    contentsTag.appendChild(tabContentTag);
                }
                // event handler
                let tabItemTags = element.getElementsByClassName("tab-item");
                let tabContentTags =
                    element.getElementsByClassName("tab-content");
                const handler = (e: MouseEvent) => {
                    for (let i = 0; i < tabItemTags.length; i++) {
                        if (tabItemTags[i] === e.srcElement) {
                            tabItemTags[i].classList.add("tab-item--active");
                            tabContentTags[i].classList.add(
                                "tab-content--active"
                            );
                        } else {
                            tabItemTags[i].classList.remove("tab-item--active");
                            tabContentTags[i].classList.remove(
                                "tab-content--active"
                            );
                        }
                    }
                };
            }
        );
    }
}
