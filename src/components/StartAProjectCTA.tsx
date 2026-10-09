import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface StartAProjectCTAProps {
  onStartProject: () => void;
  title?: string;
  subtitle?: string;
}

export const StartAProjectCTA: React.FC<StartAProjectCTAProps> = ({
  onStartProject,
  title = 'Let’s build something beyond the dark.',
  subtitle = 'hello@cretify.in',
}) => {
  return (
    <section className="relative min-h-[90vh] w-full bg-[#0A0A0B] overflow-hidden flex items-center justify-center py-28 px-4 sm:px-6 border-t border-white/[0.06]">
      {/* 1. Star points background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <span
          className="absolute rounded-full bg-white opacity-40"
          style={{ left: '38%', top: '29%', width: '1.2px', height: '1.2px' }}
        />
        <span
          className="absolute rounded-full bg-white opacity-30"
          style={{ left: '55%', top: '48%', width: '2px', height: '2px' }}
        />
        <span
          className="absolute rounded-full bg-[rgb(99,142,255)] opacity-50 shadow-[0_0_6px_rgb(99,142,255)]"
          style={{ left: '71%', top: '22%', width: '2px', height: '2px' }}
        />
        <span
          className="absolute rounded-full bg-white opacity-25"
          style={{ left: '22%', top: '65%', width: '1.5px', height: '1.5px' }}
        />
        <span
          className="absolute rounded-full bg-white opacity-35"
          style={{ left: '62%', top: '20%', width: '1.8px', height: '1.8px' }}
        />
        <span
          className="absolute rounded-full bg-[rgb(99,142,255)] opacity-60 shadow-[0_0_8px_rgb(99,142,255)]"
          style={{ left: '82%', top: '75%', width: '2.4px', height: '2.4px' }}
        />
        <span
          className="absolute rounded-full bg-white opacity-20"
          style={{ left: '46%', top: '76%', width: '1.6px', height: '1.6px' }}
        />
      </div>

      {/* 2. Exact Vesper Rotating Celestial Saturn System */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div
          className="relative w-[240px] h-[240px]"
          style={{
            animation: 'vctaPulse 5.5s ease-in-out infinite',
            willChange: 'transform',
          }}
        >
          {/* Pulsing Luminous Aura */}
          <div
            className="absolute left-1/2 top-1/2 w-[480px] h-[480px] -ml-[240px] -mt-[240px] rounded-full filter blur-[8px]"
            style={{
              background:
                'radial-gradient(circle, rgba(99, 142, 255, 0.28) 0%, rgba(10, 10, 11, 0) 62%)',
              animation: 'vctaGlow 5.5s ease-in-out infinite',
            }}
          />

          {/* Ring A: Blue Outer Orbit (30s) */}
          <div
            className="absolute left-1/2 top-1/2 w-[552px] h-[177.6px] -ml-[276px] -mt-[88.8px] rounded-[50%]"
            style={{
              border: '1.5px solid rgba(99, 142, 255, 0.45)',
              boxShadow: '0 0 18px rgba(99, 142, 255, 0.25)',
              animation: 'vctaSpinA 30s linear infinite',
            }}
          />

          {/* Ring B: White Inner Orbit (42s) */}
          <div
            className="absolute left-1/2 top-1/2 w-[468px] h-[144px] -ml-[234px] -mt-[72px] rounded-[50%]"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.25)',
              animation: 'vctaSpinB 42s linear infinite',
            }}
          />

          {/* Spherical Planet Body */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 34% 30%, rgba(168, 186, 240, 0.6) 0%, rgba(74, 86, 128, 0.32) 17%, rgba(22, 25, 38, 1) 47%, rgba(6, 7, 12, 1) 80%)',
              boxShadow:
                'inset -16px -20px 56px rgba(0, 0, 0, 0.85), inset 14px 16px 46px rgba(99, 142, 255, 0.24), 0 0 80px rgba(99, 142, 255, 0.42)',
            }}
          />

          {/* Specular Glint */}
          <div
            className="absolute left-[26%] top-[20%] w-[26%] h-[26%] rounded-full filter blur-[2px]"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
          />
        </div>
      </div>

      {/* 3. Radial Vignette to integrate planet */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 58% 46% at 50% 50%, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.5) 46%, rgba(10,10,11,0) 75%)',
        }}
      />

      {/* 4. Foreground Content (Strict Vesper alignment) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
          <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/60">
            Start a project
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-[76px] font-semibold text-white tracking-[-0.025em] leading-[1.03] max-w-3xl">
          {title}
        </h2>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onStartProject}
            className="px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/[0.1] hover:border-[rgb(99,142,255)] text-white text-[15px] font-medium tracking-[0.06em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.04)] hover:shadow-[0_0_30px_rgba(99,142,255,0.35)] cursor-pointer active:scale-[0.98]"
          >
            Start a project
          </button>
        </div>

        {/* Email line */}
        <div className="pt-2">
          <a
            href="mailto:cretifyservices@gmail.com"
            className="text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors"
          >
            cretifyservices@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};
