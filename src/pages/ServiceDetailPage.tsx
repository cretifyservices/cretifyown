import React, { useState } from 'react';
import { useService, useServices, useProjects } from '../utils/dataStore';
import { ProjectCard } from '../components/ProjectCard';
import { StartAProjectCTA } from '../components/StartAProjectCTA';
import { StarryCosmicCanvas } from '../components/StarryCosmicCanvas';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronDown, 
  ShieldAlert, 
  Layers, 
  Workflow 
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
  onStartProject: (serviceId?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  navigate,
  onStartProject,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const allServices = useServices();
  const service = useService(slug) || allServices[0];
  const allProjects = useProjects();

  const relevantProjects = allProjects.filter((p) => {
    if (slug === 'website-development') return p.category === 'Websites' || p.category === 'Branding';
    if (slug === 'web-app-development') return p.category === 'Web Applications';
    if (slug === 'ecommerce-development') return p.category === 'E-commerce';
    if (slug === 'ui-ux-design') return p.category === 'UI/UX' || p.category === 'Web Applications';
    if (slug === 'video-editing') return p.category === 'Video Editing';
    if (slug === 'branding') return p.category === 'Branding';
    if (slug === 'ai-automation') return p.category === 'AI Automation' || p.category === 'Web Applications';
    return true;
  }).slice(0, 2);

  const relatedServices = allServices.filter((s) =>
    service.relatedServiceIds?.includes(s.id)
  );

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white overflow-hidden pt-28 font-sans">
      <StarryCosmicCanvas density={60} interactive={false} className="opacity-20" />

      {/* Back button */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6">
        <button
          onClick={() => {
            navigate('/services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Capabilities</span>
        </button>
      </div>

      {/* 1. Hero Section */}
      <section className="relative py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
          <span className="text-xs font-mono font-medium tracking-[0.25em] uppercase text-[rgb(99,142,255)]">
            {service.shortTag}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-semibold text-white tracking-[-0.02em] leading-[1.08] max-w-4xl mx-auto">
          {service.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
          {service.tagline}
        </p>

        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed font-normal">
          {service.heroDescription}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onStartProject(service.id)}
            className="px-8 py-3.5 rounded-full bg-[rgb(99,142,255)] hover:bg-[rgb(80,125,245)] text-white text-xs font-semibold uppercase tracking-[0.1em] transition-all shadow-[0_0_25px_rgba(99,142,255,0.4)] cursor-pointer"
          >
            Request This Service
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('capabilities-list');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-white text-xs font-medium uppercase tracking-[0.1em] transition-all cursor-pointer bg-white/[0.02]"
          >
            Explore Capabilities
          </button>
        </div>
      </section>

      {/* 2. Overview / Strategy */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-4xl mx-auto border-t border-white/[0.08]">
        <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-white/40">
          Executive Overview
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-2 mb-6">
          Architecting Dependable Digital Growth
        </h2>
        <p className="text-base sm:text-lg text-white/70 leading-[1.8] font-normal">
          {service.overview}
        </p>
      </section>

      {/* 3. Problems We Solve */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-white/[0.08]">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-amber-400">
            Pain Points We Eliminate
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-1 mb-8">
          Critical Problems Resolved
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.problemsSolved.map((problem, i) => (
            <div
              key={i}
              className="p-5 rounded-[18px] bg-red-500/[0.03] border border-red-500/10 hover:border-red-500/20 transition-all flex items-start gap-3"
            >
              <span className="text-xs font-mono text-red-400 shrink-0 mt-0.5 font-bold">
                ✕
              </span>
              <p className="text-sm text-white/80 leading-relaxed font-normal">{problem}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Complete List of Capabilities */}
      <section id="capabilities-list" className="py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-white/[0.08]">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-4 h-4 text-[rgb(99,142,255)]" />
          <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[rgb(99,142,255)]">
            Technical Matrix
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-1 mb-8">
          Detailed {service.shortTag} Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-4 rounded-[16px] bg-white/[0.02] border border-white/[0.07] hover:border-[rgb(99,142,255)]/30 transition-all flex items-start gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-[rgb(99,142,255)] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-white/80 font-normal leading-snug">{cap}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. What You Get (Deliverables) & Business Benefits */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Deliverables */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Workflow className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-emerald-400">
                Turnkey Output
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1 mb-6">
              Exact Deliverables
            </h2>
            <div className="space-y-3">
              {service.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-[16px] bg-emerald-500/[0.03] border border-emerald-500/10 flex items-start gap-3"
                >
                  <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Business Benefits */}
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[rgb(99,142,255)]">
              ROI & Value
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1 mb-6">
              Business Benefits
            </h2>
            <div className="space-y-4">
              {service.businessBenefits.map((b, i) => (
                <div
                  key={i}
                  className="p-5 rounded-[18px] bg-white/[0.02] border border-white/[0.08]"
                >
                  <h3 className="text-sm font-semibold text-white">{b.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed font-normal">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Relevant Examples / Case Studies */}
      {relevantProjects.length > 0 && (
        <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[rgb(99,142,255)]">
                Selected Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
                Featured {service.shortTag} Transmissions
              </h2>
            </div>
            <button
              onClick={() => navigate('/work')}
              className="text-xs text-[rgb(99,142,255)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Work</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relevantProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {/* 7. Process for Delivering That Service */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-white/[0.08]">
        <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[rgb(99,142,255)]">
          Step-by-Step Delivery
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-2 mb-8">
          Our Process for {service.title}
        </h2>

        <div className="space-y-4">
          {service.processSteps.map((step) => (
            <div
              key={step.step}
              className="p-5 rounded-[18px] bg-white/[0.02] border border-white/[0.08] flex items-start gap-4"
            >
              <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-md shrink-0 border border-white/10">
                {step.step}
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white">{step.title}</h3>
                <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-4xl mx-auto border-t border-white/[0.08]">
        <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[rgb(99,142,255)]">
          FAQ
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-2 mb-8">
          Questions About {service.title}
        </h2>

        <div className="space-y-3">
          {service.faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-[18px] bg-white/[0.02] border border-white/[0.08] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/40 transition-transform ${
                      isOpen ? 'rotate-180 text-[rgb(99,142,255)]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/[0.06] pt-3 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Related Services */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-white/[0.08]">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
          Complementary Solutions
        </span>
        <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1 mb-6">
          Related Services Often Paired Together
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedServices.map((rel) => (
            <button
              key={rel.slug}
              onClick={() => {
                navigate(`/services/${rel.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 rounded-[18px] bg-white/[0.02] border border-white/[0.08] hover:border-[rgb(99,142,255)]/50 text-left transition-colors cursor-pointer group"
            >
              <h3 className="text-sm font-semibold text-white group-hover:text-white flex items-center justify-between">
                <span>{rel.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[rgb(99,142,255)]" />
              </h3>
              <p className="text-xs text-white/50 mt-1 line-clamp-2 font-normal">
                {rel.tagline}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 10. Strong CTA */}
      <StartAProjectCTA
        onStartProject={() => onStartProject(service.id)}
        title={`Ready to Build Your ${service.shortTag}?`}
      />
    </div>
  );
};
