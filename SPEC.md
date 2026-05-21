# MapleSky Travels Inc. - Landing Page Specification

## Project Overview
- **Project Name**: MapleSky Travels Inc. Landing Page
- **Type**: Marketing/Download Page (Coming Soon)
- **Core Functionality**: GIDS (Departure Board) animated countdown with email capture
- **Target Users**: Travelers, travel industry professionals

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Color Palette
- **Primary Navy**: #001B3D
- **Gold Primary**: #D4AF37
- **Gold Accent**: #FFD700
- **Dark Gray**: #1A2A3A
- **Text**: White on dark, dark on light

## Typography
- **Headings**: Poppins (600, 700)
- **Body**: Inter (400, 500)
- **Monospace accent**: System monospace for GIDS display

## Architecture
```
/maplesky-travels
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (Hero + CTA)
│   ├── globals.css         # Tailwind imports + custom styles
│   └── api/
│       ├── subscribe/route.ts    # Email subscription
│       ├── chat/route.ts         # Chat placeholder
│       └── health/route.ts       # Health check
├── components/
│   ├── Navbar.tsx          # Sticky responsive nav
│   ├── Hero.tsx            # Full viewport hero
│   ├── GidsDisplay.tsx     # Flip animation display
│   ├── CtaSection.tsx      # Email capture
│   └── Footer.tsx          # Minimal footer
├── lib/
│   └── utils.ts            # Utility functions
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Component Specifications

### 1. Layout (app/layout.tsx)
- Full SEO metadata
- OpenGraph tags
- Twitter card meta
- Security headers via next.config.js

### 2. Navbar
- Sticky top, z-50
- Logo (left), nav links (right)
- Mobile hamburger menu
- Backdrop blur effect
- Responsive breakpoints: md (768px)

### 3. Hero Section
- Full viewport height (100vh)
- Navy background (#001B3D)
- Centered content
- GIDS Display component
- Scroll indicator at bottom

### 4. GIDS Display Component
- Text: "ARRIVING SOON"
- Character-by-character flip animation
- Airport departure board aesthetic
- Golden text (#D4AF37, #FFD700)
- Dark background (#0a1628)
- Staggered timing: 0.6-0.8s per character
- Infinite loop (5s pause, 2s animation)
- Subtitle: "MapleSky Travels - Redefining Travel Industry"
- Monospace font for authentic board feel

### 5. CTA Section
- Email input with validation
- "Get Notified" button (golden border)
- Hover effects on button
- States: default, loading, success, error
- Form validation (email format)

### 6. Footer
- Copyright text
- Social links (placeholder)
- Minimal design

## API Routes

### POST /api/subscribe
- Validates email
- Returns success/error JSON
- Placeholder for email service integration

### POST /api/chat
- Placeholder for chat integration

### GET /api/health
- Returns { status: "ok", timestamp }

## Performance Targets
- Lighthouse: 95+
- Core Web Vitals: Good
- Images: Next/Image optimized
- Bundle: Minimal JS

## Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Color contrast compliance

## Deployment
- Vercel optimized
- vercel.json for config
- .env.example for env vars
- Security headers configured