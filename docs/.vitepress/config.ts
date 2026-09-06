import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '口感番茄知识库',
  description: '口感番茄种植技术知识库',

  // OSS 静态托管不支持 cleanUrls，所以用带 .html 的链接
  base: '/',

  // 搜索配置
  themeConfig: {
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
      { text: '品种和育苗', link: '/品种和育苗/' },
      { text: '基础条件', link: '/基础条件/' },
      { text: '产区和茬口', link: '/产区和茬口/' },
      { text: '种植过程', link: '/种植过程/' },
      { text: '采后处理', link: '/采后处理/' },
      { text: '示例', link: '/示例/' },
    ],

    // 侧边栏
    sidebar: {
      // ========== 1. 品种和育苗 ==========
      '/品种和育苗/': [
        { text: '分类概述', link: '/品种和育苗/' },
        {
          text: '红果',
          collapsed: false,
          items: [
            { text: '釜山88', link: '/品种和育苗/红果/釜山88' },
            { text: '鸿运九九', link: '/品种和育苗/红果/鸿运九九' },
            { text: '玲珑蜜', link: '/品种和育苗/红果/玲珑蜜' },
            { text: '首而红', link: '/品种和育苗/红果/首而红' },
            { text: '高俪红', link: '/品种和育苗/红果/高俪红' },
            { text: '圣宏2号', link: '/品种和育苗/红果/圣宏2号' },
          ]
        },
        {
          text: '黄果',
          collapsed: false,
          items: [
            { text: '明珠3号', link: '/品种和育苗/黄果/明珠3号' },
          ]
        },
        {
          text: '绿果',
          collapsed: false,
          items: [
            { text: '青甜', link: '/品种和育苗/绿果/青甜' },
          ]
        },
        {
          text: '其他颜色',
          collapsed: false,
          items: [
            { text: '358', link: '/品种和育苗/其他颜色/358' },
          ]
        },
        {
          text: '种植基础',
          collapsed: false,
          items: [
            { text: '生长发育', link: '/品种和育苗/生长发育' },
            { text: '育苗', link: '/品种和育苗/育苗' },
          ]
        },
      ],

      // ========== 2. 基础条件 ==========
      '/基础条件/': [
        { text: '分类概述', link: '/基础条件/' },
        {
          text: '设施类型',
          collapsed: false,
          items: [
            { text: '露地', link: '/基础条件/设施类型/露地' },
            { text: '小拱棚', link: '/基础条件/设施类型/小拱棚' },
            { text: '连栋拱棚', link: '/基础条件/设施类型/连栋拱棚' },
            { text: '日光温室', link: '/基础条件/设施类型/日光温室' },
          ]
        },
        {
          text: '栽培类型',
          collapsed: false,
          items: [
            { text: '土壤栽培', link: '/基础条件/栽培类型/土壤栽培' },
            { text: '基质栽培', link: '/基础条件/栽培类型/基质栽培' },
          ]
        },
        {
          text: '水系条件',
          collapsed: false,
          items: [
            { text: '灌溉首部', link: '/基础条件/水系条件/灌溉首部' },
            { text: '滴灌系统', link: '/基础条件/水系条件/滴灌系统' },
            { text: '滴箭系统', link: '/基础条件/水系条件/滴箭系统' },
          ]
        },
      ],

      // ========== 3. 产区和茬口 ==========
      '/产区和茬口/': [
        { text: '分类概述', link: '/产区和茬口/' },
        {
          text: '产区',
          collapsed: false,
          items: [
            { text: '宁夏产区', link: '/产区和茬口/产区/宁夏产区' },
            { text: '山东产区', link: '/产区和茬口/产区/山东产区' },
            { text: '广东产区', link: '/产区和茬口/产区/广东产区' },
          ]
        },
        {
          text: '茬口',
          collapsed: false,
          items: [
            { text: '越夏茬口', link: '/产区和茬口/茬口/越夏茬口' },
            { text: '秋延茬口', link: '/产区和茬口/茬口/秋延茬口' },
            { text: '越冬茬口', link: '/产区和茬口/茬口/越冬茬口' },
            { text: '春延茬口', link: '/产区和茬口/茬口/春延茬口' },
          ]
        },
        {
          text: '价格趋势',
          collapsed: false,
          items: [
            { text: '全年产销价格趋势', link: '/产区和茬口/价格趋势/全年产销价格趋势' },
            { text: '全国主要销售渠道', link: '/产区和茬口/价格趋势/全国主要销售渠道' },
          ]
        },
        {
          text: '产业模式',
          collapsed: false,
          items: [
            { text: '宁夏产区露地越夏茬口种植', link: '/产区和茬口/产业模式/宁夏产区露地越夏茬口种植' },
            { text: '宁夏产区小拱棚越夏茬口种植', link: '/产区和茬口/产业模式/宁夏产区小拱棚越夏茬口种植' },
            { text: '山东产区越冬和春延茬口种植', link: '/产区和茬口/产业模式/山东产区越冬和春延茬口种植' },
            { text: '山东产区秋延茬口种植', link: '/产区和茬口/产业模式/山东产区秋延茬口种植' },
            { text: '广东产区露地越冬茬口种植', link: '/产区和茬口/产业模式/广东产区露地越冬茬口种植' },
            { text: '广东产区小拱棚越冬茬口种植', link: '/产区和茬口/产业模式/广东产区小拱棚越冬茬口种植' },
          ]
        },
      ],

      // ========== 4. 种植过程 ==========
      '/种植过程/': [
        { text: '分类概述', link: '/种植过程/' },
        {
          text: '定植前准备',
          collapsed: false,
          items: [
            { text: '宁夏产区露地越夏茬口种植', link: '/种植过程/定植前准备/宁夏产区露地越夏茬口种植' },
            { text: '宁夏产区小拱棚越夏茬口种植', link: '/种植过程/定植前准备/宁夏产区小拱棚越夏茬口种植' },
          ]
        },
        {
          text: '水肥管理',
          collapsed: false,
          items: [
            { text: '宁夏产区露地越夏茬口种植', link: '/种植过程/水肥管理/宁夏产区露地越夏茬口种植' },
            { text: '宁夏产区小拱棚越夏茬口种植', link: '/种植过程/水肥管理/宁夏产区小拱棚越夏茬口种植' },
            { text: '山东产区日光温室基质栽培', link: '/种植过程/水肥管理/山东产区日光温室基质栽培' },
            { text: '山东产区日光温室基质栽培 FAQ', link: '/种植过程/水肥管理/山东产区日光温室基质栽培 FAQ' },
          ]
        },
        {
          text: '环境管理',
          collapsed: false,
          items: [
            { text: '宁夏产区露地越夏茬口种植', link: '/种植过程/环境管理/宁夏产区露地越夏茬口种植' },
            { text: '宁夏产区小拱棚越夏茬口种植', link: '/种植过程/环境管理/宁夏产区小拱棚越夏茬口种植' },
          ]
        },
        {
          text: '农事管理',
          collapsed: false,
          items: [
            { text: '宁夏产区露地越夏茬口种植', link: '/种植过程/农事管理/宁夏产区露地越夏茬口种植' },
            { text: '宁夏产区小拱棚越夏茬口种植', link: '/种植过程/农事管理/宁夏产区小拱棚越夏茬口种植' },
            { text: '山东产区日光温室基质栽培', link: '/种植过程/农事管理/山东产区日光温室基质栽培' },
          ]
        },
        {
          text: '病虫害管理',
          collapsed: false,
          items: [
            { text: '宁夏产区露地越夏茬口种植', link: '/种植过程/病虫害管理/宁夏产区露地越夏茬口种植' },
            { text: '宁夏产区小拱棚越夏茬口种植', link: '/种植过程/病虫害管理/宁夏产区小拱棚越夏茬口种植' },
            { text: '山东产区日光温室基质栽培', link: '/种植过程/病虫害管理/山东产区日光温室基质栽培' },
          ]
        },
      ],

      // ========== 5. 采后处理 ==========
      '/采后处理/': [
        { text: '分类概述', link: '/采后处理/' },
        {
          text: '采收',
          collapsed: false,
          items: [
            { text: '采收计划与成熟度', link: '/采后处理/采收/采收计划与成熟度' },
            { text: '田间采收与暂存', link: '/采后处理/采收/田间采收与暂存' },
            { text: '田间运输与到货验收', link: '/采后处理/采收/田间运输与到货验收' },
          ]
        },
        {
          text: '分拣',
          collapsed: false,
          items: [
            { text: '分选作业', link: '/采后处理/分拣/分选作业' },
          ]
        },
        {
          text: '清洗与消杀',
          collapsed: false,
          items: [
            { text: '清洗、补钙与微生物控制处理', link: '/采后处理/清洗与消杀/清洗补钙与微生物控制处理' },
          ]
        },
        {
          text: '预冷',
          collapsed: false,
          items: [
            { text: '首次预冷与贮藏分流', link: '/采后处理/预冷/首次预冷与贮藏分流' },
          ]
        },
        {
          text: '包装',
          collapsed: false,
          items: [
            { text: '订单化包装与成品入库', link: '/采后处理/包装/订单化包装与成品入库' },
          ]
        },
        {
          text: '存储',
          collapsed: false,
          items: [
            { text: '贮藏管理与温湿度控制', link: '/采后处理/存储/贮藏管理与温湿度控制' },
          ]
        },
        {
          text: '运输',
          collapsed: false,
          items: [
            { text: '装车与运输', link: '/采后处理/运输/装车与运输' },
          ]
        },
        {
          text: '配套设施',
          collapsed: false,
          items: [
            { text: '规程总则', link: '/采后处理/配套设施/规程总则' },
            { text: '加工单元规划', link: '/采后处理/配套设施/加工单元规划' },
            { text: '场址布局与功能区域', link: '/采后处理/配套设施/场址布局与功能区域' },
            { text: '冷藏库与温控空间建设', link: '/采后处理/配套设施/冷藏库与温控空间建设' },
            { text: '主要设备配置', link: '/采后处理/配套设施/主要设备配置' },
            { text: '质量与安全管理', link: '/采后处理/配套设施/质量与安全管理' },
          ]
        },
      ],

      // ========== 6. 示例 ==========
      '/示例/': [
        { text: '分类概述', link: '/示例/' },
        {
          text: '智能问答',
          collapsed: false,
          items: [
            { text: '基于知识库的问答模板', link: '/示例/智能问答/基于知识库的问答模板' },
          ]
        },
        {
          text: '种植计划',
          collapsed: false,
          items: [
            { text: '以周为单位的种植计划模板', link: '/示例/种植计划/以周为单位的种植计划模板' },
          ]
        },
        {
          text: '病虫害防治',
          collapsed: false,
          items: [
            { text: '常见病虫害防治模板', link: '/示例/病虫害防治/常见病虫害防治模板' },
            { text: '常规病虫害用药指南', link: '/示例/病虫害防治/常规病虫害用药指南' },
          ]
        },
        {
          text: '溯源与数字化',
          collapsed: false,
          items: [
            { text: '溯源和数字化管理', link: '/示例/溯源和数字化管理' },
          ]
        },
        {
          text: 'ROI分析',
          collapsed: false,
          items: [
            { text: '宁夏产区小拱棚越夏茬口种植ROI分析模板', link: '/示例/ROI分析/宁夏产区小拱棚越夏茬口种植ROI分析模板' },
          ]
        },
      ],
    },

    // 社交链接
    socialLinks: [
      // { icon: 'github', link: 'https://github.com/your-org/your-repo' }
    ],

    // 页脚
    footer: {
      message: '口感番茄知识库 · 基于 VitePress 构建',
      copyright: 'Copyright © 2026'
    },

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
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  },

  ignoreDeadLinks: false
})
