# MapleSky Travels Inc. - Landing Page

A production-ready Next.js 14 landing page for MapleSky Travels Inc. featuring an airport departure board (GIDS) animated display and email capture.

## Features

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **SEO Optimized** with full metadata, OG tags, and Twitter cards
- **Responsive** mobile-first design
- **Accessible** with ARIA labels and keyboard navigation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/mapleskytravels/landing.git
cd landing

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the page.

## Deployment

### Vercel (Recommended)

1. Push to a GitHub repository
2. Import project on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js settings
4. Add environment variables in Vercel dashboard
5. Deploy

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Hostinger

1. Connect GitHub repository to Hostinger
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Configure environment variables in Hostinger panel

### GitHub Actions (Custom Server)

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm start
```

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/subscribe` | POST | Email subscription |
| `/api/chat` | POST | Chat placeholder |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Site URL for metadata | Yes |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console | No |
| `MAILCHIMP_API_KEY` | Email service | No |
| `DATABASE_URL` | Database connection | No |

## Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── subscribe/route.ts
│   │   ├── chat/route.ts
│   │   └── health/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── GidsDisplay.tsx
│   ├── CtaSection.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## Performance

- Lighthouse Performance: 95+
- Core Web Vitals optimized
- Image optimization with next/image
- Font optimization with next/font
- Security headers configured

## License

Private - All rights reserved