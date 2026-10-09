import React from 'react';

interface SaturnOrbitalProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  customScale?: number;
}

export const SaturnOrbital: React.FC<SaturnOrbitalProps> = ({
  className = '',
  size = 'lg',
  customScale,
}) => {
  const baseScale = size === 'sm' ? 0.7 : size === 'md' ? 0.85 : 1;
  const scale = customScale !== undefined ? customScale : baseScale;

  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-visible pointer-events-none ${className}`}
      style={{
        width: `${560 * scale}px`,
        height: `${440 * scale}px`,
      }}
    >
      {/* 1. Large Ambient Sapphire Glow (Vesper exact: 900px radial glow) */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full z-0 filter blur-[18px] opacity-25 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 142, 255, 0.35) 0%, rgba(99, 142, 255, 0.12) 30%, rgba(10, 10, 11, 0) 65%)',
          transform: `scale(${scale})`,
        }}
      />

      {/* 2. Saturn Planet Core & Rotating Rings System */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{
          width: `${240 * scale}px`,
          height: `${240 * scale}px`,
        }}
      >
        {/* Deep Atmosphere Halo */}
        <div
          className="absolute rounded-full filter blur-[6px]"
          style={{
            width: `${400 * scale}px`,
            height: `${400 * scale}px`,
            background:
              'radial-gradient(circle, rgba(99, 142, 255, 0.4) 0%, rgba(10, 10, 11, 0) 62%)',
          }}
        />

        {/* Outer Ring A (Clockwise rotation - vspinA) */}
        <div
          className="absolute rounded-[50%]"
          style={{
            width: `${540 * scale}px`,
            height: `${175 * scale}px`,
            border: '1.5px solid rgba(99, 142, 255, 0.55)',
            boxShadow: '0 0 20px rgba(99, 142, 255, 0.35)',
            animation: 'vspinA 28s linear infinite',
            transformOrigin: 'center center',
          }}
        />

        {/* Inner Ring B (Counter-clockwise rotation - vspinB) */}
        <div
          className="absolute rounded-[50%]"
          style={{
            width: `${460 * scale}px`,
            height: `${148 * scale}px`,
            border: '1px solid rgba(255, 255, 255, 0.28)',
            animation: 'vspinB 38s linear infinite',
            transformOrigin: 'center center',
          }}
        />

        {/* Third Ring Accent */}
        <div
          className="absolute rounded-[50%]"
          style={{
            width: `${500 * scale}px`,
            height: `${160 * scale}px`,
            border: '1px dashed rgba(99, 142, 255, 0.3)',
            animation: 'vspinA 45s linear infinite',
            transformOrigin: 'center center',
          }}
        />

        {/* The Spherical Planet Body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 34% 30%, rgba(168, 186, 240, 0.65) 0%, rgba(74, 86, 128, 0.38) 17%, rgba(22, 25, 38, 1) 47%, rgba(6, 7, 12, 1) 80%)',
            boxShadow:
              'inset -16px -20px 56px rgba(0, 0, 0, 0.88), inset 14px 16px 46px rgba(99, 142, 255, 0.25), 0 0 80px rgba(99, 142, 255, 0.45)',
          }}
        />

        {/* Specular White Highlight at Upper-Left */}
        <div
          className="absolute rounded-full filter blur-[2px]"
          style={{
            left: '26%',
            top: '20%',
            width: '26%',
            height: '26%',
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 70%)',
          }}
        />
      </div>
    </div>
  );
};
