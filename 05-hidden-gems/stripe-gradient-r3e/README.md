# Stripe Gradient

A reverse engineered JavaScript library using Three.js & Vite to replicate the animated [Stripe](https://stripe.com/) gradients.

## Basic usage

### Install

Clone this repo and then in command line type:

- `npm install` / `yarn install` / `pnpm to install` to install all dependencies
- `run dev` to run dev-server
- `run build` to build project from sources

**HTML**

```html
<canvas class="gradient-canvas" data-js-controller="Gradient"></canvas>
```

**CSS**

```css Color Pallete for Blending
.HomepageHeroGradient {
  --gradientColorZero: #a960ee;
  --gradientColorOne: #ff333d;
  --gradientColorTwo: #90e0ff;
  --gradientColorThree: #ffcb57;
  ...;
}
```

**JavaScript**

```javascript
new Gradient({
  dom: document.querySelector(`[data-js-controller~=Gradient]`)
});
```
