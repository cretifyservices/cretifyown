import React, { useEffect, useRef, useState } from 'react';

export const ManifestoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When section enters lower portion of screen (e.g. 80% from top)
      // through when it reaches comfortable center (30% from top)
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.20;

      const progress = (start - rect.top) / (start - end);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Words of the manifesto
  const tokens = [
    { text: 'We', isBlue: false },
    { text: 'work', isBlue: false },
    { text: 'in', isBlue: false },
    { text: 'the', isBlue: false },
    { text: 'dark', isBlue: true }, // Colored blue as strictly requested, NO underline
    { text: 'on', isBlue: false },
    { text: 'purpose', isBlue: false },
    { text: '—', isBlue: false },
    { text: 'reducing', isBlue: false },
    { text: 'each', isBlue: false },
    { text: 'brand', isBlue: false },
    { text: 'to', isBlue: false },
    { text: 'one', isBlue: false },
    { text: 'true', isBlue: false },
    { text: 'signal,', isBlue: false },
    { text: 'then', isBlue: false },
    { text: 'building', isBlue: false },
    { text: 'it', isBlue: false },
    { text: 'into', isBlue: false },
    { text: 'something', isBlue: false },
    { text: 'that', isBlue: false },
    { text: 'feels', isBlue: false },
    { text: 'inevitable.', isBlue: false },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-5 sm:px-8 lg:px-12 bg-[#0A0A0B] border-t border-white/[0.07]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)]" />
          <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/50">
            MANIFESTO
          </span>
        </div>

        {/* Scroll-Driven Solid Typography:
            - NO text-shadows ("remove all those shadows")
            - Words start lighter with less opacity
            - As user scrolls up, words transition to solid full opacity ("darken / reach full solid color")
            - "dark" is colored in electric blue without underline
        */}
        <h2 className="text-3xl sm:text-5xl lg:text-[58px] font-medium tracking-[-0.02em] leading-[1.18] max-w-4xl flex flex-wrap gap-x-[0.3em] gap-y-2">
          {tokens.map((token, index) => {
            // Sequential threshold across tokens
            const threshold = (index / (tokens.length - 1)) * 0.9;
            const wordProgress = Math.min(
              Math.max((scrollProgress - threshold) / 0.12, 0),
              1
            );

            if (token.isBlue) {
              // Word 'dark': transitions from light faint blue (opacity 0.22) to solid vibrant electric blue (opacity 1.0)
              const currentOpacity = 0.22 + wordProgress * 0.78;
              return (
                <span
                  key={index}
                  className="inline-block transition-colors duration-150 font-semibold cursor-default select-none"
                  style={{
                    color: `rgba(99, 142, 255, ${currentOpacity})`,
                    textShadow: 'none', // Strictly no shadows as requested
                  }}
                >
                  {token.text}
                </span>
              );
            }

            // Standard words: transition from light white (opacity 0.20) to solid full white (opacity 1.0)
            const currentOpacity = 0.20 + wordProgress * 0.80;
            return (
              <span
                key={index}
                className="inline-block transition-colors duration-150 cursor-default select-none"
                style={{
                  color: `rgba(255, 255, 255, ${currentOpacity})`,
                  textShadow: 'none', // Strictly no shadows as requested
                }}
              >
                {token.text}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
};
