# 📖 技术文档站

基于 VitePress 构建的技术文档知识库，部署于阿里云 OSS + CDN。

🔗 **[https://docs.wehifun.cn](https://docs.wehifun.cn)**

## 技术栈

- **框架**: [VitePress](https://vitepress.dev/) — 静态站点生成器
- **存储**: 阿里云 OSS（对象存储）
- **加速**: 阿里云 CDN（HTTPS + 私有 Bucket 回源）
- **CI/CD**: GitHub Actions（push → 自动部署）

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 本地预览构建产物
npm run preview
```

## 部署

### 自动部署（推荐）

Push 到 `main` 分支后，GitHub Actions 自动构建并部署到 OSS + 刷新 CDN。

### 手动部署

```bash
./deploy.sh
```

## 项目结构

```
OSS_Doc/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # 站点配置
│   ├── guide/                  # 指南文档
│   │   ├── index.md
│   │   ├── getting-started.md
│   │   └── tomato-guide.md     # 海原越夏小番茄种植手册
│   ├── reference/              # 参考文档
│   ├── public/                 # 静态资源
│   │   ├── llms.txt            # AI 知识库索引
│   │   └── robots.txt
│   └── index.md                # 首页
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions 部署工作流
├── deploy.sh                   # 手动部署脚本
├── package.json
└── README.md
```

## 协作

1. 克隆仓库：`git clone git@github.com:woshiyjy/OSS_Docs.git`
2. 创建分支：`git checkout -b feature/xxx`
3. 编辑 `docs/` 下的 Markdown 文件
4. 提交 PR，合并后自动部署
