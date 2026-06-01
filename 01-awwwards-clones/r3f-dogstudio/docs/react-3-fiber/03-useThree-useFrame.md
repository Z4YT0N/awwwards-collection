# 03 — useThree & useFrame (Owning the Engine Without Breaking React)

> These two hooks are where most people accidentally fight React.
>
> Used correctly, they give you **full engine control**.

---

## 0. The Core Idea

> **R3F owns the render loop — you subscribe to it.**

You never recreate the loop.
You inject logic into an existing one.

---

## 1. What `useThree` Really Is

```ts
const state = useThree();
```

This returns the **current renderer state**, not a copy.

### What’s inside

```ts
{
  gl,        // THREE.WebGLRenderer
  scene,     // THREE.Scene
  camera,    // Active camera
  clock,     // THREE.Clock
  size,      // Canvas size
  viewport,  // Viewport in world units
}
```

This is **live engine state**.

---

## 2. Mutating Inside `useThree` Is Allowed (Why?)

Your code:

```ts
useThree(({ camera, gl }) => {
  camera.position.z = 0.55;
  gl.toneMapping = THREE.ReinhardToneMapping;
  gl.outputColorSpace = THREE.SRGBColorSpace;
});
```

Why this is safe:

- These objects are **not React state**
- They are external mutable engine objects
- React does not diff them

Rule:

> Mutating Three.js objects is allowed.

---

## 3. When to Use `useThree`

Use it for:

- Camera setup
- Renderer config
- Scene-wide values

Do NOT use it for:

- Per-frame animation
- Object-local mutation

---

## 4. What `useFrame` Actually Does

```ts
useFrame((state, delta) => {});
```

This registers a callback that runs:

```text
Every frame
Before renderer.render()
After all other subscribers
```

Equivalent to:

```ts
function animate() {
  const delta = clock.getDelta();
  callback(state, delta);
  renderer.render(scene, camera);
}
```

---

## 5. `delta` vs `elapsedTime`

`delta`:

- Seconds since last frame
- Stable
- Use for motion

`elapsedTime`:

- Total runtime
- Use for oscillations

### Example

```ts
useFrame((state, delta) => {
  mesh.rotation.y += delta;
});
```

Never multiply by `elapsedTime`.

---

## 6. Execution Order Matters

R3F frame pipeline:

```text
1. clock.getDelta()
2. useFrame subscribers
3. mixer.update(delta)
4. renderer.render()
```

This is why animations work automatically.

---

## 7. Why `useAnimations` Works Without `useFrame`

Internally:

```ts
useFrame((_, delta) => mixer.update(delta));
```

So your animation system:

- Is time-correct
- Is frame-synced
- Does not require manual wiring

---

## 8. Mixing GSAP With `useFrame`

GSAP:

- Mutates values over time
- Is time-based

R3F:

- Renders every frame

They cooperate if:

- GSAP mutates Three.js objects
- You do NOT animate React state

Your project does this correctly.

---

## 9. Common Mistakes

### ❌ Using setState in useFrame

```ts
useFrame(() => setX(x + 1));
```

Causes rerender every frame.

### ✅ Correct

```ts
useFrame(() => (mesh.position.x += 0.01));
```

---

## 10. Mental Model (Lock This In)

```text
useThree = engine access
useFrame = per-frame subscription
React = structure only
```

If something feels wrong:

- You’re probably animating React

---

## What’s Next

➡ **04-drei-abstractions.md**

We’ll dissect:

- useGLTF
- useTexture
- useAnimations

And show the **exact raw Three.js code** they replace.
