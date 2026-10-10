import React, { useState, useEffect } from 'react';
import { StarryCosmicCanvas } from '../components/StarryCosmicCanvas';
import { VerticalStone } from '../components/VerticalStone';
import { ManifestoSection } from '../components/ManifestoSection';
import { SelectedWorkSection } from '../components/SelectedWorkSection';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { ApproachScrollSaturn } from '../components/ApproachScrollSaturn';
import { StartAProjectCTA } from '../components/StartAProjectCTA';
import { useReviews } from '../utils/dataStore';
import { Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
  onStartProject: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  navigate,
  onStartProject,
}) => {
  const [mounted, setMounted] = useState(false);
  const reviews = useReviews();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const currentReview = reviews[activeReviewIndex] || reviews[0];

  const handleNextReview = () => {
    if (reviews.length === 0) return;
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    if (reviews.length === 0) return;
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Development capabilities keywords for infinite loop animation as requested
  const developmentKeywords = [
    'UI/UX DESIGN',
    'RESPONSIVE WEB APPS',
    'WEBSITE DEVELOPMENT',
    'E-COMMERCE PLATFORMS',
    'AI-POWERED AUTOMATION',
    'BRAND IDENTITY & SYSTEMS',
    'CUSTOM WEB SYSTEMS',
    'PERFORMANCE OPTIMIZATION',
    'VIDEO EDITING & MOTION',
    'SEARCH ENGINE OPTIMIZATION',
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'We map the terrain — audience, market, and the truth the brand is circling. No pixels until the problem is clear.',
    },
    {
      num: '02',
      title: 'Direction',
      desc: 'We find the single idea worth betting on, then set the visual and motion language that will carry it everywhere.',
    },
    {
      num: '03',
      title: 'Build',
      desc: 'We engineer the system end to end — identity, interface, motion — precise enough to scale without losing its center.',
    },
    {
      num: '04',
      title: 'Launch & Orbit',
      desc: 'Deploy with precision. From zero-downtime server setups to live feedback iteration, your product commands immediate authority.',
    },
  ];

  const heroHeadlineWords = ['CRAFT', 'THE', 'FUTURE', 'OF', 'BRANDS'];

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white overflow-hidden font-sans">
      
      {/* Hero Section with Interactive Cosmic Canvas */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 overflow-hidden">
        
        {/* Starfield & Nebula Canvas Background */}
        <StarryCosmicCanvas density={90} interactive={true} className="opacity-90" />

        {/* Ambient Cosmic Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[rgb(99,142,255)]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-[rgb(120,80,240)]/8 blur-[150px] rounded-full pointer-events-none" />

        {/* The Exact Vertical Chrome/Obsidian Stone Animation (Centered in background behind text as in Vesper reference) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transition-all duration-1000 ease-out"
          style={{
            opacity: mounted ? 1 : 0.001,
            transform: mounted ? 'scale(1)' : 'scale(0.9)',
            transitionDelay: '250ms',
          }}
        >
          <div className="block sm:hidden">
            <VerticalStone customScale={0.72} />
          </div>
          <div className="hidden sm:block md:hidden">
            <VerticalStone customScale={0.88} />
          </div>
          <div className="hidden md:block">
            <VerticalStone customScale={1.05} />
          </div>
        </div>

        {/* Hero Central Content (z-10 overlaid on top of vertical stone) */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-7 sm:gap-9">
          
          {/* Eyebrow Pill */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0.001,
              transform: mounted ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: '150ms',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.24em] uppercase text-white/70">
              Cretify — Digital Systems & Web Architecture
            </span>
          </div>

          {/* Calibrated Harmonic Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-semibold tracking-[-0.025em] leading-[1.08] sm:leading-[1.04] text-white flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-1 select-none max-w-4xl">
            {heroHeadlineWords.map((word, i) => (
              <span
                key={i}
                className="transition-all duration-700 ease-out inline-block"
                style={{
                  opacity: mounted ? 1 : 0.001,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${350 + i * 70}ms`,
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Supporting Lead Description */}
          <p
            className="text-[16px] sm:text-[18px] text-white/60 max-w-xl mx-auto leading-[1.5] text-center font-normal transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0.001,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '650ms',
            }}
          >
            An independent design studio crafting cinematic brands, products, and digital worlds for companies reaching further than before.
          </p>

          {/* Action CTA */}
          <div
            className="pt-2 transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0.001,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '800ms',
            }}
          >
            <button
              onClick={onStartProject}
              className="px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[rgb(99,142,255)] text-white text-[15px] font-medium tracking-[0.06em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.04)] hover:shadow-[0_0_30px_rgba(99,142,255,0.35)] cursor-pointer active:scale-[0.98]"
            >
              Start a project
            </button>
          </div>
        </div>

        {/* Clean minimal vertical scroll indicator */}
        <div
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none z-10 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0.001,
            transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: '950ms',
          }}
        >
          <div className="w-[1px] h-7 bg-gradient-to-b from-white/35 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 1: MANIFESTO                                      */}
      {/* ========================================================= */}
      <ManifestoSection />

      {/* ========================================================= */}
      {/* SECTION 2: DEVELOPMENT KEYWORDS TICKER (LOOP ANIMATION)   */}
      {/* ========================================================= */}
      <section className="relative py-7 border-y border-white/[0.07] bg-[#0A0A0B] overflow-hidden">
        <div className="relative w-full overflow-hidden flex select-none">
          <div className="animate-marquee flex items-center gap-10 sm:gap-14 whitespace-nowrap text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/50">
            {[...developmentKeywords, ...developmentKeywords].map((keyword, index) => (
              <span key={index} className="flex items-center gap-10 sm:gap-14">
                <span className="hover:text-white transition-colors cursor-default">
                  {keyword}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: SELECTED WORK (DIRECT CHROME BUTTONS, NO POPUP)*/}
      {/* ========================================================= */}
      <SelectedWorkSection navigate={navigate} />

      {/* ========================================================= */}
      {/* SECTION 4: CAPABILITIES (WITH EXPANDING BLUE LINES)       */}
      {/* ========================================================= */}
      <CapabilitiesSection navigate={navigate} />

      {/* ========================================================= */}
      {/* SECTION 5: THE APPROACH (CENTERED SATURN ANIMATION)       */}
      {/* ========================================================= */}
      <ApproachScrollSaturn />

      {/* ========================================================= */}
      {/* SECTION 6: HOW WE WORK (FROM FIRST CALL TO LAUNCH)        */}
      {/* ========================================================= */}
      <section className="relative py-28 px-5 sm:px-8 lg:px-12 border-t border-white/[0.07] bg-[#0A0A0B]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
              <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/60">
                How we work
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-[-0.02em]">
              From first call to launch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[rgb(99,142,255)]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <span className="text-[13px] font-mono font-semibold tracking-[0.1em] text-[rgb(99,142,255)] block">
                    {step.num}
                  </span>
                  <h3 className="text-2xl font-semibold text-white tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-white/60 leading-[1.6] font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: IN THEIR WORDS (DYNAMIC SYNCHRONIZED REVIEWS)  */}
      {/* ========================================================= */}
      <section className="relative py-32 px-5 sm:px-8 lg:px-12 border-t border-white/[0.07] bg-[#0A0A0B] overflow-hidden flex flex-col items-center justify-center text-center">
        
        {/* Ambient Glow */}
        <div className="absolute w-[500px] h-[300px] bg-[rgb(99,142,255)]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-7">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
            <span className="text-[13px] font-medium tracking-[0.28em] uppercase text-white/55">
              In their words
            </span>
          </div>

          {/* Rating Stars */}
          {currentReview?.rating && (
            <div className="flex items-center gap-1 text-[rgb(99,142,255)]">
              {Array.from({ length: currentReview.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          )}

          {/* Testimonial Quote */}
          {currentReview ? (
            <blockquote className="text-2xl sm:text-4xl lg:text-[42px] font-medium tracking-[-0.015em] leading-[1.3] text-white/95 max-w-3xl min-h-[100px] flex items-center justify-center transition-all duration-300">
              &ldquo;{currentReview.quote}&rdquo;
            </blockquote>
          ) : (
            <blockquote className="text-2xl sm:text-4xl text-white/95">
              &ldquo;Cretify didn’t just redesign our brand — they gave it gravity.&rdquo;
            </blockquote>
          )}

          {/* Author Details with Separator */}
          {currentReview && (
            <div className="flex flex-col items-center gap-2 pt-2">
              <span className="w-7 h-[1px] bg-white/25 mb-2" />
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-semibold text-white tracking-[-0.01em]">
                  {currentReview.author}
                </span>
                {currentReview.verified && (
                  <CheckCircle className="w-4 h-4 text-[rgb(99,142,255)]" />
                )}
              </div>
              <span className="text-[13px] font-medium tracking-[0.08em] uppercase text-white/45">
                {currentReview.title} · {currentReview.company}
              </span>
            </div>
          )}

          {/* Review Carousel Indicators & Controls if multiple */}
          {reviews.length > 1 && (
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handlePrevReview}
                aria-label="Previous Review"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReviewIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeReviewIndex
                        ? 'w-6 bg-[rgb(99,142,255)]'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextReview}
                aria-label="Next Review"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8: CLOSING CTA (START A PROJECT WITH ROTATING SATURN) */}
      {/* ========================================================= */}
      <StartAProjectCTA onStartProject={onStartProject} />

    </div>
  );
};
