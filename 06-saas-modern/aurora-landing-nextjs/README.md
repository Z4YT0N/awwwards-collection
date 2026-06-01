# 🌌 Aurora Landing

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

一个现代、优雅且动画丰富的落地页模板，基于 Next.js 13+、Tailwind CSS 和 Framer Motion 构建。

[English](./README_EN.md) · [演示 Demo](https://aurora-landing-woad.vercel.app) · [问题反馈](https://github.com/langgptai/aurora-landing/issues)

</div>

![预览图](./public/landing_p1.png)

![预览图](./public/landing_p2.png)

![预览图](./public/landing_p3.png)

## ✨ 特性

- 📱 响应式设计，完美适配各种设备
- 🎨 现代化 UI/UX 设计
- 🌈 精美的渐变和动画效果
- ⚡️ Next.js 13+ App Router 架构
- 🎯 SEO 优化配置
- 🔍 TypeScript 类型安全
- 🎭 Framer Motion 动画
- 📦 组件化开发
- 🎨 可定制主题
- 📱 移动优先设计
- 🛠️ 易于定制和扩展

## 🚀 快速开始

### 环境要求

- Node.js 16.8 或更高版本
- npm 或 yarn 或 pnpm

### 安装

1. 克隆项目

```bash
git clone https://github.com/langgptai/aurora-landing.git
cd aurora-landing
```

2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 构建部署

```bash
npm run build
npm run start
```

## 🎨 定制化

### 修改主题

编辑 `tailwind.config.js` 文件来自定义主题颜色、字体等：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...}
      },
      // 其他配置
    }
  }
}
```

### 修改内容

主要内容在 `src/components/sections` 目录下：

- `hero.tsx` - 主视觉区域
- `features.tsx` - 特性展示
- `developer.tsx` - 开发者信息
- `download.tsx` - 下载区域

## 📁 项目结构

```
aurora-landing/
├── src/
│   ├── app/              # Next.js 13 App Router
│   ├── components/       # React 组件
│   │   ├── ui/          # 通用 UI 组件
│   │   ├── layout/      # 布局组件
│   │   └── sections/    # 页面区块组件
│   └── lib/             # 工具函数
├── public/              # 静态资源
├── styles/              # 全局样式
└── package.json
```

## 🛠️ 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [React](https://reactjs.org/) - UI 库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Lucide Icons](https://lucide.dev/) - 图标库
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库

## 📄 License

本项目采用 [MIT](LICENSE) 开源协议。

## 🤝 贡献

欢迎任何形式的贡献，包括但不限于：

- 提交问题和建议
- 改进文档
- 提交代码改进
- 分享使用经验

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)

## 📮 联系我们

- GitHub：[langgptai](https://github.com/langgptai)
- 微信：1796060717
- 邮箱：ethereal_ai@hotmail.com

---

如果这个项目对您有帮助，欢迎给个 Star ⭐️！