import React from 'react';
import { useProjects } from '../utils/dataStore';
import { ProjectCard } from '../components/ProjectCard';
import { StartAProjectCTA } from '../components/StartAProjectCTA';
import { StarryCosmicCanvas } from '../components/StarryCosmicCanvas';

interface WorkPageProps {
  navigate: (path: string) => void;
  onStartProject: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  navigate,
  onStartProject,
}) => {
  const projects = useProjects();

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white overflow-hidden pt-28 font-sans">
      <StarryCosmicCanvas density={75} interactive={false} className="opacity-25" />

      {/* Hero Header */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
          <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/60">
            Selected Work
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold text-white tracking-[-0.02em] leading-[1.05] max-w-3xl mx-auto">
          Crafted for Impact, Engineered for Scale
        </h1>

        <p className="mt-6 text-[16px] sm:text-[18px] text-white/60 max-w-2xl mx-auto leading-relaxed font-normal">
          Explore our client systems and digital platforms. Direct links available to test and inspect live in your browser.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="py-20 text-center text-white/40 text-sm">
            No projects currently displayed.
          </div>
        )}
      </section>

      {/* Start A Project CTA */}
      <StartAProjectCTA onStartProject={onStartProject} />
    </div>
  );
};
