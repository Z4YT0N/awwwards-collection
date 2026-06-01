# Awwwards-Winning 3D adidas Landing Page (Next.js + Three.js)


<div style="display: flex; flex-direction: column; width: 100%; gap: 20px; align-items: center;"> 
  <img src="https://github.com/user-attachments/assets/1d49ff99-c1a9-4495-9a56-f9c4ec38e346" alt="Live Demo" style="width: 100%; height: auto; max-width: 100%; border-radius: 8px;" /> 
  <img src="https://github.com/user-attachments/assets/80a9dabc-71b7-48c9-a106-44e0f8748b34" alt="Main Model" style="width: 100%; height: auto; max-width: 100%; border-radius: 8px;" /> 
  <img src="https://github.com/user-attachments/assets/65c17bb5-a012-42c5-842e-f25c2a751f69" alt="All Models" style="width: 100%; height: auto; max-width: 100%; border-radius: 8px;" />
</div>


A polished, scroll-animated **3D landing page** built with Next.js, React Three Fiber, Three.js, and GSAP—designed to hit Awwwards-level polish.

---

## 📚 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [What You’ll Learn](#-what-you'll-learn)
- [Assets](#-assets)
- [Contributing](#-contributing)
- [Contact Me](#-contact-me)
- [Like This Project?](#-like-this-project)

---

## ✨ Features

- 🔥 3D visuals powered by **React Three Fiber** and **Drei**
- ⚡ Smooth transitions and scroll-based animations using **Framer Motion**
- 🎨 Clean, responsive UI with **TailwindCSS**
- 💌 Working contact form using **EmailJS**
- 🧱 Beautiful UI enhancements with **Aceternity UI** and **Magic UI**
- 🚀 Lightning-fast development with **Vite**

---

## 📁 Project Structure

```bash
app/
 ├── shirts/[slug]/page.tsx   # Dynamic product routes
 ├── layout.tsx               # Root layout
 ├── page.tsx                 # Main landing page
components/
 ├── Header.tsx / Footer.tsx  # UI components
 ├── Scene.tsx / Rig.tsx      # 3D scene setup
 ├── ScrollIndicator.tsx      # UI + animation helper
 ├── LoadingSkeleton.tsx      # Custom loader
 ├── FirstGrayModel.tsx       # 3D product models
 └── ViewCanvas.tsx           # Three.js canvas wrapper
lib/
 ├── colors.ts                # Theme colors
 ├── material.ts              # Reusable materials
 ├── patchThreeLoadingManager.ts # Preloading manager
 ├── useFirstAnimation.ts     # Custom animation hook
 └── useTextures.ts           # Texture loading helper
public/
 ├── icons/                   # Static icons
 ├── models/                  # 3D models
 ├── test/                    # Misc assets
 └── textures/                # Texture assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 15.x  
- npm or Yarn or pnpm  
- Basic familiarity with React / Three.js  

### Installation

```bash
git clone https://github.com/Ali-Sanati/awwwards-adidas.git
cd awwwards-adidas
npm install
```

### Development

```bash
npm run dev
```
Open http://localhost:3000.

### Production Build

```bash
npm run build
npm run start
```
---

## 🧠 What You’ll Learn / Why Use This

This repo demonstrates how to blend modern UI and immersive 3D in a production-grade, high-performance web experience. If you're aiming to:

- Build portfolio-level interactive websites
- Level up in React + Three.js
- Learn real-world optimizations (preload, lazy load, smooth transitions)
- Understand scalable file structure and clean code
  
…then this is a solid starting point.

---

## 🔗 Assets

Assets used in the project can be found [here](https://drive.google.com/file/d/1NjKulhW4iobgekZAK3YWm8EyeLxL3mOZ/view?usp=drive_link)

---

## 📖 Contributing

Contributions are welcome! If you spot a bug, want to add a new feature, or improve documentation:

1. Fork the repo
2. Create a branch feature/your-feature or fix/issue-name
3. Make your changes & test
4. Submit a Pull Request

Please keep PRs focused, include tests or screenshots when possible, and describe your change.

## 📬 Contact Me

If you have questions or ideas, feel free to open an issue or reach me

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://www.instagram.com/ali.sanatidev/reels/) 
[![Static Badge](https://img.shields.io/badge/Youtube-%23FF0033?style=flat&logo=youtube)](https://www.youtube.com/channel/UCZhtUWTtk3bGJiMPN9T4HWA)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ali-sanati/) 
[![TikTok](https://img.shields.io/badge/tiktok-black?style=flat&logo=TikTok)](https://www.tiktok.com/@ali_sanati_dev)
[![X](https://img.shields.io/badge/X-black?style=flat&logo=x
)](https://x.com/Ali_Sanati_Dev)

Thanks for checking it out! 🙌

---

## ⭐ Like This Project?

Star the repo and [subscribe](https://www.youtube.com/channel/UCZhtUWTtk3bGJiMPN9T4HWA??sub_confirmation=1) to the YouTube channel for more dev content!
