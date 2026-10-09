import React from 'react';
import { useServices } from '../utils/dataStore';
import { StarryCosmicCanvas } from '../components/StarryCosmicCanvas';
import { StartAProjectCTA } from '../components/StartAProjectCTA';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServicesPageProps {
  navigate: (path: string) => void;
  onStartProject: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  navigate,
  onStartProject,
}) => {
  const services = useServices();

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white overflow-hidden pt-28 font-sans">
      <StarryCosmicCanvas density={75} interactive={false} className="opacity-25" />

      {/* Hero Header */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
          <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/60">
            Disciplines we obsess over
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold text-white tracking-[-0.02em] leading-[1.05] max-w-4xl mx-auto">
          Modern Digital Solutions Built for Business Impact
        </h1>

        <p className="mt-6 text-[16px] sm:text-[18px] text-white/60 max-w-2xl mx-auto leading-relaxed font-normal">
          From high-performance web platforms and automated AI workflows to conversion-focused design systems and viral post-production — explore Cretify’s full-spectrum capabilities.
        </p>
      </section>

      {/* Services List / Cards */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08] space-y-10">
        {services.map((srv, index) => (
          <div
            key={srv.slug}
            id={srv.slug}
            className="rounded-[24px] bg-white/[0.02] border border-white/[0.08] hover:border-[rgb(99,142,255)]/40 transition-all duration-300 p-8 sm:p-12 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Title & Overview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-medium text-[rgb(99,142,255)]">
                    Discipline 0{index + 1}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-semibold text-white group-hover:text-white transition-colors leading-snug">
                  {srv.title}
                </h2>

                <p className="text-xs font-medium text-white/50 tracking-wide uppercase">
                  {srv.tagline}
                </p>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal pt-2">
                  {srv.overview}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      navigate(`/services/${srv.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[rgb(99,142,255)] text-white text-xs font-medium tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer"
                  >
                    <span>View Dedicated Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[rgb(99,142,255)]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Capabilities & Business Benefits */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 pl-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0">
                {/* Key Capabilities */}
                <div className="space-y-3">
                  <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[rgb(99,142,255)]" />
                    <span>Capabilities</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                    {srv.capabilities.slice(0, 6).map((cap, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[rgb(99,142,255)] shrink-0">·</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business Benefits */}
                <div className="space-y-3">
                  <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                    Business Benefits
                  </h3>
                  <div className="space-y-3">
                    {srv.businessBenefits.slice(0, 2).map((benefit, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <h4 className="text-xs sm:text-sm font-semibold text-white">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-white/60 mt-1 leading-relaxed font-normal">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Start A Project CTA */}
      <StartAProjectCTA onStartProject={onStartProject} />
    </div>
  );
};
