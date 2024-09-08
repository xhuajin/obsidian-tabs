<template>
  <div class="tabs">
    <div class="tabs-container" :class="'tabs-nav-' + state.position">
      <div class="tabs-nav">
        <div class="tabs-nav-item-wrapper">
          <div
            v-for="(tab, index) in tabsTitle"
            :key="tab+index"
            class="tabs-nav-item"
            :class="{ 'active-item': state.activeTab === index }"
            @click="state.activeTab = index"
          >
            {{ tab }}
          </div>
        </div>
        <div ref="tabsButton" class="tabs-nav-button">
          <button @click="toggleMenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-align-justify">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      <div class="tab-contents">
        <Transition name="tab-fade">
          <div class="tab-content" v-if="0 === state.activeTab" v-html="tabsContents[0]"></div>
          <div class="tab-content" v-else-if="1 === state.activeTab" v-html="tabsContents[1]"></div>
          <div class="tab-content" v-else-if="2 === state.activeTab" v-html="tabsContents[2]"></div>
          <div class="tab-content" v-else-if="3 === state.activeTab" v-html="tabsContents[3]"></div>
        </Transition>
      </div>
    </div>
    <!-- checkbox group -->
    <transition name="menu-fade">
      <div ref="tabsMenu" class="tab-menu" v-show="state.showMenu" :style="{ top: state.menuTop + 'px', left: state.menuLeft + 'px' }" @click.stop>
        <input type="radio" id="Top" v-model="state.position" value="top">
        <label for="Top">Top</label>

        <input type="radio" id="LEFT" v-model="state.position" value="left">
        <label for="LEFT">Left</label>

        <input type="radio" id="RIGHT" v-model="state.position" value="right">
        <label for="RIGHT">Right</label>

        <input type="radio" id="BOTTOM" v-model="state.position" value="bottom">
        <label for="BOTTOM">Bottom</label>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 定义 props
const props = defineProps({
  tabsTitle: {
    type: Array,
    default: () => []
  },
  tabsContents: {
    type: Array,
    default: () => []
  }
});

// 定义 reactive 对象，包含 data 的状态
const state = reactive({
  activeTab: 0,
  showMenu: false,
  menuTop: 0,
  menuLeft: 0,
  position: 'top',
});

// 注册对 button 和 memnu 的引用
const tabsButton = ref();
const tabsMenu = ref();

// 定义方法
function toggleMenu() {
  state.showMenu = !state.showMenu;
  if (state.showMenu) {
    const buttonEl = tabsButton._value;
    const menuEl = tabsMenu._value;
    const rect = buttonEl.getBoundingClientRect();
    if (buttonEl.offsetLeft + buttonEl.offsetWidth + 200 < window.innerWidth) {
      // 右侧空间充足，在右侧显示
      state.menuLeft = (buttonEl.offsetLeft + buttonEl.offsetWidth + 10).toString();
      console.log(window.innerHeight, rect.bottom, buttonEl.offsetTop);
      console.log(window.innerHeight - rect.bottom - buttonEl.offsetTop);
      if (window.innerHeight - rect.bottom - buttonEl.offsetTop > 200) {
        // 下侧空间充足
        state.menuTop = (buttonEl.clientTop).toString();
      } else {
        // 下侧空间不足
        state.menuTop = (buttonEl.offsetTop - 100).toString();
      }
    } else {
      // 右侧空间不足，显示在内侧
      state.menuLeft = (buttonEl.offsetLeft + buttonEl.offsetWidth - 125).toString();
      if (window.innerHeight - rect.bottom - buttonEl.offsetTop > 200) {
        // 下侧空间充足
        state.menuTop = (buttonEl.offsetTop * 2 + buttonEl.clientHeight).toString();
      } else {
        // 下侧空间不足，menu 高 146，选取一个大于 146 的值即可
        state.menuTop = (buttonEl.offsetTop - 160).toString();
      }
    }

    setTimeout(() => {
      const clickListener = (e) => {
        if (e.target !== menuEl) {
          state.showMenu = false;
          window.removeEventListener('scroll', scrollListener);
          document.removeEventListener('click', clickListener);
          window.addEventListener('resize', resizeListener);
        }
      };
      document.addEventListener('click', clickListener);

      const scrollListener = () => {
        state.showMenu = false;
        window.removeEventListener('scroll', scrollListener);
        document.removeEventListener('click', clickListener);
        window.addEventListener('resize', resizeListener);
      };
      window.addEventListener('scroll', scrollListener);

      const resizeListener = () => {
        state.showMenu = false;
        window.removeEventListener('resize', resizeListener);
        window.removeEventListener('scroll', scrollListener);
        document.removeEventListener('click', clickListener);
      };
      window.addEventListener('resize', resizeListener);
    });
  }
}
</script>


<style>
.tabs {
  position: relative;
}

.tabs-container {
  width: min(90%, 600px);
  margin: 50px auto;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.dark .tabs-container {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.tabs-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.tabs-nav-item-wrapper {
  display: flex;
  user-select: none;
  overflow: scroll;
}

.tabs-nav-item-wrapper::-webkit-scrollbar {
  display: none;
}

.tabs-nav-item {
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 10px 20px;
  font-weight: bold;
  border-style: solid;
  border-color: transparent;
  transition: all 0.3s;
  text-wrap: nowrap;
}

.tabs-nav-item.active-item {
  color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.tabs-nav-item:not(.active-item):hover {
  border-color: var(--vp-c-text-3);
}

.tabs-nav-button {
  margin: auto 20px;
}

.tab-contents {
  position: relative;
  max-width: 100%;
  padding: 1.5em;
  overflow: hidden;
  text-wrap: wrap;
  /* resize: vertical; */
}

.tab-content {
  position: relative;
  width: 100%;
}

.tab-menu {
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
  padding: 10px;
  margin-left: 20px;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  z-index: 20;
}

.menu-fade-enter-active {
  transition: all 0.3s ease-out;
}

.menu-fade-leave-active {
  transition: all 0.4s ease-out;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* tab fade，需要前一个动画结束后，再下一个动画，即添加个delay */
.tab-fade-enter-active {
  transition: opacity 0.2s ease-out;
  transition-delay: 0.25s;
}

.tab-fade-enter-from {
  opacity: 0;
}

.tab-fade-leave-active {
  height: 0;
  transition: opacity 0.2s ease-out;
}

.tab-fade-leave-to {
  opacity: 0;
}

/* left, right, bottom */
.tabs-container {
  display: flex;
  flex-direction: column;
  transition: border 1s;
}

.tabs-container.tabs-nav-top {
  flex-direction: column;
}

.tabs-container.tabs-nav-top>.tabs-nav>.tabs-nav-item-wrapper>.tabs-nav-item {
  border-width: 0 0 2px 0;
}

.tabs-container.tabs-nav-left {
  flex-direction: row;
}

.tabs-container.tabs-nav-left>.tabs-nav,
.tabs-container.tabs-nav-left>.tabs-nav>.tabs-nav-item-wrapper {
  flex-direction: column;
}
.tabs-container.tabs-nav-left>.tabs-nav>.tabs-nav-item-wrapper>.tabs-nav-item {
  border-width: 0 2px 0 0;
}
.tabs-container.tabs-nav-left>.tabs-nav>.tabs-nav-button {
  margin: 10px auto;
}

.tabs-container.tabs-nav-right {
  flex-direction: row-reverse;
}

.tabs-container.tabs-nav-right>.tabs-nav,
.tabs-container.tabs-nav-right>.tabs-nav>.tabs-nav-item-wrapper {
  flex-direction: column;
}

.tabs-container.tabs-nav-right>.tabs-nav>.tabs-nav-item-wrapper>.tabs-nav-item {
  border-width: 0 0 0 2px;
}
.tabs-container.tabs-nav-right>.tabs-nav>.tabs-nav-button {
  margin: 10px auto;
}
.tabs-container.tabs-nav-bottom {
  flex-direction: column-reverse;
}

.tabs-container.tabs-nav-bottom>.tabs-nav>.tabs-nav-item-wrapper>.tabs-nav-item {
  border-width: 2px 0 0 0;
}
</style>