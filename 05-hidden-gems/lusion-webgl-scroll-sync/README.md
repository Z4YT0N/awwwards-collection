# “Solution” to Connect WebGL Visuals to Multiple DOM Elements with One Canvas - Without Scroll-Jacking

**TL;DR:** An imperfect solution. One that creates another issue, but it's a problem we can mitigate.

👉 [Live Demo](https://webgl-scroll-sync.lusion.co/)

---

In the world of web development, it's basically gospel that scroll-jacking is bad. If you're a developer who hasn't worked much with WebGL or animation-heavy interactions, you might wonder why so many award-winning websites (like our own at [Lusion](https://lusion.co)) seem to always be scroll-jacked.

The truth is, aside from the aesthetic of smooth scrolling, scroll-jacking actually solves a key synchronization issue - especially on mobile. The problem? Native scrolling doesn’t run on the same thread as `requestAnimationFrame (rAF)`. Since WebGL rendering relies on `rAF` to keep visuals smooth and efficient, this desync causes issues.

---

## The Problem

Let’s say you want to render a 3D box inside a DOM element - maybe a `<div>`. The obvious approach: create a WebGL canvas and place it inside that div. Done, right?

Not quite.

The problem is:

-   You can’t have infinite WebGL contexts on a single page.
-   Resources can’t be shared across different contexts.
    (👀 Looking at you, WebGPU…)
-   You can't apply shader effect outside that DOM element area.

A better approach is to create a single fullscreen WebGL canvas, fixed to the viewport, and render everything there. Then, during each `rAF`, you get the bounding box of your DOM elements and scroll position (`window.scrollY`) to position your 3D objects accordingly.

But here comes the kicker:
If the scroll happens between two `rAF` calls, the canvas doesn’t get the updated scroll info in time - so your visuals start drifting, lagging behind where they’re meant to be.

This is why scroll-jacking became the go-to workaround. It gives you full control over the scroll timing, which helps ensure the WebGL visuals stay in sync with your DOM elements.

---

## A “New” (but kinda overlooked) Approach

Here’s an idea that I haven’t seen many used - and it's super simple:

**What if the WebGL canvas isn't fixed to the viewport?**

Wait, what?

Yeah - instead of setting the canvas `position: fixed` and pinning it behind everything, let it scroll with the page. Set it to `position: absolute`, and during each `rAF`, offset the canvas to match the current scroll position.

At first glance, it sounds like the same thing. But here’s the difference:
If the scroll happens between two `rAF`s, the canvas will physically scroll _with_ the page, keeping your 3D visuals attached to the DOM elements they’re linked to. No drift.

Pretty cool, right?

---

## The Tradeoff (and Fix)

There is a catch:
Since the canvas now scrolls, it may get clipped when parts of the viewport move outside the canvas bounds. You’ll notice some visual issues during fast scrolls.

But this can be mitigated:

-   Simply add **vertical padding** to your canvas - render extra pixels offscreen. In our demo, we added 25% top and bottom padding to the canvas.
-   Or, for better performance, render to a **fullscreen framebuffer** and apply **edge blending or fading** to mask the overflow areas.

Of course, this isn't free. You'll be rendering more pixels, which can be a concern depending on performance requirements. But in many use cases, it’s a totally acceptable tradeoff. The bottm-line to us is that drifting is visually distributing but clipping isn't, so you can based on your needed to apply different fixes to this solution.

---

## In Summary

This approach won’t magically fix the `rAF` desync problem - but it offers a neat workaround for keeping WebGL visuals visually in sync with DOM elements, _without_ scroll-jacking.

It's not perfect, but sometimes, "good enough" is what gets the job done.

**Hope you find this useful!**

---

## How to Use This Demo

Clone the repo and run it locally:

```bash
# Clone the repo
git clone https://github.com/lusionltd/WebGL-Scroll-Sync
cd WebGL-Scroll-Sync

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

Explore the source code in the `/src` folder to see how the WebGL canvas is managed and synced with DOM elements.

---

## Contribution

We don't expect any contribution to this repo as it is just a demo.

---

## License

MIT License.
