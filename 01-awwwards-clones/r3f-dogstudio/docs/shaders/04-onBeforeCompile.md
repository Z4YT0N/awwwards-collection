# 04 — onBeforeCompile (Shader Injection Explained)

> `onBeforeCompile` is where Three.js lets you intercept its internally generated shaders and add your custom logic.

This is exactly what your Dog project uses to blend matcap textures dynamically.

---

## 0. Why `onBeforeCompile` Exists

- Three.js materials auto-generate GLSL for lighting, shadows, textures
- Sometimes you want **custom uniforms or effects** without writing a full ShaderMaterial
- `onBeforeCompile` gives a **hook to modify shader code** before compilation

```ts
material.onBeforeCompile = (shader) => {
  // modify shader.vertexShader or shader.fragmentShader
  // add uniforms
};
```

---

## 1. The Shader Object

```ts
shader = {
  vertexShader: string,
  fragmentShader: string,
  uniforms: Record<string, { value: any }>,
};
```

- `vertexShader` = auto-generated vertex shader string
- `fragmentShader` = auto-generated fragment shader string
- `uniforms` = dictionary of uniform variables

You can:

- Add new uniforms
- Replace sections of the shader string
- Keep existing lighting & shadows intact

---

## 2. Adding Uniforms

```ts
shader.uniforms.uMatcapTexture1 = { value: mat1 };
shader.uniforms.uMatcapTexture2 = { value: mat2 };
shader.uniforms.uProgress = { value: 1.0 };
```

- Uniforms are now accessible inside GLSL
- Automatically synced with the GPU each frame
- Perfect for GSAP animations

---

## 3. Injecting GLSL Code

Vertex shader replacement:

```ts
shader.vertexShader = shader.vertexShader.replace(
  "void main() {",
  "varying vec3 vViewPosition;\nvoid main() {",
);
```

Fragment shader replacement:

```ts
shader.fragmentShader = shader.fragmentShader.replace(
  "void main() {",
  "uniform sampler2D uMatcapTexture1;\nuniform sampler2D uMatcapTexture2;\nuniform float uProgress;\nvoid main() {",
);
```

- Inserts your code at the top of the function
- Ensures Three.js code is preserved below
- You can now access uniforms & varyings inside the shaders

---

## 4. Replacing Shader Logic

Example in your project:

```ts
shader.fragmentShader = shader.fragmentShader.replace(
  "vec4 matcapColor = texture2D( matcap, uv );",
  `
  vec4 matcapColor1 = texture2D(uMatcapTexture1, uv);
  vec4 matcapColor2 = texture2D(uMatcapTexture2, uv);
  float transitionFactor = 0.2;
  float progress = smoothstep(uProgress - transitionFactor, uProgress, (vViewPosition.x + vViewPosition.y) * 0.5 + 0.5);
  vec4 matcapColor = mix(matcapColor2, matcapColor1, progress);
  `,
);
```

- Replaces the default matcap color calculation
- Preserves all Three.js lighting computations
- Smooth pixel-level transition using your uniforms

---

## 5. Lifecycle Notes

1. `onBeforeCompile` runs **once per material** before compilation
2. Uniforms remain live and can be updated from JS
3. Works seamlessly with R3F hooks like `useFrame` or `useGSAP`

> Important: Do **not** mutate the material object inside `onBeforeCompile` after compilation. Only uniforms should change at runtime.

---

## 6. Key Takeaways

```text
- onBeforeCompile = hook into Three.js shader pipeline
- shader.vertexShader / shader.fragmentShader = editable strings
- shader.uniforms = GPU-accessible variables
- Replace, inject, or extend GLSL safely
- Allows dynamic effects without ShaderMaterial from scratch
```

Next up:

➡ **05-uniforms-time-transitions.md**

We’ll now explore **how uniforms like uProgress or time drive GPU animations**, including smooth transitions and GSAP integration.
