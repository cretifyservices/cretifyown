import React, { useEffect, useRef, useState } from 'react';
import { SaturnOrbital } from './SaturnOrbital';

export const ApproachScrollSaturn: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Motion states:
  // entrance: 0 (just entering bottom of viewport) -> 1 (centered in viewport)
  // exit: 0 (centered) -> 1 (leaving towards top of viewport)
  const [motion, setMotion] = useState({
    saturnX: 0,
    saturnY: 0,
    saturnScale: 1,
    saturnOpacity: 1,
    saturnRotation: 0,
    textY: 0,
    textOpacity: 1,
  });

  useEffect(() => {
    let ticking = false;

    const calculateMotion = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const H = window.innerHeight;
      const isMobile = window.innerWidth < 640;

      // 1. ENTRANCE PHASE:
      // Starts as soon as the section enters the bottom of the viewport (rect.top <= H).
      // Reaches 100% completion when the section arrives at the center of the viewport (rect.top <= H * 0.25).
      const entranceRange = H * 0.75;
      const entranceRaw = (H - rect.top) / entranceRange;
      const entranceNorm = Math.max(0, Math.min(1, entranceRaw));

      // Cubic ease-out deceleration curve for velocity arrival
      const easeOut = 1 - Math.pow(1 - entranceNorm, 3);

      // 2. EXIT PHASE:
      // Starts when the section begins leaving past the top of the viewport (rect.top < -H * 0.1).
      // Fades out and glides upward into the cosmic void by rect.top < -H * 0.7.
      const exitThreshold = -H * 0.1;
      const exitRange = H * 0.6;
      let exitNorm = 0;
      if (rect.top < exitThreshold) {
        exitNorm = Math.min(1, Math.max(0, (exitThreshold - rect.top) / exitRange));
      }
      const easeIn = exitNorm * exitNorm * exitNorm;

      // Calculate transforms:
      const maxOffsetLeft = isMobile ? -320 : -600;
      
      let x = (1 - easeOut) * maxOffsetLeft;
      let y = -easeIn * (isMobile ? 35 : 55);
      let scale = (0.7 + 0.3 * easeOut) * (1 + easeIn * 0.1);
      let rotation = (1 - easeOut) * -20 + easeIn * 10;
      
      // Opacity: fades in rapidly during entrance, holds at 1, fades out during exit
      let sOpacity = Math.min(1, easeOut * 1.5) * (1 - easeIn * 1.5);
      sOpacity = Math.max(0, Math.min(1, sOpacity));

      let tY = (1 - easeOut) * (isMobile ? 30 : 50) - easeIn * (isMobile ? 30 : 50);
      let tOpacity = Math.min(1, easeOut * 1.6) * (1 - easeIn * 1.5);
      tOpacity = Math.max(0, Math.min(1, tOpacity));

      setMotion({
        saturnX: x,
        saturnY: y,
        saturnScale: scale,
        saturnOpacity: sOpacity,
        saturnRotation: rotation,
        textY: tY,
        textOpacity: tOpacity,
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateMotion);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    calculateMotion();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="approach"
      className="relative w-full bg-[#0A0A0B] border-t border-white/[0.07] py-20 sm:py-28 lg:py-32 px-5 sm:px-8 overflow-hidden select-none"
    >
      {/* Ambient Sapphire Radial Halos in Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[450px] sm:w-[700px] h-[450px] sm:h-[700px] rounded-full bg-[radial-gradient(circle,rgba(99,142,255,0.13)_0%,rgba(99,142,255,0.03)_50%,transparent_70%)] filter blur-[50px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* ========================================================= */}
        {/* 1. PERSISTENT APPROACH BADGE / TEXT                       */}
        {/* Visible after capabilities every time, exactly as requested */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/[0.05] border border-white/12 shadow-[0_0_24px_rgba(99,142,255,0.25)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_10px_rgb(99,142,255)] animate-pulse" />
            <span className="text-[11px] sm:text-[13px] font-semibold tracking-[0.28em] uppercase text-white/95">
              THE APPROACH
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. SATURN PLANET & ROTATING ORBITAL RINGS ANIMATION       */}
        {/* Sweeps in from left on scroll entry, centers, exits up     */}
        {/* ========================================================= */}
        <div className="relative w-full flex items-center justify-center py-2 sm:py-6 overflow-visible pointer-events-none">
          <div
            className="transition-transform duration-75 will-change-transform flex items-center justify-center"
            style={{
              transform: `translate3d(${motion.saturnX}px, ${motion.saturnY}px, 0) scale(${motion.saturnScale}) rotate(${motion.saturnRotation}deg)`,
              opacity: motion.saturnOpacity,
            }}
          >
            {/* Responsive scaling: perfectly proportioned on both mobile and desktop */}
            <div className="block sm:hidden">
              <SaturnOrbital customScale={0.58} />
            </div>
            <div className="hidden sm:block md:hidden">
              <SaturnOrbital customScale={0.78} />
            </div>
            <div className="hidden md:block">
              <SaturnOrbital customScale={1.0} />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. APPROACH HEADLINE & TEXT (100% COMPLETE & VISIBLE)     */}
        {/* Fully legible, no overflow clipping, highlighted blue accent */}
        {/* ========================================================= */}
        <div
          className="relative text-center max-w-3xl flex flex-col items-center gap-3 sm:gap-4 mt-4 sm:mt-6 transition-transform duration-75 will-change-transform"
          style={{
            transform: `translate3d(0, ${motion.textY}px, 0)`,
            opacity: motion.textOpacity,
          }}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-semibold text-white tracking-[-0.02em] leading-[1.22]">
            From a single point of light, we build{' '}
            <span className="text-[rgb(99,142,255)] font-semibold">entire worlds</span>.
          </h2>
          <p className="text-[14px] sm:text-[16px] text-white/70 max-w-xl leading-relaxed font-normal px-2">
            Precision-engineered brands, interfaces, and digital systems — calibrated to the last frame.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 text-xs sm:text-sm text-white/45 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)]/70" />
              Architected for Performance
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)]/70" />
              Engineered with Precision
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
