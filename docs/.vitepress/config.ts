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
      { text: '种植手册', link: '/种植手册/' },
      { text: '植保', link: '/植保/' },
      { text: '采后处理', link: '/采后处理/' },
      { text: '产区和茬口', link: '/产区和茬口/' },
      { text: '工具模板', link: '/工具模板/' },
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
        {
          text: '劳动力',
          collapsed: false,
          items: [
            { text: '劳动力管理', link: '/基础条件/劳动力管理' },
          ]
        },
      ],

      // ========== 3. 种植手册 ==========
      '/种植手册/': [
        { text: '种植手册', link: '/种植手册/' },
        {
          text: '宁夏海原越夏',
          collapsed: false,
          items: [
            { text: '手册总览', link: '/种植手册/宁夏海原越夏/' },
            { text: '选址与茬口', link: '/种植手册/宁夏海原越夏/选址与茬口' },
            { text: '土地整备', link: '/种植手册/宁夏海原越夏/土地整备' },
            { text: '灌溉设施', link: '/种植手册/宁夏海原越夏/灌溉设施' },
            { text: '生长发育', link: '/种植手册/宁夏海原越夏/生长发育' },
            { text: '小拱棚生产', link: '/种植手册/宁夏海原越夏/小拱棚生产' },
            { text: '拉秧清园', link: '/种植手册/宁夏海原越夏/拉秧清园' },
          ]
        },
        {
          text: '山东基质',
          collapsed: false,
          items: [
            { text: '手册总览', link: '/种植手册/山东基质/' },
            { text: '农事管理', link: '/种植手册/山东基质/农事管理' },
            { text: '水肥管理', link: '/种植手册/山东基质/水肥管理' },
            { text: '水肥管理 FAQ', link: '/种植手册/山东基质/水肥管理FAQ' },
            { text: '病虫害管理', link: '/种植手册/山东基质/病虫害管理' },
          ]
        },
        {
          text: '宁夏中宁越夏',
          collapsed: false,
          items: [
            { text: '手册总览', link: '/种植手册/宁夏中宁越夏/' },
            { text: '选址与气候', link: '/种植手册/宁夏中宁越夏/选址与气候' },
            { text: '土地整备', link: '/种植手册/宁夏中宁越夏/土地整备' },
            { text: '灌溉设施', link: '/种植手册/宁夏中宁越夏/灌溉设施' },
            { text: '生长发育', link: '/种植手册/宁夏中宁越夏/生长发育' },
            { text: '大棚生产', link: '/种植手册/宁夏中宁越夏/大棚生产' },
            { text: '露地生产', link: '/种植手册/宁夏中宁越夏/露地生产' },
            { text: '拉秧清园', link: '/种植手册/宁夏中宁越夏/拉秧清园' },
          ]
        },
      ],

      // ========== 4. 植保 ==========
      '/植保/': [
        { text: '植保总览', link: '/植保/' },
        {
          text: '用药与调节',
          collapsed: false,
          items: [
            { text: '配药与控旺', link: '/植保/配药与控旺' },
            { text: '熊蜂安全用药指南', link: '/植保/熊蜂安全用药指南' },
          ]
        },
        {
          text: '病害',
          collapsed: false,
          items: [
            { text: '早疫病', link: '/植保/病害/早疫病' },
            { text: '晚疫病', link: '/植保/病害/晚疫病' },
            { text: '灰叶斑病', link: '/植保/病害/灰叶斑病' },
            { text: '叶霉病', link: '/植保/病害/叶霉病' },
            { text: '病毒病', link: '/植保/病害/病毒病' },
          ]
        },
        {
          text: '虫害',
          collapsed: false,
          items: [
            { text: '潜叶蛾', link: '/植保/虫害/潜叶蛾' },
            { text: '白粉虱', link: '/植保/虫害/白粉虱' },
          ]
        },
      ],

      // ========== 5. 采后处理 ==========
      '/采后处理/': [
        { text: '分类概述', link: '/采后处理/' },
        { text: '规程总则', link: '/采后处理/规程总则' },
        {
          text: '配套设施',
          collapsed: false,
          items: [
            { text: '加工单元规划', link: '/采后处理/配套设施/加工单元规划' },
            { text: '场址布局与功能区域', link: '/采后处理/配套设施/场址布局与功能区域' },
            { text: '冷藏库与温控空间建设', link: '/采后处理/配套设施/冷藏库与温控空间建设' },
            { text: '主要设备配置', link: '/采后处理/配套设施/主要设备配置' },
          ]
        },
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
          text: '质量管理',
          collapsed: false,
          items: [
            { text: '质量与安全管理', link: '/采后处理/质量管理/质量与安全管理' },
          ]
        },
      ],

      // ========== 6. 产区和茬口 ==========
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

      // ========== 7. 工具模板 ==========
      '/工具模板/': [
        { text: '工具模板', link: '/工具模板/' },
        {
          text: '智能问答',
          collapsed: false,
          items: [
            { text: '基于知识库的问答模板', link: '/工具模板/智能问答/基于知识库的问答模板' },
          ]
        },
        {
          text: '种植计划',
          collapsed: false,
          items: [
            { text: '以周为单位的种植计划模板', link: '/工具模板/种植计划/以周为单位的种植计划模板' },
          ]
        },
        {
          text: 'ROI分析',
          collapsed: false,
          items: [
            { text: '宁夏产区小拱棚越夏茬口种植ROI分析模板', link: '/工具模板/ROI分析/宁夏产区小拱棚越夏茬口种植ROI分析模板' },
          ]
        },
      ],
    },

    // 社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/woshiyjy/OSS_Docs' }],

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
