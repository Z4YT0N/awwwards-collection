# Suburbia Skate - Interactive Skateboard Customizer

A modern skateboard customization web application featuring an interactive 3D builder, team showcase, and dynamic content management through Prismic CMS.

![Suburbia Skate](./public/og-image.avif)

## 🚀 Features

- Interactive 3D skateboard customizer with real-time previews
- Dynamic product catalog with customizable skateboards
- Team member showcase with animated profiles
- Responsive design optimized for all devices
- Content management through Prismic CMS
- Physics-based animations and interactions
- SEO optimized with meta tags and structured data

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **3D Rendering:** Three.js with React Three Fiber
- **CMS:** Prismic
- **Styling:** TailwindCSS
- **Animations:** GSAP
- **Physics:** Matter.js
- **Language:** TypeScript

## 🏁 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/minhomega/suburbia-skate.git
cd suburbia-skate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-prismic-repo-name
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 CMS Setup

1. Create a Prismic account and repository
2. Configure the following Custom Types:
   - Board Customizer
   - Homepage
   - Settings
   - Skateboard
   - Skater

## 🎮 Key Components

- Interactive 3D Skateboard Customizer
- Team Grid with Animated Profiles
- Product Grid with Dynamic Loading
- Physics-based Footer Animation
- Responsive Navigation

## 🔧 Development

- Run tests: `npm run test`
- Run linting: `npm run lint`
- Start Slice Machine: `npm run slicemachine`

## 📦 Project Structure

```
src/
  ├── app/              # Next.js app router pages
  ├── components/       # Reusable components
  ├── slices/          # Prismic slice components
  ├── prismicio.ts     # Prismic configuration
  └── types/           # TypeScript type definitions
```

## 🚀 Deployment

The project is optimized for deployment on Vercel. Follow these steps:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy!

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 - see the LICENSE file for details.