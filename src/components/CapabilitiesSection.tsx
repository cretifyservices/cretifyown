import React, { useEffect, useRef, useState } from 'react';
import { useServices } from '../utils/dataStore';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface CapabilitiesSectionProps {
  navigate: (path: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ navigate }) => {
  const services = useServices();
  const [activeRows, setActiveRows] = useState<Record<number, boolean>>({});
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setActiveRows((prev) => ({ ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.35, rootMargin: '0px 0px -50px 0px' }
    );

    rowRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-28 px-5 sm:px-8 lg:px-12 border-t border-white/[0.07] bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
            <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/60">
              Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-[-0.02em]">
            Built end to end, in the dark
          </h2>
        </div>

        {/* Capabilities Rows with Animated Electric Blue Line */}
        <div className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
          {services.slice(0, 6).map((srv, idx) => {
            const isActive = !!activeRows[idx];

            return (
              <div
                key={srv.slug}
                data-index={idx}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                onClick={() => {
                  navigate(`/services/${srv.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative py-9 sm:py-10 transition-colors cursor-pointer group"
              >
                {/* Expanding Glowing Electric Blue Line on Scroll & Hover */}
                <div
                  className="absolute top-[-1px] left-0 h-[2px] w-full transition-transform duration-700 ease-out origin-left pointer-events-none"
                  style={{
                    background: 'rgb(99, 142, 255)',
                    boxShadow: '0 0 14px 0 rgb(99, 142, 255)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-10">
                  {/* Left: Number + Title */}
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-mono font-medium tracking-[0.1em] text-[rgb(99,142,255)]">
                      0{idx + 1}
                    </span>
                    <span className="text-2xl sm:text-3xl font-semibold text-white tracking-[-0.01em] group-hover:text-white transition-colors">
                      {srv.title}
                    </span>
                  </div>

                  {/* Right: Description + Arrow */}
                  <div className="flex items-center justify-between sm:justify-end gap-8">
                    <span className="text-[15px] text-white/55 max-w-md sm:text-right font-normal line-clamp-2">
                      {srv.tagline}
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">
                      <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-[rgb(99,142,255)]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={() => navigate('/services')}
            className="text-xs font-medium tracking-[0.14em] uppercase text-white/50 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All 8 Capabilities</span>
            <ArrowRight className="w-3.5 h-3.5 text-[rgb(99,142,255)]" />
          </button>
        </div>
      </div>
    </section>
  );
};
