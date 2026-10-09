import React from 'react';
import { StarryCosmicCanvas } from '../components/StarryCosmicCanvas';
import { StartAProjectCTA } from '../components/StartAProjectCTA';
import { 
  Target, 
  Compass, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Code2, 
  Layers 
} from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
  onStartProject: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  navigate,
  onStartProject,
}) => {
  const coreValues = [
    {
      title: 'Architectural Rigor',
      description: 'We refuse shortcuts. From database schemas to typography sizing, every choice is engineered with structural discipline.',
      icon: <Code2 className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
    {
      title: 'Design Without Clutter',
      description: 'True elegance is subtractive. We eliminate visual noise, unnecessary friction, and clunky elements to let your core message resonate.',
      icon: <Layers className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
    {
      title: 'Velocity & Reliability',
      description: 'We respect delivery timelines and sprint commitments. Clear communication, daily progress visibility, and zero surprises.',
      icon: <Zap className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
    {
      title: 'Obsession with Longevity',
      description: 'We build digital assets that endure. Clean codebases, extensible component libraries, and future-proof architectures you own forever.',
      icon: <ShieldCheck className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
  ];

  const reasonsToChoose = [
    {
      heading: 'Integrated Full-Stack Capability',
      text: 'No handoff fragmentation between separate design agencies, coding shops, and marketing contractors. Cretify bridges UX, code, video, and AI into one unified rhythm.',
    },
    {
      heading: 'Business Outcome Focused',
      text: 'We do not build for vanity. Every website interaction, checkout funnel, or workflow automation is engineered to deliver measurable operational leverage.',
    },
    {
      heading: 'Global Standards, Transparent Collaboration',
      text: 'Based in India and serving clients across domestic and international markets, we offer worldwide execution standards with accessible, transparent collaboration.',
    },
    {
      heading: 'Complete Code & Asset Ownership',
      text: 'No proprietary entrapment or hidden subscription taxes. All code, design files, and deployment configurations are fully transferred to your company.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white overflow-hidden pt-28 font-sans">
      <StarryCosmicCanvas density={70} interactive={false} className="opacity-25" />

      {/* Hero Section */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
          <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/60">
            About the studio
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold text-white tracking-[-0.02em] leading-[1.05] max-w-3xl mx-auto">
          Building Digital Foundations for Modern Ambition
        </h1>

        <p className="mt-6 text-[16px] sm:text-[18px] text-white/60 max-w-2xl mx-auto leading-relaxed font-normal">
          Cretify is an independent digital agency helping businesses, startups, creators, and growing brands establish, modernize, and scale their digital presence.
        </p>
      </section>

      {/* Who We Are & Mission / Vision Grid */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Who We Are */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[rgb(99,142,255)]">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.015em] leading-snug">
              A Dedicated Team of Digital Craftsmen & Engineers
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              <p>
                In a crowded digital ecosystem where thousands of websites look like interchangeable templates, Cretify exists to build digital experiences with distinct character and technical excellence.
              </p>
              <p>
                We collaborate closely with founders, executive teams, and creative directors to translate complex offerings into clean, high-performing digital touchpoints — from bespoke web applications and direct-to-consumer e-commerce to automated lead triage and cinematic video editing.
              </p>
              <p>
                Headquartered in India with an international clientele, our focus remains unwavering: craft digital platforms that improve brand perception, simplify daily operations, engage customers deeply, and support long-term business growth.
              </p>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-[22px] bg-white/[0.02] border border-white/[0.08] space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[rgb(99,142,255)]/10 border border-[rgb(99,142,255)]/20">
                  <Target className="w-5 h-5 text-[rgb(99,142,255)]" />
                </div>
                <h3 className="text-xl font-semibold text-white">Our Mission</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                To equip growing businesses and ambitious leaders with world-class digital products and automated systems that command industry authority and unlock measurable operational scale.
              </p>
            </div>

            <div className="p-8 rounded-[22px] bg-white/[0.02] border border-white/[0.08] space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[rgb(99,142,255)]/10 border border-[rgb(99,142,255)]/20">
                  <Compass className="w-5 h-5 text-[rgb(99,142,255)]" />
                </div>
                <h3 className="text-xl font-semibold text-white">Our Vision</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                To become the most dependable digital innovation partner for modern organizations, recognized worldwide for design purity, engineering integrity, and tangible client outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[rgb(99,142,255)]">
            Our Guiding Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-white mt-2 tracking-[-0.02em]">
            Core Values That Anchor Every Build
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val) => (
            <div
              key={val.title}
              className="p-7 rounded-[20px] bg-white/[0.02] border border-white/[0.08] space-y-4 shadow-lg hover:border-[rgb(99,142,255)]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{val.title}</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Businesses Choose Cretify */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[rgb(99,142,255)]">
            The Cretify Difference
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-white mt-2 tracking-[-0.02em]">
            Why Businesses Choose to Partner with Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasonsToChoose.map((r, i) => (
            <div
              key={r.heading}
              className="p-8 rounded-[20px] bg-white/[0.02] border border-white/[0.08] space-y-3 relative group hover:border-[rgb(99,142,255)]/40 transition-all"
            >
              <span className="text-xs font-mono font-semibold text-[rgb(99,142,255)] block">
                0{i + 1}
              </span>
              <h3 className="text-xl font-semibold text-white">{r.heading}</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Commitment to Quality */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-white/[0.08] text-center">
        <div className="p-8 sm:p-12 rounded-[24px] bg-white/[0.02] border border-white/[0.08] space-y-4">
          <CheckCircle2 className="w-10 h-10 text-[rgb(99,142,255)] mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Our Commitment to Quality
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-normal">
            We hold ourselves to rigorous quality benchmarks: every site is audited for sub-second Core Web Vitals performance, responsive integrity across 12+ screen viewports, WCAG AA accessibility, and clean semantic structure before a single byte reaches production.
          </p>
        </div>
      </section>

      {/* Final Start a Project CTA */}
      <StartAProjectCTA
        onStartProject={onStartProject}
        title="Ready to Build With Cretify?"
      />
    </div>
  );
};
