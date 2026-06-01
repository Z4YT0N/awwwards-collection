# React Three Fiber — The Correct Mental Model (Read This First)

> **If Three.js is an engine, React Three Fiber (R3F) is a compiler + runtime.**
>
> If you treat it like a magic wrapper, you will stay confused forever.

This README exists to **reset your mental model completely** before touching hooks or JSX.

---

## 0. What R3F Actually Is (In One Sentence)

**R3F is a custom React renderer that translates JSX into Three.js objects and keeps them in sync.**

Not:

- ❌ A new 3D engine
- ❌ A replacement for Three.js
- ❌ A visual abstraction

It is:

- ✅ A reconciliation layer
- ✅ A lifecycle manager
- ✅ A render-loop orchestrator

Three.js still does **all rendering, math, GPU work**.

---

## 1. Why R3F Exists (The Real Reason)

### Vanilla Three.js problem

```ts
scene.add(mesh);
mesh.position.x += 1;
mesh.material = newMat;
```

You must manually:

- Track object lifetimes
- Remove objects
- Dispose geometries/materials
- Sync UI state with 3D state

This does **not scale** in UI-heavy apps.

### React’s strength

React already knows how to:

- Create things declaratively
- Update only what changed
- Destroy things safely
- Tie state → output

R3F fuses these strengths with Three.js.

---

## 2. The Core Idea: Declarative Scene Graph

### Vanilla Three.js (imperative)

```ts
const mesh = new THREE.Mesh(geo, mat);
mesh.position.set(1, 0, 0);
scene.add(mesh);
```

### R3F (declarative)

```jsx
<mesh position={[1, 0, 0]}>
  <boxGeometry />
  <meshStandardMaterial />
</mesh>
```

You are **describing desired state**, not issuing commands.

React decides:

- When to create
- When to update
- When to destroy

---

## 3. JSX Is Not HTML (This Is Critical)

This:

```jsx
<mesh />
```

Does **NOT** create a DOM element.

It creates:

```ts
new THREE.Mesh();
```

JSX in R3F is just **syntax sugar for Three.js constructors**.

---

## 4. The Reconciliation Process (What React Actually Does)

On every render:

1. React compares previous JSX tree
2. Finds differences
3. Applies minimal mutations to Three.js objects

Examples:

```jsx
<mesh position={[x, 0, 0]} />
```

If `x` changes:

- No new mesh created
- Only `mesh.position.x` mutates

This is **key to performance**.

---

## 5. R3F Does NOT Remove Three.js Knowledge

You still must understand:

- Cameras
- Lights
- Materials
- Color spaces
- Loaders
- Animations

R3F does NOT simplify graphics.

It simplifies **lifecycle and state wiring**.

---

## 6. The Render Loop: Who Owns It?

### Vanilla Three.js

You own the loop:

```ts
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
```

### R3F

R3F owns the loop.

You **inject behavior** into it.

```ts
useFrame((state, delta) => {
  mesh.rotation.y += delta;
});
```

Think of `useFrame` as:

> “Subscribe to the engine heartbeat.”

---

## 7. Why Hooks Exist in R3F

Hooks are **escape hatches**, not magic.

| Hook          | Purpose                        |
| ------------- | ------------------------------ |
| useThree      | Access renderer, camera, scene |
| useFrame      | Per-frame logic                |
| useLoader     | Asset loading                  |
| useAnimations | Animation wiring               |

Each hook maps to **something you already know** in Three.js.

---

## 8. Strict Rules You Must Follow

### ❌ Do NOT

- Mutate objects outside React lifecycle
- Create Three.js objects every render
- Use `new THREE.Mesh()` inside JSX components

### ✅ DO

- Use JSX for structure
- `useRef` for imperative access
- Hooks for lifecycle

---

## 9. Why Your Confusion Is Normal (And Expected)

You are learning:

- A graphics engine
- A rendering abstraction
- A UI framework

At the same time.

Confusion happens when:

- You don’t know **which layer** owns responsibility

This docs set is designed to fix exactly that.

---

## 10. Final Mental Model (Burn This In)

```text
Three.js = engine
R3F = renderer
JSX = scene description
Hooks = lifecycle taps
React = state + diffing
GPU = final execution
```

If something breaks:

- Ask which layer owns it
- Debug there

---

## What’s Next

➡ **01-what-r3f-is-and-is-not.md**

We will now draw a **hard boundary** between:

- What R3F controls
- What Three.js still owns

This boundary is where most developers get lost.
