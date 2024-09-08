import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { version } from '../../package.json'

const VERSIONS: (DefaultTheme.NavItemWithLink | DefaultTheme.NavItemChildren)[] = [
  { text: `Install`, link: 'https://obsidian.md/plugins?id=tabs' },
  { text: `Release`, link: 'https://github.com/xhuajin/obsidian-tabs/releases' },
  {
    items: [
      { text: 'Code tab', link: 'https://github.com/lazyloong/obsidian-code-tab' },
    ],
  },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tabs",
  description: "Home page",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'Tabs',

    logo: {
      src: '/obsidian-icon.svg',
      alt: 'Home'
    },

    nav: [
      { text: 'Document', link: '/tabs' },
      { text: 'Roadmap', link: '/tabs' },
      { text: 'Showcase', link: '/showcase' },
      {
        text: `v${version}`,
        items: VERSIONS,
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/tabs' },
          { text: 'Installation', link: '/installation' },
          { 
            text: 'Usage',
            items: [
              { text: 'Basic', link: '/usage/' },
              { text: 'Nav menu', link: '/usage/menu' },
              { text: 'Edit tab', link: '/usage/editTabs' },
              { text: 'Plugins support', link: '/usage/pluginsSupport' },
              { text: 'Customization', link: '/usage/customization' },
              { text: 'Drag and drop', link: '/usage/dnd' },
            ]
          },
          { text: 'Showcase', link: '/showcase' },
          { text: 'RoadMap', link: '/roadmap' },
        ]
      }
    ],

    outline: {
      level: [2, 4],
      label: 'On this page'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xhuajin/obsidian-tabs' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Huajin.',
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    zh: {
      title: "Tabs",
      label: '简体中文',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '文档', link: '/zh/tabs' },
          { text: '日志', link: '/zh/changelog' },
          { text: '示例', link: '/zh/showcase' },
          {
            text: `v${version}`,
            items: VERSIONS,
          },
        ],

        sidebar: [
          {
            text: '关于',
            items: [
              { text: '介绍', link: '/zh/tabs' },
              { text: '下载', link: '/zh/installation' },
              { text: 'Tabs 的构造', link: '/zh/tabsmodal' },
            ],
          },
          {
            text: '使用教程',
            items: [
              { text: '创建 Tabs 组件', link: '/zh/usage/' },
              { text: '快捷菜单', link: '/zh/usage/menu' },
              { text: 'Tabs 编辑器', link: '/zh/usage/editor' },
              { text: '命令', link: '/zh/usage/commands' },
              { text: '自定义', link: '/zh/usage/customization' },
              { text: '拖拽', link: '/zh/usage/dnd' },
              { text: '设置', link: '/zh/usage/settings' },
              { text: '搭配其他插件', link: '/zh/usage/pluginssupport' },
            ]
          },
          { 
            text: '其他',
            items: [
              { text: '示例', link: '/zh/showcase' },
              { text: '更新日志', link: '/zh/changelog' },
            ]
          }
        ],

        editLink: {
          pattern: 'https://github.com/xhuajin/obsidian-vault/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页面'
        },
    
        footer: {
          message: '基于 MIT 许可发布',
          copyright: `版权所有 © 2024 Huajin`
        },
    
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
    
        outline: {
          level: [2, 4],
          label: '目录'
        },
    
        lastUpdated: {
          text: '最后更新于',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },
    
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
      }
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/newtabpage.png', type: 'image/png' }]
  ]
})
