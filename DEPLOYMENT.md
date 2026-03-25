# 部署到 Vercel 指南

## 方法一：使用 Vercel CLI（推荐）

### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

### 2. 登录 Vercel
```bash
vercel login
```

### 3. 部署项目
在项目根目录运行：
```bash
vercel
```

首次部署时，按照提示操作：
- **Set up and deploy?** → Yes
- **Which scope?** → 选择你的账户
- **Link to existing project?** → No
- **What's your project's name?** → 输入项目名称（如 aravy-web）
- **In which directory is your code located?** → ./
- **Want to override the settings?** → No

### 4. 生产环境部署
```bash
vercel --prod
```

## 方法二：通过 GitHub 自动部署

### 1. 推送代码到 GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 在 Vercel 官网连接 GitHub
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 选择 "Import Git Repository"
4. 选择你的 GitHub 仓库
5. 点击 "Deploy"

## 项目配置说明

- **框架**: Vite + React + TypeScript
- **构建命令**: `npm run build`
- **输出目录**: `dist`
- **已配置路由重写**: 支持 React Router 的单页应用路由

## 环境变量（如需要）

如果项目需要环境变量，在 Vercel 中添加：
1. 进入项目设置
2. 选择 "Environment Variables"
3. 添加所需的环境变量

## 本地预览构建结果

```bash
npm run build
npm run preview
```

## 注意事项

- ✅ 已配置 `vercel.json` 支持 SPA 路由
- ✅ `vite.config.ts` 中 `base: './'` 确保静态资源正确加载
- ✅ 自动处理 Node.js 版本兼容性

## 常见问题

### 构建失败？
检查 `package.json` 中的依赖是否完整，确保 `npm install` 能成功执行。

### 路由 404 错误？
`vercel.json` 中已配置 rewrites 规则，所有路由会重定向到 `index.html`。

### 自定义域名？
在 Vercel 项目设置中配置 "Domains" 即可。
