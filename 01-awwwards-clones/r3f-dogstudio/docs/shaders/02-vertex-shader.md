# 02 — Vertex Shader Deep Dive (Geometry Manipulation)

> Vertex shaders are where your geometry comes to life. Understanding them is critical for morphs, waves, or procedural animations.

---

## 0. Recap: Vertex Shader Responsibility

- Runs once per vertex
- Determines vertex position (`gl_Position`)
- Passes varyings to fragment shader

Remember: **No coloring, no fragments here.**

---

## 1. Input Data

### Attributes

- Provided by geometry
- Examples: `position`, `normal`, `uv`

```glsl
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
```

### Uniforms

- Shared constants
- Examples: `time`, `progress`, `matrices`

```glsl
uniform float uTime;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
```

---

## 2. Core Transform

### The Pipeline

```glsl
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
```

- `modelViewMatrix`: transforms from model space → camera space
- `projectionMatrix`: camera space → clip space
- `gl_Position`: final vertex position for rasterization

### Equivalent in Three.js

```ts
mesh.updateMatrixWorld();
const vertexWorld = mesh.localToWorld(vertex);
const vertexClip =
  camera.projectionMatrix * camera.matrixWorldInverse * vertexWorld;
```

---

## 3. Deforming Geometry

You can alter `position` before `gl_Position`:

```glsl
vec3 newPos = position + normal * sin(uTime + position.y);
gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
```

- Each vertex independently offset along its normal
- Creates wave effect
- Uniform `uTime` drives animation

### Example: Simple Spin

```glsl
float angle = uTime;
mat3 rotation = mat3(
  cos(angle), 0, -sin(angle),
  0, 1, 0,
  sin(angle), 0, cos(angle)
);
gl_Position = projectionMatrix * modelViewMatrix * vec4(rotation * position, 1.0);
```

---

## 4. Varyings: Passing Data to Fragment Shader

```glsl
varying vec2 vUv;
vUv = uv;
```

- Interpolated across triangle
- Used in fragment shader for texture sampling, gradients, transitions
- Your Dog project uses this for matcap color mixing

---

## 5. Common Mistakes

1. Forgetting `gl_Position` → nothing renders
2. Trying to color here → ignored until fragment shader
3. Mutating attributes globally → impossible, they are per-vertex
4. Using loops like CPU → GPU executes per vertex independently, loops must be small

---

## 6. Practical Connection to R3F

In `onBeforeCompile`:

- `vViewPosition` is set in vertex shader
- `uMatcap1` and `uMatcap2` are uniforms, passed to fragment shader
- Vertex shader passes varyings → fragment shader interpolates for smooth matcap transitions

```glsl
vViewPosition = -mvPosition.xyz;
```

- GPU calculates per vertex
- Fragment shader uses it to decide pixel color

---

## 7. Key Takeaways

```text
- Vertex shader = vertex position + varyings
- gl_Position = must be set
- Uniforms drive animation, attributes are immutable
- Parallel execution, per vertex
```

Next up:

➡ **03-fragment-shader.md**

We’ll explore pixel coloring, lighting, textures, and matcap transitions in depth.
