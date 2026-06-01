# Demo site of a creative agency

> [!note] 
> Explore my [personal website's source code](https://github.com/Shatlyk1011/personal-website) - you may like it

Adaptive and stylish landing page of a creative agency with modern animations and interactive components. The project is designed to create a vivid impression.
## Design
- **[Figma](https://www.figma.com/design/65gFXT6dvNfDjkX5osjZbu/Untitled?node-id=5-2&t=zgqFDE8HGEajkIoE-1)**
## Functionality
- **Adaptive design**: optimized for different devices and screens.
- **Animated sidebar menu**: smooth animations for opening and closing the menu.
- **Smoke cursor**: spectacular smoky cursor for an additional wow effect.
- **Request form**: ready-made form with interactive fields for sending requests.
- **Animated components**: dynamic transitions and effects for components to liven up the interface.

## Libraries

- **[TailwindCSS](https://tailwindcss.com/)** — a utility CSS framework for creating responsive interfaces.
- **[GSAP](https://greensock.com/gsap/)** — a library for creating high-performance animations.
- **[Framer Motion](https://www.framer.com/motion/)** — declarative animations and gestures for React components.
- **[Lenis](https://github.com/darkroomengineering/lenis)** — custom scroll for smooth user experience.
- **[Edil Ozi](https://github.com/Edil-ozi/edil-ozi)** — ready-made animated components for React applications.
- **[shadcn/ui](https://ui.shadcn.dev/)** — a collection of interface components with full customization support.

## Running the project

 *Clone the repository and run* :

   ```bash
   git clone https://github.com/Shatlyk1011/agency-website.git
   ```

   ```
   cd agency-website
   ```

   ```
   npm i
   ```

   ```
   npm run dev
   ```

## **Notes**
**The smoke cursor is implemented using WebGL. On low-performance devices or outdated browsers, this effect may slow down the site or display incorrectly.** <br/> <br/>
**To disable the cursor locally, go to the root page `app/page.tsx` and disable the ` <ShadowCursor />` component**

This site is completely made using VW units (view width). [More](https://www.sitepoint.com/css-viewport-units-quick-start/)
