# VitePress + 阿里云 OSS + CDN 文档网站搭建计划

## Context

搭建一个基于 VitePress 的技术文档网站，部署在阿里云 OSS 上作为静态网站托管，通过 CDN 提供 HTTPS 访问。
文档同时作为人类阅读的技术资料和 AI 外挂知识库使用（Markdown 源文件可直接被 AI 读取）。

- **域名**：已注册，ICP 备案已通过
- **目标**：低维护成本、低成本运行、支持 HTTPS、对 AI 友好

---

## 一、整体架构

```
用户浏览器 --HTTPS--> 阿里云 CDN (SSL证书) --HTTP回源--> 阿里云 OSS (静态网站托管)
                                                                      │
                                                              VitePress dist/ 产物
                                                                      ▲
                                                              本地/CI build + upload
```

## 二、实施步骤

### 第 1 步：VitePress 项目初始化与配置

**目标**：在本地创建可运行的 VitePress 项目，配置基础站点信息。

**具体操作**：

1. 初始化 Node.js 项目，安装 VitePress
2. 创建目录结构：
   ```
   OSS_Doc/
   ├── docs/
   │   ├── .vitepress/
   │   │   ├── config.ts          # 站点配置（标题、导航、侧边栏、搜索）
   │   │   └── theme/
   │   │       └── index.ts       # 自定义主题（可选）
   │   ├── index.md               # 首页
   │   ├── guide/                 # 技术指南目录
   │   │   ├── index.md
   │   │   └── getting-started.md
   │   ├── reference/             # 参考文档目录
   │   │   └── index.md
   │   └── public/                # 静态资源（favicon、logo等）
   ├── package.json
   └── deploy.sh                  # 部署脚本（后面创建）
   ```

3. 配置 `config.ts`：
   - `title`：网站标题
   - `description`：网站描述
   - `themeConfig.nav`：顶部导航
   - `themeConfig.sidebar`：侧边栏
   - `themeConfig.search`：本地搜索
   - `base`：如部署在根路径则为 `/`
   - `cleanUrls`：是否使用干净 URL（OSS 静态托管不支持，建议关闭）

4. 配置 `package.json` 脚本：
   ```json
   {
     "scripts": {
       "dev": "vitepress dev docs",
       "build": "vitepress build docs",
       "preview": "vitepress preview docs"
     }
   }
   ```

5. 验证：`npm run dev` 本地启动成功，浏览器可访问

---

### 第 2 步：阿里云 OSS Bucket 创建与配置

**目标**：创建 OSS Bucket 并开启静态网站托管模式。

**具体操作**：

1. 登录阿里云控制台 → 对象存储 OSS → 创建 Bucket
   - **Bucket 名称**：建议 `docs-<your-domain>` 风格
   - **Region**：选择离你和同事最近的区域（国内建议华东/华北）
   - **存储类型**：标准存储
   - **读写权限**：公共读（Private 无法对外访问）**← 重要！**
   - **其他**：默认即可

2. 开启静态网站托管：
   - 进入 Bucket → 数据管理 → 静态页面
   - **默认首页**：`index.html`
   - **默认 404 页**：`404.html`（VitePress 构建产物中有）

3. 配置 Bucket 的防盗链与跨域（可选）：
   - CORS 设置：允许 `*` 或你的域名，方便浏览器访问

---

### 第 3 步：CDN + HTTPS 配置

**目标**：为你的域名配置 CDN 加速和 SSL 证书，实现 HTTPS 访问。

> 这是解决 OSS 静态托管不支持 HTTPS 的关键步骤。

**具体操作**：

1. 登录阿里云控制台 → CDN → 添加域名
   - **加速域名**：填入你的文档域名，如 `docs.yourdomain.com`
   - **业务类型**：图片小文件
   - **源站信息**：OSS 域名（下拉选择你刚创建的 Bucket），端口选 80
   - 其他保持默认

2. 等待 CDN 域名配置生效（约 5-10 分钟），系统会生成一个 CNAME 域名

3. DNS 解析配置：
   - 进入你的域名 DNS 管理后台（阿里云 DNS 或其他）
   - 添加 CNAME 记录：
     - **主机记录**：`docs`（对应 docs.yourdomain.com）
     - **记录类型**：CNAME
     - **记录值**：CDN 生成的 CNAME 地址

4. HTTPS 证书配置：
   - 在 CDN 控制台 → 域名管理 → 你的域名 → HTTPS 配置
   - **方案一（推荐，免费）**：申请阿里云免费 DV 证书（DigiCert），有效期 1 年，支持自动续签
   - **方案二**：如果你已有证书（如 Let's Encrypt），上传证书
   - 开启 HTTPS 安全加速，建议配置：
     - **强制跳转**：HTTP → HTTPS（308 跳转）
     - **TLS 版本**：TLS 1.2 + 1.3

5. 验证：访问 `https://docs.yourdomain.com`，看到绿色锁，网站正常加载

---

### 第 4 步：编写部署脚本

**目标**：一条命令完成「构建 → 上传 OSS → 刷新 CDN」全流程。

**具体操作**：

1. 安装阿里云 CLI 工具 `ossutil`（OSS 上传）和 `aliyun` CLI（CDN 刷新）：
   ```bash
   # 安装 ossutil (macOS)
   brew install ossutil
   # 或在阿里云官网下载

   # 安装 aliyun CLI
   brew install aliyun-cli
   ```

2. 配置认证（只需一次）：
   ```bash
   ossutil config
   # 按提示输入 AccessKey ID、AccessKey Secret、Endpoint

   aliyun configure
   # 同上
   ```

3. 创建 `deploy.sh` 部署脚本：
   ```bash
   #!/bin/bash
   set -e

   echo "🔨 Building VitePress..."
   npm run build

   echo "📤 Uploading to OSS..."
   ossutil cp -r docs/.vitepress/dist/ oss://<bucket-name>/ --update

   echo "🔄 Refreshing CDN..."
   aliyun cdn RefreshObjectCaches \
     --ObjectPath https://docs.yourdomain.com/ \
     --ObjectType Directory

   echo "✅ Deploy complete!"
   ```

4. 赋予执行权限：`chmod +x deploy.sh`

5. 测试：运行 `./deploy.sh`，确认构建、上传、刷新均成功

---

### 第 5 步：AI 知识库友好设计

**目标**：让文档既能给人看，也能给 AI 当知识库用。

**具体操作**：

1. Markdown 源文件结构化：
   - 每个页面有清晰的标题层级（`#` → `##` → `###`）
   - 代码块标注语言类型（` ```python ` 而非 ` ``` `）
   - 重要概念用 `**加粗**` 标记

2. 提供一个 `llms.txt` 或 `AI.md` 索引文件（可选但推荐）：
   - 列出所有文档页面的 URL 和简介
   - AI agent 可以一次性抓取到这个索引，了解全站结构

3. 考虑生成一个单文件合并版本（可选）：
   - 将所有文档合并为一个 `all.md`，方便直接喂给 AI 上下文窗口

---

### 第 6 步：可选优化

| 优化项 | 说明 | 优先级 |
|--------|------|--------|
| **GitHub Actions 自动部署** | push 到 main 分支自动触发构建→上传→刷新 | 中 |
| **CDN 缓存规则优化** | HTML 文件短缓存（60s），静态资源长缓存（30d） | 中 |
| **OSS 版本管理** | 每次部署保留一份 dist 备份到 OSS 的版本目录 | 低 |
| **访问日志** | 开启 CDN 实时日志，查看访问统计 | 低 |
| **自定义 404 页面** | VitePress 默认就有，确认能用即可 | 低 |
| **SEO 优化** | `config.ts` 中配置好 description、og 信息 | 低 |

---

## 三、验证清单

- [ ] `npm run dev` 本地可访问
- [ ] `npm run build` 构建成功
- [ ] OSS Bucket 创建，静态托管开启，公共读权限
- [ ] CDN 加速域名配置，状态为「已启用」
- [ ] DNS CNAME 解析生效，域名正确指向 CDN
- [ ] `https://你的域名` 可访问，显示绿色锁
- [ ] `./deploy.sh` 一键部署成功
- [ ] CDN 刷新后新内容立即可见

---

## 四、预估成本

| 资源 | 月费用估算 |
|------|-----------|
| OSS 存储（100MB） | ~0.01 元 |
| OSS 外网流出流量（10GB/月） | ~2.5 元 |
| CDN 流量（10GB/月） | ~2.4 元 |
| CDN HTTPS 请求 | 免费额度内 |
| SSL 证书（阿里云免费 DV） | 0 元 |
| **合计** | **约 5 元/月** |
