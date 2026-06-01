# 🌿 Elementis — Premium Digital Experience

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> **Elementis** is a state-of-the-art interactive digital experience crafted with precision, blending high-end aesthetics with cutting-edge web technologies. Inspired by premium design standards, this project reimagines the intersection of wellness and digital storytelling.

---

## ✨ Key Features

-   **Fluid Design System**: Implements a custom-built responsive engine using viewport multipliers for pixel-perfect scaling across all devices.
-   **Immersive Smooth Scrolling**: Powered by **Lenis**, providing a luxurious, weighted scroll feel.
-   **Cinematic Animations**: Orchestrated with **Framer Motion** for subtle micro-interactions and grand entrance reveals.
-   **Advanced UI Sections**:
    -   📽️ **Hero**: A high-impact landing that sets the tone for the entire experience.
    -   🍃 **Sustainable Retreat**: Parallax-enhanced storytelling focused on nature and architecture.
    -   💎 **Innovation**: Interactive modules showcasing modern tech-driven features.
    -   🧘 **Wellness Sanctuary**: A curated visual journey through serene landscapes.
-   **Mobile-First Precision**: Targeted touch controls and swipe gestures for gallery interactions on handheld devices.
-   **Performance-First Architecture**: Built on **Next.js 15**, utilizing Server Components and optimized asset delivery.

## 🖼️ Preview

<div align="center">
  <img src="/WellnessSanctuaryImage.png" alt="Elementis Preview" width="100%" />
</div>

## 🛠️ Technical Stack

-   **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
-   **Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/)
-   **Scroller**: [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.x or later
-   npm / pnpm / yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/elementis-sotd.git
    cd elementis-sotd
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the project.

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Pages, Layouts, Providers)
├── components/           # Reusable UI components (Client & Server)
├── sections/             # Large-scale page sections (Hero, Wellness, etc.)
├── public/               # High-fidelity assets (Images, Fonts)
├── hooks/                # Custom React hooks
├── utils/                # Utility functions and helper classes
└── package.json          # Project metadata and dependencies
```

---

## 🎨 Design Philosophy

Elementis is built on the principle of **"Invisible Design"**—where the technology fades into the background, leaving only the experience. By utilizing `calc` based spacing and fluid typography, the layout maintains its structural integrity from ultra-wide monitors to mobile handhelds.

## 📝 Ongoing Roadmap & Tasks

*The following items are part of the active development queue (formerly ISSUES.md):*

- [ ] **ParallaxContainer Enhancement**: Resolving algorithmic edge cases on specific 1200x800 viewports.
- [ ] **Core Web Vitals**: Tuning Interaction to Next Paint (INP) and Largest Contentful Paint (LCP).
- [ ] **Notion Integration**: Connecting the contact form to a Notion database via Server Actions.
- [ ] **Mobile Optimization**: Fine-tuning cursor visibility in the Innovation section for touch devices.

---

<div align="center">
  <p>Crafted with ❤️ by Thakuma.dev</p>
</div>
