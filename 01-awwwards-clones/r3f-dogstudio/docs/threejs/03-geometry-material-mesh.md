# Geometry, Material, Mesh — What the GPU Actually Draws

This file explains **what a Mesh really is**, why geometry and material are separate, and how this maps directly to the GPU pipeline.

If this clicks, shaders will stop feeling scary.

---

## The Core Truth

> **The GPU only knows how to draw triangles.**

Everything in Three.js eventually becomes:

- Triangles
- With attributes
- Processed by shaders

Three.js exists to organize this safely.

---

## Geometry — Shape Without Appearance

```js
const geometry = new THREE.BoxGeometry();
```

Geometry describes:

- Vertex positions
- Faces (triangles)
- Normals
- UVs

It contains **no color**, **no texture**, **no lighting**.

### Internally

All geometries become `BufferGeometry`:

```text
position → Float32Array
normal   → Float32Array
uv       → Float32Array
index    → Uint16Array
```

These arrays are uploaded to the GPU **once** (unless changed).

---

## Attributes — Data Per Vertex

Each vertex can have:

- position (required)
- normal (lighting)
- uv (texturing)
- color (optional)

Example:

```js
geometry.attributes.position;
geometry.attributes.normal;
geometry.attributes.uv;
```

Shaders read these directly.

---

## Material — Appearance Rules

```js
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.5,
  metalness: 0.1,
});
```

A material defines:

- Which shaders are used
- What uniforms exist
- How light is calculated

Materials do **not** contain geometry.

---

## Why Materials Exist

The GPU requires **two shaders**:

1. Vertex shader
2. Fragment shader

Materials:

- Generate these shaders
- Inject lighting logic
- Manage uniforms

Without materials, you would write GLSL for everything.

---

## Mesh — Geometry + Material = Drawable

```js
const mesh = new THREE.Mesh(geometry, material);
```

A mesh:

- References geometry
- References material
- Has transform (position, rotation, scale)

This is the **draw call unit**.

---

## Transform Chain (Very Important)

Each mesh has:

```text
Local Matrix
World Matrix
Model-View Matrix
Projection Matrix
```

Vertex shader math:

```glsl
gl_Position = projection * view * model * vec4(position, 1.0)
```

Three.js computes matrices on the CPU.
GPU uses them per vertex.

---

## Multiple Meshes, Shared Data

You can reuse:

```js
const geometry = new THREE.SphereGeometry();

const mesh1 = new THREE.Mesh(geometry, material1);
const mesh2 = new THREE.Mesh(geometry, material2);
```

Geometry uploaded once.
Different appearance.

This matters for performance.

---

## Built-in Geometries Are Helpers

`BoxGeometry`, `SphereGeometry`, etc:

- Are convenience generators
- Output BufferGeometry

GLTF models use **custom BufferGeometry**.

Same rules apply.

---

## Materials vs Shaders

| Material     | Shader       |
| ------------ | ------------ |
| High-level   | Low-level    |
| Config-based | Code-based   |
| Easier       | More control |

Materials generate shaders internally.

Your project overrides this.

---

## Why MeshMatcapMaterial Is Special

Matcap materials:

- Ignore lights
- Use normals + view direction
- Sample a texture

Perfect for:

- Stylized looks
- Performance
- Artistic control

This explains why your dog uses matcaps.

---

## Common Misconception

> “Material paints the mesh”

False.

Material defines **how fragments are shaded**.

Fragments are pixels **after** rasterization.

---

## Mental Model Summary

- Geometry = shape data
- Material = shading logic
- Mesh = draw call
- GPU draws triangles only

---

## What’s Next

Now that we know _what_ is drawn, we must understand **how it looks correct**.

➡ `04-textures-color-space.md`

This explains:

- SRGB vs Linear
- Why colors look wrong
- Why your textures needed colorSpace fixes
