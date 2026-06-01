# 02 — JSX → Three.js Mapping (No Magic, Just Constructors)

> This file removes the last illusion.
>
> After this, JSX will feel like **typed pseudocode for Three.js**.

---

## 0. The One Sentence Truth

> **Every JSX element in R3F maps to a Three.js class + property mutations.**

Nothing more.
Nothing less.

---

## 1. How R3F Knows What `<mesh />` Means

R3F maintains an internal **catalog**:

```text
mesh → THREE.Mesh
boxGeometry → THREE.BoxGeometry
meshStandardMaterial → THREE.MeshStandardMaterial
```

When React sees:

```jsx
<mesh />
```

R3F executes:

```ts
const mesh = new THREE.Mesh();
```

---

## 2. Children = Constructor Assignment

### JSX

```jsx
<mesh>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color="red" />
</mesh>
```

### Actual Three.js equivalent

```ts
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: "red" });

const mesh = new THREE.Mesh();
mesh.geometry = geometry;
mesh.material = material;

scene.add(mesh);
```

The **parent decides ownership**.

---

## 3. Props → Property Assignment

### JSX

```jsx
<mesh position={[1, 2, 3]} rotation={[0, Math.PI, 0]} />
```

### Three.js

```ts
mesh.position.set(1, 2, 3);
mesh.rotation.set(0, Math.PI, 0);
```

Arrays map to `.set()`.
Objects map to `.copy()`.

---

## 4. Special Case: `args`

JSX:

```jsx
<boxGeometry args={[1, 1, 1, 16, 16, 16]} />
```

Means:

```ts
new THREE.BoxGeometry(1, 1, 1, 16, 16, 16);
```

`args` = constructor parameters.

---

## 5. Attach Rules (Why Some Things Don’t Work)

R3F uses **attach points**.

Defaults:

| Child           | Attached to         |
| --------------- | ------------------- |
| geometry        | parent.geometry     |
| material        | parent.material     |
| bufferAttribute | geometry.attributes |

Example:

```jsx
<bufferAttribute attach="attributes-position" />
```

Maps to:

```ts
geometry.attributes.position = attribute;
```

---

## 6. Events Are Raycaster Hooks

### JSX

```jsx
<mesh onClick={(e) => console.log(e.point)} />
```

This is NOT DOM.

Internally:

- Raycaster runs every frame
- Intersections calculated
- Synthetic event emitted

Equivalent Three.js logic:

```ts
raycaster.intersectObjects(scene.children);
```

---

## 7. Refs = Escape Hatch to Imperative Code

### JSX

```jsx
const meshRef = useRef()

<mesh ref={meshRef} />
```

Means:

```ts
const meshRef = { current: THREE.Mesh };
```

This is how you:

- Animate
- Mutate
- Integrate GSAP

---

## 8. Lifecycle: Mount, Update, Unmount

### Mount

```ts
new THREE.Mesh();
scene.add(mesh);
```

### Update

```ts
mesh.position.x = newValue;
```

### Unmount

```ts
scene.remove(mesh);
mesh.geometry.dispose();
mesh.material.dispose();
```

R3F handles disposal **automatically**.

---

## 9. Why This Matters for Your Dog Project

This:

```jsx
<primitive object={models.scene} />
```

Means:

```ts
scene.add(models.scene);
```

No cloning.
No magic.

Your GSAP animations mutate the same object.

---

## 10. Common JSX Misunderstandings

### ❌ Creating objects in render

```jsx
<mesh material={new THREE.MeshStandardMaterial()} />
```

Creates a new material every render.

### ✅ Correct

```ts
const mat = useMemo(() => new THREE.MeshStandardMaterial(), []);
```

---

## 11. Final Mental Model

```text
JSX tag = constructor
props = mutations
children = attachment
ref = imperative access
```

If JSX feels confusing:

- Translate it to Three.js
- Debug there

---

## What’s Next

➡ **03-useThree-useFrame.md**

We now open the hood on:

- Render loop access
- Camera & renderer control
- Why your `useThree` usage works
