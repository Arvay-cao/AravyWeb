# 国内部署方案指南

由于 Vercel 国际版在中国大陆地区访问不稳定，以下是推荐的国内部署方案：

## 🎯 推荐方案对比

| 平台 | 优势 | 劣势 | 适用场景 |
|------|------|------|----------|
| **Vercel 中国版** | 官方支持、自动部署 | 需要 ICP 备案 | 企业用户 |
| **Netlify** | 免费、配置简单 | 速度一般 | 个人项目 |
| **阿里云 OSS** | 速度快、稳定 | 需付费（便宜） | 生产环境 |
| **腾讯云 COS** | 速度快、生态好 | 需付费（便宜） | 微信生态 |
| **华为云 OBS** | 性价比高 | 文档较少 | 预算有限 |

---

## 方案一：Vercel 中国版（需备案）

### 访问地址
- 官网：https://vercel.com/cn
- 由宁厦西云数据科技运营

### 部署要求
- ✅ 需要 ICP 备案
- ✅ 需要实名认证
- ✅ 域名备案后可绑定

### 优势
- 🚀 国内 CDN 加速
- 🔒 数据存储在境内
- 📊 符合监管要求

---

## 方案二：Netlify（推荐个人使用）

### 部署步骤

#### 1. 安装 Netlify CLI
```bash
npm install -g netlify-cli
```

#### 2. 登录 Netlify
```bash
netlify login
```

#### 3. 部署项目
```bash
netlify deploy --prod --dir=dist
```

#### 4. 首次配置
```bash
netlify init
# 按提示选择：
# - Create & configure a new site: Yes
# - Site name: aravy-web
# - Build command: npm run build
# - Deploy directory: dist
```

### 优势
- ✅ 免费版足够使用
- ✅ 自动 HTTPS
- ✅ 支持自定义域名
- ✅ 国内访问相对稳定

### 网址
- 官网：https://www.netlify.com

---

## 方案三：阿里云 OSS 静态网站托管

### 部署步骤

#### 1. 构建项目
```bash
npm run build
```

#### 2. 创建 OSS Bucket
1. 登录阿里云控制台
2. 进入 OSS 服务
3. 创建 Bucket（选择公共读）
4. 开启"静态页面"功能

#### 3. 上传文件
```bash
# 安装 ossutil
npm install -g @alicloud/oss-tool

# 或使用图形化工具 ossbrowser
```

#### 4. 配置索引页面
- 首页：index.html
- 错误页：index.html（SPA 应用）

#### 5. 绑定 CDN（可选）
- 加速国内访问
- 降低流量费用

### 费用参考
- 存储费：约 ¥0.12/GB/月
- 流量费：约 ¥0.24/GB
- CDN：约 ¥0.18/GB

---

## 方案四：腾讯云 COS + CDN

### 部署步骤

#### 1. 构建项目
```bash
npm run build
```

#### 2. 创建 COS 存储桶
1. 登录腾讯云控制台
2. 进入 COS 服务
3. 创建存储桶（公有读私有写）
4. 开启"静态网站"功能

#### 3. 上传文件
```bash
# 使用 COSBrowser 工具
# 或使用命令行工具 coscmd
pip install coscmd
coscmd config
coscmd upload -r ./dist /
```

#### 4. 配置 CDN
1. 进入 CDN 控制台
2. 添加域名
3. 源站类型选择"COS 源站"
4. 配置缓存规则

### 优势
- 与微信小程序集成好
- 国内节点多
- 速度快

---

## 方案五：GitHub Pages（备选）

### 部署步骤

#### 1. 安装 gh-pages
```bash
npm install -D gh-pages
```

#### 2. 修改 vite.config.ts
```typescript
export default defineConfig({
  base: '/AravyWeb/', // 改为你的仓库名
  // ... 其他配置
})
```

#### 3. 添加部署脚本到 package.json
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### 4. 部署
```bash
npm run deploy
```

#### 5. 启用 GitHub Pages
1. 进入仓库 Settings
2. 选择 Pages
3. Source 选择 gh-pages 分支
4. 保存后等待部署完成

### 访问地址
`https://Arvay-cao.github.io/AravyWeb/`

### 注意事项
- ⚠️ 国内访问速度较慢
- ⚠️ 可能被墙
- ✅ 完全免费

---

## 🎨 自定义域名配置（所有平台通用）

### DNS 配置示例

#### 阿里云 DNS
```
类型    主机记录    记录值
A       @          1.2.3.4  (CDN CNAME)
CNAME   www        xxx.vercel.app
```

#### 腾讯云 DNS
```
类型    主机记录    记录值
CNAME   @          xxx.netlify.app
CNAME   www        xxx.netlify.app
```

---

## 📝 ICP 备案流程（中国大陆服务器必需）

### 准备材料
1. 身份证正反面照片
2. 域名证书（在域名服务商处获取）
3. 幕布拍照（部分省份需要）

### 备案步骤
1. 在云服务商系统提交备案申请
2. 填写个人信息和域名信息
3. 上传相关资料
4. 云服务商初审（1-2 工作日）
5. 管局审核（10-20 工作日）
6. 获得 ICP 备案号

### 备案期间影响
- ⚠️ 域名无法解析到国内服务器
- ✅ 可以先用国外平台过渡

---

## 🚀 快速决策建议

### 个人学习/演示项目
**推荐：Netlify**
- 无需备案
- 免费额度够用
- 配置简单

### 企业官网/博客
**推荐：阿里云 OSS + CDN**
- 速度快
- 稳定性高
- 成本可控（约 ¥50/年）

### 需要合规的商业项目
**推荐：Vercel 中国版 或 腾讯云 COS**
- 符合监管要求
- 数据安全
- 需要备案

---

## 🔄 从 Vercel 迁移到其他平台

### 1. 导出配置
```bash
# 备份 vercel.json
cp vercel.json platform-config-backup.json
```

### 2. 修改路由配置

#### Netlify (netlify.toml)
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vite 配置（通用）
```typescript
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})
```

---

## 📞 技术支持

- Netlify 文档：https://docs.netlify.com
- 阿里云 OSS：https://help.aliyun.com/product/31815.html
- 腾讯云 COS：https://cloud.tencent.com/document/product/436

---

## ⚡ 快速测试

部署后使用以下命令测试国内访问：

```bash
# 测试响应时间
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com

# curl-format.txt 内容：
time_namelookup:  %{time_namelookup}\n
time_connect:     %{time_connect}\n
time_starttransfer: %{time_starttransfer}\n
--------------------\n
time_total:       %{time_total}\n
```
