import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '技术文档',
  description: '技术文档知识库',

  // OSS 静态托管不支持 cleanUrls，所以用带 .html 的链接
  // 如果要部署到子目录，这里改成 '/子目录名/'
  base: '/',

  // 搜索配置
  themeConfig: {
    // 本地搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '参考', link: '/reference/' }
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '概述', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' }
          ]
        },
        {
          text: '种植手册',
          items: [
            { text: '海原越夏小番茄种植手册', link: '/guide/tomato-guide' }
          ]
        }
      ],
      '/reference/': [
        {
          text: '参考文档',
          items: [
            { text: '概述', link: '/reference/' }
          ]
        }
      ]
    },

    // 社交链接（可选，如果有 GitHub 仓库可以在这里配置）
    socialLinks: [
      // { icon: 'github', link: 'https://github.com/your-org/your-repo' }
    ],

    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026'
    },

    // 编辑链接（可选）
    // editLink: {
    //   pattern: 'https://github.com/your-org/your-repo/edit/main/docs/:path',
    //   text: '在 GitHub 上编辑此页'
    // },

    // 最后更新时间
    // lastUpdated: {
    //   text: '最后更新于',
    //   formatOptions: {
    //     dateStyle: 'short',
    //     timeStyle: 'short'
    //   }
    // },

    // 大纲标题级别
    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    // 上一页/下一页
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 暗色模式
    darkModeSwitchLabel: '主题切换',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    notFound: {
      title: '页面未找到',
      quote: '你访问的页面不存在，请检查链接是否正确。',
      linkLabel: '返回首页'
    }
  },

  // Markdown 配置
  markdown: {
    // 代码块行号
    lineNumbers: true,
    // 图片懒加载
    image: {
      lazyLoading: true
    }
  },

  // 忽略死链检查（构建时不因死链而失败）
  ignoreDeadLinks: false
})
