<div align="center">
<h1 align="center">🍏 Apple MacBook Pro Landing Page Clone</h1>
</div>

![Project Preview](https://github.com/aarxnmendez/macbookpro-3d-landing/blob/main/public/previews/desktop-preview.png)

A functional and animated clone of the Apple MacBook Pro M4 landing page, built to explore **3D modeling in web development** using **Three.js**, **GSAP**, and modern React.

## 📌 About
This project is a **learning-driven** implementation of Apple's MacBook Pro landing page, focusing on:
- **3D model integration** and animation with Three.js.
- **Smooth transitions** and scroll-based animations using GSAP.
- **State management** with Zustand for interactive elements.
- **Responsive design** with Tailwind CSS.

Developed following a tutorial by [Adrian Hajdin](https://github.com/adrianhajdin), this project served as my first introduction to **3D modeling in web development**, built for educational purposes only.

## 🛠 Tech Stack

- [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/) - The library for web and native user interfaces.
- [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The programming language used in the project.
- [![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/) - Easy peasy animations for your projects.
- [![Three.js](https://img.shields.io/badge/-Three.js-27136A?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/) - JavaScript 3D library for rendering 3D graphics in the browser.
- [![Zustand](https://img.shields.io/badge/Zustand-333333?style=for-the-badge&logo=react&logoColor=white)](https://github.com/pmndrs/zustand) - A small, fast, and scalable state-management solution.
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind-ffffff?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) - Next generation frontend tooling.

## 🚀 Features
- 💻 **Interactive 3D MacBook models** (14", 16", and generic).
- 🎞️ **GSAP-powered** scroll animations and transitions.
- 📱 **Responsive layout** adapting to all screen sizes.
- 🔧 **Modular Three.js components** for lights, navigation, and product viewing.

## 📂 Project Structure
```
src/
├── components/
│   ├── models/
│   │   ├── Macbook-14.jsx
│   │   ├── Macbook-16.jsx
│   │   └── Macbook.jsx
│   ├── three/
│       ├── ModelSwitcher.jsx
│       └── StudioLights.jsx
│   ├── Hero.jsx    
│   ├── NavBar.jsx
│   ├── ProductViewer.jsx
│   └── Showcase.jsx
├── constants/
├── store/
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## 🔧 Setup
>[!IMPORTANT]
>You will need to have [npm](https://www.npmjs.com/) installed.

<details>
    <summary>Automated script...</summary>

<br>

- **Linux/MacOS:**
    ```bash
    git clone https://github.com/aarxnmendez/macbookpro-3d-landing.git &&
    cd macbookpro-3d-landing &&
    npm install &&
    npm run dev &&
    open "http://localhost:5173"
    ```
- **Windows:**
    ```powershell
    git clone https://github.com/aarxnmendez/macbookpro-3d-landing.git &&
    cd macbookpro-3d-landing &&
    npm install &&
    npm run dev &&
    Start-Process "http://localhost:5173"
    ```

</details>

<br/>


1. **Clone the repository:**
   ```bash
   git clone https://github.com/aarxnmendez/macbookpro-3d-landing.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎯 What I Learned
- Gained hands-on experience with **Three.js** and 3D model integration.
- Mastered **GSAP** for complex animations and scroll effects.
- Improved **React state management** with Zustand.
- Strengthened **responsive design** skills with Tailwind CSS.

## 🔗 Links
- [Live Demo](https://aaronmendez-macbook-landing.vercel.app/)
- **GitHub:** [@aarxnmendez](https://github.com/aarxnmendez)
- **LinkedIn:** [Aaron Mendez](https://linkedin.com/in/aaronmendezz/)
