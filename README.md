# Krupa Makwana — Portfolio

A modern, premium personal portfolio website built with React 19, Tailwind CSS v4, and Framer Motion.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser. Done!

## Other Commands

```bash
npm run build    # Build for production → dist/
npm run preview  # Preview production build locally
```

## Project Structure

```
KrupaMakwana-Portfolio/
│
├── public/
│   ├── favicon.svg
│   ├── opengraph.jpg
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   └── krupa1_1780377029296.jpeg   ← Profile photo
│   │
│   ├── components/
│   │   ├── Navbar.tsx          Fixed top navigation bar
│   │   ├── Hero.tsx            Hero section with typing effect & photo
│   │   ├── About.tsx           About Me + animated stats counters
│   │   ├── Skills.tsx          Skills with animated progress bars
│   │   ├── Education.tsx       Education timeline
│   │   ├── Projects.tsx        Project cards with category filter
│   │   ├── Experience.tsx      Internship experience card
│   │   ├── GitHubStats.tsx     Live GitHub stats
│   │   ├── Certifications.tsx  Certification cards
│   │   ├── Contact.tsx         Contact form
│   │   ├── Footer.tsx          Footer with social links
│   │   ├── ScrollProgress.tsx  Scroll progress bar at top
│   │   ├── BackToTop.tsx       Back to top button
│   │   ├── CustomCursor.tsx    Custom cursor glow effect
│   │   ├── ThemeProvider.tsx   Dark/Light mode toggle
│   │   └── ui/                 shadcn/ui base components
│   │
│   ├── pages/
│   │   ├── Home.tsx            Main single-page layout
│   │   └── not-found.tsx       404 page
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/
│   │   └── utils.ts            Tailwind className utility
│   │
│   ├── App.tsx                 Router setup
│   ├── main.tsx                Entry point
│   └── index.css               Global styles & theme variables
│
├── index.html                  HTML entry (SEO meta tags)
├── vite.config.ts              Vite config
├── tsconfig.json               TypeScript config
└── package.json                Dependencies & scripts

```

## Tech Stack

| Tech | Purpose |
|------|---------|
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| react-icons | Tech stack icons |
| lucide-react | UI icons |
| shadcn/ui | UI components |
| Vite 7 | Build tool |
| wouter | Client-side routing |

## Customisation

- **Profile photo** → replace `src/assets/krupa1_1780377029296.jpeg`
- **Personal details** → edit each component in `src/components/`
- **Projects** → edit the `projects` array in `src/components/Projects.tsx`
- **Skills** → edit the `skillCategories` array in `src/components/Skills.tsx`
- **Theme colours** → edit CSS variables in `src/index.css` under `:root`
