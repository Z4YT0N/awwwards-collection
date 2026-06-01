# 06 — Animations, AnimationMixer, and Time (The Real Mental Model)

> If you understand **this file**, animation bugs basically disappear.
>
> No more guessing. No more cargo-cult `.play()` calls.

---

## 0. The Big Lie Most Tutorials Tell

Most tutorials implicitly teach this:

> “Animations are just things you play.”

That is **wrong**.

### The truth

**Three.js animations are data-driven time evaluators.**

Nothing moves unless:

1. Time advances
2. A mixer evaluates clips at that time
3. The evaluated values are written back into objects

If **any one** of those is missing → animation freezes.

---

## 1. What Actually Comes Inside a GLTF Animation

When you load a `.glb` with animation, you get:

```ts
{
  scene: THREE.Group,
  animations: THREE.AnimationClip[],
}
```

### What an AnimationClip really is

An `AnimationClip` is **not motion**.

It is:

- A list of **tracks**
- Each track targets a property
- Each track stores **keyframes over time**

Example mental model:

```text
Time: 0s ── 1s ── 2s ── 3s

Bone.rotation.x:
  0.0 → 0.2 → 0.6 → 0.2

Bone.position.y:
  0.0 → 0.4 → 0.1 → 0.0
```

No GPU work happens here.
No objects move.
This is **pure data**.

---

## 2. Why AnimationMixer Exists (And Why You Can’t Skip It)

### The core problem

Three.js needs a system that:

- Knows current time
- Evaluates all active clips
- Applies results to real objects

That system is **AnimationMixer**.

### What AnimationMixer really is

```ts
const mixer = new THREE.AnimationMixer(rootObject);
```

It is:

- A **time controller**
- A **clip evaluator**
- A **property writer**

Bound to **one object subtree**.

> ❗ This is critical: the mixer only affects objects under `rootObject`.

---

## 3. AnimationAction: The Playable Handle

You never play clips directly.

You create **actions** from the mixer:

```ts
const action = mixer.clipAction(clip);
```

### What an AnimationAction does

An action:

- References one clip
- Has its own time, weight, loop mode
- Can be faded, blended, paused

Think of it as:

> “A clip instance with state.”

Multiple actions can come from the **same clip**.

---

## 4. The Absolute Rule: `mixer.update(delta)`

This is the most important line in animation:

```ts
mixer.update(delta);
```

### What `delta` means

`delta` = **seconds since last frame**

Why it matters:

- Frame rates vary
- Time must be continuous

Without delta-based updates:

- Fast machines run faster
- Slow machines run slower

### What happens internally

Each frame:

1. Mixer advances its internal clock by `delta`
2. Active actions evaluate their clips
3. Tracks interpolate values
4. Object properties are updated

No update call → frozen animation.

---

## 5. The Full Vanilla Three.js Animation Loop

```ts
const clock = new THREE.Clock();
const mixer = new THREE.AnimationMixer(gltf.scene);

const action = mixer.clipAction(gltf.animations[0]);
action.play();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  mixer.update(delta);

  renderer.render(scene, camera);
}

animate();
```

### What each line is responsible for

| Line          | Responsibility     |
| ------------- | ------------------ |
| Clock         | Measure time       |
| Mixer         | Evaluate animation |
| Action        | Clip state         |
| update(delta) | Advance animation  |
| render        | Draw result        |

---

## 6. Skeletal Animation: Why Bones Are Special

Most GLTF animations are **skeletal**.

### What actually moves

- Bones are just `Object3D`s
- Mesh vertices are weighted to bones

Pipeline:

```text
Bone transforms → Skinning → Vertex positions → GPU
```

### Why this must run every frame

Because:

- Bone matrices change every frame
- Skinning depends on current pose

Stop the mixer → bones freeze → mesh freezes.

---

## 7. Looping, Clamping, and Stopping (Correctly)

### Loop modes

```ts
action.setLoop(THREE.LoopRepeat);
action.setLoop(THREE.LoopOnce);
action.setLoop(THREE.LoopPingPong);
```

### Clamping

```ts
action.clampWhenFinished = true;
```

Without clamping:

- Animation snaps back to bind pose

### Stopping vs Pausing

```ts
action.stop(); // resets time
action.paused = true; // freezes time
```

This difference matters when re-playing.

---

## 8. Multiple Animations, One Mixer

A single mixer can manage:

- Idle
- Walk
- Run
- Jump

```ts
const idle = mixer.clipAction(clips[0]);
const walk = mixer.clipAction(clips[1]);

idle.play();
walk.fadeIn(0.5).play();
```

Mixer blends them by **weight**.

---

## 9. Why R3F’s `useAnimations` Exists

R3F hides boilerplate, not concepts.

```ts
const { actions, mixer } = useAnimations(animations, scene);
```

Internally it:

- Creates a mixer
- Binds it to the scene
- Updates it every frame using `useFrame`

So this:

```ts
actions["Take 001"].play();
```

Is equivalent to:

```ts
const mixer = new AnimationMixer(scene);
const action = mixer.clipAction(clip);
action.play();
// plus automatic mixer.update(delta)
```

---

## 10. Mapping This to _Your_ Dog Project

### This line

```ts
const { actions } = useAnimations(models.animations, models.scene);
```

Means:

- One mixer bound to `models.scene`
- All bones under that scene

### This effect

```ts
useEffect(() => {
  const action = actions?.["Take 001"];
  action?.reset().play();
  return () => action?.stop();
}, [actions]);
```

Correctly:

- Resets time
- Plays once component mounts
- Cleans up on unmount

You are doing this **right**.

---

## 11. Common Animation Bugs (And Why They Happen)

### ❌ Animation plays once then stops forever

Cause:

- Action was stopped, not reset

Fix:

```ts
action.reset().play();
```

---

### ❌ Animation doesn’t play at all

Causes:

- Wrong clip name
- Mixer bound to wrong root
- No update loop

---

### ❌ Animation jitters or speeds up

Cause:

- Using elapsed time instead of delta

---

## 12. Final Mental Model (Memorize This)

```text
AnimationClip = data
AnimationAction = state
AnimationMixer = evaluator
Clock delta = time fuel
Render loop = heartbeat
```

If animation breaks:

1. Is time advancing?
2. Is mixer updating?
3. Is action playing?
4. Is mixer bound to correct root?

Answer those → bug solved.

---

## What’s Next

➡ **react-3-fiber/README.md**

We now switch worlds:

- From imperative engines
- To declarative React bindings

Same GPU. Same math.
Different mental discipline.
