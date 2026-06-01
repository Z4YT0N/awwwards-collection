# 03 — Fragment Shader Deep Dive (Color & Matcap Blending)

> Fragment shaders determine the final color of each pixel. This is where your matcap transitions and textures live.

---

## 0. Recap: Fragment Shader Responsibilities

- Runs once per pixel
- Receives interpolated varyings from vertex shader
- Can access uniforms
- Computes `gl_FragColor`

Remember: **no position manipulation here**, only color computations.

---

## 1. Basic Fragment Shader Structure

```glsl
uniform vec3 uColor;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(uColor, 1.0);
}
```

- `uColor` = uniform provided by JS
- `vUv` = interpolated from vertex shader
- `gl_FragColor` = final pixel color

---

## 2. Sampling Textures

```glsl
uniform sampler2D uMatcapTexture;
varying vec2 vUv;

void main() {
    vec4 texColor = texture2D(uMatcapTexture, vUv);
    gl_FragColor = texColor;
}
```

- Each pixel independently samples the texture
- Interpolated UV coordinates from vertex shader produce smooth mapping

---

## 3. Matcap Transition Logic (Your Project)

```glsl
uniform sampler2D uMatcapTexture1;
uniform sampler2D uMatcapTexture2;
uniform float uProgress;
varying vec3 vViewPosition;

void main() {
    vec2 uv = normalize(vViewPosition.xy) * 0.5 + 0.5;
    vec4 color1 = texture2D(uMatcapTexture1, uv);
    vec4 color2 = texture2D(uMatcapTexture2, uv);
    float transitionFactor = 0.2;
    float progress = smoothstep(uProgress - transitionFactor, uProgress, (vViewPosition.x + vViewPosition.y) * 0.5 + 0.5);
    gl_FragColor = mix(color2, color1, progress);
}
```

### Explanation

- `vViewPosition` is a **varying from vertex shader**
- Computes a per-pixel progress factor
- `mix` interpolates colors between matcap textures
- Produces smooth transition across the 3D surface

---

## 4. Fragment Shader Tips

1. Keep heavy loops minimal (each pixel executes independently)
2. Use `smoothstep` for smooth transitions
3. Always normalize interpolated values when sampling textures
4. Prefer `mix` over manual interpolation for readability

---

## 5. Connection to Three.js / R3F

- `onBeforeCompile` injects these lines into the standard Three.js shader
- Uniforms `uMatcap1`, `uMatcap2`, `uProgress` updated via GSAP
- Each frame, GPU calculates color for millions of pixels
- Your material is effectively a dynamic shader material without writing the whole shader from scratch

---

## 6. Key Takeaways

```text
- Fragment shader = per-pixel color computation
- Varyings carry interpolated data from vertices
- Uniforms control global parameters
- mix + smoothstep = smooth transitions
- Each pixel runs independently in parallel
```

Next up:

➡ **04-onBeforeCompile.md**

We’ll now dissect `onBeforeCompile`, explain exactly how Three.js inserts your code, and show how uniforms interact with your material pipeline.
