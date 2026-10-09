import React from 'react';
import { ProjectItem } from '../types';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Extract 2-3 keywords
  const displayKeywords = (project.keywords && project.keywords.length > 0)
    ? project.keywords.slice(0, 3)
    : ['Digital', 'Architecture', 'Strategy'];

  return (
    <div className="group relative flex flex-col bg-[#111114]/80 rounded-[22px] border border-white/[0.08] hover:border-[rgb(99,142,255)]/50 transition-all duration-400 hover:shadow-[0_0_35px_rgba(99,142,255,0.18)] p-4 sm:p-5">
      {/* Dedicated Box Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-[#0A0A0B] border border-white/[0.06]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        
        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-transparent to-transparent opacity-50" />

        {/* Top-Left Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0B]/80 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-[0.14em] uppercase text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_6px_rgb(99,142,255)]" />
          <span>{project.category}</span>
        </div>

        {/* Top-Right Year */}
        {project.year && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[11px] font-mono tracking-wider text-white/70">
            {project.year}
          </div>
        )}
      </div>

      {/* Details Box: Simple Heading, Subheading, 2-3 Keywords */}
      <div className="mt-4 flex flex-col flex-1">
        {/* Simple Heading */}
        <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-[rgb(99,142,255)] transition-colors tracking-[-0.01em] leading-snug">
          {project.title}
        </h3>

        {/* Subheading */}
        <p className="mt-1.5 text-[14px] text-white/60 line-clamp-2 leading-relaxed font-normal">
          {project.tagline}
        </p>

        {/* 2-3 Keywords */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {displayKeywords.map((kw, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[12px] font-medium text-white/70 tracking-wide"
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="mt-auto pt-5">
          {/* Direct Button to open that work website in Chrome */}
          <a
            href={project.liveUrl || 'https://google.com'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-[rgb(99,142,255)] text-white hover:text-white border border-white/15 hover:border-[rgb(99,142,255)] text-[13px] font-medium tracking-[0.06em] uppercase transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(99,142,255,0.4)] cursor-pointer group/btn"
          >
            <span>Open in Chrome</span>
            <ExternalLink className="w-3.5 h-3.5 text-[rgb(99,142,255)] group-hover/btn:text-white transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
