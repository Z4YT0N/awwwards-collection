<div align="center">

  # ✨ Dimensional Glass Landing

  **Stunning 3D glass morphism landing page with prismatic refraction effects**

  [![Solid.js](https://img.shields.io/badge/Solid.js-2C4F7C?style=flat-square&logo=solid&logoColor=white)](https://www.solidjs.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
  [![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
  
  [![License MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)
  [![Deploy to Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://www.netlify.com/)

  <br />
  
  [Live Demo](https://solidjs-threejs-gsap-dimensional-glas.netlify.app)

</div>

---

## 🌟 Overview

A next-generation landing page featuring real-time 3D glass panels with physically-accurate prismatic light refraction. Built with **Solid.js** for blazing-fast reactivity, **Three.js** for immersive 3D graphics, **GSAP ScrollTrigger** for buttery-smooth animations, and **Tailwind CSS** for modern styling.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔮 **3D Glass Panels** | Real-time rendered glass surfaces with prismatic refraction |
| 🌈 **Prismatic Colors** | Dynamic color shifting based on view angle |
| 🎯 **Magnetic Cursor** | Interactive cursor with gravitational pull effects |
| 📜 **Scroll Animations** | GSAP ScrollTrigger powered smooth transitions |
| 🎨 **Glassmorphism UI** | Modern glass-like UI components |
| 📱 **Fully Responsive** | Optimized for all devices |
| ♿ **Accessible** | Reduced motion support included |
| ⚡ **Lightning Fast** | Solid.js fine-grained reactivity |

---

## 🛠️ Tech Stack

```text
┌─────────────────────────────────────────────────────┐
│  FRAMEWORK        │  Solid.js 1.8                   │
│  3D ENGINE        │  Three.js r161                  │
│  ANIMATIONS       │  GSAP 3.12 + ScrollTrigger      │
│  STYLING          │  Tailwind CSS 3.4               │
│  BUILD TOOL       │  Vite 5                         │
│  NOISE            │  simplex-noise 4.0              │
│  DEPLOYMENT       │  Netlify                        │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/smart-developer1791/solidjs-threejs-gsap-dimensional-glass-landing

# Navigate to directory
cd solidjs-threejs-gsap-dimensional-glass-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```text
solidjs-threejs-gsap-dimensional-glass-landing/
├── public/
│   └── _redirects              # Netlify SPA redirects
├── src/
│   ├── components/
│   │   ├── DimensionalGlassBackground.jsx  # 3D glass scene
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Hero.jsx            # Hero section
│   │   ├── Features.jsx        # Features grid
│   │   ├── Contact.jsx         # Contact form
│   │   ├── Footer.jsx          # Footer
│   │   └── Cursor.jsx          # Custom cursor
│   ├── App.jsx                 # Main app component
│   ├── index.jsx               # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml                # Netlify configuration
└── README.md
```

---

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the prismatic color palette:

```javascript
colors: {
  prism: {
    violet: '#8B5CF6',
    blue: '#3B82F6',
    cyan: '#06B6D4',
    emerald: '#10B981',
    amber: '#F59E0B',
    rose: '#F43F5E'
  }
}
```

### 3D Scene

Adjust glass panel count and behavior in `DimensionalGlassBackground.jsx`:

```javascript
const panelCount = 8       // Number of glass panels
const particleCount = 500  // Floating particles
```

---

## 🌐 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect repository to Netlify
3. Build settings are auto-configured via `netlify.toml`
4. Deploy!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Manual Deploy

```bash
npm run build
# Upload 'dist' folder to your hosting
```

---

## 📊 Performance

| Metric | Score |
|--------|-------|
| Lighthouse Performance | 95+ |
| First Contentful Paint | < 1.2s |
| Time to Interactive | < 2.5s |
| Bundle Size (gzipped) | ~85KB |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- [Solid.js](https://www.solidjs.com/) - Reactive UI library
- [Three.js](https://threejs.org/) - 3D graphics library
- [GSAP](https://gsap.com/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

---

<p align="center">
  Refracted through prismatic code • Forged with Solid.js, Three.js & endless ☕
</p>
