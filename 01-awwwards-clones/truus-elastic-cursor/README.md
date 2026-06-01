# Truus.co — Awwward-Winning Web Design Clone

A highly interactive, visually stunning recreation of the **Truus.co** website, rebuilt as a **Next.js + React** application. This project captures the bold aesthetics, playful interactivity, and smooth motion design characteristic of Awwward-winning websites — with every pixel and every frame of animation faithfully recreated.

<table>
  <tr>
    <td align="center"><b>Header Section</b><br/><img width="100%" alt="Header Section" src="https://github.com/user-attachments/assets/195d1543-3e28-4678-8545-567ca9b08767" /></td>
    <td align="center"><b>HorizontalWords Section</b><br/><img width="100%" alt="HorizontalWords Section placeholder" src="https://github.com/user-attachments/assets/fd76c800-fe37-48a3-a5bc-728aa5cdf5ef" /></td>

  </tr>
  <tr>
    <td align="center"><b>MotionCard Section</b><br/><img width="100%" alt="MotionCard Section placeholder" src="https://github.com/user-attachments/assets/14d46fcf-f5d4-4b32-ac8e-e99eef1e964f" /></td>
    <td align="center"><b>Service Card Section</b><br/><img width="100%" alt="Service Card Section" src="https://github.com/user-attachments/assets/cb80f406-998e-4853-9ea5-7dec87952117" /></td>
  </tr>
  <tr>
    <td align="center"><b>Double Marquee Section</b><br/><img width="100%" alt="Double marquee section" src="https://github.com/user-attachments/assets/9ca5af12-5e0b-4b81-954c-1dcb484c671a" /></td>
    <td align="center"><b>Footer Section</b><br/><img width="100%" alt="Footer section" src="https://github.com/user-attachments/assets/1f0c8b9c-50c7-452e-af4c-23cadcdb58c0" /></td>
  </tr>
</table>


---

## 🚀 Overview

This project is a high-fidelity clone of the Truus advertising agency website. The codebase was originally built in vanilla HTML/CSS/JS and has been **fully transformed to Next.js 15 + React 19**, with all animations, interactions, and assets ported 1:1.

### ⚠️ Note on the Hero Video
The original Truus.co website uses a privately-hosted Vimeo video. Due to **Vimeo's Domain-Level Privacy Settings**, the video is restricted to the `truus.co` domain. The hero component uses a standard HTML5 `<video>` element with the `src` commented out, rendering a solid dark background. Place your `.mp4` in `public/` and update the source in `VimeoHero.jsx`.

---

## ✨ Key Features

### 🎭 Animations & Effects

- **GSAP InertiaPlugin Fling** — Motion cards and floating labels track mouse velocity; on `mouseleave` they fling with physics-based inertia and snap back to position.
- **Page Transition Scribble** — Full-screen GSAP-powered scribble mask that draws/undraws on logo click, with random color selection, logo wiggle, and auto-scroll to top.
- **Elastic Card Interactions** — Service cards spread apart horizontally on hover with elastic bounce physics; hovered card scales up. On mobile, cards stack and reveal via scroll.
- **Scroll-Triggered SVG Draws** — Hand-drawn underlines and paths animate in via `stroke-dasharray` as the user scrolls past.
- **Footer Sticker Proximity Push** — Stickers react to fast cursor swipes nearby with strength proportional to speed, then spring back elastically.
- **Wiggle System** — Configurable per-element rotation wiggle on hover, controlled from a single `WIGGLE_CONFIG` object.
- **Custom Cursor Bubble** — GSAP-tracked blob that follows the cursor, pops in elastically over clickable elements with context-aware text.
- **Mute Bubble** — Separate cursor-following blob on the video hero with mute/unmute states.
- **Double Marquee** — Infinite scrolling brand logos with smart randomization (no adjacent duplicates for logos or colors, even at the loop seam).
- **Credits Pop-out** — Footer credits box physically grows/shrinks with staggered text slide animations.
- **Lenis Smooth Scroll** — Buttery-smooth page scrolling synced with GSAP's ticker.
- **Horizontal Scroll & Letter Bounce** — Pinned section that scrolls letters horizontally across the screen with random elastic bounces for letters and stickers as they enter the viewport.
- **Tab Title Change** — Title becomes `"Hey, over here! 👋"` when the tab loses focus.

### 🏗️ Architecture

- **React Component Architecture** — Every section is a clean, isolated component.
- **Modular CSS** — 11 partial stylesheets imported via a single `globals.css` entry point.
- **External SVG Assets** — Decorative SVGs extracted to organized folders for clean, readable components.
- **Centralized Data** — All static data (brands, cards, icons, configs) exported from `lib/data.js`.
- **Self-Hosted Assets** — All fonts, brand logos, stickers, and SVGs stored locally — zero CDN dependency.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework, App Router, file-based routing |
| **React 19** | Component-based UI architecture |
| **Vanilla CSS** | Full design system via CSS Variables — zero Tailwind |
| **GSAP + ScrollTrigger + InertiaPlugin** | All animations, scroll-driven effects, physics-based fling |
| **Lenis** | Ultra-smooth inertia scrolling |

---

## 📦 Project Structure

```text
truus/
├── app/
│   ├── styles/                  # Modular CSS partials
│   │   ├── base.css             # Fonts, CSS variables, reset, body/html
│   │   ├── navbar.css           # Navbar, logos, header hero
│   │   ├── hero.css             # Content section title + underline SVG
│   │   ├── vimeo-hero.css       # Vimeo hero video player + headline
│   │   ├── motion-cards.css     # MotionCard section (heading + cards + labels)
│   │   ├── showreel.css         # Showreel section placeholder
│   │   ├── cards.css            # Service cards, stickers
│   │   ├── marquee.css          # Double marquee section + animations
│   │   ├── footer.css           # Footer layout, credits, stickers
│   │   ├── cursor.css           # Custom cursor bubble + scribble overlay
│   │   ├── horizontal-words.css # Horizontal scrolling section styles
│   │   └── responsive.css       # All media queries (tablet + mobile)
│   ├── globals.css              # Entry point — imports all partials
│   ├── layout.jsx               # Root layout — <html>, metadata, favicon
│   └── page.jsx                 # Main page — assembles all components
│
├── components/
│   ├── CursorBubble.jsx         # Custom "click" cursor bubble with GSAP tracking
│   ├── DoubleMarquee.jsx        # Randomised logo marquee + scroll-triggered SVGs
│   ├── Footer.jsx               # Footer — credits, stickers, socials, wiggles
│   ├── HorizontalWords.jsx      # Pinned section with elastic letter bounce
│   ├── MotionCards.jsx          # Motion cards + floating labels + InertiaPlugin fling
│   ├── Navbar.jsx               # Fixed navbar + scroll color logic + logo wiggle
│   ├── ServiceCards.jsx         # "Call us if you need" + 5 service cards
│   ├── Showreel.jsx             # Showreel section placeholder (coming soon)
│   ├── SmoothScroll.jsx         # Lenis init + GSAP ticker sync (renders null)
│   ├── SvgSymbols.jsx           # Hidden SVG <symbol> defs (bullet, card divider)
│   ├── TransitionScribble.jsx   # Full-screen scribble mask on logo click
│   └── VimeoHero.jsx            # Video hero — controls, mute bubble, headline
│
├── lib/
│   └── data.js                  # All static data as ES module exports
│
├── public/
│   ├── assets/
│   │   ├── Brand Logos SVG/     # 8 self-hosted marquee brand logos
│   │   ├── Card-Sticker SVG/    # Stickers overlaying service cards
│   │   ├── Cursor SVG/          # Custom cursor SVG states
│   │   ├── Footer-Sticker SVG/  # 6 decorative footer stickers
│   │   ├── Marquee-blob SVG/    # Blob + hand in marquee section
│   │   ├── MotionCard SVG/      # Motion card blob + underline
│   │   ├── Navbar SVG/          # Navbar blob + work icon
│   │   └── VimeoHero SVG/       # Smiley, star, oval underline, mute blob
│   └── fonts/
│       ├── DMSans-VariableFont_opsz,wght.ttf
│       └── Epilogue-VariableFont_wght.ttf
│
├── .gitignore
├── jsconfig.json                # @/ import alias configuration
├── next.config.mjs              # Next.js config with webpack @/ alias
├── package.json
└── README.md
```

---

## 🎬 Animation Catalog

| Animation | Component | Type |
|---|---|---|
| **Inertia fling (cards)** | MotionCards | GSAP InertiaPlugin |
| **Inertia fling (labels)** | MotionCards | GSAP InertiaPlugin |
| **Page transition scribble** | TransitionScribble | GSAP Timeline |
| **Card fan-out on hover** | ServiceCards | GSAP Elastic |
| **Mobile card scroll stack** | ServiceCards | GSAP ScrollTrigger |
| **SVG underline draw** | ServiceCards | GSAP stroke animation |
| **Marquee infinite scroll** | DoubleMarquee | CSS Keyframes |
| **Marquee SVG reveal** | DoubleMarquee | GSAP ScrollTrigger |
| **Sticker scroll pop-up** | Footer | GSAP ScrollTrigger + back.out |
| **Sticker proximity push** | Footer | GSAP Elastic |
| **Credits pop-out/collapse** | Footer | GSAP Timeline |
| **Map link draw** | Footer | GSAP stroke animation |
| **Cursor bubble follow** | CursorBubble | GSAP quickTo |
| **Mute bubble follow** | VimeoHero | GSAP quickTo |
| **Wiggle on hover** | Navbar, Footer | GSAP steps(1) yoyo |
| **Horizontal scroll & pin**| HorizontalWords | GSAP ScrollTrigger |
| **Letter & sticker bounce**| HorizontalWords | GSAP Elastic (Scroll) |
| **SVG arrow draw** | HorizontalWords | GSAP stroke animation |
| **Lenis smooth scroll** | SmoothScroll | Lenis + GSAP ticker |
| **Tab title change** | SmoothScroll | Visibility API |

---

## 📊 `lib/data.js` — Centralized Data

All static data lives in `lib/data.js` as named ES module exports:

| Export | Purpose |
|---|---|
| `brands[]` | 8 brand objects `{ name, src }` pointing to `/public/assets/` |
| `colors[]` | Background colour pool for the marquee |
| `SOCIAL_ICONS[]` | LinkedIn, Instagram, TikTok — href + SVG markup |
| `CARDS_DATA[]` | 5 service card definitions with color, sticker, title, services |
| `WIGGLE_CONFIG` | Single source of truth for all hover-wiggle intensities |
| `ANIMATION_CONFIG` | Scribble transition timing and stroke width settings |

### `WIGGLE_CONFIG` — Tune all wiggles from one place

```js
export const WIGGLE_CONFIG = {
    logoTruus:  4,  // The navbar Truus logo
    socials:    5,  // LinkedIn / Instagram / TikTok icons
    jobHeading: 1,  // "not hiring right now" heading
    googleMap:  1,  // Google Maps link text
    email:      1,  // hello@truus.co
    whatsapp:   1,  // send us a whatsapp
};
```

Higher number = more rotation (degrees). Set to `0` to disable for any element.

---

## 🎲 Marquee Randomisation Logic

The marquee uses two constraint-aware helpers in `components/DoubleMarquee.jsx`:

- **`shuffleNoAdjacentSrc(brands)`** — Fisher-Yates shuffle + post-processing to ensure no two cards with the same logo appear next to each other, **including at the loop seam**.
- **`assignColorsNoAdjacent(count, colors)`** — Assigns background colours one-by-one, always excluding the previous colour (and the first colour on the last item, to fix the seam).

---

## 🎨 SVG Architecture

All SVGs are handled using one of three strategies:

| Strategy | Used For | Why |
|---|---|---|
| External `.svg` + `<img>` | Brand logos, stickers, blobs, decorative shapes | Clean components; best for large, non-reused shapes |
| Inline `<symbol>` + `<use>` | Repeated icons (`bullet-icon`, `card-divider`) | Defined once in `SvgSymbols.jsx`, rendered many times; supports `currentColor` |
| Inline `<svg>` | Animated paths (map link draw, control icons) | Required for `stroke-dasharray` animations and React state-driven rendering |

### SVG Asset Folders

| Folder | Contents |
|---|---|
| `Brand Logos SVG/` | 8 marquee brand logos |
| `Card-Sticker SVG/` | 5 stickers for service cards |
| `Cursor SVG/` | Custom cursor states |
| `Footer-Sticker SVG/` | 6 decorative footer stickers |
| `Marquee-blob SVG/` | Blob + pointing hand |
| `MotionCard SVG/` | Blue blob + wavy underline |
| `Navbar SVG/` | Navbar blob + work icon |
| `VimeoHero SVG/` | Smiley face, pink star, oval underline, mute blob |

---

## ⚙️ Setup & Installation

This project uses Next.js, so you need Node.js installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Thakuma07/Truus.co-Awwward-Website.git
   cd truus
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   ```
   http://localhost:3000
   ```

---

## 👨‍💻 Developed By

Made with ❤️ by **Arkyadeep Pal**, **Soumyakanta Mitra** and **Anshu Ram**, powered by **Antigravity AI**.

## 📄 License

This project is for educational and portfolio purposes. All original brand assets belong to Truus.co.
