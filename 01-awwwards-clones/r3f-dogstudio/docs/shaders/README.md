# Shaders — The GPU Mental Model (Read Before Writing Any GLSL)

> Shaders are not magic math.
> They are **programs that run millions of times per frame on the GPU**.

If you understand this folder, you will:

- Stop copy‑pasting GLSL
- Stop fearing shader bugs
- Understand _exactly_ what your `onBeforeCompile` code is doing

This README sets the **mental foundation**. The next files go deep.

---

## 0. The One Sentence Truth

> **Shaders are tiny programs executed in parallel for vertices and pixels.**

Nothing more.
Nothing less.

---

## 1. CPU vs GPU (The Core Split)

### CPU (JavaScript / Three.js)

- Runs once per frame
- Handles:
  - Scene graph
  - Animations
  - Uniform updates
  - Draw calls

### GPU (GLSL shaders)

- Runs thousands/millions of times per frame
- Handles:
  - Vertex positioning
  - Pixel coloring

You do **not** control execution order on the GPU.

---

## 2. The Rendering Pipeline (Bird’s Eye View)

```text
JS / Three.js
   ↓
Vertex Shader (per vertex)
   ↓
Primitive Assembly
   ↓
Rasterization
   ↓
Fragment Shader (per pixel)
   ↓
Framebuffer
```

Your shaders live **inside** this pipeline.

---

## 3. Vertex Shader vs Fragment Shader

| Shader   | Runs For    | Purpose               |
| -------- | ----------- | --------------------- |
| Vertex   | Each vertex | Position, deformation |
| Fragment | Each pixel  | Color, lighting       |

You cannot:

- Move vertices in fragment shader
- Color pixels in vertex shader

---

## 4. Data Flow: Attributes → Varyings → Fragments

### Attributes

- Per‑vertex data
- Comes from geometry

Examples:

- position
- normal
- uv

---

### Varyings

- Passed from vertex → fragment
- Interpolated automatically

Example:

```glsl
varying vec2 vUv;
```

---

### Uniforms

- Global values
- Same for all vertices & pixels
- Set from JavaScript

Examples:

- time
- progress
- textures

---

## 5. Why Shaders Feel Hard

Because:

- No debugger
- No console.log
- Massive parallelism

You must **reason**, not inspect.

---

## 6. How Three.js Uses Shaders

Three.js:

- Generates GLSL for you
- Injects lighting code
- Manages attributes & uniforms

When you use:

```ts
new THREE.MeshStandardMaterial();
```

You are already using shaders.

---

## 7. What `onBeforeCompile` Really Is

`onBeforeCompile` lets you:

- Intercept generated GLSL
- Inject custom logic
- Keep Three.js lighting

This is exactly what your project does.

---

## 8. The Mental Model You Must Lock In

```text
JS sets uniforms
Vertex shader moves points
Fragment shader colors pixels
GPU runs everything in parallel
```

If you remember only this, shaders stop being scary.

---

## What’s Next

➡ **01-gpu-mental-model.md**

We will now go _much_ deeper into:

- Parallel execution
- Why loops behave strangely
- Why branching is dangerous

This is where shader intuition is born.
