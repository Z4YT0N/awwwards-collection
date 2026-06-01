# 01 — What React Three Fiber _Is_ and _Is NOT_

> Most R3F confusion comes from assigning responsibility to the wrong layer.
>
> This file draws **hard, non-negotiable boundaries**.

Read slowly. This is foundational.

---

## 0. One Rule That Explains Everything

> **If it affects pixels → Three.js / GPU**
> **If it affects lifecycle or state → React / R3F**

Memorize this.

---

## 1. What R3F IS

### 1.1 A Custom React Renderer

Just like:

- React DOM → HTML
- React Native → Native UI

R3F renders React elements into:

```text
JSX → Three.js objects → WebGL
```

R3F implements:

- Object creation
- Property updates
- Cleanup & disposal

---

### 1.2 A Scene Graph Reconciler

R3F:

- Compares previous & next JSX trees
- Applies minimal mutations

Example:

```jsx
<mesh position={[x, 0, 0]} />
```

If `x` changes:

- Same Mesh instance
- Only `.position.x` mutates

No re-creation.

---

### 1.3 A Lifecycle Manager

R3F knows when to:

- Add objects to scene
- Remove them
- Dispose geometries & materials

Vanilla Three.js **does not** do this for you.

---

### 1.4 A Render Loop Orchestrator

R3F:

- Owns `requestAnimationFrame`
- Calls `renderer.render()`
- Injects subscribers (`useFrame`)

You don’t write the loop.
You _participate_ in it.

---

## 2. What R3F IS NOT

This section is more important.

---

### 2.1 R3F Is NOT a Graphics Engine

It does NOT:

- Change how lighting works
- Simplify shaders
- Optimize GPU code

This is still Three.js:

```glsl
vec3 color = light * normal;
```

If lighting looks wrong → learn lighting, not R3F.

---

### 2.2 R3F Is NOT a Performance Layer

Bad Three.js code stays bad.

```jsx
{
  Array.from({ length: 1000 }).map(() => <mesh />);
}
```

This creates 1000 meshes.
React cannot save you.

---

### 2.3 R3F Is NOT Declarative Animation

This surprises people.

R3F does **not** replace:

- AnimationMixer
- GSAP
- Physics engines

You still animate imperatively.

```ts
useFrame(() => {
  mesh.rotation.y += 0.01;
});
```

Declarative scene.
Imperative motion.

---

### 2.4 R3F Is NOT Drei

Drei is:

- A helper library
- Built on top of R3F

R3F works without Drei.

Drei removes boilerplate, not concepts.

---

## 3. The Responsibility Table (Print This)

| Concern       | Owner                     |
| ------------- | ------------------------- |
| Scene graph   | R3F                       |
| Render loop   | R3F                       |
| GPU execution | WebGL                     |
| Shaders       | Three.js                  |
| Materials     | Three.js                  |
| Loaders       | Three.js (wrapped by R3F) |
| Animations    | Three.js                  |
| State         | React                     |

If you debug in the wrong column → pain.

---

## 4. Why JSX Sometimes Feels Wrong

Because JSX:

- Hides constructors
- Hides `scene.add()`
- Hides disposal

Example:

```jsx
<mesh>
  <boxGeometry />
</mesh>
```

Actually means:

```ts
const mesh = new THREE.Mesh();
mesh.geometry = new THREE.BoxGeometry();
scene.add(mesh);
```

Understanding this removes the magic.

---

## 5. Why You _Must_ Still Read Three.js Docs

Because R3F:

- Does not explain color spaces
- Does not explain GLTF
- Does not explain shaders

Your Dog project proves this:

```ts
gl.outputColorSpace = THREE.SRGBColorSpace;
gl.toneMapping = THREE.ReinhardToneMapping;
```

That knowledge comes from **Three.js**, not R3F.

---

## 6. Final Boundary Checklist

When writing code, ask:

1. Is this creating or describing objects? → JSX
2. Is this mutating per-frame? → useFrame / GSAP
3. Is this GPU logic? → shader
4. Is this asset loading? → loader

If you can answer those, you are _not_ copying.

---

## What’s Next

➡ **02-jsx-to-threejs-mapping.md**

We will literally map:

```jsx
<mesh position={[1, 2, 3]} />
```

To the **exact Three.js code** it produces.

No magic left after that.
