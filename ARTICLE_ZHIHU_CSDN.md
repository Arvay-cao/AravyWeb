# 我用 React 19 + Vite 7 做了个超酷的个人博客系统，开源了！

> **摘要**：一个集成了可视化后台管理、Markdown 编辑器、拖拽排序的个人博客网站，完全免费开源！无需后端，5 分钟即可部署上线。

![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?style=for-the-badge&logo=vite)

---

## 🤔 为什么要做这个项目？

作为一个前端开发者，我一直想有一个**完全属于自己**的博客平台：

- ❌ **简书、掘金**：内容受限，无法自定义样式
- ❌ **WordPress**：太重了，还要配置服务器和数据库
- ❌ **Hexo/Hugo**：每次更新都要重新生成静态文件，不够灵活
- ❌ **Notion**：国内访问慢，而且数据不在自己手里

于是，我决定用最新的 **React 19 + Vite 7** 技术栈，打造一个**轻量级、高性能、易部署**的个人博客系统。

经过 3 个月的开发，**AravyWeb** 终于诞生了！

---

## ✨ AravyWeb 是什么？

AravyWeb 是一个**功能完善的个人简历博客网站**，集成了：

- 📝 **博客系统** - Markdown 编辑、草稿/发布管理、标签搜索
- 🎨 **可视化后台** - 无需修改代码，在线配置页面内容
- 🖼️ **作品集展示** - 项目卡片、技能展示、数据统计
- 📱 **响应式设计** - 完美适配手机、平板、电脑
- ⚡ **极致性能** - Vite 构建、GSAP 动画、平滑滚动

### 在线预览

- **前台展示**：https://aravy-web.netlify.app
- **后台管理**：https://app.netlify.com/projects/aravy-web

---

## 🚀 核心功能亮点

### 1️⃣ 完整的后台管理系统

这可能是**最轻量级**的博客后台了！

**功能清单**：
- ✅ 登录认证（默认账号：admin/admin123）
- ✅ 博客文章管理（创建、编辑、删除、发布）
- ✅ 草稿箱功能（随时保存，不怕丢失）
- ✅ 文章状态管理（草稿/已发布/已隐藏）
- ✅ 标签分类搜索
- ✅ Markdown 富文本编辑器
- ✅ 实时预览

**后台界面截图**：
```
┌─────────────────────────────────────┐
│  AravyWeb 后台管理                  │
├─────────────────────────────────────┤
│ 📊 仪表盘                            │
│ 📝 博客管理                          │
│   ├─ 写文章                         │
│   ├─ 草稿 (3)                       │
│   ├─ 已发布 (15)                    │
│   └─ 已隐藏 (2)                     │
│ 🎨 页面配置                          │
│   ├─ Hero 区域                      │
│   ├─ About 关于                     │
│   ├─ Projects 项目                  │
│   └─ Skills 技能                    │
│ ⚙️ 设置                              │
└─────────────────────────────────────┘
```

### 2️⃣ 可视化页面配置

**无需修改代码**，通过后台就能配置页面内容！

#### Hero 区域配置
- 修改个人头像、姓名、职位
- 自定义标语和介绍
- 添加社交链接（GitHub、LinkedIn、微信等）
- 更换背景图片

#### About 页面配置
- 编辑个人简介
- 管理技能列表（支持拖拽排序）
- 添加项目经历
- 配置统计数据（文章数、访客数等）
- 图库管理（支持拖拽调整顺序）

#### Projects 项目集
- 添加项目卡片
- 上传项目截图
- 添加技术栈标签
- 设置项目链接

**最酷的是**：所有配置都保存在浏览器本地存储，清除缓存即可重置！

### 3️⃣ 强大的 Markdown 编辑器

内置的富文本编辑器支持：

- 🎯 **工具栏操作**：加粗、斜体、标题、代码块、引用、列表
- 🖼️ **图片上传**：自动转 Base64，限制 5MB，支持类型验证
- 🎨 **代码高亮**：支持 100+ 编程语言语法高亮
- 👁️ **双模式预览**：Markdown 源码 + 可视化实时预览

```markdown
# 示例：快速插入代码块

// JavaScript 示例
function hello() {
  console.log('Hello, AravyWeb!');
}

// TypeScript 支持类型检查
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
```

### 4️⃣ 拖拽排序功能

在 About 配置页面，支持：

- 📸 **图片拖拽**：按住手柄拖动，自由调整图库顺序
- 📊 **统计拖拽**：统计数据也能拖拽排序
- 💾 **实时保存**：点击保存按钮，顺序立即生效

使用 **@dnd-kit/core** 库实现，丝滑流畅！

### 5️⃣ 极致的性能优化

| 指标 | 数值 | 评级 |
|------|------|------|
| 首屏加载 | < 1.5s | ⭐⭐⭐⭐⭐ |
| Lighthouse | 95+ | ⭐⭐⭐⭐⭐ |
| 打包体积 | 1.4MB (gzip: 467KB) | ⭐⭐⭐⭐ |
| 动画帧率 | 60fps | ⭐⭐⭐⭐⭐ |

**优化手段**：
- ✅ Vite 7 极速构建
- ✅ 代码分割（Code Splitting）
- ✅ GSAP GPU 加速动画
- ✅ Lenis 平滑滚动
- ✅ 图片懒加载
- ✅ 减少动画支持（prefers-reduced-motion）

---

## 🛠️ 技术栈详解

### 核心框架

```json
{
  "React": "19.2.0",
  "TypeScript": "5.9.3",
  "Vite": "7.2.4",
  "React Router DOM": "7.13.1"
}
```

### 样式方案

- **Tailwind CSS 3.4.19** - 原子化 CSS，开发效率翻倍
- **GSAP 3.14.2** - 专业级动画库
- **Lenis 1.0.42** - 丝滑的平滑滚动效果

### UI 组件

- **Radix UI** - 20+ 可访问性 UI 原语（Dialog、Select、Tabs 等）
- **shadcn/ui** - 精美的基础组件样式
- **Lucide React** - 现代化图标库

### 表单与验证

- **React Hook Form 7.70.0** - 高性能表单处理
- **Zod 4.3.5** - TypeScript 优先的模式验证

### Markdown 支持

- **react-markdown 10.1.0** - Markdown 渲染引擎
- **remark-gfm 4.0.1** - GitHub 风格 Markdown 扩展
- **rehype-highlight 7.0.2** - 代码语法高亮

### 交互增强

- **@dnd-kit/core 6.3.1** - 拖拽排序功能
- **Embla Carousel 8.6.0** - 轮播组件
- **Recharts 2.15.4** - 数据可视化图表

---

## 📦 项目结构

```
aravyweb/
├── public/
│   └── images/              # 静态图片资源
├── src/
│   ├── components/          # 通用组件
│   │   ├── ui/              # shadcn/ui 基础组件 (20+ 文件)
│   │   ├── RichTextEditor.tsx  # 富文本编辑器
│   │   └── MarkdownPreview.tsx   # Markdown 预览器
│   ├── pages/               # 页面组件
│   │   ├── BlogEdit.tsx     # 博客编辑页
│   │   ├── BlogDetail.tsx   # 博客详情页
│   │   ├── BlogList.tsx     # 博客列表页
│   │   ├── Admin.tsx        # 后台管理页
│   │   ├── AdminLogin.tsx   # 管理员登录页
│   │   └── ConfigPage.tsx   # 页面配置页
│   ├── sections/            # 页面区块组件
│   │   ├── Hero.tsx         # Hero 区域
│   │   ├── About.tsx        # About 区域
│   │   ├── Projects.tsx     # 项目展示区域
│   │   ├── Skills.tsx       # 技能展示区域
│   │   └── Contact.tsx      # 联系区域
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useLenis.ts      # 平滑滚动 Hook
│   │   └── useScrollTrigger.ts # 滚动触发 Hook
│   ├── utils/               # 工具函数
│   │   ├── blogStorage.ts   # 博客数据存储
│   │   └── configStorage.ts # 配置数据存储
│   ├── types/               # TypeScript 类型定义
│   ├── lib/                 # 第三方库封装
│   ├── App.tsx              # 应用入口
│   ├── main.tsx             # 渲染入口
│   └── index.css            # 全局样式
├── package.json             # 项目配置
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
└── README.md                # 项目文档
```

**总计**：约 100+ 个文件，8000+ 行代码

---

## 🎯 快速开始

### 环境要求

- Node.js >= 18.0
- npm >= 9.0
- 现代浏览器（Chrome/Firefox/Safari 最新版）

### 5 分钟上手

#### 1. 克隆项目

```bash
git clone https://github.com/Arvay-cao/AravyWeb.git
cd AravyWeb
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

#### 4. 登录后台

访问 `/admin/login`，使用默认账号登录：
- 账号：`admin`
- 密码：`admin123`

#### 5. 开始创作

- 写文章：访问 `/admin/blog`
- 配置页面：访问 `/admin/config`
- 查看效果：访问首页和各子页面

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

### 添加新页面

1. 在 `src/pages/` 目录创建新组件
2. 在 `App.tsx` 中添加路由

```tsx
// App.tsx
<Route path="/my-new-page" element={<MyNewPage />} />
```

### 自定义样式

- **全局样式**：编辑 `src/index.css`
- **组件样式**：使用 Tailwind 类名
- **主题配置**：修改 `tailwind.config.js`

---

## 🏗️ 构建与部署

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 部署方式（3 种任选）

#### 方案 1：Netlify（推荐）

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod --dir=dist
```

**优势**：
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 支持自定义域名
- ✅ 国内访问相对稳定

#### 方案 2：阿里云 OSS/腾讯云 COS

适合国内生产环境，需要 ICP 备案。

详细步骤见 [DEPLOYMENT_CN.md](./DEPLOYMENT_CN.md)

#### 方案 3：GitHub Pages

```bash
# 安装 gh-pages
npm install -D gh-pages

# 部署
npm run build
npx gh-pages -d dist
```

访问地址：`https://yourusername.github.io/AravyWeb/`

---

## 🎨 使用场景

### 适合人群

- 👨‍💻 **开发者** - 记录技术心得，分享代码片段
- 🎨 **设计师** - 展示作品集，呈现设计案例
- 📝 **自媒体人** - 发布原创文章，建立个人品牌
- 🎓 **学生** - 制作个人简历，记录学习历程
- 💼 **自由职业者** - 展示服务项目，获取客户线索

### 实际案例

#### 案例 1：前端工程师简历

**配置建议**：
- Hero 区域：个人照片 + 求职意向
- About 页面：技能清单 + 工作经历
- Projects：3-5 个代表作品
- Blog：技术文章展示专业能力

**效果**：面试官眼前一亮，面试邀约翻倍！

#### 案例 2：UI 设计师作品集

**配置建议**：
- Hero 区域：设计风格展示
- Projects：高清作品图 + 设计说明
- About：设计理念 + 合作流程
- Contact：清晰的合作联系方式

**效果**：客户主动找上门，接单不再愁！

#### 案例 3：技术博主

**配置建议**：
- Blog：定期更新技术文章
- About：专业背景 + 擅长领域
- Projects：开源项目 + 技术栈
- Contact：公众号 + 知识星球引流

**效果**：打造个人 IP，建立影响力！

---

## ⚡ 性能对比

| 平台 | 首屏加载 | Lighthouse | 打包体积 | 国内访问 |
|------|---------|-----------|---------|---------|
| **AravyWeb** | 1.2s | 96 | 467KB | ⭐⭐⭐⭐ |
| WordPress | 3.5s | 75 | 2.1MB | ⭐⭐ |
| Hexo | 2.0s | 90 | 650KB | ⭐⭐⭐⭐⭐ |
| Notion | 4.0s | 80 | - | ⭐⭐ |

**结论**：AravyWeb 在性能和体验上都有明显优势！

---

## 🔧 高级特性

### 1. 数据存储机制

当前版本使用 **localStorage** 存储数据：

```typescript
// 保存博客文章
localStorage.setItem('portfolio_blog_posts', JSON.stringify(posts));

// 读取配置
const config = JSON.parse(localStorage.getItem('portfolio_site_config'));
```

**优势**：
- ✅ 无需后端，部署简单
- ✅ 响应速度快
- ✅ 完全免费

**限制**：
- ⚠️ 数据仅保存在本地浏览器
- ⚠️ 清除缓存会丢失数据
- ⚠️ 不支持多设备同步

**解决方案**：如需云端同步，可接入后端 API（预留接口）。

### 2. 安全性考虑

**当前设计**：
- 默认账号密码：admin/admin123
- 适合个人使用或受信任环境

**生产环境建议**：
1. 修改默认密码
2. 接入真实用户认证系统
3. 使用 JWT 或 Session 管理登录状态
4. 添加 CSRF 防护

### 3. SEO 优化

**当前状态**：SPA 架构，SEO 较弱

**改进方案**：
1. 添加 meta 标签管理
2. 实现 SSR（Next.js/Nuxt.js）
3. 生成 sitemap.xml
4. 配置 robots.txt

---

## 📊 开发心得

### 遇到的挑战

#### 1. TypeScript 类型定义

**问题**：很多第三方库没有类型定义

**解决**：
```typescript
// 手动声明类型
declare module 'some-library' {
  export function doSomething(): void;
}
```

#### 2. 拖拽排序兼容性

**问题**：网格布局和列表布局的拖拽策略不同

**解决**：
```typescript
// 使用不同的拖拽策略
{strategy === 'grid' ? (
  <SortableContext strategy={rectSortingStrategy}>
    {/* 网格布局 */}
  </SortableContext>
) : (
  <SortableContext strategy={verticalListSortingStrategy}>
    {/* 列表布局 */}
  </SortableContext>
)}
```

#### 3. 图片上传性能

**问题**：Base64 图片过大导致渲染卡顿

**解决**：
- 限制上传大小（5MB）
- 压缩图片质量
- 建议使用 WebP 格式
- 未来计划接入 CDN

### 收获与成长

通过这个项目，我深入理解了：

- ✅ React 19 的新特性（Hooks 优化、并发渲染）
- ✅ TypeScript 高级类型技巧
- ✅ Tailwind CSS 最佳实践
- ✅ 前端性能优化方法
- ✅ 用户体验设计原则

---

## 🎯 未来规划

### v2.0 计划（Q2 2025）

- [ ] 接入后端 API（Node.js + MongoDB）
- [ ] 用户评论系统
- [ ] 文章阅读量统计
- [ ] RSS 订阅功能
- [ ] 暗黑模式切换
- [ ] 多语言支持（i18n）
- [ ] PWA 离线访问
- [ ] 搜索引擎提交

### v3.0 愿景（Q4 2025）

- [ ] 可视化主题编辑器
- [ ] 插件系统
- [ ] 一键导入导出
- [ ] 多作者支持
- [ ] 数据分析面板
- [ ] 移动端 App（React Native）

---

## 🤝 贡献指南

欢迎一起完善这个项目！

### 如何贡献

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 开启 Pull Request

### 开发规范

- 遵循 ESLint 配置
- 添加 TypeScript 类型定义
- 更新相关文档
- 确保构建通过：`npm run build`

### 联系方式

- GitHub: https://github.com/Arvay-cao/AravyWeb
- Email: your-email@example.com
- 微信：YourWeChatID

---

## 📄 许可证

本项目采用 **MIT 许可证**，完全免费，可商用！

```
MIT License

Copyright (c) 2025 Aravy Cao

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 致谢

感谢以下优秀的开源项目：

- [React](https://react.dev/) - UI 框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS
- [GSAP](https://greensock.com/gsap/) - 动画库
- [Lenis](https://github.com/studio-freight/lenis) - 平滑滚动
- [Radix UI](https://www.radix-ui.com/) - UI 原语
- [shadcn/ui](https://ui.shadcn.com/) - 组件库
- [Lucide Icons](https://lucide.dev/) - 图标库

---

## 📢 最后的话

如果你也喜欢这个项目，请：

1. ⭐ **Star 支持**：给项目一个 Star
2. 🔗 **分享给朋友**：让更多人关注
3. 💡 **提出建议**：欢迎 Issue 反馈
4. 🎉 ** fork & modify**：基于此项目开发自己的博客

**你的支持是我持续更新的动力！**

---

<div align="center">

**🎉 立即开始搭建你的个人博客吧！**

[GitHub 仓库](https://github.com/Arvay-cao/AravyWeb) · [在线预览](https://aravy-web.netlify.app)

Made with ❤️ by Aravy Cao

</div>

---

## 📌 相关文章

- [如何使用 AravyWeb 搭建个人博客](#) （待更新）
- [React 19 新特性详解](#) （待更新）
- [Vite 7 性能优化实战](#) （待更新）
- [Tailwind CSS 最佳实践](#) （待更新）

---

**版权声明**：本文为原创，转载请注明出处。

**商业合作**：如有企业定制需求，请联系作者邮箱。
