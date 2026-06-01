# 05 — Uniforms, Time, and Transitions (Driving GPU Animations)

> This file explains how uniforms like `uProgress` or `uTime` are used to animate shaders over time, including integration with GSAP for smooth transitions.

---

## 0. What Uniforms Are

- Uniforms are global variables **shared between CPU and GPU**
- Each vertex and fragment sees the same value
- Updated per frame from JavaScript

Example from your Dog project:

```ts
material.current.uProgress.value = 0.0;
```

> This directly drives the GPU matcap transition.

---

## 1. Time as a Uniform

- `uTime` = seconds elapsed
- Incremented every frame via `useFrame` or requestAnimationFrame
- Drives procedural animations (waves, spins, color cycles)

```ts
useFrame((state) => {
  shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
});
```

### GLSL usage

```glsl
uniform float uTime;
vec3 offset = position + normal * sin(uTime);
```

- Produces per-vertex waving motion
- Fully GPU-side calculation

---

## 2. Smoothstep for Transitions

`smoothstep(edge0, edge1, x)` = interpolates smoothly from 0 → 1

- Ideal for fade, progress, or blend effects
- In your project:

```glsl
float progress = smoothstep(uProgress - 0.2, uProgress, (vViewPosition.x + vViewPosition.y) * 0.5 + 0.5);
vec4 matcapColor = mix(matcapColor2, matcapColor1, progress);
```

- Smoothly interpolates between `matcapColor2` → `matcapColor1` based on progress
- Each pixel computes its own progress independently → smooth gradient

---

## 3. Integrating GSAP with Uniforms

- GSAP animates **values on JS objects**
- R3F updates the GPU automatically via uniforms

Example:

```ts
gsap.to(material.current.uProgress, {
  value: 1.0,
  duration: 1,
});
```

- No need to manually call `useFrame` for this transition
- GPU shader sees updated uniform each frame
- Works perfectly with per-pixel calculations

---

## 4. Best Practices

1. **Avoid animating React state** for per-frame shader values
   - Use `material.uniforms.value` or Three.js objects

2. **Keep uniform updates lightweight**
   - GSAP or `useFrame` fine; don’t compute heavy loops in JS

3. **Use `smoothstep` or `mix` for smooth GPU interpolation**
   - Avoid abrupt jumps

4. **Time + progress** = foundation for all dynamic shaders

---

## 5. Mental Model

```text
JS (CPU) -> update uniforms -> GPU (vertex/fragment) uses uniforms
Vertex shader -> positions vary per vertex
Fragment shader -> colors vary per pixel
Smoothstep/mix -> interpolate smoothly across pixels
GSAP -> drives uniforms over time
```

- Everything else is just math on the GPU
- Once you internalize this, shaders are deterministic and debuggable

---

## Summary

- Uniforms are the bridge between CPU and GPU
- Time-driven uniforms create dynamic effects
- Smoothstep + mix = seamless transitions
- GSAP integrates naturally for animated shader uniforms
- Your Dog project matcap transition is now fully explainable from CPU → GPU

> You now have a **complete mental model of shaders**: GPU execution, vertex & fragment roles, uniforms, transitions, and R3F integration.
