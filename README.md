# 🍅 口感番茄知识库

口感番茄种植技术知识库，基于 VitePress 构建，遵循 [OKF（Open Knowledge Format）](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) v0.1 规范。网站部署于阿里云 OSS + CDN，同时作为 AI 智能体的外挂知识库运行在 ECS 上。

🔗 **网站**: [https://docs.wehifun.cn](https://docs.wehifun.cn)

---

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                      飞书组织用户                            │
│                  "釜山88什么时候定植？"                       │
└─────────────────────┬───────────────────────────────────────┘
                      │ Lark Bridge
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              ECS 服务器 (阿里云)                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │    Claude Code + DeepSeek v4 Pro                     │    │
│  │    ┌──────────────────────────────────────────┐     │    │
│  │    │  CLAUDE.md: 种植/农业问题 → 检索知识库   │     │    │
│  │    └──────────────────────────────────────────┘     │    │
│  │    ┌──────────────────────────────────────────┐     │    │
│  │    │  OKF Bundle (docs/ 目录)                  │     │    │
│  │    │  ├── index.md    ├── 品种和育苗/         │     │    │
│  │    │  ├── log.md      ├── 产区和茬口/         │     │    │
│  │    │  └── ...         └── ...                 │     │    │
│  │    └──────────────────────────────────────────┘     │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                      ▲ GitHub Action (SCP 同步)
                      │
┌─────────────────────────────────────────────────────────────┐
│              GitHub Actions                                  │
│  npm build → OSS + CDN (网站) → SCP → ECS (知识库同步)     │
└─────────────────────────────────────────────────────────────┘
```

---

## OKF 合规说明

本知识库完全遵循 Google Cloud 发布的 OKF v0.1 规范：

| 要求 | 状态 |
|------|------|
| 每篇文档含 YAML frontmatter + `type` 字段 | ✅ |
| `index.md` 为目录列表（无 frontmatter） | ✅ |
| `log.md` 变更日志 | ✅ |
| Markdown 链接构建知识图谱 | ✅ |
| `llms.txt` 提供 AI 索引入口 | ✅ |

**渐进式检索路径**：AI Agent 先读 `index.md`（全站目录）→ 按需进入章节 `index.md` → 定位具体文档。三层索引，无需一次加载全部文件。

---

## 技术栈

- **网站框架**: [VitePress](https://vitepress.dev/) v1.6+
- **静态托管**: 阿里云 OSS + CDN
- **知识规范**: [OKF v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
- **AI 消费**: Claude Code + DeepSeek v4 Pro（ECS）+ Lark Bridge（飞书集成）
- **CI/CD**: GitHub Actions

---

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

---

## 文档结构

```
docs/
├── index.md                        # OKF 根目录索引（全站目录）
├── log.md                          # 变更日志
├── public/
│   ├── logo.svg
│   ├── robots.txt
│   └── llms.txt                    # AI 知识库索引（与 OKF 互补）
│
├── 品种和育苗/                      # 品种选育与育苗技术
│   ├── index.md                    # 章节目录
│   ├── 红果/（釜山88、高俪红、首而红、圣宏2号）
│   ├── 黄果/（明珠3号）
│   ├── 绿果/（青甜）
│   └── 其他颜色/（358）
│
├── 基础条件/                        # 设施、栽培与灌溉基础
│   ├── index.md
│   ├── 设施类型/（露地、小拱棚、连栋拱棚、日光温室）
│   ├── 栽培类型/（土壤栽培、基质栽培）
│   └── 水系条件/（灌溉首部、滴灌系统、滴箭系统）
│
├── 产区和茬口/                      # 产区分布与种植茬口
│   ├── index.md
│   ├── 产区/（宁夏、山东、广东）
│   ├── 茬口/（越夏、秋延、越冬、春延）
│   ├── 价格趋势/（全年价格趋势、销售渠道）
│   └── 产业模式/（6 个产区×茬口种植模式）
│
├── 种植过程/                        # 定植到采收全流程
│   ├── index.md
│   ├── 定植前准备/
│   ├── 水肥管理/
│   ├── 环境管理/
│   ├── 农事管理/
│   └── 病虫害管理/
│
├── 采后处理/                        # 采收后加工处理
│   ├── index.md
│   ├── 采收/（采收前准备、标准化采收流程）
│   ├── 清洗与消杀/
│   ├── 分拣/
│   ├── 预冷/
│   ├── 后熟/
│   ├── 包装/
│   ├── 存储/
│   ├── 运输/（一次运输、二次运输）
│   └── 配套设施/
│
└── 示例/                            # 模板与参考
    ├── index.md
    ├── 智能问答/（基于知识库的问答模板）
    ├── 种植计划/（以周为单位的种植计划模板）
    ├── 病虫害防治/（常见病虫害防治模板）
    └── ROI分析/（宁夏产区小拱棚越夏茬口种植ROI分析模板）
```

### Type 分类体系

| type 值 | 适用内容 |
|---------|---------|
| `品种` | 品种和育苗下的品种文件 |
| `设施类型` | 基础条件/设施类型 |
| `栽培类型` | 基础条件/栽培类型 |
| `水系条件` | 基础条件/水系条件 |
| `产区` | 产区和茬口/产区 |
| `茬口` | 产区和茬口/茬口 |
| `价格趋势` | 产区和茬口/价格趋势 |
| `产业模式` | 产区和茬口/产业模式 |
| `种植技术` | 种植过程下各环节 |
| `采后处理` | 采后处理下各环节 |
| `模板` | 示例下各模板 |

---

## 部署

### 自动部署（推荐）

Push 到 `main` 分支后，GitHub Actions 自动：
1. 构建 VitePress → 上传 OSS + 刷新 CDN（网站部署）
2. SCP 同步 `docs/` 目录到 ECS（OKF 知识库更新）

### ECS 集成配置

在 GitHub Secrets 中配置以下密钥：

| Secret | 说明 |
|--------|------|
| `ALIBABA_CLOUD_ACCESS_KEY_ID` | 阿里云 AccessKey（已有） |
| `ALIBABA_CLOUD_ACCESS_KEY_SECRET` | 阿里云 SecretKey（已有） |
| `ECS_HOST` | ECS 服务器 IP 或域名 |
| `ECS_USER` | SSH 登录用户名 |
| `ECS_SSH_KEY` | SSH 私钥（ECS 上需配置对应公钥） |

ECS 侧需提前准备：
```bash
# 在 ECS 上执行
mkdir -p /home/claude/knowledge/tomato-doc/docs/
# 生成密钥对
ssh-keygen -t ed25519 -f ~/.ssh/github-actions
cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys
# 将私钥内容存入 GitHub Secrets → ECS_SSH_KEY
```

### 手动部署

```bash
./deploy.sh
```

---

## ECS 侧 CLAUDE.md 配置

在 ECS 上 Claude Code 的工作目录下创建/更新 `CLAUDE.md`：

```markdown
# 口感番茄知识库智能助手

## 知识库路径
`/home/claude/knowledge/tomato-doc/docs/`

## 检索规则
当用户提问涉及以下关键词时，优先检索知识库后回答：
- 番茄、小番茄、口感番茄、釜山88
- 种植、育苗、定植、施肥、水肥、病虫害
- 茬口、越夏、秋延、越冬、春延
- 采收、分拣、包装、预冷、存储、运输
- 产区：宁夏、山东、广东
- 设施：露地、小拱棚、连栋拱棚、日光温室
- 成本、收益、价格、ROI

## 检索路径（渐进式）
1. 先读 index.md → 了解知识库结构
2. 定位相关章节 → 读章节 index.md
3. 锁定具体文档 → 读完整内容
4. 引用数据时注明来源文件
```

---

## 协作

1. 克隆仓库：`git clone git@github.com:woshiyjy/OSS_Docs.git`
2. 创建分支：`git checkout -b feature/xxx`
3. 在 `docs/` 下对应分类目录中新建或编辑 `.md` 文件，确保包含 OKF frontmatter：
   ```yaml
   ---
   type: 品种
   title: 标题
   description: 一句话描述
   tags: [标签1, 标签2]
   timestamp: YYYY-MM-DD
   ---
   ```
4. 更新对应层级的 `index.md`（在目录列表中添加新文件链接）
5. 如需调整导航，编辑 `docs/.vitepress/config.ts`
6. 本地 `npm run dev` 预览确认后提交 PR，合并后自动部署

## 贡献者

- **袁静远** ([@woshiyjy](https://github.com/woshiyjy)) — 项目发起人 & 主要维护者
- **顾金** ([@787158783-arch](https://github.com/787158783-arch)) — 协作者

欢迎通过 Pull Request 贡献知识内容！
