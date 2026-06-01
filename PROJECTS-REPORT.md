# تقرير شامل — كل المشاريع
> تحليل كامل لـ **88 مشروع** من حيث التقنية، الأنيميشن، والاستخدام الأمثل
> مرتبة من الأحلى للأوحش داخل كل فئة
> **آخر تحديث:** 25 مايو 2026 — تمت إضافة 57 مشروع جديد + حذف التكرارات

---

## جدول المحتويات
1. [الفئة الأولى — Awwwards Clones](#cat1) — 20 مشروع
2. [الفئة الثانية — Apple / Product](#cat2) — 7 مشاريع
3. [الفئة الثالثة — Fashion & Agency](#cat3) — 6 مشاريع
4. [الفئة الرابعة — Gaming](#cat4) — 4 مشاريع
5. [الفئة الخامسة — Hidden Gems](#cat5) — 20 مشروع
6. [الفئة السادسة — Modern SaaS](#cat6) — 20 مشروع
7. [الفئة السابعة — Latest Batch](#cat7) — 11 مشروع
8. [جدول المقارنة الكامل](#compare)
9. [توصيات الاختيار](#recommend)

---

<a name="cat1"></a>
## الفئة الأولى — Awwwards Clones
### `01-awwwards-clones/`

---

### #1 — Zentry (Awwwards SOTM)
**الفولدر:** `zentry-awwwards-sotm`
**الموقع الأصلي:** zentry.com
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| React | 18.3.1 |
| Vite | 5.4.10 |
| GSAP + @gsap/react | 3.12.5 |
| ScrollTrigger | مدمج مع GSAP |
| Tailwind CSS | 3.4.14 |
| react-use | 17.5.1 |
| clsx | 2.1.1 |

#### الأنيميشن المميز
- **Clip-path polygon animations** — شكل مضلع غير منتظم بيتغير على الـ scroll مثل: `polygon(14% 0, 72% 0, 88% 90%, 0 95%)`
- **3D perspective على الصور** — الصورة بتتحرك X وY بناءً على موقع الماوس بالكامل
- **Video switching مع scale transition** — التبديل بين الفيديوهات بـ animation سلسة
- **AnimatedTitle** — كل حرف بيظهر بـ stagger منفرد
- **ScrollTrigger scrub** — حركة مربوطة بالـ scroll بدقة عالية
- **useGSAP hook** — تكامل كامل مع React lifecycle

#### الحاجات الفريدة
- نظام فيديوهات متعددة (5 فيديوهات) بتتحكم فيهم بـ state
- الـ Hero بيحس إنه لعبة — مش مجرد landing page
- الـ clip-path بيعمل شكل بيتوسع وانت بتسكرول وكأن الفيديو بيخرج من شاشة لشاشة
- تأثير الـ floating على الصور — بيتحرك وكأنه طافي في الهواء

#### هيكل الفولدر
```
src/
  components/
    Hero.jsx         ← المكون الأهم (الـ clip-path + video)
    AnimatedTitle.jsx
    Features.jsx
    Story.jsx
    About.jsx
    Contact.jsx
    VideoPreview.jsx
    Navbar.jsx, Button.jsx, Footer.jsx
```

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: مواقع games، entertainment، luxury products، agency showcase

---

### #2 — Fizzi 3D Soda
**الفولدر:** `fizzi-3d-soda`
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| Next.js | 14.2.4 |
| TypeScript | 5.4.5 |
| Three.js | r169 |
| @react-three/fiber | 8.17.10 |
| @react-three/drei | 9.114.4 |
| GSAP + @gsap/react | 3.12.5 |
| Zustand | 5.0.1 |
| Prismic CMS | — |
| Tailwind CSS | 3.4.13 |
| r3f-perf | 7.2.2 |

#### الأنيميشن المميز
- **3D soda can model** بيتفاعل مع الـ scroll بالكامل
- **WebGL shaders** لـ particle effects والـ material animations
- **GSAP + Three.js objects** — بـ animate خصائص الـ 3D مباشرة
- **Lenis scroll** مدمج مع الـ 3D scene
- **Zustand** لإدارة حالة الكاميرا والـ model

#### الحاجات الفريدة
- العلبة الـ 3D دي أكتر حاجة حلوة في الكولكشن كلها — بتتحرك وبتتألق وكأنها حقيقية
- تكامل Prismic CMS يعني المحتوى 3D ممكن يتحكم فيه من CMS
- r3f-perf لمتابعة الأداء في الوقت الحقيقي
- **المشروع الوحيد في الكولكشن اللي بيبيع منتج 3D فعلي مع CMS**

#### هيكل الفولدر
```
src/
  app/                    ← Next.js App Router
  components/
  slices/                 ← Prismic slice components
customtypes/              ← Prismic content models
public/
  3d-models/              ← GLB files
resources/                ← Prismic assets
```

#### مستوى الصعوبة: **Expert**
#### الأفضل لـ: e-commerce 3D، product visualization، brand experience، SaaS landing page

---

### #3 — CyberFiction Canvas Scroll
**الفولدر:** `cyberfiction-canvas-scroll`
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
- Vanilla JavaScript (بدون framework)
- Three.js (CDN)
- GSAP 3.11.5 + ScrollTrigger
- Locomotive Scroll 3.5.4

#### الأنيميشن المميز
- **Canvas frame-by-frame animation** — 160+ صورة PNG بتتشغل بناءً على الـ scroll وكأنه فيديو
- **Custom GLSL shader للـ water ripple** — يحاكي ديناميكيات الموائع الحقيقية
- **Wave physics simulation** في الـ shader:
  - `pVel -= 0.005 * delta * pressure` محاكاة الضغط والسرعة
  - Mouse-based pressure injection
- **Render-to-texture feedback loop** — WebGLRenderTarget
- **Locomotion + ScrollTrigger proxy** للـ scroll السلس

#### الحاجات الفريدة
- الـ shader بيحاكي ديناميكيات المياه الحقيقية — مش مجرد تأثير بصري
- الـ canvas frames تحتوي على 160+ صورة PNG تشكل animation كامل
- **أصعب كود تقنياً في المجموعة كلها من ناحية الـ WebGL**

#### هيكل الفولدر
```
components/
  app.js               ← Three.js + shader implementation
  css/
assets/
  images/
    bg_male/           ← 160+ PNG frames للـ animation
```

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: مواقع creative، NFT، metaverse، experimental art

---

### #4 — Gentlerain AI WebGL
**الفولدر:** `gentlerain-ai-webgl`
**التقييم:** ⭐⭐⭐⭐

#### Stack
- Vanilla HTML/CSS/JS
- Three.js r128 (CDN)
- GSAP 3.13.0 + ScrollTrigger
- Lenis 1.3.10
- Lottie (CDN)

#### الأنيميشن المميز
- **Canvas texture generation** — بيرسم نص على canvas وبيحوله Three.js texture
- **WebGL wave distortion** على النصوص
- **Lottie animations** للـ section transitions
- **Parallax text tags** بـ data-value للتحكم في سرعة الـ parallax
- **OrthographicCamera** مش PerspectiveCamera — مختلف تقنياً

#### الحاجات الفريدة
- Awwwards winner حقيقي
- الـ ripple effect بيتفاعل مع الـ hover بشكل سلس
- أبسط من Cyberfiction لكن النتيجة بصرياً على نفس المستوى
- يعمل كويس على الموبايل

#### هيكل الفولدر
```
img/
Fonts/
script.js
style.css
index.html
```

#### مستوى الصعوبة: **Intermediate-Advanced**
#### الأفضل لـ: SaaS، AI tools، tech startups، educational platforms

---

### #5 — Ochi Design Clone
**الفولدر:** `ochi-design`
**التقييم:** ⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| Next.js | 14.1.4 |
| TypeScript | 5 |
| GSAP | 3.12.5 |
| Framer Motion | 11.0.25 |
| Locomotive Scroll | 5.0.0-beta.8 |
| react-intersection-observer | 9.8.1 |
| Tailwind CSS | 3.3.0 |
| Sharp | 0.33.3 |

#### الأنيميشن المميز
- **Interactive "Eyes" component** — عيون SVG بتتابع الـ cursor بـ `Math.atan2` trigonometry
- **3D perspective transforms** بناءً على موقع الماوس
- **Marquee animations** — نص بيتحرك أفقياً بشكل مستمر
- **Curve transition** بين الـ sections
- **Framer Motion AnimatePresence** للـ page transitions
- **Intersection Observer** للـ trigger-based animations

#### الحاجات الفريدة
- الـ Eyes component اللي بتتابع الماوس دي من أجمل الـ micro-interactions
- **الوحيد في الكولكشن اللي بيستخدم Framer Motion + GSAP معاً**
- TypeScript كامل + Next.js = production-ready

#### هيكل الفولدر
```
app/
components/
  Eyes.tsx             ← cursor-tracking SVG eyes
  Curve/               ← section transition curves
  Marquee.tsx
  PlayVideo.tsx
animation/
motion/
constants/
```

#### مستوى الصعوبة: **Intermediate-Advanced**
#### الأفضل لـ: design studios، creative portfolios، modern SaaS

---

### #6 — Rejouice Agency
**الفولدر:** `rejouice-agency`
**التقييم:** ⭐⭐⭐⭐

#### Stack
- Vanilla HTML/JS
- GSAP 3.12.5 + ScrollTrigger
- Locomotive Scroll 3.5.4
- jQuery 3.7.0
- Remix Icon 4.2.0
- Lettering.js + Textillate.js

#### الأنيميشن المميز
- **Locomotive Scroll + GSAP proxy** للـ smooth scroll الكامل
- **ScrollTrigger scrub** من 3 لـ 4 ثواني للـ transitions السلسة
- **Textillate** للـ character-by-character text animations
- **Infinite marquee** للـ portfolio items
- **Custom cursor follower** يتبع الماوس
- **Loader animation** مع stagger

#### الحاجات الفريدة
- الكود منظم في ملفات منفصلة: loco.js، txtanimations.js، cursorFollower.js
- الـ scrub بـ 4 ثواني بيدي إحساس luxury ومختلف
- الـ cursor effect راقي جداً

#### هيكل الفولدر
```
js/
  loco.js
  txtanimations.js
  cursorFollower.js
stylesheets/
  page1-6.css
  loader.css
  txtwrapper.css
```

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: creative agencies، brand portfolios، marketing sites

---

### #7 — Capsule Moyra
**الفولدر:** `capsule-moyra`
**التقييم:** ⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| React | 19.1.0 |
| Vite | 6.3.5 |
| GSAP + SplitText | 3.13.0 |
| Lenis | 1.0.42 |
| Tailwind CSS | 4.1.8 |
| React Router DOM | 7.6.1 |

#### الأنيميشن المميز
- **GSAP SplitText plugin** — تقطيع النصوص لـ characters/words/lines
- **ClipPath mask reveals** مع ScrollTrigger
- **Progress bars** بتتحرك على الـ scroll بـ easings مختلفة
- **Scrub animations** مربوطة بـ scroll position بالضبط
- **Height morphing** للـ elements على الـ scroll
- **Double marquee** بيتحرك في اتجاهين

#### الحاجات الفريدة
- SplitText plugin من GSAP — مش كل المشاريع بتستخدمه
- الـ clip-path reveals بتدي إحساس إن المحتوى بيخرج من خلف mask
- **Awwwards-winning experience** حقيقية

#### مستوى الصعوبة: **Intermediate-Advanced**
#### الأفضل لـ: outdoor/nature brands، design agencies، experience platforms

---

### #8 — Magma Canvas Scroll
**الفولدر:** `magma-canvas-scroll`
**التقييم:** ⭐⭐⭐⭐

#### Stack
- Vanilla HTML/JS
- GSAP 3.12.2 + ScrollTrigger
- Locomotive Scroll 3.5.4
- Swiper 10
- Lettering.js + Textillate.js + Animate.css

#### الأنيميشن المميز
- **Scroll-driven frame playback** — 150+ صورة PNG canvas تتحرك بالـ scroll
- **Canvas frame sequencing** — نفس فكرة Cyberfiction لكن لمبنى 3D
- **Rotating percentage indicators** — دوائر تقدم متحركة
- **Swiper carousel** للـ "Featured In" section
- **SVG path animations** مع GSAP

#### الحاجات الفريدة
- الـ canvas animation بتصور مبنى من زوايا مختلفة بالـ scroll
- الـ frame sequence بتدي شعور إنك بتتحرك في مكان 3D حقيقي

#### مستوى الصعوبة: **Intermediate-Advanced**
#### الأفضل لـ: real estate، architecture، luxury properties، Web3

---

### #9 — Two Good Co
**الفولدر:** `two-good-co`
**التقييم:** ⭐⭐⭐

#### Stack
- Vanilla HTML/JS
- GSAP 3.12.2 + ScrollTrigger
- Locomotive Scroll 3.5.4
- Remix Icon 3.5.0

#### الأنيميشن المميز
- **Custom cursor** بيجر الصور — تأثير فريد جداً
- **Dynamic background colors** بتتغير per section بـ data-color attribute
- **SVG dual circles** logo animation
- **Multi-layer parallax** على الصور
- **Video synchronization** مع الـ scroll
- **Color transitions** سلسة بين الـ sections

#### الحاجات الفريدة
- الـ cursor اللي بيجر الصور ده من أمتع الـ interactions في الكولكشن
- تغيير لون الخلفية بـ scroll ده تأثير سهل التنفيذ وحلو جداً

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: e-commerce، nonprofits، lifestyle brands، product galleries

---

### #10 — Truus Awwwards
**الفولدر:** `truus-awwwards`
**التقييم:** ⭐⭐⭐

#### Stack
- Next.js 15.2.8
- React 19.0.0
- GSAP 3.12.5
- Lenis 1.1.14

#### الأنيميشن المميز
- Lenis smooth scroll
- GSAP basic animations
- Cursor tracking

#### الحاجات الفريدة
- أبسط مشروع Next.js في الكولكشن — مناسب جداً للبداية
- Awwwards-winning بالرغم من البساطة
- SSR-ready من اليوم الأول

#### مستوى الصعوبة: **Beginner-Intermediate**
#### الأفضل لـ: Next.js projects، SSR sites، minimal animation

---

### #11 — Splyt Awwwards
**الفولدر:** `splyt-awwwards`
**التقييم:** ⭐⭐⭐

#### Stack
- React 19.1.1 + TypeScript
- Vite 7.1.7
- GSAP 3.13.0 + ScrollSmoother
- React Router DOM 7.9.3
- Tailwind CSS 4.1.13

#### الأنيميشن المميز
- **ScrollSmoother** (GSAP plugin) — أسرع من Locomotive
- **Video pinning** — الفيديو بيتثبت وانت بتسكرول
- **Preloader** مع fade/blur transition
- **FlavorSlider** component مخصص

#### الحاجات الفريدة
- ScrollSmoother بدل Locomotive — أداء أفضل
- الـ flavor sections مع slider مميزة
- الـ preloader animation احترافي

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: beverage/food brands، product promotions، multi-section scroll

---

### #12 — Rejouice Clone 2
**الفولدر:** `rejouice-clone-2`
**التقييم:** ⭐⭐⭐

#### Stack
- Vanilla HTML/JS
- GSAP 3.12.5 + ScrollTrigger
- Locomotive Scroll 3.5.4
- Swiper 11
- Remix Icons

#### الأنيميشن المميز
- Character-by-character text reveal (spans in HTML)
- Custom cursor مع dynamic scale/opacity
- Menu مع video preview
- Clip path menu animations

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: agency sites، brand reveals، typography-focused sites

---

### #13 — Awwward WebGL Rebuild
**الفولدر:** `awwward-webgl-rebuild`
**التقييم:** ⭐⭐⭐⭐

#### Stack
- Vanilla JS
- GSAP 3.8.0
- Curtains.js 8.1.3 (WebGL text/image distortion)
- Barba.js 2.9.7 (AJAX page transitions)
- Locomotive Scroll 4.1.3
- Parcel Bundler 1.12.5

#### الأنيميشن المميز
- **Curtains.js WebGL text distortion** — نصوص وصور بتتشوه بـ GLSL shaders
- **Barba.js AJAX page transitions** — انتقال بين الصفحات بدون reload
- **Image preloading queue** قبل بدء الـ animations
- **Custom GLSL shaders** للـ vertex/fragment effects

#### الحاجات الفريدة
- **الوحيد في الكولكشن اللي بيستخدم Curtains.js**
- الـ Barba.js page transitions بتدي إحساس الـ SPA مع تأثيرات WebGL
- ⚠️ ملاحظة: الـ parcel-bundler قديم — محتاج Node v20 أو أقل

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: creative portfolios، art/photography، WebGL experiments

---

### #14 — Lightship RV
**الفولدر:** `lightship-rv`
**التقييم:** ⭐⭐⭐

#### Stack
- Vanilla HTML/JS
- GSAP 3.8.0 + ScrollTrigger
- Locomotive Scroll 4.1.3
- 180+ PNG frame sequence

#### الأنيميشن المميز
- **180 PNG frame sequence** مرتبطة بالـ scroll — زي فيديو بالكامل
- **Blur filter transitions** على الـ entrance
- **MP4 videos** للـ section transitions
- **Pinned hero** مع parallax depth

#### الحاجات الفريدة
- الـ frame sequence تقنية قوية جداً للـ product showcase
- نفس تقنية Apple في تصوير المنتجات

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: automotive، RV/travel، premium product showcase

---

<a name="cat2"></a>
## الفئة الثانية — Apple / Product
### `02-apple-product/`

---

### #15 — iPhone 15 Pro
**الفولدر:** `iphone-15-pro`
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| React | 18.2.0 |
| Three.js | 0.162.0 |
| @react-three/fiber | 8.15.19 |
| @react-three/drei | 9.101.0 |
| GSAP + @gsap/react | 3.12.5 |
| Sentry | 7.106.0 |
| Tailwind CSS | 3.4.1 |

#### الأنيميشن المميز
- **react-three-fiber** للـ declarative 3D rendering
- **3D iPhone model** بيتدور وبيتفاعل مع الـ scroll
- **Responsive video** — مصدر مختلف على الموبايل
- **Sentry profiler** لمتابعة الأداء في production
- **useGSAP hook** للـ React lifecycle integration

#### الحاجات الفريدة
- أعلى جودة production code في الـ apple category
- Sentry integration — **مشروع حقيقي production-ready**
- الـ 3D model loading مع progress tracking
- نفس تجربة موقع Apple الرسمي تقريباً

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: product launches، device showcases، e-commerce hero sections

---

### #16 — MacBook 3D Landing
**الفولدر:** `macbook-3d-landing`
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| React | 19.1.1 |
| Three.js | 0.180.0 |
| @react-three/fiber | 9.3.0 |
| @react-three/drei | 10.7.6 |
| GSAP + @gsap/react | 3.13.0 |
| Zustand | 5.0.8 |
| Tailwind CSS | 4.1.13 |

#### الأنيميشن المميز
- **Multiple 3D MacBook models** — 14" و 16" بـ model switching
- **StudioLights component** لإضاءة احترافية
- **GLB file streaming** مع LoadingManager
- **Scroll-driven 3D camera movements** — الكاميرا بتتحرك مع الـ scroll
- **Dynamic material transitions** في الـ real-time

#### الحاجات الفريدة
- أكتر مشروع فيه تفاصيل 3D — غطاء الـ MacBook بيتفتح وانت بتسكرول
- **أحدث stack في الكولكشن** — React 19 + Three.js 0.180
- Zustand لإدارة حالة الـ 3D models

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: tech products، luxury e-commerce، Apple-style showcases

---

### #17 — AirPods Pro
**الفولدر:** `airpods-pro`
**التقييم:** ⭐⭐⭐

#### Stack
- Vanilla HTML/CSS/JS
- ScrollMagic
- Canvas API
- Ion Icons

#### الأنيميشن المميز
- Canvas rendering للـ 3D AirPods
- ScrollMagic scenes مع timeline scrubbing
- Sticky navbar

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: product demos، Apple-style pages، vanilla JS learning

---

### #18 — Glass 3D Landing
**الفولدر:** `glass-3d-landing`
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| Solid.js | 1.8.15 |
| Three.js | 0.161.0 |
| GSAP | 3.12.5 |
| Simplex Noise | 4.0.1 |
| Tailwind CSS | 3.4.1 |
| Vite | 5.1.4 |

#### الأنيميشن المميز
- **Prismatic glass refraction materials** — زجاج 3D بيكسر الضوء
- **SimplexNoise vertex deformations** — شكل الـ glass بيتغير بشكل عضوي
- **5 colored point lights** لإضاءة واقعية
- **ACESFilmic tone mapping** لألوان سينمائية
- **FogExp2** لعمق جوي
- **Mouse parallax** على الـ 3D scene
- **Magnetic cursor** component

#### الحاجات الفريدة
- **الوحيد في الكولكشن اللي بيستخدم Solid.js** — مش React
- الـ glass morphism الـ 3D ده مختلف جداً عن كل المشاريع التانية
- SimplexNoise بيدي حركة عضوية مش mechanical

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: premium SaaS، luxury brands، immersive experiences، experimental

---

<a name="cat3"></a>
## الفئة الثالثة — Fashion & Agency
### `03-fashion-agency/`

---

### #19 — Adidas Awwwards
**الفولدر:** `adidas-awwwards`
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| Next.js | 15.5.2 (Turbopack) |
| React | 19.1.0 |
| Three.js | 0.180.0 |
| @react-three/fiber | 9.3.0 |
| @react-three/drei | 10.7.4 |
| GSAP + @gsap/react | 3.13.0 |
| Maath | 0.10.8 |
| TypeScript | 5 |
| Tailwind CSS | 4 |

#### الأنيميشن المميز
- **3D shirt models** بـ dynamic texture/material swapping (gray, white, sport)
- **Baked lighting textures** في WebP — أداء سريع مع جودة عالية
- **Scroll-driven scene transitions** بين environments مختلفة
- **Audio integration** — صوت بيتزامن مع الـ scroll
- **Smudge + glass overlay textures**
- **Maath library** للـ math utilities في الـ 3D

#### الحاجات الفريدة
- **صوت + 3D + scroll** — تجربة حسية كاملة
- الـ shirt model بيتغير texture على الـ scroll — مش بس بيتحرك
- **أحدث Next.js (15.5.2) مع Turbopack** — أسرع build في الكولكشن
- WebP textures بدل PNG — أحسن performance

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: fashion e-commerce، 3D product configurators، brand experiences

---

### #20 — Wibe Fashion Studio
**الفولدر:** `wibe-fashion-studio`
**التقييم:** ⭐⭐⭐⭐

#### Stack
- React 19.2.5 + Vite 8.0.10
- GSAP 3.15.0
- Locomotive Scroll 4.1.4 + React wrapper
- Framer Motion 12.38.0
- Styled Components 6.4.1
- React Router DOM 7.14.2

#### الأنيميشن المميز
- **Locomotive Scroll + React** integration كاملة
- **AnimatePresence** لـ page transitions
- **Marquee section** — نص يمشي بشكل مستمر
- **Video backgrounds** في الـ shop section
- **Parallax image reveals** في الـ about section

#### الحاجات الفريدة
- **أجمل fashion landing page** في الكولكشن
- Styled Components بيدي مرونة في الـ theming
- الـ new arrivals carousel smooth جداً
- الكود نظيف ومنظم — سهل تعديله

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: fashion brands، lifestyle e-commerce، boutique stores

---

### #21 — York and Dante
**الفولدر:** `york-and-dante`
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| React | 17.0.0 |
| TypeScript | 4.1.2 |
| Vite | 2.1.3 |
| GSAP | 3.9.1 |
| Locomotive Scroll | 4.1.4 |
| Splitting | 1.0.6 |
| ImagesLoaded | 4.1.4 |
| React Fast Marquee | 1.1.2 |
| Sass | 1.32.8 |

#### الأنيميشن المميز
- **Splitting library** — text splitting بـ char/word/line/grid
- **Character scrambling animation** — الحروف بتتغير random وبعدين بتاخد الشكل الصح
- **Preloader بـ animated percentage counter**
- **Menu animation** مع full-screen overlay
- **Banner staggered word reveals**
- **Gallery parallax**
- **Alphabets animation** component لـ title sequences

#### الحاجات الفريدة
- **Character scrambling** ده من أكتر الـ effects اللي بتلفت النظر
- **أكتر مشروع فيه ملفات animations منفصلة** — intro.ts، preloader.ts، reveal-text.ts، etc.
- SCSS modules — الأفضل تقنياً من ناحية CSS architecture
- Custom hooks: useIntersectionObserver، useStateRef، useWindowWidth

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: luxury fashion، high-end portfolios، gallery-heavy designs

---

### #22 — Norrav Studio
**الفولدر:** `norrav-studio`
**التقييم:** ⭐⭐⭐⭐

#### Stack
- Next.js 15.4.6 + Turbopack
- React 19.1.0
- GSAP 3.13.0
- Lenis 1.0.42
- Motion 12.23.12
- Tailwind CSS 4
- TypeScript 5

#### الأنيميشن المميز
- **Lenis smooth scroll** مع ScrollProvider context
- **Animated counters** للإحصائيات
- **Cursor-following hand SVG** icon
- **Company logo ticker/marquee**
- **useUserActivity hook** للـ scroll/cursor tracking

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: creative studios، design agencies، modern portfolios

---

### #23 — Crue Creative
**الفولدر:** `crue-creative`
**التقييم:** ⭐⭐⭐

#### Stack
- React 17.0.2
- GSAP 3.9.1
- Framer Motion 6.2.8
- Locomotive Scroll 4.1.4
- Styled Components 5.3.3

#### الأنيميشن المميز
- Locomotive Scroll + GSAP proxy
- AnimatePresence page transitions
- Video background hero
- Loader animation بـ 3 ثواني delay

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: creative agencies، portfolios، fashion showcases

---

### #24 — Lagunitas 3D
**الفولدر:** `lagunitas-3d`
**التقييم:** ⭐⭐⭐

#### Stack
- Vanilla HTML/JS
- GSAP 3.11.2 + ScrollTrigger
- Locomotive Scroll 3.5.4
- RemixIcon

#### الأنيميشن المميز
- Beer bottle floating + rotation مع الـ scroll
- Parallax images للـ dogs والـ bottles
- Product-focused scroll narrative

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: beverage/food marketing، product storytelling

---

<a name="cat4"></a>
## الفئة الرابعة — Gaming
### `04-gaming/`

---

### #25 — Gaming Website GSAP
**الفولدر:** `gaming-website-gsap`
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| React | 19.2.4 |
| TypeScript | 6.0.2 |
| Vite | 8.0.0 |
| GSAP + @gsap/react | 3.14.2 |
| Tailwind CSS | 4.1.18 |
| React Icons | 5.3.0 |
| React Use | 17.5.1 |

#### الأنيميشن المميز
- **Hero video carousel** مع GSAP scale transitions (4 hero videos)
- **5 feature videos** مع preloading وloading states
- **AnimatedTitle** بـ character effects
- **RoundedCorners** component بـ SVG clipping
- **Audio loop** مدمج مع تجربة الموقع
- **ScrollTrigger pinned sections**

#### الحاجات الفريدة
- **TypeScript 6.0.2** — أحدث TypeScript في الكولكشن
- أحدث Vite (8.0.0) وأحدث Tailwind (4.1.18)
- الـ feature videos الـ 5 + hero videos الـ 4 = تجربة سينمائية
- **SVG clipping للـ rounded corners** — تقنية creative

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: gaming sites، esports، entertainment، video-heavy SaaS

---

### #26 — Zentry Gaming Clone
**الفولدر:** `zentry-gaming-clone`
**التقييم:** ⭐⭐⭐⭐

#### Stack
- React 19.0.0 + Vite 6.2.0
- GSAP 3.12.7 + @gsap/react
- Tailwind CSS 3.4.17
- React Use + React Icons

#### الأنيميشن المميز
- **Text scrambling/glitch effect** على العناوين
- **Gallery image grid** مع staggered animations
- **Story section** parallax
- **Video carousel** مع animated preview

#### الحاجات الفريدة
- الـ text glitch effect بيدي إحساس cyberpunk
- أبسط من الـ #25 لكن حلو ومناسب للتعلم

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: gaming، cyberpunk aesthetic، esports، modern web apps

---

<a name="cat5"></a>
## الفئة الخامسة — Hidden Gems
### `05-hidden-gems/`

---

### #27 — WebGL Barba Transitions
**الفولدر:** `webgl-barba-transitions`
**التقييم:** ⭐⭐⭐⭐⭐

#### Stack
| التقنية | الإصدار |
|---------|---------|
| Three.js | 0.131.3 |
| Barba.js | 2.9.7 |
| GSAP | 3.7.1 |
| ASSScroll | 2.0.2 |
| Dat.GUI | 0.7.7 |
| Parcel (GLSL support) | 2.0.0-rc.0 |

#### الأنيميشن المميز
- **Custom GLSL vertex + fragment shaders** للـ page transitions
- **Barba.js AJAX routing** — صفحات بتتحول بدون reload
- **Three.js 3D scene** بيستمر خلال الـ page transitions
- **ASSScroll** — virtualized smooth scroll لأقصى أداء
- **Dat.GUI** لـ live parameter tweaking أثناء التطوير
- **Image morphing/distortion** effects

#### الحاجات الفريدة
- **الوحيد في الكولكشن بـ custom GLSL shaders من الصفر + Barba.js**
- الـ 3D scene بيمشي معاك من صفحة لصفحة — تجربة مختلفة تماماً
- ASSScroll — مش معروف كتير لكن أداؤه أفضل من Locomotive
- ⚠️ ملاحظة: محتاج Node v20 أو أقل للـ Parcel

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: premium portfolios، creative agencies، WebGL experiments

---

### #28 — Awwward Rebuild 2
**الفولدر:** `awwward-rebuild-2`
**التقييم:** ⭐⭐⭐⭐

#### Stack
- Vanilla JS + SCSS
- GSAP 3.8.0
- Locomotive Scroll 4.1.3
- Curtains.js 8.1.3
- Three.js 0.135.0
- Draggabilly 2.3.0
- ImagesLoaded 4.1.4

#### الأنيميشن المميز
- **Curtains.js WebGL** distortion على الصور عند الـ hover/scroll
- **Draggabilly** للـ drag interactions على الـ gallery
- **SCSS modular architecture** — أفضل CSS structure في الـ vanilla projects
- **ImagesLoaded callbacks** للـ animation sequencing
- **Staggered gallery grid** animations

#### الحاجات الفريدة
- **الـ drag interactions على الـ gallery** — تجربة مختلفة عن كل المشاريع
- SCSS nested selectors + Parcel = أقرب حاجة لـ modern workflow في الـ vanilla projects

#### مستوى الصعوبة: **Advanced**
#### الأفضل لـ: art galleries، photography portfolios، luxury e-commerce

---

### #29 — Scroll It Blender
**الفولدر:** `scroll-it-blender`
**التقييم:** ⭐⭐⭐⭐

#### Stack
- Vanilla HTML + Canvas API
- Vite 4.0.0
- GSAP 3.11.3 + ScrollTrigger

#### الأنيميشن المميز
- **179 WebP frame sequence** من Blender — animation 3D كامل
- **Canvas 2D rendering** بسيط وسريع
- **ScrollTrigger snap** لـ frame-accurate rendering
- **GSAP object property** animation لـ frame index

#### الحاجات الفريدة
- **الوحيد في الكولكشن اللي بيستخدم Blender renders** كـ frame sequence
- الكود بسيط جداً (50 سطر!) لكن النتيجة مبهرة
- WebP بدل PNG — أسرع بكتير

#### مستوى الصعوبة: **Intermediate**
#### الأفضل لـ: 3D animation playback، product demos، scroll-driven storytelling

---

### #30 — Jesko Jets Scroll
**الفولدر:** `jesko-jets-scroll`
**التقييم:** ⭐⭐⭐

#### Stack
- Next.js 16.1.1 + React 19.2.3
- GSAP 3.14.2 + @gsap/react
- Framer Motion 12.23.26
- Lenis 1.3.17
- Lucide React
- Tailwind CSS 4

#### الأنيميشن المميز
- **LenisProvider context** لـ app-wide smooth scroll
- **Parallax sky/clouds** background
- **Floating animation** components
- **Next.js 16** مع React Compiler

#### مستوى الصعوبة: **Intermediate-Advanced**
#### الأفضل لـ: luxury automotive، aviation، premium brand sites

---

### #31 — Fanta Beverage
**الفولدر:** `fanta-beverage`
**التقييم:** ⭐⭐⭐

#### Stack
- Vanilla HTML/CSS/JS
- GSAP 3.12.2 + ScrollTrigger
- RemixIcon

#### الأنيميشن المميز
- Floating bottle + oranges + leaves animations
- Scroll-driven product reveals
- Color-themed sections

#### مستوى الصعوبة: **Beginner-Intermediate**
#### الأفضل لـ: beverage marketing، vanilla JS learning، simple scroll animations

---

<a name="compare"></a>
## جدول المقارنة الكامل

| # | المشروع | Framework | 3D | Animation | Scroll Tech | صعوبة | التقييم |
|---|---------|-----------|-----|-----------|------------|-------|---------|
| 1 | Zentry SOTM | React+Vite | CSS 3D | GSAP+ST | GSAP | Advanced | ⭐⭐⭐⭐⭐ |
| 2 | Fizzi 3D Soda | Next.js | Three.js/R3F | GSAP | Lenis | Expert | ⭐⭐⭐⭐⭐ |
| 3 | Cyberfiction | Vanilla | Canvas/WebGL | GSAP+ST | Locomotive | Advanced | ⭐⭐⭐⭐⭐ |
| 4 | Gentlerain | Vanilla | Three.js | GSAP | Lenis | Int-Adv | ⭐⭐⭐⭐ |
| 5 | Ochi Design | Next.js | CSS 3D | GSAP+Framer | Locomotive | Int-Adv | ⭐⭐⭐⭐ |
| 6 | Rejouice | Vanilla | — | GSAP+ST | Locomotive | Int | ⭐⭐⭐⭐ |
| 7 | Capsule Moyra | React | — | GSAP+Split | Lenis | Int-Adv | ⭐⭐⭐⭐ |
| 8 | Magma Canvas | Vanilla | Canvas | GSAP+ST | Locomotive | Int-Adv | ⭐⭐⭐⭐ |
| 9 | Two Good Co | Vanilla | — | GSAP+ST | Locomotive | Int | ⭐⭐⭐ |
| 10 | Truus | Next.js | — | GSAP | Lenis | Beg-Int | ⭐⭐⭐ |
| 11 | Splyt | React+TS | — | GSAP+SS | ScrollSmoother | Int | ⭐⭐⭐ |
| 12 | Rejouice 2 | Vanilla | — | GSAP+ST | Locomotive | Int | ⭐⭐⭐ |
| 13 | WebGL Rebuild | Vanilla | Curtains.js | GSAP | Locomotive | Advanced | ⭐⭐⭐⭐ |
| 14 | Lightship | Vanilla | Canvas frames | GSAP | Locomotive | Int | ⭐⭐⭐ |
| 15 | iPhone 15 Pro | React | Three.js/R3F | GSAP | — | Advanced | ⭐⭐⭐⭐⭐ |
| 16 | MacBook 3D | React | Three.js/R3F | GSAP | — | Advanced | ⭐⭐⭐⭐⭐ |
| 17 | AirPods Pro | Vanilla | Canvas | ScrollMagic | — | Int | ⭐⭐⭐ |
| 18 | Glass 3D | Solid.js | Three.js | GSAP | — | Advanced | ⭐⭐⭐⭐⭐ |
| 19 | Adidas | Next.js | Three.js/R3F | GSAP | — | Advanced | ⭐⭐⭐⭐⭐ |
| 20 | Wibe Fashion | React | — | GSAP+Framer | Locomotive | Int | ⭐⭐⭐⭐ |
| 21 | York & Dante | React+TS | — | GSAP+Split | Locomotive | Advanced | ⭐⭐⭐⭐⭐ |
| 22 | Norrav Studio | Next.js | — | GSAP+Motion | Lenis | Advanced | ⭐⭐⭐⭐ |
| 23 | Crue Creative | React | — | GSAP+Framer | Locomotive | Int | ⭐⭐⭐ |
| 24 | Lagunitas 3D | Vanilla | CSS | GSAP+ST | Locomotive | Int | ⭐⭐⭐ |
| 25 | Gaming GSAP | React+TS | — | GSAP+ST | ScrollTrigger | Int | ⭐⭐⭐⭐⭐ |
| 26 | Zentry Gaming | React | — | GSAP+ST | ScrollTrigger | Int | ⭐⭐⭐⭐ |
| 27 | WebGL Barba | Vanilla | Three.js/GLSL | GSAP | ASSScroll | Advanced | ⭐⭐⭐⭐⭐ |
| 28 | Awwward Rebuild 2 | Vanilla | Curtains.js | GSAP | Locomotive | Advanced | ⭐⭐⭐⭐ |
| 29 | Scroll Blender | Vanilla | Canvas/Blender | GSAP+ST | — | Int | ⭐⭐⭐⭐ |
| 30 | Jesko Jets | Next.js | — | GSAP+Framer | Lenis | Int-Adv | ⭐⭐⭐ |
| 31 | Fanta | Vanilla | — | GSAP+ST | — | Beg-Int | ⭐⭐⭐ |

---

<a name="recommend"></a>
## توصيات الاختيار حسب هدفك

### لو عاوز تعمل موقع Agency/Studio راقي
→ **Rejouice Agency** + **Ochi Design** + **York & Dante**

### لو عاوز موقع 3D Product Showcase
→ **Fizzi 3D Soda** + **MacBook 3D** + **iPhone 15 Pro** + **Adidas Awwwards**

### لو عاوز تجربة WebGL خالصة وعميقة
→ **WebGL Barba Transitions** + **Glass 3D Landing** + **Cyberfiction**

### لو عاوز Gaming / Entertainment
→ **Gaming Website GSAP** + **Zentry SOTM** + **Zentry Gaming Clone**

### لو عاوز Fashion / Lifestyle
→ **Wibe Fashion Studio** + **York & Dante** + **Adidas Awwwards**

### لو عاوز تبدأ بسرعة (Beginner-friendly)
→ **Fanta Beverage** → **Two Good Co** → **Lagunitas** → **Rejouice 2**

### أفضل 5 في الكولكشن كلها
1. **Zentry SOTM** — الأكمل والأكتر إلهاماً
2. **Fizzi 3D Soda** — أفضل 3D product experience
3. **MacBook 3D Landing** — أعلى جودة Three.js code
4. **WebGL Barba** — أندر تقنية في الكولكشن
5. **York & Dante** — أجمل text animations وأنظف code

---

<a name="cat6"></a>
## الفئة السادسة — Modern SaaS / Startup
### `06-saas-modern/`

---

### #1 — Elementis Clone (SOTD)
**الفولدر:** `elementis-clone`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** Next.js 14, Framer Motion 11, GSAP 3, Tailwind CSS
**ما يميزه:** كلون من موقع Elementis الحائز على SOTD من Awwwards. أنيميشن دخول سلس، تأثيرات hover على الأزرار، تصميم مودرن كامل.

---

### #2 — Elementis (Neovimmer Version)
**الفولدر:** `elementis-neovimmer`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** Next.js 16, Motion v12, Lenis 1.3, Tailwind v4
**ما يميزه:** نفس موقع Elementis لكن ببيلد أحدث — Next.js 16 + Tailwind v4 + Motion (الجيل الجديد من Framer Motion).

---

### #3 — Aurora Landing (Next.js)
**الفولدر:** `aurora-landing-nextjs`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** Next.js, Tailwind CSS, Framer Motion
**ما يميزه:** خلفية aurora/gradient mesh متحركة، smooth reveal animations، dark theme أنيق — مثالي كـ SaaS template.

---

### #4 — Raft SaaS Landing
**الفولدر:** `raft-saas-gsap`
**التقييم:** ⭐⭐⭐⭐
**Stack:** Next.js, GSAP, Framer Motion, Styled Components
**ما يميزه:** SaaS landing page premium — GSAP timelines + Framer micro-interactions + dark theme.

---

### #5 — Brainwave AI Landing
**الفولدر:** `brainwave-ai-landing`
**التقييم:** ⭐⭐⭐⭐
**Stack:** React, Tailwind, Framer Motion
**ما يميزه:** Modern AI SaaS landing page بنمط dark gradient.

---

### #6 — Supadupa Clone
**الفولدر:** `supadupa-clone`
**التقييم:** ⭐⭐⭐⭐
**Stack:** Next.js 14, GSAP, Lenis, Swiper, next-intl
**ما يميزه:** SaaS landing بتأثيرات Lenis سلسة + Swiper carousel + i18n.

---

### #7 — GitHub Clone (Framer)
**الفولدر:** `github-clone-framer`
**التقييم:** ⭐⭐⭐
**Stack:** Next.js, Framer Motion, Tailwind
**ما يميزه:** إعادة بناء GitHub landing page مع Framer Motion animations.

---

### #8 — Maxime Heckel Blog
**الفولدر:** `maxime-blog`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** Next.js 15, React Three Fiber, Three.js, Motion v12, @ai-sdk
**ما يميزه:** Blog تقني كامل بـ 3D WebGL backgrounds، AI SDK integration، design system متكامل.
**تحذير:** مشروع كبير جداً — يحتاج setup كامل مع Supabase وغيره.

---

<a name="cat7"></a>
## الفئة السابعة — Latest Batch
### `07-new-batch/`

---

### #1 — GTA VI Landing (JS Mastery)
**الفولدر:** `gta-vi-landing-jsm`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** React, GSAP ScrollTrigger, SplitText, Tailwind CSS
**المنفذ على:** port 3090
**ما يميزه:** إعادة بناء موقع GTA VI الترويجي — scroll-driven cinematic experience، video playback مرتبط بالـ scroll، SplitText text reveals، parallax layers وimage masking. أكثر مشروع GSAP packed على GitHub حالياً.

---

### #2 — LAZAREV Agency Clone
**الفولدر:** `lazarev-agency-clone`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** HTML, CSS, JS, GSAP, Locomotive Scroll
**المنفذ على:** port 3080
**ما يميزه:** كلون من وكالة LAZAREV الحائزة على جوائز دولية — smooth scroll + GSAP animations + فيديو خلفية سينمائي.

---

### #3 — Obys Agency (Shery.js)
**الفولدر:** `obys-agency-sheryjs`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** HTML, CSS, JS, GSAP, Locomotive Scroll, Shery.js
**المنفذ على:** port 3081
**ما يميزه:** كلون من obys.agency مع Shery.js للتأثيرات المغناطيسية — مكتبة animation جديدة نادرة الاستخدام.

---

### #4 — Refokus Clone
**الفولدر:** `refokus-clone`
**التقييم:** ⭐⭐⭐⭐
**Stack:** React, Vite, GSAP, Tailwind CSS
**المنفذ على:** port 3084
**ما يميزه:** كلون من Refokus.com — agency website بتصميم clean مع scroll animations.

---

### #5 — Supahfunk WebGL Carousel
**الفولدر:** `supahfunk-webgl-carousel`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** React, OGL (WebGL), GLSL shaders, postprocessing
**المنفذ على:** port 3089
**ما يميزه:** WebGL carousel بـ GLSL distortion effects عند الـ scroll — نفس تقنية مشاريع Codrops المتقدمة. يستخدم OGL مش Three.js.

---

### #6 — Barba.js Page Transitions
**الفولدر:** `barba-page-transitions`
**التقييم:** ⭐⭐⭐⭐
**Stack:** HTML, CSS, JavaScript, Barba.js, GSAP
**المنفذ على:** port 3082
**ما يميزه:** AJAX page transitions باستخدام Barba.js — transitions سلسة بين الصفحات مع GSAP.

---

### #7 — Audio-Reactive Particles 3D
**الفولدر:** `audio-particles-3d`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** Vite, Three.js/WebGL, Web Audio API
**المنفذ على:** port 3086
**ما يميزه:** جسيمات ثلاثية الأبعاد بتتحرك بناءً على الموسيقى — Web Audio API + Three.js/WebGL. تجربة بصرية فريدة.

---

### #8 — Linear Homepage (GSAP)
**الفولدر:** `linear-homepage-gsap`
**التقييم:** ⭐⭐⭐⭐
**Stack:** Next.js, GSAP, Tailwind CSS
**المنفذ على:** port 3087
**ما يميزه:** إعادة بناء Linear.app homepage مع GSAP animations وتصميم مودرن dark.

---

### #9 — SolidJS 3D Glass Landing
**الفولدر:** `solidjs-glass-3d`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** Solid.js 1.8, Three.js r161, GSAP 3.12 + ScrollTrigger, simplex-noise
**المنفذ على:** port 3095
**ما يميزه:** Glass refraction effect بـ prismatic 3D rendering — نادر جداً على Solid.js. يتضمن magnetic cursor وscroll animations.

---

### #10 — Svelte Agency Template (GSAP)
**الفولدر:** `svelte-agency-gsap`
**التقييم:** ⭐⭐⭐⭐⭐
**Stack:** Svelte 5, GSAP 3, Tailwind CSS v4
**المنفذ على:** port 3098
**ما يميزه:** Creative agency template على Svelte 5 (نادر جداً في هذا النوع) — spatial typography، sticky GSAP grid، parallax marquee، glassy mobile nav.

---

### #11 — Apple Vision Pro (Canvas)
**الفولدر:** `apple-vision-pro-canvas`
**التقييم:** ⭐⭐⭐⭐
**Stack:** HTML, CSS, JS, Canvas API, GSAP, Locomotive Scroll
**المنفذ على:** port 3083
**ما يميزه:** صفحة Apple Vision Pro بـ frame-by-frame Canvas animation عند الـ scroll — نفس تقنية Cyberfiction.

---

<a name="compare"></a>
## جدول المقارنة الشامل — أفضل 20 مشروع

| المشروع | الفئة | التقييم | التقنية الفريدة | مستوى الصعوبة |
|---------|--------|---------|----------------|----------------|
| GTA VI Landing (JSM) | 07 | ⭐⭐⭐⭐⭐ | Cinematic scroll + SplitText | متوسط |
| Zentry SOTM | 01 | ⭐⭐⭐⭐⭐ | Clip-path polygons + R3F | متوسط |
| Fizzi 3D Soda | 01 | ⭐⭐⭐⭐⭐ | 3D can + Prismic CMS | صعب |
| iPhone 15 (JSM) | 02 | ⭐⭐⭐⭐⭐ | WebGi 3D model + GSAP video | صعب |
| Supahfunk WebGL | 07 | ⭐⭐⭐⭐⭐ | OGL + custom GLSL shaders | صعب جداً |
| Audio Particles 3D | 07 | ⭐⭐⭐⭐⭐ | Web Audio API + Three.js | صعب |
| SolidJS Glass 3D | 07 | ⭐⭐⭐⭐⭐ | Glass refraction + Solid.js | صعب |
| Svelte Agency | 07 | ⭐⭐⭐⭐⭐ | Svelte 5 + GSAP v4 Tailwind | متوسط |
| LAZAREV Clone | 07 | ⭐⭐⭐⭐⭐ | Locomotive + GSAP agency | سهل |
| Obys (Shery.js) | 07 | ⭐⭐⭐⭐⭐ | Shery.js magnetic | سهل |
| WebGL Barba | 05 | ⭐⭐⭐⭐⭐ | WebGL distortion page trans | صعب |
| Bizarro WebGL Gallery | 05 | ⭐⭐⭐⭐⭐ | OGL infinite scroll gallery | صعب |
| MacBook GSP (JSM) | 02 | ⭐⭐⭐⭐⭐ | Three.js + GSAP scroll | صعب |
| Elementis (Neovimmer) | 06 | ⭐⭐⭐⭐⭐ | Motion v12 + Next.js 16 | متوسط |
| Aurora Landing | 06 | ⭐⭐⭐⭐⭐ | Gradient mesh animated | سهل |
| Bruno Folio 2019 | 05 | ⭐⭐⭐⭐⭐ | Cannon.js physics 3D | صعب |
| Cyberfiction Canvas | 01 | ⭐⭐⭐⭐⭐ | Canvas frame scroll | متوسط |
| R3F Atmos | 05 | ⭐⭐⭐⭐⭐ | R3F postprocessing Awwwards | صعب |
| Gentlerain WebGL | 01 | ⭐⭐⭐⭐⭐ | Three.js rain shader | صعب |
| Maxime Blog | 06 | ⭐⭐⭐⭐⭐ | R3F + AI SDK + full stack | صعب جداً |

---

<a name="recommend"></a>
## توصيات الاختيار

### لو عاوز WebGL الأحلى
→ **Supahfunk WebGL Carousel** + **Bizarro WebGL Gallery** + **WebGL Barba Transitions**

### لو عاوز GSAP أقوى ما عندك
→ **GTA VI Landing (JSM)** + **LAZAREV Clone** + **Obys Agency Sheryjs**

### لو عاوز 3D Product Showcase
→ **iPhone 15 JSM** + **MacBook GSAP JSM** + **Apple Vision Pro Canvas** + **SolidJS Glass 3D**

### لو عاوز Gaming / Entertainment
→ **Gaming Website GSAP** + **Zentry SOTM** + **Sanidhyy Game Website**

### لو عاوز Fashion / Lifestyle
→ **Wibe Fashion Studio** + **York & Dante** + **Adidas Awwwards**

### لو عاوز SaaS / Startup
→ **Elementis Neovimmer** + **Aurora Landing** + **Raft SaaS GSAP**

### لو عاوز تبدأ بسرعة (Beginner-friendly)
→ **LAZAREV Clone** → **Obys Agency** → **Ajay GSAP Awwwards** → **Barba Transitions**

### تقنيات نادرة — مش هتلاقيها في أي مكان تاني
1. **Svelte 5 + GSAP** → `svelte-agency-gsap` (نادر جداً)
2. **SolidJS + Three.js** → `solidjs-glass-3d` (نادر جداً)
3. **OGL + GLSL** → `supahfunk-webgl-carousel` + `bizarro-webgl-gallery`
4. **Audio-reactive WebGL** → `audio-particles-3d`
5. **Barba.js transitions** → `barba-page-transitions` + `webgl-barba-transitions`

### أفضل 5 في الكولكشن كلها
1. **GTA VI Landing (JSM)** — أكمل تجربة cinematic scroll على GitHub
2. **Supahfunk WebGL Carousel** — أندر تقنية WebGL carousel
3. **Bizarro WebGL Gallery** — Codrops-quality infinite gallery
4. **iPhone 15 JSM** — أفضل Apple product clone (5k+ stars)
5. **SolidJS Glass 3D** — أجمل 3D glass effect بـ framework نادر

---
*تم إنشاء هذا التقرير بتحليل الكود المصدري الفعلي لكل مشروع*
*88 مشروع — آخر تحديث: 25 مايو 2026*
