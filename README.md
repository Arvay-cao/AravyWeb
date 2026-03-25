# AravyWeb - 个人简历博客网站

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38bdf8?style=for-the-badge&logo=tailwind-css)

**一个功能完善的个人博客与作品集网站，支持文章管理、页面配置和后台管理**

[预览-website](https://aravy-web.netlify.app) · [预览-后台](https://app.netlify.com/projects/aravy-web)
<!-- · [文档](#) · [示例](#) -->
</div>

---

## 📖 目录

- [简介](#-简介)
- [特性亮点](#-特性亮点)
- [技术栈](#-技术栈)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [配置指南](#-配置指南)
- [开发指南](#-开发指南)
- [构建与部署](#-构建与部署)
- [性能优化](#-性能优化)
- [常见问题](#-常见问题)
- [贡献](#-贡献)
- [许可证](#-许可证)

---

## ✨ 简介

AravyWeb 是一个功能完善的个人简历博客网站，集成了文章管理、页面配置和后台管理系统。它采用现代化的 React 技术栈，提供流畅的用户体验和丰富的交互功能，适合开发者、设计师、内容创作者等需要展示个人作品和分享知识的场景。

### 设计理念

- **🎨 简洁优雅**: 清晰的视觉层次和流畅的交互体验
- **⚡ 性能卓越**: 优化的加载性能和渲染效率
- **🔧 易于管理**: 完整的后台管理系统，支持文章和页面配置
- **♿ 无障碍访问**: 支持减少动画偏好，触屏设备自适应
- **📱 响应式设计**: 移动优先，完美适配各种设备

---

## 🚀 特性亮点

### 核心功能模块

| 模块 | 描述 | 关键特性 |
|------|------|----------|
| **博客系统** | 完整的文章管理功能 | Markdown 编辑器、草稿/发布/隐藏状态、标签管理、搜索功能 |
| **后台管理** | 可视化内容管理界面 | 登录认证、文章管理、页面配置、拖拽排序 |
| **首页配置** | Hero 区域个性化定制 | 个人信息、头像、标语、社交链接、背景配置 |
| **关于页面** | 个人介绍与技能展示 | 个人简介、技能列表、项目经历、数据统计、图库展示 |
| **项目展示** | 作品集展示 | 项目卡片、技术栈标签、链接跳转、图片画廊 |
| **联系表单** | 访客联系方式 | 邮箱、社交媒体、留言功能 |
| **页脚配置** | 底部信息管理 | 版权信息、社交链接、快速导航 |

### 高级特性

- 📝 **Markdown 编辑器**: 富文本编辑 + 实时预览，支持代码高亮
- 🖼️ **图片上传**: Base64 格式自动转换，限制 5MB，类型验证
- 🎭 **拖拽排序**: About 页面图片和统计数据支持拖拽调整顺序
- 🔐 **权限管理**: 后台管理系统登录认证，session 状态保持
- 💾 **本地存储**: 数据保存在 localStorage，清除缓存可重置
- ♿ **无障碍支持**: 支持 `prefers-reduced-motion` 媒体查询
- 📦 **配置驱动**: 页面内容通过配置文件管理，逻辑与内容分离

---

## 🛠️ 技术栈

### 前端核心

| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | 19.2.0 | UI 框架 |
| **TypeScript** | 5.9.3 | 类型系统 |
| **Vite** | 7.2.4 | 构建工具 |
| **React Router DOM** | 7.13.1 | 路由管理 |

### 样式与动画

| 技术 | 版本 | 用途 |
|------|------|------|
| **Tailwind CSS** | 3.4.19 | 原子化 CSS |
| **GSAP** | 3.14.2 | 动画引擎 |
| **Lenis** | 1.0.42 | 平滑滚动 |
| **PostCSS** | 8.5.6 | CSS 处理 |
| **Autoprefixer** | 10.4.23 | CSS 前缀补全 |

### UI 组件库

- **Radix UI**: 可访问的 UI 原语（Dialog、Select、Tabs 等 20+ 组件）
- **shadcn/ui**: 精美的基础组件样式
- **Lucide React**: 现代化图标库

### 表单与验证

- **React Hook Form**: 高性能表单处理
- **Zod**: TypeScript 优先的模式验证

### Markdown 支持

- **react-markdown**: Markdown 渲染引擎
- **remark-gfm**: GitHub 风格 Markdown 扩展
- **rehype-highlight**: 代码语法高亮

### 交互增强

- **@dnd-kit/core**: 拖拽排序功能
- **Embla Carousel**: 轮播组件
- **Recharts**: 数据可视化图表

---

## 🎯 快速开始

### 环境要求

- **Node.js**: 18.0 或更高版本
- **npm**: 9.0 或更高版本
- **浏览器**: 现代浏览器（Chrome/Firefox/Safari 最新版）

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/yourusername/aravyweb.git
cd aravyweb
```

#### 2. 安装依赖

```bash
npm install
```

#### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

#### 4. 准备图片资源

将图片文件放置于 `public/images/` 目录：

```
public/images/
├── avatar.png               # 个人头像
├── hero-bg.jpg              # 首页背景图
├── about-*.jpg              # About 页面图片（多张）
├── project-*.jpg            # 项目展示图片
└── blog-cover-*.jpg         # 博客封面图
```

---

## 📁 项目结构

```
aravyweb/
├── public/
│   └── images/                  # 静态图片资源
├── src/
│   ├── components/              # 通用组件
│   │   ├── ui/                  # shadcn/ui 基础组件
│   │   ├── RichTextEditor.tsx   # 富文本编辑器
│   │   └── MarkdownPreview.tsx  # Markdown 预览器
│   ├── config/                  # 配置文件
│   │   └── siteConfig.ts        # 全站配置
│   ├── hooks/                   # 自定义 Hooks
│   │   ├── useLenis.ts          # 平滑滚动 Hook
│   │   └── useScrollTrigger.ts  # 滚动触发 Hook
│   ├── pages/                   # 页面组件
│   │   ├── BlogEdit.tsx         # 博客编辑页
│   │   ├── BlogDetail.tsx       # 博客详情页
│   │   ├── BlogList.tsx         # 博客列表页
│   │   ├── Admin.tsx            # 后台管理页
│   │   ├── AdminLogin.tsx       # 管理员登录页
│   │   └── ConfigPage.tsx       # 页面配置页
│   ├── sections/                # 页面区块组件
│   │   ├── Hero.tsx             # Hero 区域
│   │   ├── About.tsx            # About 区域
│   │   ├── Projects.tsx         # 项目展示区域
│   │   ├── Skills.tsx           # 技能展示区域
│   │   └── Contact.tsx          # 联系区域
│   ├── types/                   # TypeScript 类型定义
│   ├── utils/                   # 工具函数
│   ├── lib/                     # 第三方库封装
│   ├── App.tsx                  # 应用入口组件
│   ├── main.tsx                 # React 渲染入口
│   └── index.css                # 全局样式
├── docs/                        # 文档目录
├── index.html                   # HTML 模板
├── package.json                 # 项目配置与依赖
├── tsconfig.json                # TypeScript 配置
├── tailwind.config.js           # Tailwind 配置
├── vite.config.ts               # Vite 配置
└── README.md                    # 项目说明文档
```

---

## ⚙️ 配置指南

### 后台管理系统

#### 登录信息

- **访问地址**: `/admin/login`
- **默认账号**: admin / admin123

#### 博客管理功能

访问路径：`/admin/blog`

**文章状态**:
- **草稿 (draft)**: 已保存但未发布
- **已发布 (published)**: 公开可见的文章
- **已隐藏 (hidden)**: 已下架的文章，仅管理员可见

**核心功能**:
- ✅ 创建新文章
- ✅ 编辑文章 (支持草稿和已发布文章)
- ✅ 保存草稿
- ✅ 发布文章
- ✅ 隐藏/下架文章 (从公开列表移除)
- ✅ 恢复已隐藏文章
- ✅ 删除文章 (永久删除)
- ✅ 搜索文章 (按标题或标签)
- ✅ 预览功能

**使用流程**:

**发布新文章**:
1. 点击"写文章"
2. 填写标题、内容、摘要、封面图、标签
3. 可先"保存草稿"
4. 确认无误后点击"发布"

**隐藏文章**:
1. 在博客管理页面，切换到"已发布"标签
2. 点击文章右侧的"眼睛"图标
3. 确认后文章移至"已隐藏"标签

**恢复文章**:
1. 在"已隐藏"标签页找到文章
2. 点击"归档"图标即可恢复

**编辑文章**:
1. 在任何标签页点击文章的编辑图标
2. 修改后保存草稿或直接发布

#### 页面样式配置

访问路径：`/admin/config`

**配置模块**:
- 首页配置 (Hero): `/admin/config/hero`
- 关于配置 (About): `/admin/config/about`
- 项目配置 (Projects): `/admin/config/projects`
- 技能配置 (Skills): `/admin/config/skills`
- 联系配置 (Contact): `/admin/config/contact`
- 页脚配置 (Footer): `/admin/config/footer`

**配置方式**:
1. 选择对应配置模块
2. 修改表单中的字段
3. 点击"保存"按钮
4. 配置保存在 localStorage

**拖拽排序功能**:
在 `/admin/config/about` 页面，支持：
- **图片拖拽**: 调整图库图片顺序
- **统计拖拽**: 调整统计数据顺序
- 操作方法：拖拽手柄到目标位置，松开鼠标，点击"保存"

### 数据存储

- **博客文章**: localStorage (`portfolio_blog_posts`)
- **站点配置**: localStorage (`portfolio_site_config`)
- **登录状态**: sessionStorage

### 注意事项

1. 数据仅保存在浏览器本地，清除缓存会丢失数据
2. 实际生产环境需要后端 API 支持
3. 隐藏的文章仍可通过直接链接访问 (管理员模式)
4. 建议定期备份重要数据

---

## 💻 开发指南

### 可用脚本

```bash
# 启动开发服务器（热重载）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行代码检查
npm run lint
```

### 开发工作流

#### 1. 本地开发

```bash
npm run dev
```

开发服务器启动后，修改代码或配置会自动刷新浏览器。

#### 2. 添加新页面

在 `src/pages/` 目录创建新组件，并在 `App.tsx` 中添加路由：

```tsx
// App.tsx
<Route path="/new-page" element={<NewPage />} />
```

#### 3. 添加新组件

在 `src/components/` 目录创建组件，遵循现有组件的代码风格。

#### 4. 自定义样式

- **全局样式**: 编辑 `src/index.css`
- **组件样式**: 使用 Tailwind 类名或 CSS Modules
- **主题配置**: 修改 `tailwind.config.js`

### 代码规范

#### TypeScript 规范

- ✅ **禁止使用 `any`**: 必须使用具体类型定义或泛型
- ✅ **Hooks 规则**: Hooks 必须在组件顶层调用
- ✅ **声明顺序**: 变量和函数必须在 Hook 之前声明

示例：

```typescript
// ❌ 错误：使用 any
const data: any = fetchData();

// ✅ 正确：使用具体类型
interface Data { id: number; name: string }
const data: Data = fetchData();
```

#### React Hooks 规范

```typescript
// ❌ 错误：在 early return 后调用 Hook
function Component({ condition }) {
  if (!condition) return null;
  const [state, setState] = useState(); // 错误！
}

// ✅ 正确：在顶层调用
function Component({ condition }) {
  const [state, setState] = useState();
  if (!condition) return null;
}
```

### 富文本编辑器

项目集成了 Markdown 富文本编辑器，支持：

- **工具栏操作**: 加粗、斜体、标题、代码块、引用、列表、链接、图片上传
- **图片上传**: 自动转 Base64，限制 5MB，验证类型
- **代码高亮**: 支持 100+ 编程语言
- **双模式**: Markdown 源码 + 可视化预览

使用方法：

```tsx
import { RichTextEditor } from '@/components/RichTextEditor';
import { MarkdownPreview } from '@/components/MarkdownPreview';

// 编辑器
<RichTextEditor value={content} onChange={setContent} />

// 预览器
<MarkdownPreview content={content} />
```

详细文档见 [`README_EDITOR.md`](./docs/README_EDITOR.md)。

### 拖拽排序

About 配置页面实现了图片和统计数据的拖拽排序：

- **技术栈**: @dnd-kit/core, @dnd-kit/sortable
- **使用方式**: 在 `/admin/config/about` 页面拖拽手柄调整顺序
- **持久化**: 点击"保存"按钮保存到 localStorage

实现细节见 [关于配置拖拽排序功能](./docs/drag-and-drop.md)。

---

## 🏗️ 构建与部署

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 本地预览生产构建

```bash
npm run preview
```

### 部署方式

#### 方案 1: Vercel（推荐）

1. 安装 Vercel CLI：

```bash
npm i -g vercel
```

2. 部署：

```bash
vercel
```

3. 按照提示完成部署。

#### 方案 2: Netlify

1. 安装 Netlify CLI：

```bash
npm i -g netlify-cli
```

2. 构建并部署：

```bash
npm run build
netlify deploy --prod --dir=dist
```

#### 方案 3: 静态托管

将 `dist/` 目录上传到任意静态托管服务（如 GitHub Pages、阿里云 OSS、腾讯云 COS）。

**GitHub Pages 示例**：

```bash
# 安装 gh-pages
npm i -D gh-pages

# 部署
npm run build
npx gh-pages -d dist
```

### 环境变量

如需配置环境变量，在项目根目录创建 `.env` 文件：

```env
VITE_API_URL=https://api.example.com
VITE_SITE_NAME=AravyWeb
```

在代码中通过 `import.meta.env.VITE_API_URL` 访问。

---

## ⚡ 性能优化

### 图片优化

- **格式建议**: 使用 WebP 格式（体积比 JPEG 小 30%）
- **尺寸控制**: 单张图片建议控制在 500KB 以内
- **Base64 警告**: 避免使用过大的 Base64 图片（可能导致渲染卡顿）

### 动画性能

- **减少动画**: 系统自动检测 `prefers-reduced-motion` 设置
- **GPU 加速**: GSAP 动画默认使用 GPU 加速
- **懒加载**: 滚动触发动画仅在可见时执行

### 代码分割

Vite 自动进行代码分割，优化首屏加载速度。

### 构建优化

```bash
# 分析打包体积
npm run build -- --stats

# 使用 vite-bundle-visualizer
npx vite-bundle-visualizer
```

---

## ❓ 常见问题

### Q1: 图片无法显示？

**检查清单**：

1. 图片路径是否正确（相对于 `public/` 目录）
2. 图片文件是否存在
3. 控制台是否有图片加载错误
4. Base64 格式是否完整（包含 `data:image/png;base64,` 头）
5. 执行 `npm run build` 检查是否有 TypeScript 编译错误

**解决方案**：

```bash
# 构建检查
npm run build

# 查看控制台错误
npm run dev
```

### Q2: 动画不流畅？

**可能原因**：

- 浏览器性能不足
- 开启了"减少动画"辅助功能
- GSAP ScrollTrigger 未正确初始化

**排查步骤**：

1. 检查浏览器控制台错误
2. 禁用浏览器扩展
3. 清除缓存重新加载

### Q3: 配置修改后未生效？

**检查点**：

1. 是否保存了配置文件
2. 开发服务器是否热重载
3. 配置对象是否正确导出
4. localStorage 数据是否冲突（尝试清除缓存）

### Q4: 拖拽排序后顺序恢复？

**解决方案**：

1. 确保使用正确的策略（网格用 `rectSortingStrategy` + 直接交换位置）
2. 检查是否在拖拽结束后调用保存函数
3. 使用 `useCallback` 包裹事件处理器防止重复触发
4. 执行 `npm run build` 排除编译错误

详细故障排查指南见 [拖拽排序故障排查](./docs/drag-and-drop-troubleshooting.md)。

### Q5: 如何在生产环境使用后端 API？

当前项目是纯静态站点，数据存储于 localStorage。如需后端支持：

1. 创建 API 服务层（`src/services/api.ts`）
2. 替换 localStorage 操作为 API 调用
3. 添加用户认证逻辑
4. 配置环境变量管理 API 地址

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 遵循现有的 ESLint 和 Prettier 配置
- 为新功能添加 TypeScript 类型定义
- 更新相关文档
- 确保构建通过 (`npm run build`)

---

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。

---

## 🙏 致谢

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [Lenis](https://github.com/studio-freight/lenis)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

**Made with ❤️ by Aravy Cao**

[返回顶部](#aravyweb---个人简历博客网站)

</div>
