# SaaS Landing Template

A modern, production-ready SaaS landing page template built with Next.js, React, Tailwind CSS, and shadcn/ui-inspired components.

## Overview

This repository provides a clean and customizable marketing site foundation for SaaS products, including common sections such as:

- Hero
- Partners
- Stats
- Pricing
- Testimonials
- FAQ
- Footer

The project is designed to be easy to brand, extend, and deploy.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI primitives
- Framer Motion
- next-themes (dark/light mode)

## Project Structure

```text
app/
	layout.tsx
	page.tsx
	globals.css
components/
	hero.tsx
	pricing.tsx
	testimonials.tsx
	faq.tsx
	footer.tsx
	ui/
lib/
	utils.ts
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)

### Installation

```bash
git clone https://github.com/gonzalochale/saas-landing-template.git
cd saas-landing-template
pnpm install
```

### Development

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

- `pnpm dev` – Start development server with Turbopack
- `pnpm build` – Create production build
- `pnpm start` – Start production server
- `pnpm lint` – Run linting with Next.js ESLint config

## Customization Guide

Common updates when adapting this template for your product:

1. Update copy and CTA text in `components/hero.tsx` and `components/pricing.tsx`
2. Replace testimonials and social links in `components/testimonials.tsx` and `components/footer.tsx`
3. Adjust branding (name, colors, theme details) in `app/globals.css` and component-level classes
4. Add or remove sections in `app/page.tsx`

## Deployment

The project is ready to deploy on platforms that support Next.js (recommended: Vercel).

Typical deployment flow:

1. Push repository to GitHub
2. Import project into your hosting provider
3. Build command: `pnpm build`
4. Start command: `pnpm start`

## Contributing

Contributions are welcome. Please open an issue to discuss major changes before submitting a pull request.

## License

Distributed under the MIT License. See [license.txt](license.txt) for details.
