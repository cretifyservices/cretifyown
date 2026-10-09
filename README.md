# Cretify - Independent Digital Agency & Creative Production Suite

> High-performance digital presence, bespoke web applications, and precision-engineered user interfaces crafted for companies reaching further than before.

Official website: [https://cretify.in](https://cretify.in)  
Contact: `cretifyservices@gmail.com`  
Direct lines: `+91 7061899513` | `+91 7485094642`

---

## 🌟 Overview & Architecture

This archive contains the complete, production-grade source code, production distribution assets, documentation, and configuration for the **Cretify** agency web platform.

### Key Highlights
- **Vesper & Minimal Dark Aesthetic:** Rich cosmic starfield canvas, deep atmospheric glow halos, and refined typography.
- **Interactive Orbital & Saturn Stage:** Pinned sticky viewport scroll experience where the orbital planet glides in with momentum from the left, stabilizes at center with revolving rings, and fades smoothly as the user advances through the narrative.
- **Manifesto Scroll Illumination:** Scroll-synchronized text where words awaken from muted opacity into solid bright white, with highlight words colored in sapphire blue (`#638eff`).
- **Complete Agency Modules:**
  - Landing Hero with live dynamic celestial background
  - Capabilities Section with responsive expanding laser lines
  - Selected Works showcase with interactive 3D perspective cards
  - Dedicated full pages for **Services**, **Work / Case Studies**, **Process**, **About**, and **Contact**
  - Instant Contact Modal & Project Brief Generator

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js 18+ or 20+
- npm, pnpm, or bun

### 2. Installation
```bash
# Extract the archive
unzip cretify-website.zip -d cretify-website
cd cretify-website

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open `http://localhost:3000` or the port shown in your terminal.

### 4. Production Build & Deployment
```bash
npm run build
npm run preview
```

The compiled, minified bundle is placed into `dist/`, ready to be deployed instantly to Vercel, Netlify, Cloudflare Pages, Firebase Hosting, or any static/Node host.

---

## 📁 Repository Structure

```
├── public/                 # Static assets and favicons
├── src/
│   ├── components/         # Reusable UI & motion components
│   │   ├── ApproachScrollSaturn.tsx   # Pinned scroll orbital entrance
│   │   ├── CapabilitiesSection.tsx    # Services grid with laser line effects
│   │   ├── CretifyLogo.tsx            # Custom geometric branding
│   │   ├── Footer.tsx                 # Site footer with direct phone lines & links
│   │   ├── ManifestoSection.tsx       # Typography illumination on scroll
│   │   ├── Navbar.tsx                 # Glassmorphic header with navigation
│   │   ├── ProjectCard.tsx            # Interactive case study card
│   │   ├── ProjectModal.tsx           # Full-screen project deep-dive modal
│   │   ├── QuickContactModal.tsx      # Quick consultation form
│   │   ├── SaturnOrbital.tsx          # Multi-ring rotating celestial body
│   │   ├── SelectedWorkSection.tsx    # Works showcase
│   │   ├── StarryCosmicCanvas.tsx     # High-performance HTML5 Canvas starfield
│   │   └── StartAProjectCTA.tsx       # Conversion trigger
│   ├── data/               # Structured data for projects, services, metrics
│   │   ├── projectsData.ts
│   │   └── servicesData.ts
│   ├── pages/              # Routed pages
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── ServiceDetailPage.tsx
│   │   ├── WorkPage.tsx
│   │   ├── CaseStudyPage.tsx
│   │   ├── ProcessPage.tsx
│   │   └── ContactPage.tsx
│   ├── types/              # TypeScript definitions
│   ├── App.tsx             # Root router & application state
│   ├── index.css           # Tailwind CSS directives & custom keyframes
│   └── main.tsx            # React DOM client entry
├── dist/                   # Production-ready minified build (included)
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 🎨 Design System & Colors

- **Primary Background:** `#0A0A0B`
- **Surface Elevation:** `rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.07)`
- **Sapphire Accent:** `rgb(99, 142, 255)` / `#638EFF`
- **Border Gradients:** Subtle 1px translucent borders (`border-white/10`)
- **Typography:** Clash Display & system modern geometric sans

---

## 📞 Support & Inquiries

For project partnerships, custom engineering, or inquiries:
- **Email:** cretifyservices@gmail.com
- **Phone:** +91 7061899513 / +91 7485094642
- **Website:** https://cretify.in
