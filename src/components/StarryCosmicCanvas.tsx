import React, { useEffect, useRef } from 'react';

interface StarryCosmicCanvasProps {
  className?: string;
  density?: number;
  interactive?: boolean;
}

export const StarryCosmicCanvas: React.FC<StarryCosmicCanvasProps> = ({
  className = '',
  density = 100,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    interface DotParticle {
      x: number;
      y: number;
      radius: number; // Small size (1.0px to 2.8px) as requested
      shadowBlur: number; // Rich luminous shadow (6px to 16px) as requested
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
      pulseSpeed: number;
      pulseVal: number;
      isBlue: boolean;
    }

    let particles: DotParticle[] = [];

    const initParticles = () => {
      particles = [];
      const area = width * height;
      // Generates an even constellation of glowing dots
      const count = Math.min(Math.max(Math.floor(area / 8500) * (density / 100), 90), 160);

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        const isBlue = rand < 0.38; // 38% sapphire blue, 62% pure white

        // Small sizes strictly matching reference (less size, more shadow)
        let radius = 1.2;
        let shadowBlur = 8;
        let baseOpacity = 0.85;

        if (rand < 0.25) {
          // Subtle pinpoint dots
          radius = Math.random() * 0.6 + 1.0; // 1.0px to 1.6px
          shadowBlur = Math.random() * 4 + 6;  // 6px to 10px glow shadow
          baseOpacity = Math.random() * 0.15 + 0.75;
        } else if (rand < 0.75) {
          // Standard glowing celestial dots
          radius = Math.random() * 0.8 + 1.6; // 1.6px to 2.4px
          shadowBlur = Math.random() * 6 + 9;  // 9px to 15px glow shadow
          baseOpacity = Math.random() * 0.15 + 0.85;
        } else {
          // Bright accent dots with deep luminous shadow
          radius = Math.random() * 0.6 + 2.2; // 2.2px to 2.8px (max small size)
          shadowBlur = Math.random() * 6 + 12; // 12px to 18px rich glow shadow
          baseOpacity = Math.random() * 0.1 + 0.9;
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          shadowBlur,
          isBlue,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: baseOpacity,
          baseOpacity,
          pulseSpeed: Math.random() * 0.025 + 0.012,
          pulseVal: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // Subtle interactive mouse deflection
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic pulse
        p.pulseVal += p.pulseSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.pulseVal) * 0.15;
        if (p.opacity < 0.5) p.opacity = 0.5;
        if (p.opacity > 1) p.opacity = 1;

        // Position drift
        p.x += p.speedX;
        p.y += p.speedY;

        // Interactive mouse ease
        if (interactive && mouseX > -100) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const force = (110 - dist) / 110;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw dot with rich glow shadow ("dots have more shadow and less size")
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isBlue) {
          // Electric sapphire blue dot with high-spread shadow
          ctx.shadowColor = `rgba(99, 142, 255, ${p.opacity * 0.95})`;
          ctx.shadowBlur = p.shadowBlur;
          ctx.fillStyle = `rgba(130, 175, 255, ${p.opacity})`;
        } else {
          // Crisp pure white dot with luminous shadow
          ctx.shadowColor = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
          ctx.shadowBlur = p.shadowBlur;
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        }

        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full z-0 ${className}`}
      style={{ display: 'block' }}
    />
  );
};
