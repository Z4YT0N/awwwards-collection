# 04 — Drei Abstractions (Convenience, Not Magic)

> Drei does not change how Three.js works.
>
> It **removes boilerplate** you already understand.

This file decompiles the Drei hooks you are using in your project.

---

## 0. The Rule of Drei

> **If you can’t rewrite it in vanilla Three.js, you don’t understand it yet.**

We will fix that here.

---

## 1. `useGLTF`

### What you write

```ts
const models = useGLTF("/models/dog.drc.glb");
```

### What actually happens

Internally, Drei:

1. Creates a `GLTFLoader`
2. Applies DRACO decoder if needed
3. Loads the file once (cache)
4. Returns structured result

### Vanilla Three.js equivalent

```ts
const loader = new GLTFLoader();
const draco = new DRACOLoader();
draco.setDecoderPath("/draco/");
loader.setDRACOLoader(draco);

loader.load("/models/dog.drc.glb", (gltf) => {
  const scene = gltf.scene;
  const animations = gltf.animations;
});
```

### What `useGLTF` gives you

```ts
{
  scene: THREE.Group,
  nodes: Record<string, THREE.Object3D>,
  materials: Record<string, THREE.Material>,
  animations: THREE.AnimationClip[],
}
```

No new concepts.
Just structure + caching.

---

## 2. `useTexture`

### Your code

```ts
const [normalMap] = useTexture(["/models/assets/dog_normals.jpg"]);
```

### Vanilla equivalent

```ts
const loader = new THREE.TextureLoader();
const normalMap = loader.load("/models/assets/dog_normals.jpg");
normalMap.flipY = false;
normalMap.colorSpace = THREE.SRGBColorSpace;
```

### Why Drei helps

- Automatic caching
- Suspense integration
- Array loading

But textures are still **Three.js textures**.

---

## 3. `useAnimations`

### Your code

```ts
const { actions } = useAnimations(models.animations, models.scene);
```

### Vanilla equivalent

```ts
const mixer = new THREE.AnimationMixer(models.scene);

const actions = {};
models.animations.forEach((clip) => {
  actions[clip.name] = mixer.clipAction(clip);
});
```

Plus:

```ts
useFrame((_, delta) => mixer.update(delta));
```

### Why this abstraction matters

It wires:

- Mixer creation
- Action creation
- Frame updates

Correctly.

---

## 4. `primitive`

### JSX

```jsx
<primitive object={models.scene} />
```

### Means

```ts
scene.add(models.scene);
```

R3F does NOT clone.
You own the object.

---

## 5. Why Drei Is Safe to Use

Because:

- It does not change APIs
- It does not add hidden state
- It follows Three.js rules

You can always eject.

---

## 6. Common Drei Misuses

### ❌ Thinking Drei replaces learning Three.js

It doesn’t.

### ❌ Mutating Drei return values incorrectly

```ts
models.scene = new THREE.Group(); // WRONG
```

---

## 7. Your Project, De-mystified

Every Drei hook you used:

- Has a vanilla equivalent
- Follows the engine rules

You were not "just copying".
You were **standing on abstractions**.

---

## What’s Next

➡ **three-to-r3f/README.md**

Now we will do the reverse:

- Start with Three.js
- Show how R3F maps onto it

This is where true confidence locks in.
