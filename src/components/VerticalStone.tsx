import React from 'react';

interface VerticalStoneProps {
  className?: string;
  customScale?: number;
}

export const VerticalStone: React.FC<VerticalStoneProps> = ({
  className = '',
  customScale = 1.0,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-visible pointer-events-none ${className}`}
      style={{
        width: `${360 * customScale}px`,
        height: `${560 * customScale}px`,
      }}
    >
      {/* 1. Deep Atmospheric Sapphire Backlight Glow */}
      <div
        className="absolute rounded-full pointer-events-none filter blur-[50px] opacity-45"
        style={{
          width: `${440 * customScale}px`,
          height: `${620 * customScale}px`,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(99, 142, 255, 0.4) 0%, rgba(99, 142, 255, 0.12) 45%, transparent 72%)',
          animation: 'vctaGlow 6s ease-in-out infinite',
        }}
      />

      {/* 2. Levitating Vertical Chrome/Obsidian Pebble Stone */}
      <div
        className="relative z-10 will-change-transform flex items-center justify-center"
        style={{
          width: `${300 * customScale}px`,
          height: `${480 * customScale}px`,
          animation: 'verticalPebbleHover 7s ease-in-out infinite',
        }}
      >
        <svg
          viewBox="0 0 300 480"
          className="w-full h-full filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(99,142,255,0.28)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Base Obsidian / Liquid Chrome Gradient */}
            <radialGradient
              id="pebbleCoreGrad"
              cx="42%"
              cy="35%"
              r="65%"
              fx="38%"
              fy="28%"
            >
              <stop offset="0%" stopColor="#2a3245" />
              <stop offset="18%" stopColor="#181c26" />
              <stop offset="45%" stopColor="#0a0c12" />
              <stop offset="85%" stopColor="#040507" />
              <stop offset="100%" stopColor="#010203" />
            </radialGradient>

            {/* Specular Rim Light Gradient */}
            <linearGradient id="pebbleRimGrad" x1="50" y1="20" x2="250" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="15%" stopColor="rgba(160, 195, 255, 0.7)" />
              <stop offset="45%" stopColor="rgba(99, 142, 255, 0.25)" />
              <stop offset="70%" stopColor="rgba(255, 255, 255, 0.15)" />
              <stop offset="90%" stopColor="rgba(140, 180, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.85)" />
            </linearGradient>

            {/* Moving Light Glint Gradient */}
            <linearGradient id="sheenSweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.03)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="55%" stopColor="rgba(160,200,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            {/* Subtle Glass Internal Refraction */}
            <radialGradient id="internalGlow" cx="50%" cy="85%" r="50%">
              <stop offset="0%" stopColor="rgba(99, 142, 255, 0.35)" />
              <stop offset="60%" stopColor="rgba(99, 142, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>

            {/* Clip Path for the Organic Vertical Stone Pebble Shape */}
            <clipPath id="pebbleClip">
              <path d="M 150,15 C 225,15 285,115 285,250 C 285,385 228,465 150,465 C 72,465 15,385 15,250 C 15,115 75,15 150,15 Z" />
            </clipPath>

            {/* Blur filter for soft specular hot spots */}
            <filter id="softSpecular" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* 1. The Main Stone Body */}
          <path
            d="M 150,15 C 225,15 285,115 285,250 C 285,385 228,465 150,465 C 72,465 15,385 15,250 C 15,115 75,15 150,15 Z"
            fill="url(#pebbleCoreGrad)"
          />

          {/* 2. Clipped Reflections & Sweeping Chrome Specular Highlights */}
          <g clipPath="url(#pebbleClip)">
            {/* Bottom Internal Refraction */}
            <ellipse
              cx="150"
              cy="430"
              rx="110"
              ry="75"
              fill="url(#internalGlow)"
            />

            {/* Animated Liquid Metallic Sheen Sweeping Across Surface (As in Vesper Video) */}
            <rect
              x="-150"
              y="-100"
              width="600"
              height="680"
              fill="url(#sheenSweep)"
              className="animate-sheen"
              style={{
                mixBlendMode: 'screen',
                animation: 'pebbleSheenSweep 5.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
              }}
            />

            {/* Primary Curved Specular Crest (Upper-Left Reflection) */}
            <path
              d="M 140,32 C 100,50 48,130 45,230 C 42,310 70,390 100,425 C 72,370 60,290 65,220 C 70,140 105,65 140,32 Z"
              fill="rgba(255, 255, 255, 0.42)"
              filter="url(#softSpecular)"
              style={{
                animation: 'pebbleGlintPulse 4.5s ease-in-out infinite',
              }}
            />

            {/* Sharp Curved Specular Filament along Left Crest */}
            <path
              d="M 145,28 C 105,48 55,125 52,225 C 50,295 72,365 95,405"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px rgba(255,255,255,0.8))"
            />

            {/* Subtle Right Secondary Rim Specular Reflection */}
            <path
              d="M 165,30 C 205,52 250,130 252,230 C 254,320 225,400 195,435"
              stroke="rgba(160, 195, 255, 0.55)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Soft Ambient Horizon Reflection across center */}
            <path
              d="M 25,230 Q 150,200 275,230 Q 150,260 25,230 Z"
              fill="rgba(99, 142, 255, 0.08)"
            />
          </g>

          {/* 3. Outer Razor-Sharp Rim Light Outline */}
          <path
            d="M 150,15 C 225,15 285,115 285,250 C 285,385 228,465 150,465 C 72,465 15,385 15,250 C 15,115 75,15 150,15 Z"
            stroke="url(#pebbleRimGrad)"
            strokeWidth="1.5"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(99,142,255,0.4))',
            }}
          />

          {/* 4. Top Apex Specular Hot Spot Glint */}
          <circle
            cx="142"
            cy="28"
            r="3.5"
            fill="#ffffff"
            filter="drop-shadow(0 0 8px #ffffff)"
          />
        </svg>

        {/* 5. Ambient Atmospheric Dust Orbs Drifting Around Stone */}
        <div className="absolute inset-0 pointer-events-none">
          <span
            className="absolute rounded-full bg-[rgb(99,142,255)] opacity-60 shadow-[0_0_10px_rgb(99,142,255)] animate-pulse"
            style={{
              left: '8%',
              top: '25%',
              width: '4px',
              height: '4px',
              animationDuration: '3.5s',
            }}
          />
          <span
            className="absolute rounded-full bg-white opacity-40 shadow-[0_0_8px_#ffffff] animate-pulse"
            style={{
              right: '12%',
              top: '38%',
              width: '3px',
              height: '3px',
              animationDuration: '4.2s',
            }}
          />
          <span
            className="absolute rounded-full bg-[rgb(99,142,255)] opacity-50 shadow-[0_0_10px_rgb(99,142,255)] animate-pulse"
            style={{
              left: '18%',
              bottom: '22%',
              width: '3.5px',
              height: '3.5px',
              animationDuration: '5s',
            }}
          />
        </div>
      </div>
    </div>
  );
};
