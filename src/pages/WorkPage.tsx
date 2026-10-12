import React from 'react';
import { useProjectsData } from '../utils/dataStore';
import { ProjectCard } from '../components/ProjectCard';
import { StartAProjectCTA } from '../components/StartAProjectCTA';
import { StarryCosmicCanvas } from '../components/StarryCosmicCanvas';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface WorkPageProps {
  navigate: (path: string) => void;
  onStartProject: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  navigate,
  onStartProject,
}) => {
  const { projects, loading, error, refetch } = useProjectsData();

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

      {/* Projects Grid with Loading, Error, Empty, and Success states */}
      <section className="pb-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {loading && projects.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#121215] overflow-hidden p-6 animate-pulse"
              >
                <div className="w-full aspect-[16/10] bg-white/[0.04] rounded-xl mb-6" />
                <div className="h-4 w-24 bg-white/[0.08] rounded mb-3" />
                <div className="h-7 w-3/4 bg-white/[0.08] rounded mb-3" />
                <div className="h-4 w-full bg-white/[0.04] rounded mb-6" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-white/[0.06] rounded-full" />
                  <div className="h-6 w-20 bg-white/[0.06] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error && projects.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="inline-flex p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Unable to load projects</h3>
            <p className="text-sm text-white/50 mb-6">
              Could not retrieve published projects from the server. Please check your connection or try again.
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center mx-auto mb-4 text-white/40">
              <span className="w-2 h-2 rounded-full bg-white/40" />
            </div>
            <h3 className="text-lg font-medium text-white/80 mb-2">No published projects yet</h3>
            <p className="text-sm text-white/40 max-w-sm mx-auto">
              New project case studies will appear here once published from the studio portal.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* Start A Project CTA */}
      <StartAProjectCTA onStartProject={onStartProject} />
    </div>
  );
};
