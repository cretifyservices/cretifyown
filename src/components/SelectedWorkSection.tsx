import React, { useEffect, useRef, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { useProjectsData } from '../utils/dataStore';
import { ArrowRight } from 'lucide-react';

interface SelectedWorkSectionProps {
  navigate: (path: string) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ navigate }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { projects, loading } = useProjectsData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const initialTransforms = [
    'translate3d(-80px, 60px, 0) scale(0.95) rotate(-2deg)',
    'translate3d(0px, 80px, 0) scale(0.94) rotate(0deg)',
    'translate3d(80px, 60px, 0) scale(0.95) rotate(2deg)',
    'translate3d(-60px, 70px, 0) scale(0.95) rotate(-1deg)',
    'translate3d(0px, 80px, 0) scale(0.94) rotate(0deg)',
    'translate3d(60px, 70px, 0) scale(0.95) rotate(1deg)',
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-28 px-5 sm:px-8 lg:px-12 bg-[#0A0A0B] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
              <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/60">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-[-0.02em]">
              Featured live builds & digital systems
            </h2>
          </div>
          <p className="text-[15px] text-white/50 max-w-sm md:text-right font-normal">
            Directly browse live client web systems and production deployments.
          </p>
        </div>

        {/* Selected Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {loading && projects.length === 0 ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#121215] overflow-hidden p-6 animate-pulse"
              >
                <div className="w-full aspect-[16/10] bg-white/[0.04] rounded-xl mb-6" />
                <div className="h-4 w-24 bg-white/[0.08] rounded mb-3" />
                <div className="h-7 w-3/4 bg-white/[0.08] rounded mb-3" />
              </div>
            ))
          ) : (
            projects.slice(0, 6).map((project, index) => (
              <div
                key={project.id}
                className="transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
                style={{
                  transform: isVisible
                    ? 'translate3d(0, 0, 0) scale(1) rotate(0deg)'
                    : initialTransforms[index % initialTransforms.length],
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))
          )}
        </div>

        {/* Show More Button Directing to Works Page */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              navigate('/work');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[rgb(99,142,255)] text-white text-[13px] font-medium tracking-[0.1em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:shadow-[0_0_30px_rgba(99,142,255,0.3)] cursor-pointer group"
          >
            <span>Show More Works</span>
            <ArrowRight className="w-4 h-4 text-[rgb(99,142,255)] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
