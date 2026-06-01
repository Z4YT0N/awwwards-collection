# Textures & Color Space — Why Things Look “Wrong” Until They Don’t

This file explains **why textures often look washed out, too dark, flipped, or incorrect**, and why color space is one of the most misunderstood parts of Three.js.

This directly explains lines in your project like:

```ts
texture.colorSpace = THREE.SRGBColorSpace;
texture.flipY = false;
```

---

## The Core Problem

The GPU does **math**, not color perception.

Most images you load:

- Are authored for **human eyes**
- Stored in **sRGB color space**

The GPU expects:

- **Linear color space** for lighting math

Mismatch = wrong visuals.

---

## What Is Color Space (Really)

Color space defines **how numeric values map to perceived brightness**.

### sRGB (Non‑Linear)

- Optimized for human vision
- Dark values get more precision
- Most images on disk use this

### Linear (Linear)

- Numeric values map linearly to light intensity
- Required for correct lighting math

Lighting **must** happen in linear space.

---

## The Golden Rule

> **Textures created for display must be decoded from sRGB → Linear before lighting.**

If you skip this:

- Colors look dull
- Highlights are wrong
- Shading feels fake

---

## How Three.js Handles This

Three.js separates concerns:

- **Color textures** → sRGB
- **Data textures** → Linear

### Color textures (need sRGB)

- Albedo / Diffuse
- BaseColor
- Matcap textures

### Data textures (stay linear)

- Normal maps
- Roughness maps
- Metalness maps
- Height maps

---

## Why You Did This Correctly

From your project:

```ts
texture.colorSpace = THREE.SRGBColorSpace;
```

This tells Three.js:

- Decode texture from sRGB
- Convert to linear before lighting

Without this line, the GPU assumes linear input.

---

## Renderer Output Color Space

Textures are only half the story.

The renderer also needs to know:

```ts
gl.outputColorSpace = THREE.SRGBColorSpace;
```

This tells Three.js:

- Convert final linear result → sRGB for display

Without this:

- Colors appear too dark

---

## Full Correct Pipeline

```text
Image on disk (sRGB)
   ↓ decode
Linear color (GPU math)
   ↓ lighting & shading
Linear result
   ↓ encode
Screen output (sRGB)
```

Three.js must be configured at **both ends**.

---

## Why Normal Maps Stay Linear

Normal maps store:

- Direction vectors
- Not colors

Applying sRGB decoding would:

- Corrupt vectors
- Break lighting

That’s why you did:

```ts
normalMap.colorSpace = THREE.LinearSRGBColorSpace; // implicit default
```

(Usually you don’t set it at all.)

---

## Texture Orientation — flipY

WebGL and image formats disagree on:

- Where (0,0) UV is

Three.js assumes:

- Bottom-left origin

GLTF textures are:

- Top-left origin

Thus:

```ts
texture.flipY = false;
```

Required for GLTF correctness.

---

## Why GLTF Is Special

GLTF defines:

- Exact color space rules
- Exact texture orientation

Three.js follows the spec.

Manual texture loading must match it.

---

## Matcap Textures (Your Case)

Matcaps:

- Encode lighting in texture
- Are **display textures**
- Must be sRGB

You did this correctly.

---

## Common Visual Bugs Explained

### Washed out colors

→ sRGB texture treated as linear

### Too dark

→ outputColorSpace not set

### Upside-down texture

→ flipY mismatch

### Broken normals

→ normal map decoded as sRGB

All are color space mistakes.

---

## Mental Model Summary

- Lighting math = linear
- Images = usually sRGB
- Decode in → encode out
- Data ≠ color

---

## What’s Next

Now that visuals are correct, we can load **real assets**.

➡ `05-loaders-gltf-glb.md`

That file explains:

- Why GLB exists
- Why Draco compression matters
- How loaders work internally
- What `useGLTF` hides
