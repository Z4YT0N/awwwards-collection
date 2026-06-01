# Scene, Camera, Renderer — The Non‑Negotiable Core

This file builds a **complete Three.js program from nothing**, then explains **why every single line exists**.

No React. No R3F. No helpers.
Just the engine.

---

## The Absolute Minimum Program

This is the **smallest valid Three.js application** that can draw something.

```js
import * as THREE from "three";

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 3;

// 3. Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Something to see
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. Render once
renderer.render(scene, camera);
```

If you remove **any one** of the numbered sections above, nothing works.

---

## Why These Three Objects Exist

### 1️⃣ Scene — The World Database

```js
const scene = new THREE.Scene();
```

The scene:

- Stores objects in a **tree structure**
- Has **no pixels**
- Has **no GPU access**
- Does **nothing by itself**

Think of it as:

> A structured JSON object describing a 3D world

### Scene Is NOT

- A canvas
- A renderer
- A camera

---

## Scene Graph — Parent / Child Reality

Every object added to the scene becomes part of a **hierarchy**.

```js
scene.add(cube);
```

Internally:

```text
Scene
 └── Mesh (cube)
```

If you later do:

```js
const group = new THREE.Group();
group.add(cube);
scene.add(group);
```

Now:

```text
Scene
 └── Group
      └── Mesh (cube)
```

### Why This Matters

- Moving the group moves the cube
- Rotating the group rotates all children
- Scaling multiplies downward

This explains **GLTF models**, **bones**, **nested meshes**.

---

## 2️⃣ Camera — The Mathematical Observer

```js
const camera = new THREE.PerspectiveCamera(75, aspect, near, far);
```

The camera:

- Is just another object in the scene graph
- Has position & rotation
- Defines how 3D becomes 2D

### Field of View (FOV)

- Large FOV → wide, distorted
- Small FOV → zoomed, flat

### Near / Far Planes

Anything outside this range is **discarded by the GPU**.

```text
[ camera ] |---- visible ----| X culled
```

Bad near/far values cause:

- Z‑fighting
- Clipping bugs
- Precision loss

---

## Cameras Do Not Render

This is critical:

> **The camera does not draw anything**

It only provides:

- A view matrix
- A projection matrix

The renderer uses those matrices.

---

## 3️⃣ Renderer — The GPU Commander

```js
const renderer = new THREE.WebGLRenderer({ antialias: true });
```

The renderer:

- Creates the WebGL context
- Owns the canvas
- Talks to the GPU

### This Is Where WebGL Lives

Everything before this is **CPU-side preparation**.

---

## Renderer Size & Resolution

```js
renderer.setSize(width, height);
```

This sets:

- Canvas resolution
- Viewport size

If you forget this:

- The canvas defaults to 300×150
- Your scene looks stretched or blurry

---

## Attaching the Canvas

```js
document.body.appendChild(renderer.domElement);
```

Without this:

- Rendering still happens
- But you see nothing

The GPU is drawing — just not visible.

---

## Rendering a Frame

```js
renderer.render(scene, camera);
```

This does **all** of the following:

1. Traverses the scene graph
2. Collects visible objects
3. Applies camera matrices
4. Binds geometries
5. Binds materials & shaders
6. Uploads uniforms
7. Issues GPU draw calls

All in one call.

---

## Rendering Is Stateless

Each frame:

- Scene is re‑evaluated
- Nothing is remembered by default

That’s why:

- You must render every frame
- Animations require loops

(This is next file.)

---

## Resize Handling (Often Missed)

```js
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

Why this exists:

- Aspect ratio affects projection math
- GPU viewport must match canvas

Skipping this causes:

- Squished scenes
- Incorrect perspective

---

## Coordinate System (Burn This In)

Three.js uses **right‑handed coordinates**:

- +X → right
- +Y → up
- +Z → out of screen (toward you)

Camera looks down **‑Z** by default.

This explains why:

```js
camera.position.z = 3;
```

Moves the camera _back_.

---

## Common Beginner Misconception

> “I added an object but can’t see it”

Checklist:

- Is it added to the scene?
- Is it in front of the camera?
- Is it within near/far planes?
- Is there a material that renders?
- Did you call render?

There is no magic beyond this list.

---

## Mental Model Summary

- Scene = data tree
- Camera = math transform
- Renderer = GPU execution

Nothing more. Nothing less.

---

## What’s Next

Now that you understand **one frame**, we move to:

➡ `02-render-loop-and-time.md`

That file explains:

- requestAnimationFrame
- time deltas
- why animations exist
- how everything moves

Do not skip it.
