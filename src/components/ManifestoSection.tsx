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

      // When section enters lower portion of screen through when it reaches comfortable center
      const start = windowHeight * 0.88;
      const end = windowHeight * 0.18;

      const progress = (start - rect.top) / (start - end);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three clear manifesto paragraphs requested by user:
  // 1. We believe the digital world deserves more than ordinary.
  // 2. We turn bold ideas into distinctive experiences through design, technology, and creativity.
  // 3. No templates for ambition. No limits on what's possible.
  const paragraphs = [
    {
      words: [
        { text: 'We', isBlue: false },
        { text: 'believe', isBlue: false },
        { text: 'the', isBlue: false },
        { text: 'digital', isBlue: false },
        { text: 'world', isBlue: false },
        { text: 'deserves', isBlue: false },
        { text: 'more', isBlue: false },
        { text: 'than', isBlue: false },
        { text: 'ordinary.', isBlue: true },
      ],
    },
    {
      words: [
        { text: 'We', isBlue: false },
        { text: 'turn', isBlue: false },
        { text: 'bold', isBlue: false },
        { text: 'ideas', isBlue: false },
        { text: 'into', isBlue: false },
        { text: 'distinctive', isBlue: true },
        { text: 'experiences', isBlue: true },
        { text: 'through', isBlue: false },
        { text: 'design,', isBlue: false },
        { text: 'technology,', isBlue: false },
        { text: 'and', isBlue: false },
        { text: 'creativity.', isBlue: false },
      ],
    },
    {
      words: [
        { text: 'No', isBlue: false },
        { text: 'templates', isBlue: false },
        { text: 'for', isBlue: false },
        { text: 'ambition.', isBlue: false },
        { text: 'No', isBlue: false },
        { text: 'limits', isBlue: false },
        { text: 'on', isBlue: false },
        { text: "what's", isBlue: false },
        { text: 'possible.', isBlue: true },
      ],
    },
  ];

  // Flatten words for global index threshold
  let totalWordCount = 0;
  paragraphs.forEach((p) => {
    totalWordCount += p.words.length;
  });

  let runningIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-5 sm:px-8 lg:px-12 bg-[#0A0A0B] border-t border-white/[0.07]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
          <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/50">
            MANIFESTO
          </span>
        </div>

        {/* Scroll-Driven Typography */}
        <div className="space-y-6 sm:space-y-8 max-w-4xl">
          {paragraphs.map((p, pIdx) => (
            <h2
              key={pIdx}
              className="text-2xl sm:text-4xl lg:text-[46px] font-medium tracking-[-0.02em] leading-[1.28] flex flex-wrap gap-x-[0.3em] gap-y-2"
            >
              {p.words.map((word, wIdx) => {
                const currentWordIdx = runningIndex++;
                const threshold = (currentWordIdx / Math.max(1, totalWordCount - 1)) * 0.9;
                const wordProgress = Math.min(
                  Math.max((scrollProgress - threshold) / 0.12, 0),
                  1
                );

                if (word.isBlue) {
                  const currentOpacity = 0.28 + wordProgress * 0.72;
                  return (
                    <span
                      key={wIdx}
                      className="inline-block transition-colors duration-150 font-semibold cursor-default select-none"
                      style={{
                        color: `rgba(99, 142, 255, ${currentOpacity})`,
                        textShadow: 'none',
                      }}
                    >
                      {word.text}
                    </span>
                  );
                }

                const currentOpacity = 0.22 + wordProgress * 0.78;
                return (
                  <span
                    key={wIdx}
                    className="inline-block transition-colors duration-150 cursor-default select-none font-medium"
                    style={{
                      color: `rgba(255, 255, 255, ${currentOpacity})`,
                      textShadow: 'none',
                    }}
                  >
                    {word.text}
                  </span>
                );
              })}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
};
