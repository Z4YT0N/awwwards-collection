# Loaders, GLTF, and GLB

This document explains **why GLTF/GLB exists**, what actually happens when you load a model, and how Three.js (and later R3F) turns a file into GPU draw calls.

---

## 1. Why 3D loading is different from images

An image load gives you:

- width / height
- pixels

A 3D model load gives you **an entire scene graph**:

- meshes
- geometries (buffers)
- materials
- textures
- animations
- skeletons
- cameras (sometimes)

This is why loaders return **objects**, not simple data.

---

## 2. What GLTF actually is

**GLTF = GL Transmission Format**

Designed by Khronos (same group as OpenGL / WebGL).

Goals:

- Runtime‑ready
- Minimal parsing
- GPU‑friendly
- Portable across engines

GLTF is to 3D what **MP4 is to video**.

---

## 3. GLTF vs GLB

| Format  | Description           |
| ------- | --------------------- |
| `.gltf` | JSON + external files |
| `.glb`  | Binary, single file   |

### `.gltf`

- JSON file
- References:
  - `.bin` (geometry)
  - `.png/.jpg` (textures)

### `.glb`

- One binary blob
- Everything packed inside
- Faster to load
- Easier to deploy

➡ **Use `.glb` for the web unless debugging**

---

## 4. What happens when GLTFLoader runs

```ts
const loader = new GLTFLoader();
loader.load("model.glb", (gltf) => {});
```

Internally:

1. Fetch file
2. Parse header
3. Extract buffers
4. Create BufferGeometry
5. Create Materials
6. Upload buffers to GPU
7. Build scene graph

Nothing is rendered yet.

---

## 5. The GLTF result object

```ts
gltf = {
  scene,
  scenes,
  nodes,
  meshes,
  materials,
  textures,
  animations,
  cameras,
};
```

### `gltf.scene`

- Root THREE.Group
- Already assembled
- Ready to add

```ts
scene.add(gltf.scene);
```

---

## 6. Why GLTF models feel "special"

GLTF:

- Uses **PBR materials**
- Assumes **linear workflow**
- Has **correct normals**
- Has **correct scale units** (meters)

This is why:

- Colors look right
- Lighting behaves predictably
- Animations just work

---

## 7. Animations inside GLTF

GLTF can include:

- Skeletal animation
- Transform animation
- Morph targets

They are **data only** until:

```ts
const mixer = new THREE.AnimationMixer(gltf.scene);
```

(covered in the next file)

---

## 8. Common mistakes

❌ Treating GLTF like OBJ
❌ Manually recreating materials
❌ Forgetting color space
❌ Scaling randomly

---

## 9. Mental model

> GLTF is not a mesh.
> GLTF is a **ready‑made mini scene**.

You don't "build" it — you **place** it.

---

## 10. Why R3F's useGLTF exists

R3F wraps:

- Loader lifecycle
- Caching
- Disposal

But the **data is identical**.

Later you will map:

```ts
useGLTF("/model.glb");
```

to this exact logic.
