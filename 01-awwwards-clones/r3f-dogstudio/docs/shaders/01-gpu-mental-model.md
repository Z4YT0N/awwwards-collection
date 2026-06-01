# 01 — GPU Mental Model (Think Like the Shader)

> Before writing GLSL, you must **mentally live on the GPU**.

This file lays the foundation for vertex & fragment shaders, uniforms, and your `onBeforeCompile` experiments.

---

## 0. Parallelism is Everything

- Vertex shader runs **once per vertex**
- Fragment shader runs **once per pixel**
- No guarantee of order between executions

> Forget sequential reasoning.

### Example

```glsl
// fragment shader
if(x > 0.5) { color = vec3(1.0); }
```

- Each pixel evaluates independently
- CPU-style loops do not exist

---

## 1. Attributes: Per-vertex inputs

- Position, normal, uv, color
- Immutable from CPU (unless you update buffer)

Vertex shader sees attributes like this:

```glsl
attribute vec3 position;
attribute vec2 uv;
```

> Think: “Every vertex runs this code independently.”

---

## 2. Varyings: Interpolated Data

- Pass data from vertex → fragment
- Automatically interpolated

Example:

```glsl
varying vec2 vUv;
vUv = uv;
```

- Every fragment now has a UV for coloring
- Never assigned manually in fragment

---

## 3. Uniforms: Global Constants

- Shared across all vertices and pixels
- Updated from JS
- Immutable in shader execution (per draw call)

```glsl
uniform float uProgress;
uniform sampler2D uTexture;
```

- Every vertex & fragment sees the same value
- Perfect for animations or transitions

---

## 4. Vertex Shader Responsibilities

- Transform positions (`modelViewMatrix`, `projectionMatrix`)
- Pass varyings
- Optionally deform geometry

```glsl
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
```

- You can inject math here for morphs or waves
- Runs once per vertex

---

## 5. Fragment Shader Responsibilities

- Determine color of pixel
- Apply lighting, textures, blending
- Can read interpolated varyings & uniforms

```glsl
vec4 texColor = texture2D(uTexture, vUv);
gl_FragColor = texColor * vec4(vec3(uProgress), 1.0);
```

- Runs millions of times independently
- Avoid heavy conditionals or loops

---

## 6. Statelessness

- No global state between executions
- Each vertex & fragment is isolated
- You cannot “remember previous pixel”

Think of shaders as **functions run in parallel millions of times**

---

## 7. GLSL and Your Project

- `uMatcap1` & `uMatcap2` = uniforms
- `vViewPosition` = varying from vertex shader
- Mix function = interpolation for transition

```glsl
float progress = smoothstep(uProgress - transitionFactor, uProgress, (vViewPosition.x + vViewPosition.y) * 0.5 + 0.5);
vec4 matcapColor = mix(matcapColor2, matcapColor1, progress);
```

- Runs per pixel
- Each pixel independent → smooth gradient across model

---

## 8. Key Mental Model

```text
Vertex shader = position & pass varyings
Fragment shader = color per pixel
Uniforms = CPU-controlled constants
Parallel = each execution independent
```

> Once you lock this in, `onBeforeCompile` stops feeling like dark magic.

---

## Next Steps

➡ **02-vertex-shader.md**

Now we will explore **vertex shaders in depth** with examples, explaining exactly how geometry deformation and varyings work.
