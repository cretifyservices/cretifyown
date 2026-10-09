import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'website-development',
    slug: 'website-development',
    title: 'Website Development',
    shortTag: 'Web Development',
    tagline: 'High-performance websites engineered to captivate, convert, and scale.',
    heroDescription:
      'We craft bespoke, lightning-fast digital storefronts and corporate websites that elevate your brand reputation, deliver seamless user journeys, and drive verified business enquiries.',
    overview:
      'A digital presence is often the first and most critical touchpoint for your prospects. Cretify creates modern web platforms built with clean architectural code, responsive fluid layouts, and conversion-optimized architectures. From high-growth venture-backed startups to legacy enterprises, we turn websites into dependable business growth engines.',
    problemsSolved: [
      'Slow, bloated websites losing high-intent prospects before they even load',
      'Outdated visual designs failing to reflect premium brand authority',
      'Broken mobile experiences causing high bounce rates across smartphone users',
      'Clunky CMS workflows making simple content updates impossible for internal teams',
      'Low enquiry conversion rates despite spending significant capital on advertising',
    ],
    capabilities: [
      'Business websites & corporate platforms',
      'High-converting campaign landing pages',
      'Executive & creative portfolio websites',
      'Custom full-stack web engineering',
      'Fluid responsive design across mobile, tablet, and desktop',
      'Complete website redesign & legacy modernization',
      'Core Web Vitals performance & speed optimization',
      'Ongoing website maintenance, monitoring & security updates',
      'Headless CMS & custom content management integration',
      'Validated contact forms & automated enquiry pipelines',
      'Third-party CRM, analytics & tracking integrations',
    ],
    deliverables: [
      'Custom production codebase (Next.js / React / TypeScript / modern static engines)',
      '100% mobile-responsive, touch-optimized fluid layouts',
      'Sub-second load times scoring 90+ on Google Core Web Vitals',
      'Intuitive CMS admin setup for effortless publishing',
      'Pre-configured SEO metadata, OpenGraph tags, and sitemap generation',
      'Integrated security certificates, form spam protection, and hosting deployment',
    ],
    businessBenefits: [
      {
        title: 'Command Instant Brand Authority',
        description: 'First impressions form in milliseconds. We ensure your digital presence instantly signals tier-one quality and credibility to clients and investors.',
      },
      {
        title: 'Accelerate Prospect Enquiries',
        description: 'Strategically placed CTAs, friction-free forms, and persuasive information architecture turn passive readers into booked meetings.',
      },
      {
        title: 'Flawless Omnichannel Experience',
        description: 'Pixel-perfect rendering across iPhones, Androids, iPads, and high-resolution 4K desktop screens without awkward breaks.',
      },
      {
        title: 'Zero Technical Debt',
        description: 'Modern, modular, clean code that your internal engineers can easily extend as your organization expands.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Discovery & Requirements',
        description: 'We audit your brand vision, target buyer personas, competitive landscape, and specific functional needs.',
      },
      {
        step: '02',
        title: 'Information Architecture & Wireframes',
        description: 'We structure the content hierarchy, page navigation paths, and wireframe key user flows for optimal clarity.',
      },
      {
        step: '03',
        title: 'High-Fidelity Interface Design',
        description: 'Crafting the distinct visual language, typography pairings, interactive components, and atmospheric styling.',
      },
      {
        step: '04',
        title: 'Full-Stack Engineering & Speed Tuning',
        description: 'Clean coding, responsive testing across 12+ device viewports, and Core Web Vitals performance optimization.',
      },
      {
        step: '05',
        title: 'Rigorous QA & Production Launch',
        description: 'Cross-browser validation, SSL setup, domain routing, and handover with comprehensive management training.',
      },
    ],
    faqs: [
      {
        question: 'How long does a custom website development project take?',
        answer: 'Most custom marketing or business websites take between 2 to 5 weeks from initial discovery to live production launch, depending on scope, page count, and custom integrations.',
      },
      {
        question: 'Can our internal team update content after launch without coding?',
        answer: 'Yes. We integrate user-friendly CMS platforms (or custom admin portals) that allow your non-technical team members to update text, publish blog posts, and modify media easily.',
      },
      {
        question: 'Will our website be optimized for mobile devices and search engines?',
        answer: 'Every website we deliver is built mobile-first, conforms to strict accessibility standards, and comes with semantic HTML and technical SEO foundations built in.',
      },
    ],
    relatedServiceIds: ['web-app-development', 'ui-ux-design', 'seo'],
    iconName: 'Globe',
  },
  {
    id: 'web-app-development',
    slug: 'web-app-development',
    title: 'Web Application Development',
    shortTag: 'Web Applications',
    tagline: 'Custom digital systems and cloud software built for operational power.',
    heroDescription:
      'We architect, build, and deploy custom web applications, internal business tools, and customer portals that automate manual bottlenecks and scale operations effortlessly.',
    overview:
      'Off-the-shelf software rarely fits intricate business models. Cretify designs custom web applications tailored to your specific operational workflows. Whether you need a client portal, an automated operations dashboard, or a specialized SaaS platform, we build robust, secure, and scalable architectures designed to withstand high concurrency.',
    problemsSolved: [
      'Disjointed spreadsheets and manual data entry slowing down team output',
      'Rigid off-the-shelf SaaS subscriptions costing thousands without matching company workflows',
      'Lack of real-time visibility into customer orders, metrics, and team progress',
      'Security and access control vulnerabilities across distributed operations',
      'Inability to connect legacy internal databases with modern cloud APIs',
    ],
    capabilities: [
      'Custom full-stack web applications',
      'Interactive executive dashboards & analytics hubs',
      'Operational admin panels & role-based management',
      'Secure client, vendor & partner self-service portals',
      'Booking, scheduling, and automated appointment workflows',
      'Internal task & workflow orchestration systems',
      'Relational and document database architecture (Postgres, MongoDB, Cloud)',
      'Multi-factor authentication & granular role-based access control (RBAC)',
      'REST & GraphQL API engineering and third-party integrations',
      'Custom business logic and automated invoice / report generators',
      'Cloud deployment, containerization & auto-scaling architecture',
    ],
    deliverables: [
      'Production-ready web application with modular, type-safe codebase',
      'Secure authentication system (OAuth, magic links, email/password, RBAC)',
      'Optimized database schema and reliable cloud hosting configuration',
      'Comprehensive API documentation and operational runbooks',
      'Continuous Integration / Continuous Deployment (CI/CD) pipelines',
    ],
    businessBenefits: [
      {
        title: 'Reclaim Hundreds of Manual Hours',
        description: 'Automate repetitive workflows, calculations, and communication triggers so your team can focus on high-leverage growth.',
      },
      {
        title: 'Single Source of Truth',
        description: 'Unify scattered operational data into centralized dashboards with real-time accuracy and role-based permissions.',
      },
      {
        title: 'Delight Customers with Self-Service',
        description: 'Allow clients to view progress, download files, manage subscriptions, and pay invoices 24/7 without waiting on email.',
      },
      {
        title: 'Own Your Digital IP',
        description: 'No recurring seat taxes or vendor lock-in; you retain complete ownership over your custom software and intellectual property.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'System Architecture & Schema Design',
        description: 'We map user roles, data entities, security constraints, and system boundaries into a clear technical specification.',
      },
      {
        step: '02',
        title: 'UI/UX Interactive Prototyping',
        description: 'We design the complete interface state machine: empty states, error states, modals, and dense data tables.',
      },
      {
        step: '03',
        title: 'Database & API Development',
        description: 'We build secure backend endpoints, implement business logic, authentication guards, and perform stress testing.',
      },
      {
        step: '04',
        title: 'Frontend Interface Integration',
        description: 'Connecting reactive frontend components to the backend APIs with optimistic updates and caching.',
      },
      {
        step: '05',
        title: 'Security Auditing & Staged Handover',
        description: 'End-to-end vulnerability scanning, automated test coverage, production deployment, and developer onboarding.',
      },
    ],
    faqs: [
      {
        question: 'What tech stack does Cretify use for web applications?',
        answer: 'We primarily specialize in modern TypeScript ecosystems including React, Next.js, Node.js, Express, PostgreSQL, Redis, and cloud providers like AWS and Google Cloud Platform.',
      },
      {
        question: 'How do you ensure data security and compliance?',
        answer: 'We implement industry standard encryption (at rest and in transit), role-based permissions, CSRF/XSS protection, and secure secret management to safeguard your company data.',
      },
      {
        question: 'Can you integrate our existing third-party tools (like Stripe, Zoho, Slack)?',
        answer: 'Yes. We routinely build robust integrations with CRM platforms, payment gateways, accounting systems, and webhook-driven event publishers.',
      },
    ],
    relatedServiceIds: ['website-development', 'ai-automation', 'ui-ux-design'],
    iconName: 'Cpu',
  },
  {
    id: 'ecommerce-development',
    slug: 'ecommerce-development',
    title: 'E-commerce Development',
    shortTag: 'E-Commerce',
    tagline: 'High-converting online shopping platforms engineered to maximize revenue.',
    heroDescription:
      'We build frictionless, visually captivating digital stores that turn browsers into repeat buyers with rapid checkouts, intelligent merchandising, and automated fulfillment.',
    overview:
      'Selling online requires far more than listing products; it requires an intuitive browsing experience, lightning-quick mobile checkouts, and rock-solid inventory management. Cretify builds custom digital storefronts and Shopify architectures that amplify average order value (AOV) and eliminate cart abandonment.',
    problemsSolved: [
      'High shopping cart abandonment rates caused by clunky, sluggish checkouts',
      'Slow mobile catalog browsing driving away smartphone shoppers',
      'Inventory synchronization discrepancies causing stockouts and customer complaints',
      'Limited payment options causing dropped transactions in India and international markets',
      'Difficulty launching custom promotions, bundles, and loyalty rewards',
    ],
    capabilities: [
      'Custom online store development & headless commerce',
      'Product catalog, variations, and category taxonomy architecture',
      'High-velocity 1-click shopping cart & checkout flows',
      'Global payment gateway integrations (Razorpay, Stripe, Cashfree, UPI, PayPal)',
      'Automated order management & shipping logistics integration (Shiprocket, Delhivery, DHL)',
      'Live inventory tracking and multi-warehouse sync',
      'Customer accounts, order history, and re-order mechanisms',
      'Custom promotional offer engines, discount codes & bundle builders',
      'Mobile-first responsive shopping journeys',
      'E-commerce performance optimization & conversion rate audits',
    ],
    deliverables: [
      'Fully operational, secure e-commerce storefront',
      'Payment gateways configured with multi-currency and local payment options',
      'Automated order confirmation emails and WhatsApp notification triggers',
      'Admin portal for catalog management, stock updates, and customer data',
      'Conversion tracking pixels and analytics setup (Google Analytics 4, Meta CAPI)',
    ],
    businessBenefits: [
      {
        title: 'Elevate Conversion Rates',
        description: 'Frictionless checkout paths engineered with modern UX conventions minimize friction and maximize completed purchases.',
      },
      {
        title: 'International & Domestic Readiness',
        description: 'Accept credit cards, debit cards, UPI, net banking, and international currencies with automated currency conversion.',
      },
      {
        title: 'Automated Fulfillment & Shipping',
        description: 'Sync order data directly to your logistics partners to generate shipping labels and tracking codes automatically.',
      },
      {
        title: 'Scales to Peak Sales Spikes',
        description: 'Built on infrastructure engineered to handle traffic surges during flash sales and festival seasons without slowdowns.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Catalog & Funnel Architecture',
        description: 'We structure product categories, merchandising filters, cross-sell opportunities, and pricing models.',
      },
      {
        step: '02',
        title: 'Store Experience & UI Design',
        description: 'We design high-converting product pages, interactive media galleries, quick-view modals, and cart drawers.',
      },
      {
        step: '03',
        title: 'Payment & Logistics Integrations',
        description: 'Secure payment gateway connections, tax rule setups, and carrier API integrations for live shipping rates.',
      },
      {
        step: '04',
        title: 'Stress Testing & Checkout QA',
        description: 'Comprehensive test orders covering every payment scenario, failed cards, discounts, and inventory edge cases.',
      },
      {
        step: '05',
        title: 'Store Launch & Handover',
        description: 'Final domain cutover, SSL verification, payment production switch, and backend order management onboarding.',
      },
    ],
    faqs: [
      {
        question: 'Which platforms do you recommend for e-commerce?',
        answer: 'We build both custom headless e-commerce solutions (Next.js commerce) for brands demanding total control and tailored Shopify / WooCommerce systems for rapid commercial launch.',
      },
      {
        question: 'Can you integrate Indian payment gateways like Razorpay and UPI?',
        answer: 'Absolutely. We configure seamless domestic payment routing including UPI, Net Banking, credit/debit cards, and BNPL, alongside international Stripe processing.',
      },
      {
        question: 'Will our team be able to manage inventory and add new products?',
        answer: 'Yes. You receive an intuitive administrative dashboard to add products, adjust variants, update pricing, and export financial reports with zero code required.',
      },
    ],
    relatedServiceIds: ['website-development', 'ui-ux-design', 'seo'],
    iconName: 'ShoppingBag',
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortTag: 'UI/UX Design',
    tagline: 'Thoughtful, human-centered interfaces that balance aesthetics with usability.',
    heroDescription:
      'We research, wireframe, and craft intuitive interfaces and scalable design systems that make complex digital products feel natural, effortless, and delightful to use.',
    overview:
      'Great design is not just how something looks — it is how intuitively it works. Cretify combines behavioral user research with meticulous typographic and visual polish. We design user flows that reduce cognitive load, clarify decision paths, and inspire lasting confidence in your digital product.',
    problemsSolved: [
      'Confusing user onboarding causing high initial drop-offs and low product adoption',
      'Cluttered feature bloat making core workflows feel daunting and fragmented',
      'Inconsistent visual language across different screens creating an amateur impression',
      'Design handoffs failing in development due to missing states, edge cases, and specs',
      'Low user satisfaction ratings resulting in elevated customer support ticket volumes',
    ],
    capabilities: [
      'User research, competitor benchmarking & persona discovery',
      'Information architecture & end-to-end user journey mapping',
      'Low-fidelity wireframing & rapid interaction testing',
      'High-fidelity interactive Figma prototypes',
      'Bespoke website & landing page UI design',
      'Complex web application & SaaS software interface design',
      'Mobile iOS & Android application interface design',
      'Scalable design systems & tokenized component libraries',
      'Heuristic usability evaluations & user journey optimization',
      'Developer handoff specifications and interactive state guides',
    ],
    deliverables: [
      'Complete interactive Figma prototype with all screens, states, and flows',
      'Modular design system with tokens (colors, typography, spacing, shadows, icons)',
      'Production-ready UI component library ready for developer implementation',
      'Responsive adaptations for mobile, tablet, and widescreen layouts',
      'Detailed UX audit document detailing recommendations and rationale',
    ],
    businessBenefits: [
      {
        title: 'Accelerate User Onboarding',
        description: 'Intuitive screen flows allow new users to experience product value in seconds, shortening time-to-value.',
      },
      {
        title: 'Speed Up Engineering Velocity',
        description: 'A shared tokenized design system prevents developers from reinventing buttons, cards, and layouts on every sprint.',
      },
      {
        title: 'Reduce Support Inquiries',
        description: 'Self-explanatory interfaces and clear feedback loops resolve user confusion before it becomes a support ticket.',
      },
      {
        title: 'Elevate Perceived Value',
        description: 'Polished interfaces allow companies to command premium pricing and stand tall against venture-backed competitors.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Empathy & Discovery',
        description: 'We interview stakeholders, study existing analytics, and identify user pain points and friction hotspots.',
      },
      {
        step: '02',
        title: 'Journey Mapping & Wireframes',
        description: 'We diagram user mental models, content structure, and structural layouts before introducing cosmetic styling.',
      },
      {
        step: '03',
        title: 'Visual Direction & Moodboarding',
        description: 'We explore typographic hierarchy, dark/light themes, spatial layouts, and motion guidelines aligned with brand identity.',
      },
      {
        step: '04',
        title: 'High-Fidelity Component Craft',
        description: 'Every button, modal, form input, table, and data visualization is designed with micro-states (hover, active, disabled).',
      },
      {
        step: '05',
        title: 'Interactive Prototyping & Handoff',
        description: 'Clickable prototypes with realistic transitions, structured design tokens, and walkthroughs with engineering.',
      },
    ],
    faqs: [
      {
        question: 'What tools does Cretify use for design?',
        answer: 'We utilize Figma as our primary design and prototyping workspace, creating structured files with auto-layout, component variants, and design tokens.',
      },
      {
        question: 'Can you redesign an existing product that is currently live?',
        answer: 'Yes. We frequently conduct UX audits on live digital products to diagnose conversion leaks and redesign them iteratively without disrupting existing users.',
      },
      {
        question: 'Do you deliver assets ready for developers to code?',
        answer: 'Yes. All design files include detailed inspectable properties, exportable SVG assets, responsive breakpoints, and interaction guidelines.',
      },
    ],
    relatedServiceIds: ['website-development', 'web-app-development', 'branding'],
    iconName: 'Layout',
  },
  {
    id: 'video-editing',
    slug: 'video-editing',
    title: 'Video Editing',
    shortTag: 'Video Editing',
    tagline: 'High-retention visual storytelling crafted to capture attention and convert.',
    heroDescription:
      'We produce dynamic short-form and long-form video edits, commercial reels, and brand media with precise pacing, kinetic typography, and immersive sound design.',
    overview:
      'In a digital landscape where attention spans are measured in seconds, ordinary video edits get scrolled past. Cretify turns raw footage into punchy, high-retention content. From viral Instagram Reels and YouTube Shorts to executive brand films and corporate explainers, we craft visual stories that resonate.',
    problemsSolved: [
      'Low audience retention and early drop-offs within the first 3 seconds of video',
      'Inconsistent publishing cadence due to time-consuming internal editing bottlenecks',
      'Flat, amateur sound design and disjointed audio levels ruining watch time',
      'Social media videos lacking dynamic captions and kinetic visual hooks',
      'Inability to repurpose long-form podcasts and webinars into high-performing short-form clips',
    ],
    capabilities: [
      'High-retention Instagram Reels & TikTok content',
      'YouTube Shorts & long-form YouTube video editing',
      'High-impact promotional & commercial brand films',
      'Product demo videos & feature walkthroughs',
      'Corporate story films & executive interviews',
      'Motion graphics, animated titles & 2D kinetic text',
      'Pacing optimization & narrative arc structuring',
      'Seamless scene transitions & visual effects (VFX)',
      'Cinematic color correction and cinematic color grading',
      'Comprehensive audio cleanup, vocal isolation & sound design (SFX)',
      'Synchronized subtitles, captions & kinetic text typography',
      'Paid advertising video creatives optimized for conversion',
    ],
    deliverables: [
      'Finished 4K / 1080p video exports formatted for target platforms (9:16 vertical, 16:9 horizontal)',
      'Engaging burnt-in dynamic subtitles and graphic callouts',
      'Mastered audio mix with balanced dialogue, royalty-free score, and sound effects',
      'Custom video thumbnails designed for maximum click-through rate (CTR)',
      'Re-cut variations optimized for A/B creative testing in ad campaigns',
    ],
    businessBenefits: [
      {
        title: 'Hook Attention in 3 Seconds',
        description: 'Strategic visual and auditory hooks engineered to stop the scroll and keep viewers glued until the call to action.',
      },
      {
        title: 'Consistent Content Production',
        description: 'Free up leadership and marketing teams to produce raw ideas while we handle end-to-end post-production delivery.',
      },
      {
        title: 'Repurpose Once, Publish Everywhere',
        description: 'Transform a single 30-minute podcast or webinar into 8–12 viral vertical clips for multi-channel distribution.',
      },
      {
        title: 'Professional Brand Credibility',
        description: 'Crisp audio, tasteful grading, and sleek motion graphics convey the presence of an industry-leading brand.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Footage Ingestion & Narrative Review',
        description: 'We review raw assets, identify the strongest narrative moments, and establish pacing goals for the edit.',
      },
      {
        step: '02',
        title: 'Rough Cut & Pacing Assembly',
        description: 'We cut dead air, tighten dialogue, and build a compelling emotional or educational arc.',
      },
      {
        step: '03',
        title: 'Motion Graphics & Typography',
        description: 'Adding kinetic text, on-screen evidence, branded lower-thirds, and illustrative overlays.',
      },
      {
        step: '04',
        title: 'Color Grading & Sound Architecture',
        description: 'Color correction for visual pop, vocal leveling, and custom sound design layers (wooshes, risers, impacts).',
      },
      {
        step: '05',
        title: 'Review Cycles & Master Delivery',
        description: 'Collaborative feedback revisions and delivery of optimized master files formatted for all social and web placements.',
      },
    ],
    faqs: [
      {
        question: 'What footage do we need to provide to get started?',
        answer: 'You can provide raw camera recordings, smartphone videos, screen captures, or voice recordings via Google Drive, Dropbox, or Frame.io. We handle the rest.',
      },
      {
        question: 'What is the typical turnaround time for video editing?',
        answer: 'Short-form reels and shorts typically turn around in 24 to 48 hours. Comprehensive brand films or long-form YouTube projects take 3 to 5 business days.',
      },
      {
        question: 'Are music and sound effects licensed for commercial use?',
        answer: 'Yes. Every track, sound effect, and visual asset we include is fully licensed for commercial broadcast and paid advertising.',
      },
    ],
    relatedServiceIds: ['branding', 'ui-ux-design', 'website-development'],
    iconName: 'Video',
  },
  {
    id: 'branding',
    slug: 'branding',
    title: 'Branding and Visual Identity',
    shortTag: 'Branding & Identity',
    tagline: 'Distinct visual identities that command instant recognition and long-term trust.',
    heroDescription:
      'We shape cohesive, memorable brand identities — from geometric logo marks and custom typography to comprehensive guidelines and digital marketing collateral.',
    overview:
      'Branding is the emotional and intellectual imprint your company leaves on the market. Cretify builds visual identity systems that look modern, feel authoritative, and scale consistently across digital apps, social platforms, and physical collateral.',
    problemsSolved: [
      'Generic or outdated logos failing to stand out in saturated digital markets',
      'Inconsistent visual branding between websites, social media, and client proposals',
      'Lack of clear brand guidelines resulting in team members guessing fonts and colors',
      'Inability to command premium pricing due to an unpolished visual presence',
      'Difficulty maintaining brand recognition across new product rollouts',
    ],
    capabilities: [
      'Original logo design & geometric monogram marks',
      'Comprehensive brand identity systems',
      'Curated typography pairings & custom color palettes',
      'Thorough brand guideline documentation (Brand Books)',
      'Digital & physical marketing collateral design',
      'Social media profile kits & post templates',
      'Executive pitch deck & company presentation design',
      'Brand voice, tone & key messaging principles',
      'Stationery, business cards & corporate merchandise design',
      'Multi-channel brand asset consistency audits',
    ],
    deliverables: [
      'Master logo suite (Primary mark, horizontal lockup, icon mark, monochrome & vector files)',
      'Comprehensive Brand Style Guide PDF detailing rules for typography, color, and spacing',
      'Pre-configured font files and hexadecimal color system specifications',
      'Social media asset starter kit (Profile avatars, banners, post layouts)',
      'Vector source files in AI, SVG, EPS, and high-resolution PNG formats',
    ],
    businessBenefits: [
      {
        title: 'Instant Brand Memorability',
        description: 'A distinctive, geometrically balanced visual mark makes your brand recognizable across feeds and industries.',
      },
      {
        title: 'Unwavering Team Consistency',
        description: 'Clear brand guidelines empower your internal teams and contractors to produce on-brand assets without confusion.',
      },
      {
        title: 'Premium Brand Perception',
        description: 'A polished visual identity immediately signals high quality, validating premium price points for your services.',
      },
      {
        title: 'Foundation for Scale',
        description: 'A systematic brand framework designed to adapt seamlessly as you launch new products, services, or sub-brands.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Brand Archetype & Positioning',
        description: 'We explore your company ethos, market positioning, target demographics, and emotional differentiators.',
      },
      {
        step: '02',
        title: 'Visual Conceptualization & Sketching',
        description: 'We explore dozens of creative directions, geometric shapes, letterforms, and symbolic motifs.',
      },
      {
        step: '03',
        title: 'Vector Craft & Typography Pairing',
        description: 'Refining selected concepts with geometric mathematical grid systems and selecting complementary typefaces.',
      },
      {
        step: '04',
        title: 'Application & Collateral Mockups',
        description: 'Stress-testing the brand identity across websites, apps, business cards, apparel, and digital advertising.',
      },
      {
        step: '05',
        title: 'Brand Book Delivery & Asset Vault',
        description: 'Exporting every file format, organizing asset folders, and delivering the comprehensive brand guideline book.',
      },
    ],
    faqs: [
      {
        question: 'Do we own full copyright to the brand identity and logo?',
        answer: 'Yes. Upon final project completion, full copyright and intellectual property rights to the approved visual identity are completely transferred to your business.',
      },
      {
        question: 'What file formats will we receive?',
        answer: 'You will receive vector formats (AI, EPS, SVG, PDF) for infinite scalability and raster formats (PNG with transparent backgrounds, JPG, WebP) in various color modes (RGB and CMYK).',
      },
      {
        question: 'Can you update our existing logo without starting from scratch?',
        answer: 'Yes. We frequently modernize legacy brand marks, adjusting geometry, weights, and color contrast to optimize them for modern digital screens.',
      },
    ],
    relatedServiceIds: ['ui-ux-design', 'website-development', 'video-editing'],
    iconName: 'Sparkles',
  },
  {
    id: 'seo',
    slug: 'seo',
    title: 'SEO and Digital Optimization',
    shortTag: 'SEO & Optimization',
    tagline: 'Technical search optimization engineered for genuine discovery and relevance.',
    heroDescription:
      'We audit, optimize, and structure your web presence to improve search engine crawlability, Core Web Vitals speed, and organic visibility among high-intent audiences.',
    overview:
      'A beautiful website is only effective if your prospective clients can find it. Cretify delivers disciplined on-page and technical search engine optimization. We focus on semantic architectures, high-intent keyword alignment, crawlability, and speed benchmarks that earn lasting search visibility without empty gimmicks.',
    problemsSolved: [
      'Websites invisible in search results for essential industry terms',
      'Technical crawl errors, broken canonicals, and duplicate pages hurting domain indexation',
      'Slow page load times triggering algorithmic penalties in search rankings',
      'Content lacking semantic headings, schema markup, and metadata optimization',
      'High paid search acquisition costs due to an absence of organic inbound traffic',
    ],
    capabilities: [
      'Comprehensive technical SEO audits & remediation roadmap',
      'On-page content & semantic heading structure optimization',
      'High-intent commercial keyword research and competitor analysis',
      'Site architecture, breadcrumbs & internal linking strategies',
      'Metadata crafting (Title tags, Meta descriptions, OpenGraph tags)',
      'Schema.org structured data & rich snippet implementation (JSON-LD)',
      'Image compression, modern format conversion (WebP/AVIF), and descriptive alt tagging',
      'Google Core Web Vitals remediation (LCP, FID/INP, CLS)',
      'XML sitemap generation, robots.txt tuning, and Google Search Console setup',
      'Search visibility tracking and baseline performance reporting',
    ],
    deliverables: [
      'Detailed SEO Technical Audit & Fix Implementation Report',
      'Structured schema markup implemented across key pages',
      'Targeted keyword map aligned with relevant website URLs',
      'Optimized metadata templates for current and future pages',
      'Configured Google Search Console with clean indexing status',
    ],
    businessBenefits: [
      {
        title: 'Long-Term Organic Acquisition',
        description: 'Earn steady streams of qualified prospect visits without having to pay for every single click on ad networks.',
      },
      {
        title: 'High-Intent Inbound Leads',
        description: 'Reach decision-makers at the exact moment they are actively searching for solutions to their business problems.',
      },
      {
        title: 'Enhanced User Experience',
        description: 'Technical SEO fixes directly correlate with faster page loads, clearer layouts, and lower bounce rates for human visitors.',
      },
      {
        title: 'Future-Proof Foundation',
        description: 'White-hat, standards-compliant optimizations that protect your site from unexpected algorithm volatility.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Deep Technical & Crawl Audit',
        description: 'We run deep crawls to identify broken links, redirect chains, crawl budget waste, and indexation blockers.',
      },
      {
        step: '02',
        title: 'Keyword Intent & Entity Research',
        description: 'We analyze real customer search behavior to target high-intent topics rather than useless vanity keywords.',
      },
      {
        step: '03',
        title: 'On-Page & Semantic Engineering',
        description: 'Refining page titles, headers, copy structure, alt tags, and internal link architecture.',
      },
      {
        step: '04',
        title: 'Structured Data & Core Web Vitals',
        description: 'Injecting Schema.org JSON-LD structured data and tuning frontend asset delivery for sub-second responses.',
      },
      {
        step: '05',
        title: 'Verification & Performance Monitoring',
        description: 'Submitting updated sitemaps to search engines and tracking keyword indexation trajectory over time.',
      },
    ],
    faqs: [
      {
        question: 'Do you guarantee number 1 rankings on Google?',
        answer: 'No reputable digital agency guarantees specific rankings, as search algorithms involve hundreds of dynamic variables. We guarantee rigorous adherence to search engine best practices, technical excellence, and proven optimization strategies that significantly boost search visibility.',
      },
      {
        question: 'How long does it take to see results from SEO improvements?',
        answer: 'Technical fixes and indexing improvements often show initial crawl improvements within 2 to 4 weeks, while measurable organic rankings typically compound over 2 to 6 months as domain trust builds.',
      },
      {
        question: 'Does Cretify optimize existing websites, or only sites you build?',
        answer: 'We can optimize both newly built platforms and existing websites built on WordPress, Shopify, Next.js, Webflow, or custom stacks.',
      },
    ],
    relatedServiceIds: ['website-development', 'web-app-development', 'ecommerce-development'],
    iconName: 'Search',
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI Automation',
    shortTag: 'AI Automation',
    tagline: 'Intelligent automated workflows that eliminate repetitive manual business drag.',
    heroDescription:
      'We orchestrate custom AI pipelines, automated lead routing, and intelligent data processing that cut operational costs and deliver instant responses 24/7.',
    overview:
      'Modern businesses waste hundreds of hours every month copying data across tools, drafting repetitive replies, and manually categorizing incoming leads. Cretify builds custom AI automations and system integrations that execute routine business workflows with speed and reliability.',
    problemsSolved: [
      'Slow response times to prospective client leads causing lost deals to faster competitors',
      'Teams bogged down by repetitive data entry between CRM, email, and accounting software',
      'Inconsistent client intake and onboarding processes requiring manual follow-up',
      'Unstructured document processing (invoices, emails, PDFs) causing operational bottlenecks',
      'High operational overhead costs from hiring manual personnel for administrative tasks',
    ],
    capabilities: [
      'End-to-end AI-powered business workflow orchestration',
      'Repetitive task automation across multi-tool ecosystems',
      'Intelligent lead qualification, instant scoring & CRM routing',
      'Automated customer enquiry classification & triage systems',
      'Custom AI business assistants & internal knowledge retrieval',
      'Automated document extraction, OCR & structured data parsing',
      'Multi-app integrations (Make, Zapier, Webhooks, custom APIs)',
      'Automated notifications across Slack, WhatsApp, SMS & Email',
      'Continuous workflow monitoring, error handling & fallback alerts',
      'Bespoke AI solutions tailored to proprietary business models',
    ],
    deliverables: [
      'Configured, production-tested automated workflow pipelines',
      'Direct integrations connecting your forms, CRM, communications, and database',
      'Custom AI prompts engineered and fine-tuned for your specific industry tone',
      'Operational monitoring dashboard with automated error alerts',
      'Comprehensive documentation and video handover on managing workflows',
    ],
    businessBenefits: [
      {
        title: 'Instant Lead Engagement',
        description: 'Qualify and respond to high-value inbound prospects in seconds, drastically increasing deal conversion rates.',
      },
      {
        title: 'Scale Revenue Without Adding Headcount',
        description: 'Handle 10x more client inquiries, invoices, or transactions without needing to hire additional administrative staff.',
      },
      {
        title: 'Eliminate Human Data Errors',
        description: 'Automated data handoffs ensure information is formatted, stored, and routed consistently without typos or missed steps.',
      },
      {
        title: 'Always-On Operations',
        description: 'Your business workflows execute reliably 24 hours a day, 7 days a week, regardless of time zones or holidays.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Workflow Audit & Bottleneck Mapping',
        description: 'We audit your daily administrative tasks to identify the highest ROI automation opportunities.',
      },
      {
        step: '02',
        title: 'Logic Architecture & Tool Selection',
        description: 'We map trigger conditions, data flow paths, safety validation checks, and API endpoints.',
      },
      {
        step: '03',
        title: 'Automation Build & AI Prompt Tuning',
        description: 'Constructing the pipelines, connecting services, and tuning AI processing logic for deterministic accuracy.',
      },
      {
        step: '04',
        title: 'Stress Testing & Exception Handling',
        description: 'Testing edge cases, unexpected input formatting, and building fallback alert mechanisms to prevent failures.',
      },
      {
        step: '05',
        title: 'Deployment & Ongoing Monitoring',
        description: 'Activating live automations, team walkthroughs, and setting up automated run logs.',
      },
    ],
    faqs: [
      {
        question: 'Do we need technical expertise to manage our automations?',
        answer: 'No. We build robust, reliable systems that run quietly in the background and provide straightforward dashboards where your team can view activity logs without writing code.',
      },
      {
        question: 'How do you ensure customer data remains private?',
        answer: 'We architect data pipelines using enterprise-grade API connections that never use your proprietary client data for model training, with encrypted token storage.',
      },
      {
        question: 'Which tools can you connect together?',
        answer: 'We connect virtually any modern platform with an API or webhook support, including HubSpot, Salesforce, Notion, Google Workspace, Slack, Stripe, Airtable, and custom databases.',
      },
    ],
    relatedServiceIds: ['web-app-development', 'website-development', 'seo'],
    iconName: 'Bot',
  },
];
