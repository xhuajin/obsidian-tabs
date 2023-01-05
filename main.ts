import { Plugin } from "obsidian";

export default class CodeTab extends Plugin {
    async onload() {
        this.registerMarkdownPostProcessor((element,context) => {
            var toggleTab:number = element.getElementsByClassName('language-tab').length
            if(toggleTab === 0) return
            
            //create basic skeleton of tab-container
            element.className = 'tab-container'
            var tabsTag:HTMLElement = document.createElement('ul')
            tabsTag.className='tabs'
            var contentsTag = document.createElement('div')
            contentsTag.className='tab-contents'
            element.appendChild(tabsTag)
            element.appendChild(contentsTag)
            var codeTag = element.querySelector('code')
            if(codeTag !== null) {
                var codeTagText = codeTag.innerHTML
                var codeTagTextArray = codeTagText.split('lang:')
                for(var i = 1 ; i < codeTagTextArray.length; i++) {
                    // fill up tabs
                    var language = codeTagTextArray[i].substring(0,codeTagTextArray[i].indexOf('\n'))
                    var tabItemTag = document.createElement('li')
                    tabItemTag.className = 'tab-item'
                    tabItemTag.innerHTML = language
                    if(i===1) tabItemTag.addClass('tab-item--active')
                    tabItemTag.onclick = (e) => handler(e)
                    tabsTag.appendChild(tabItemTag);
                    
                    //fill up tab-contents
                    var codeText = codeTagTextArray[i].substring(codeTagTextArray[i].indexOf('\n')+1)
                    var newCodeTag = document.createElement('code')
                    newCodeTag.className = 'language-'+language
                    newCodeTag.innerHTML = codeText
                    var buttonTag = document.createElement('button')
                    buttonTag.className = 'copy-code-button'
                    buttonTag.innerHTML = 'Copy'
                    var preTag = document.createElement('pre')
                    preTag.className = 'language-'+language
                    preTag.appendChild(newCodeTag)
                    preTag.appendChild(buttonTag)
                    var tabContentTag = document.createElement('div')
                    tabContentTag.className = 'tab-content'
                    if(i===1) tabContentTag.addClass('tab-content--active')
                    tabContentTag.appendChild(preTag)
                    contentsTag.appendChild(tabContentTag)
                }

            }
            // event handler
            var tabItemTags = element.getElementsByClassName('tab-item') 
            var tabContentTags = element.getElementsByClassName('tab-content')
            const handler = (e:MouseEvent) => {
                for(var i = 0; i < tabItemTags.length; i++) {
                    if(tabItemTags[i] === e.srcElement) {
                        tabItemTags[i].classList.add('tab-item--active');
                        tabContentTags[i].classList.add('tab-content--active');
                    } else {
                        tabItemTags[i].classList.remove('tab-item--active');
                        tabContentTags[i].classList.remove('tab-content--active');
                    }
                    
                }
            }
            // remove old codes
            if(element.firstChild !== null) element.removeChild(element.firstChild)
        })
    }
}