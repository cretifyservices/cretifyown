import React from 'react';

interface CretifyLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CretifyLogo: React.FC<CretifyLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
}) => {
  const iconDimensions = {
    sm: 'h-5 w-7',
    md: 'h-6 w-9',
    lg: 'h-8 w-11',
    xl: 'h-10 w-14',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Emblem matching Cretify Monogram in uploaded photo */}
      <svg
        viewBox="0 0 130 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconDimensions} shrink-0 transition-transform duration-300 group-hover:scale-105`}
        aria-label="Cretify Monogram"
      >
        {/* Outer White Angular Faceted Chevron 'C' */}
        <path
          d="M 44 14 
             L 12 48 
             L 44 82 
             L 78 82 
             L 52 56 
             L 108 56 
             L 108 40 
             L 42 40 
             L 76 14 
             Z"
          fill="#FFFFFF"
        />

        {/* Luminous Sapphire / Electric Blue Trapezoid Slice Accent inside Notch */}
        <polygon
          points="52,56 76,40 102,40 78,56"
          fill="rgb(99, 142, 255)"
        />

        {/* Sharp corner facet */}
        <polygon
          points="76,14 44,14 42,40"
          fill="#FFFFFF"
        />
      </svg>

      {/* Custom Geometric Wordmark with Stencil Cuts matching Cretify Logo */}
      {!iconOnly && (
        <svg
          viewBox="0 0 280 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            size === 'sm' ? 'h-4 w-28' : size === 'md' ? 'h-5 w-36' : size === 'lg' ? 'h-7 w-48' : 'h-8 w-60'
          } shrink-0`}
          aria-label="CRETIFY"
        >
          {/* C: Boxy with 45-deg chamfered outer corners */}
          <path
            d="M 28 8 L 10 8 L 2 16 L 2 24 L 10 32 L 28 32 L 28 26 L 12 26 L 8 22 L 8 18 L 12 14 L 28 14 Z"
            fill="#FFFFFF"
          />

          {/* R: Geometric with distinct stencil cut before diagonal leg */}
          <path
            d="M 40 8 L 62 8 L 68 14 L 68 20 L 62 26 L 50 26 L 50 32 L 44 32 L 44 8 Z M 50 14 L 50 20 L 60 20 L 62 18 L 62 16 L 60 14 Z"
            fill="#FFFFFF"
          />
          {/* R angled diagonal leg with stencil gap */}
          <path
            d="M 54 24 L 68 32 L 61 32 L 49 25 Z"
            fill="#FFFFFF"
          />

          {/* E: Chamfered top-left, 3 horizontal bars */}
          <path
            d="M 80 8 L 104 8 L 104 14 L 88 14 L 88 17 L 100 17 L 100 23 L 88 23 L 88 26 L 104 26 L 104 32 L 80 32 Z"
            fill="#FFFFFF"
          />

          {/* T: Wide crossbar with 45-deg angled ends */}
          <path
            d="M 114 8 L 140 8 L 138 14 L 130 14 L 130 32 L 124 32 L 124 14 L 116 14 Z"
            fill="#FFFFFF"
          />

          {/* I: Clean vertical pillar */}
          <path
            d="M 152 8 L 158 8 L 158 32 L 152 32 Z"
            fill="#FFFFFF"
          />

          {/* F: Matching E with 2 horizontal bars and stencil cut */}
          <path
            d="M 170 8 L 194 8 L 194 14 L 178 14 L 178 18 L 190 18 L 190 24 L 178 24 L 178 32 L 170 32 Z"
            fill="#FFFFFF"
          />

          {/* Y: Diagonal arms meeting central stem with sharp cuts */}
          <path
            d="M 206 8 L 214 8 L 222 20 L 230 8 L 238 8 L 226 23 L 226 32 L 219 32 L 219 23 Z"
            fill="#FFFFFF"
          />
        </svg>
      )}
    </div>
  );
};
