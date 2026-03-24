// Site configuration
// 前端工程师个人简历网站配置

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroConfig {
  brandLeft: string;
  brandRight: string;
  tagline: string;
  badge: string;
  since: string;
  email: string;
  heroImage: string;
  heroImageAlt: string;
  scrollText: string;
  copyrightText: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutConfig {
  label: string;
  headline: string;
  description: string;
  bottomText: string;
  galleryImages: GalleryImage[];
  stats: StatItem[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  year: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface ProjectsConfig {
  label: string;
  headline: string;
  projects: Project[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Experience {
  period: string;
  company: string;
  position: string;
  description: string;
}

export interface SkillsConfig {
  label: string;
  headline: string;
  description: string;
  categories: SkillCategory[];
  experience?: Experience[];
}

export interface InfoCard {
  icon: string;
  title: string;
  content: string;
}

export interface ContactConfig {
  label: string;
  headline: string;
  description: string;
  infoCards: InfoCard[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  marqueeText: string;
  brandName: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  quickLinks: FooterLink[];
  quickLinksTitle: string;
  contactTitle: string;
  contactItems: string[];
  bottomLinks: FooterLink[];
}

// 网站基础配置
export const siteConfig: SiteConfig = {
  language: 'zh-CN',
  title: '陈明远 | 前端开发工程师',
  description: '资深前端开发工程师，专注于React、TypeScript和现代Web技术，热爱创造优雅的用户体验',
};

// Hero 区域配置
export const heroConfig: HeroConfig = {
  brandLeft: '陈明远',
  brandRight: 'Developer',
  tagline: '资深前端开发工程师，专注于React、TypeScript和现代Web技术，热爱创造优雅的用户体验',
  badge: 'Frontend Engineer',
  since: '5+ Years Experience',
  email: 'chenmingyuan@example.com',
  heroImage: '', // 使用首字母占位
  heroImageAlt: '陈明远',
  scrollText: '向下滚动探索更多',
  copyrightText: '© 2024',
  navLinks: [
    { label: '关于', href: '#about' },
    { label: '项目', href: '#projects' },
    { label: '技能', href: '#skills' },
    { label: '联系', href: '#contact' },
    { label: '博客', href: '#/blog' },
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Email', href: 'mailto:chenmingyuan@example.com' },
  ],
};

// 关于我区域配置
export const aboutConfig: AboutConfig = {
  label: 'About Me',
  headline: '关于我',
  description: '我是一名热爱技术的前端开发工程师，拥有5年以上的开发经验。专注于构建高性能、可维护的Web应用，对用户体验和代码质量有着极致的追求。',
  bottomText: '我相信好的代码不仅要能运行，还要易于理解和维护。持续学习和分享是我职业生涯的重要组成部分。',
  galleryImages: [
    { src: '/images/about-1.jpg', alt: '工作场景', label: 'Coding' },
    { src: '/images/about-2.jpg', alt: '团队协作', label: 'Collaboration' },
    { src: '/images/about-3.jpg', alt: '技术分享', label: 'Sharing' },
    { src: '/images/about-4.jpg', alt: '学习成长', label: 'Learning' },
    { src: '/images/about-5.jpg', alt: '开源贡献', label: 'Open Source' },
    { src: '/images/about-6.jpg', alt: '项目交付', label: 'Delivery' },
  ],
  stats: [
    { value: '5+', label: '年工作经验' },
    { value: '50+', label: '完成项目' },
    { value: '20+', label: '技术文章' },
    { value: '100%', label: '客户满意度' },
  ],
};

// 项目案例配置
export const projectsConfig: ProjectsConfig = {
  label: 'Projects',
  headline: '项目案例',
  projects: [
    {
      id: 1,
      title: '企业级电商平台',
      description: '为大型零售企业开发的B2C电商平台，支持高并发访问，日均PV超过100万。采用微前端架构，实现了模块独立开发和部署。',
      image: '/images/project-1.jpg',
      category: '电商平台',
      year: '2024',
      techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redis'],
      demoUrl: 'https://example.com',
      repoUrl: 'https://github.com',
    },
    {
      id: 2,
      title: '数据可视化大屏',
      description: '为金融机构开发的实时数据监控大屏，支持多维度数据展示和实时更新。使用WebSocket实现数据推送，响应速度小于100ms。',
      image: '/images/project-2.jpg',
      category: '数据可视化',
      year: '2024',
      techStack: ['Vue 3', 'D3.js', 'ECharts', 'WebSocket', 'Node.js'],
      demoUrl: 'https://example.com',
      repoUrl: 'https://github.com',
    },
    {
      id: 3,
      title: 'SaaS协作工具',
      description: '面向团队的在线协作平台，支持文档编辑、任务管理和即时通讯。实现了复杂的权限系统和实时协作功能。',
      image: '/images/project-3.jpg',
      category: 'SaaS产品',
      year: '2023',
      techStack: ['React', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS'],
      demoUrl: 'https://example.com',
      repoUrl: 'https://github.com',
    },
    {
      id: 4,
      title: '移动端H5活动页',
      description: '为品牌营销活动开发的高性能H5页面，支持丰富的动画效果和互动玩法。优化后的首屏加载时间小于1秒。',
      image: '/images/project-4.jpg',
      category: 'H5开发',
      year: '2023',
      techStack: ['Vue 3', 'GSAP', 'Canvas', 'Vite', 'CDN'],
      demoUrl: 'https://example.com',
      repoUrl: 'https://github.com',
    },
  ],
};

// 技能配置
export const skillsConfig: SkillsConfig = {
  label: 'Skills',
  headline: '技术栈',
  description: '熟练掌握现代前端技术栈，具备全栈开发能力。持续关注行业动态，不断学习新技术。',
  categories: [
    {
      name: '前端框架',
      skills: ['React', 'Vue.js', 'Next.js', 'Nuxt.js', 'Angular'],
    },
    {
      name: '编程语言',
      skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Sass/Less'],
    },
    {
      name: 'UI/样式',
      skills: ['Tailwind CSS', 'Styled Components', 'Ant Design', 'Material-UI', 'Chakra UI'],
    },
    {
      name: '工程化工具',
      skills: ['Webpack', 'Vite', 'Rollup', 'ESLint', 'Prettier'],
    },
    {
      name: '测试与质量',
      skills: ['Jest', 'React Testing Library', 'Cypress', 'Playwright'],
    },
    {
      name: '后端与数据库',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    },
  ],
  experience: [
    {
      period: '2022 - 至今',
      company: '某互联网科技公司',
      position: '高级前端开发工程师',
      description: '负责公司核心产品的前端架构设计和开发，带领5人团队完成多个大型项目。',
    },
    {
      period: '2020 - 2022',
      company: '某金融科技公司',
      position: '前端开发工程师',
      description: '参与金融数据可视化平台的开发，负责前端性能优化和组件库建设。',
    },
    {
      period: '2019 - 2020',
      company: '某创业公司',
      position: '初级前端开发工程师',
      description: '参与多个Web应用的开发，快速学习并应用新技术。',
    },
  ],
};

// 联系区域配置
export const contactConfig: ContactConfig = {
  label: 'Contact',
  headline: '联系我',
  description: '如果您有任何问题或合作意向，欢迎随时联系我。我期待与您交流！',
  infoCards: [
    {
      icon: 'Mail',
      title: '电子邮箱',
      content: 'chenmingyuan@example.com',
    },
    {
      icon: 'MapPin',
      title: '所在城市',
      content: '中国 · 上海',
    },
    {
      icon: 'Phone',
      title: '联系电话',
      content: '+86 138 0000 0000',
    },
  ],
};

// 页脚配置
export const footerConfig: FooterConfig = {
  marqueeText: 'Frontend Developer',
  brandName: '陈明远',
  brandDescription: '资深前端开发工程师，专注于创造优雅的Web体验。热爱技术，乐于分享。',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Email', href: 'mailto:chenmingyuan@example.com' },
  ],
  quickLinks: [
    { label: '关于我', href: '#about' },
    { label: '项目案例', href: '#projects' },
    { label: '技术栈', href: '#skills' },
    { label: '博客', href: '#/blog' },
    { label: '联系我', href: '#contact' },
  ],
  quickLinksTitle: '快速链接',
  contactTitle: '联系方式',
  contactItems: [
    'chenmingyuan@example.com',
    '中国 · 上海',
    '+86 138 0000 0000',
  ],
  bottomLinks: [
    { label: '隐私政策', href: '#' },
    { label: '使用条款', href: '#' },
  ],
};
