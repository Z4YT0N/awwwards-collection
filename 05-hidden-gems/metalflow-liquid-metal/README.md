# 🌊 MetalFlow

![og-mf](https://github.com/user-attachments/assets/b33815d1-e7a5-4605-9fa0-078a7852db0f)


> A ported fork of [paper-design/liquid-logo](https://github.com/paper-design/liquid-logo) with enhanced features and optimized layout.

Transform your logos into mesmerizing liquid metal animations! This WebGL-powered tool creates stunning metallic effects that respond to your control. Perfect for creating eye-catching animations for presentations, websites, or just for fun.

### 👀 Preview
| Desktop View | Mobile View |
|--------|--------|
| ![image_2025-02-25_01-21-03](https://github.com/user-attachments/assets/44a7d942-f8a0-41e8-92af-b8c77db24b73) | ![image](https://github.com/user-attachments/assets/3a61a3b6-d2e4-47f8-a8c8-1c0f6a1e56f5) |

🌐 [Live Demo](https://saganaki22.github.io/MetalFlow/)

<details>
<summary>✨ Features</summary>

### 🎨 Core Effects
- **Liquid Metal Shader**: Real-time WebGL shader for that perfect chrome-like finish
- **Edge Detection**: Smart edge-based feathering that follows your logo's contours
- **Dynamic Patterns**: Customizable metallic patterns that flow and shift
- **Responsive Design**: Optimized layouts for both desktop and mobile devices

### 🎮 Interactive Controls
- **Refraction**: Adjust the metallic sheen and light distortion
- **Edge Feathering**: Fine-tune the edge softness (0-1)
- **Pattern Blur**: Control the smoothness of metallic patterns
- **Liquify Effect**: Modify the flow and movement intensity
- **Animation Speed**: Set your perfect tempo
- **Pattern Scale**: Adjust the metallic pattern size
  

### 📱 Smart UI/UX
- **Optimized Layout**: 
  - Desktop: Controls panel with 400px width and centered upload button
  - Mobile: Compact layout with top-positioned upload button
  - Equal padding and spacing across all screen sizes
- **Background Options**: Multiple presets including metal, white, light grey, black, and custom colors
- **Sample Logos**: Quick access to pre-loaded logos (Punisher, DC Shoes, GitHub, Linux, Hugging Face)
- **Drag & Drop**: Easy file uploads on desktop with visual feedback
- **Touch Support**: Native file picking on mobile devices



### 🎥 Export Options
  - 24fps for smooth animation
  - mp4 -> Webm fallback chain
  - Custom -25 second duration
  - Red pulsing glow effect during generation
  - Local worker for better performance
- **PNG Export**: Instant high-quality static captures
- **Visual Feedback**: Processing indicators for all operations
</details>

## 🚀 Getting Started

1. Clone this repository
2. Run `npm install` to get dependencies
3. Start the server with `node server.js`
4. Visit `http://localhost:3003` in your browser
5. Upload your logo or choose a sample to begin!

<details>
<summary>🎯 Pro Tips</summary>

- **Perfect Loops**: Keep animation duration at 5 seconds for smooth loops
- **Edge Control**: Start with edge value at 0.4 for balanced results
- **Mobile Upload**: Use the upload button for the best mobile experience
- **Pattern Mixing**: Combine pattern scale and blur for unique effects
- **Quick Exports**: Use PNG for instant captures, mp4 / webm for animations
</details>

<details>
<summary>🛠️ Technical Stack</summary>

- **WebGL**: Core rendering engine
- **Three.js**: 3D graphics library
- **Custom Shaders**: GLSL for metallic effects
- **Responsive Design**: Optimized for all screen sizes
</details>

<details>
<summary>🎨 Default Settings</summary>

Optimal starting parameters:
```javascript
{
  refraction: 0.015,  // Metallic sheen (0 - 0.03)
  edge: 0,           // Edge softness (0 - 1)
  patternBlur: 0.005,// Pattern smoothness (0 - 0.02)
  liquid: 0.07,      // Flow intensity (0 - 0.2)
  speed: 0.3,        // Animation speed (0 - 0.5)
  patternScale: 2    // Pattern size (0.5 - 5)
}
```
</details>

[c22e2d6d-ea00-47f5-ac80-22e00603c8ab.webm](https://github.com/user-attachments/assets/7af6be86-e976-48b4-9283-b4e3a67eac9a)

## 📝 License

MIT License - Feel free to use in your projects!

---
Made with ⚡ by [Saganaki22](https://github.com/Saganaki22)
