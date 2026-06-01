# Render Loop & Time — How Things Actually Move

This file explains **why nothing animates by default**, how time flows in Three.js, and why every animation system (GSAP, R3F, shaders) ultimately depends on the **render loop**.

No abstractions. No React.
Just the truth.

---

## The Core Problem

When you do this:

```js
renderer.render(scene, camera);
```

You draw **one frozen image**.

Three.js does **not**:

- Remember previous frames
- Animate automatically
- Track time for you

If you want motion, **you must redraw continuously**.

---

## The Browser Clock

The browser provides exactly one tool for smooth animation:

```js
requestAnimationFrame(callback);
```

What it means:

- Call `callback` **before the next screen repaint**
- Usually ~60 times per second
- Synced to the display refresh rate

This is not Three.js.
This is the browser.

---

## The Minimal Render Loop

```js
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

This does three things:

1. Schedules the next frame
2. Draws the current state
3. Repeats forever

This loop is **mandatory** for animation.

---

## Why requestAnimationFrame Is Required

Alternatives like `setInterval`:

- Drift over time
- Ignore tab visibility
- Waste CPU

`requestAnimationFrame`:

- Pauses when tab is hidden
- Matches monitor refresh
- Saves battery

That’s why all engines use it.

---

## Animation Is Just State Change

Nothing “moves” by itself.

This:

```js
cube.rotation.y += 0.01;
```

Only matters **if it happens before render**.

Full example:

```js
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
```

Motion = **changing values over time**.

---

## Time Is Continuous, Frames Are Not

Frames are **discrete**.
Time is **continuous**.

If frame rate changes:

- Motion speed changes

This is bad.

---

## Delta Time — The Fix

Delta time = **time since last frame**.

```js
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  cube.rotation.y += delta * 1.0;

  renderer.render(scene, camera);
}
```

Now:

- Motion speed is consistent
- Frame drops don’t break animation

---

## Absolute Time vs Delta Time

```js
clock.getElapsedTime(); // total time since start
clock.getDelta(); // time since last frame
```

Use cases:

- **Elapsed time** → shaders, looping effects
- **Delta time** → physics, movement

This distinction matters later.

---

## Why GSAP Still Needs the Loop

GSAP animates **values**, not pixels.

If GSAP updates:

```js
cube.position.x = 1;
```

Nothing changes on screen unless:

```js
renderer.render(scene, camera);
```

GSAP does **not** replace the render loop.

It depends on it.

---

## Multiple Systems, One Loop

In real projects, this happens per frame:

- GSAP updates values
- ScrollTrigger updates progress
- Animations update bones
- Shaders update uniforms
- Renderer draws

All inside **one loop**.

This is why engines centralize it.

---

## The GPU Frame Boundary

Each frame:

1. CPU updates scene data
2. Uniforms are uploaded
3. GPU runs shaders
4. Pixels are drawn

The GPU does NOT know about JavaScript time.

You must send time **every frame**.

---

## Common Mistake

> “My animation runs once and stops”

Cause:

- `renderer.render` called once

Fix:

- Wrap it in a loop

There is no other reason.

---

## Mental Model Summary

- requestAnimationFrame = heartbeat
- Loop = redraw contract
- Animation = changing numbers
- Time must be managed explicitly

---

## What’s Next

Now that time exists, we can explain **what is being animated**.

➡ `03-geometry-material-mesh.md`

This explains how objects are built and why materials & shaders exist.
