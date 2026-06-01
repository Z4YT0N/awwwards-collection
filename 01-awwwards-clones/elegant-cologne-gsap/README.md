# Elegant Cologne Website

A stylish luxury product landing page built with **Next.js 15**, **GSAP**, **Prismic CMS**, and **Tailwind CSS** — inspired by the Côte Royale tutorial and based on the Prismic YouTube tutorial.  
Features smooth scroll-based animations, dynamic content fetched from a headless CMS, and elegant view transitions that reveal text with cool lighting effects.

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/SorooshGb/elegant-cologne-website.git
cd elegant-cologne-website
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the website.

---

### Notes

- Content is fetched from a public Prismic CMS repository, so **no environment variables or secrets** are required to run this project.
- To properly test the view transition effects and animation smoothness, it's recommended to build the project first and run the production server:

```bash
pnpm build
pnpm start
```

This ensures pages are precompiled and transitions are smooth — in development mode, hot reload and on-demand compilation can cause noticeable delays.

---

## Working with Slice Machine

This project uses Prismic's Slice Machine to develop and preview content slices locally.

- Run `pnpm run slicemachine` to start the local Slice Machine simulator, where you can build and test slice components and content models.
- After finalizing your slices locally, push the content models and slices to your own Prismic repository.
- Update the `repositoryName` in `slicemachine.config.json` and the Prismic client config to connect your app to your Prismic repo.
- This setup allows you to customize content structure and fields while keeping the front-end code intact.

For more information, visit [https://prismic.io/docs/nextjs](https://prismic.io/docs/nextjs)
