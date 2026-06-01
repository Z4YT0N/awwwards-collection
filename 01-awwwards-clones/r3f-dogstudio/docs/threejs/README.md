# Three.js — Core Engine Mental Model

This section explains **Three.js from first principles**, without React, without R3F, and without abstractions.

If you understand everything in this folder, you will:

- Never feel lost reading R3F code
- Know exactly what JSX is hiding
- Be able to drop React and write raw Three.js anytime

This is not a tutorial.
This is an **engine-level explanation**.

---

## What Three.js Actually Is

Three.js is **not** a framework.
It is a **thin JavaScript layer over WebGL**.

Its job is to:

1. Talk to the GPU (WebGL)
2. Manage math-heavy structures (matrices, vectors)
3. Compile and run shaders
4. Send geometry + textures to the GPU

Everything else is convenience.

---

## The One Sentence Mental Model

> **Three.js builds a scene graph in CPU memory, then renders that graph to the GPU every frame.**

If you remember only this sentence, you will never be confused.

---

## The Three Mandatory Pillars

Every Three.js program — no exceptions — is built on **three objects**:

1. **Scene** → what exists
2. **Camera** → how it is seen
3. **Renderer** → how it is drawn

No scene → nothing exists
No camera → nothing is visible
No renderer → nothing appears on screen

---

## Scene — The World Container

A `Scene` is **not** a canvas.
It is **not** rendered.
It is a **tree structure** (scene graph).

It contains:

- Meshes
- Lights
- Groups
- Cameras

```js
const scene = new THREE.Scene();
```

### Important Truth

The scene does **nothing** by itself.
It is just data.

---

## Camera — The Observer

A camera defines:

- Position
- Rotation
- Projection

Most common:

```js
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  width / height, // Aspect ratio
  0.1, // Near clipping
  1000, // Far clipping
);
```

### Critical Concept: Projection

The camera converts **3D coordinates → 2D screen space**.

Without a camera:

- The GPU has no idea what should be visible

---

## Renderer — The GPU Bridge

The renderer:

- Creates a WebGL context
- Compiles shaders
- Uploads buffers
- Draws pixels

```js
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

### Important

The renderer owns:

- The canvas
- The GPU state

---

## Rendering Is Not Automatic

Nothing renders unless **you explicitly tell it to**.

```js
renderer.render(scene, camera);
```

This draws **one single frame**.

If you want animation → you must repeat this every frame.

(This is covered in `02-render-loop-and-time.md`.)

---

## Scene Graph — Parent / Child Truth

Three.js uses a **hierarchical tree**.

```text
Scene
 ├── Group
 │    ├── Mesh
 │    └── Light
 └── Mesh
```

Transform rules:

- Child position is relative to parent
- Rotations cascade downward
- Scaling affects all children

This explains why moving a model moves all its parts.

---

## CPU vs GPU (Very Important)

Three.js lives on the **CPU**.
Shaders live on the **GPU**.

You do NOT draw pixels in JavaScript.
You:

1. Prepare data (CPU)
2. Upload data (buffers, textures)
3. Ask GPU to draw

This separation explains:

- Why shaders exist
- Why uniforms exist
- Why performance matters

---

## What Three.js Does NOT Do

Three.js does NOT:

- Manage state
- Handle UI
- Understand React
- Animate by default
- Manage time for you

All of that is **your responsibility** or handled by libraries.

---

## Why People Get Confused

Most beginners see this:

```js
scene.add(mesh);
```

And assume something magical happens.

Reality:

- You are just adding data to a tree
- Nothing draws until the renderer runs

Three.js is explicit, not magical.

---

## What Comes Next

You now understand the **static world**.

Next files explain:

- How frames are rendered over time
- How geometry + materials work
- How textures & color spaces matter
- How models are loaded
- How animations work internally

Proceed in order.

---

> **Rule to remember forever:**
> If you don’t understand something in R3F, it’s because you skipped understanding it here.
