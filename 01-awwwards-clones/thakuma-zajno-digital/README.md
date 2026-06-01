# Zajno Digital Studio | Next.js Creative Portfolio

A high-end, premium digital experience recreated with Next.js, featuring fluid WebGL effects, seamless page transitions, and GSAP-powered micro-animations.

**Inspiration**: This project is inspired by the award-winning design of [Zajno Digital Studio](https://zajno.com/).

---

## 🌟 Key Features

-   **WebGL Ripple Text**: Custom GLSL shader-based ripple effect on typography using Three.js.
-   **Dynamic Animations**: Smooth loading sequences and scroll-aware reveals powered by GSAP and CustomEase.
-   **Seamless Transitions**: Native-feeling view transitions between pages using `next-view-transitions`.
-   **Modern Architecture**: A "premium" directory structure designed for scalability and maintainability.
-   **Responsive Design**: Pixel-perfect layout adaptable to various screen sizes.

---

## 🛠️ Tech Stack

-   **Frontend**: [Next.js 14+ (App Router)](https://nextjs.org/)
-   **WebGL/3D**: [Three.js](https://threejs.org/) & [GLSL](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL))
-   **Animations**: [GSAP](https://gsap.com/) (GreenSock Animation Platform)
-   **Styling**: Vanilla CSS (Modern CSS Variables & Flex/Grid)
-   **Fonts**: Custom Premium Typography (`Blanquotey`)

---

## 📂 Project Structure

This project follows an organized, industry-standard directory structure:

```text
src/
├── app/              # Next.js App Router (Routing & Layouts)
├── components/       # Reusable components
│   ├── layout/       # Shared UI (Navbar, Footer, etc.)
│   └── webgl/        # WebGL logic and Shader files (.glsl)
├── hooks/            # Custom React hooks (Animations, state)
├── styles/           # Global styles and design tokens
└── lib/              # Utilities and configuration
```

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm / yarn / pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone [your-repo-link]
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

---

## 🎨 Shaders & Customization

The WebGL ripples are controlled by dedicated GLSL files located in `src/components/webgl/shaders/`. You can easily tweak the ripple strength, grid size, or speed by modifying the uniforms in `fragmentShader.glsl`.

---

## 🚧 Status & Roadmap

> [!NOTE]
> This project is currently a **Work in Progress (WIP)**. While many core elements are functional, it has not yet reached full visual parity with the original website.

**Future Goals:**
- [ ] Implement enhanced WebGL post-processing effects.
- [ ] Refine the interactive pixel grid and ripple physics.
- [ ] Add more responsive transitions and mobile optimizations.
- [ ] Fine-tune typography and animations to achieve pixel-perfect match with [Zajno.com](https://zajno.com/).

---

## 📜 Credits & License

This project was built as a creative recreation and educational experiment inspired by the exceptional design work of [Zajno Digital Studio](https://zajno.com/). All design rights belong to the original creators.

---

*Built with ❤️ for High-End Web Experiences.*

