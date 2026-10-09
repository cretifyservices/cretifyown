import React from 'react';
import { StartAProjectCTA } from '../components/StartAProjectCTA';
import { StarryCosmicCanvas } from '../components/StarryCosmicCanvas';
import { 
  Search, 
  FileText, 
  Palette, 
  Code2, 
  CheckCircle, 
  Rocket, 
  HeartHandshake 
} from 'lucide-react';

interface ProcessPageProps {
  navigate: (path: string) => void;
  onStartProject: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({
  navigate,
  onStartProject,
}) => {
  const stages = [
    {
      num: '01',
      name: 'Discovery',
      subtitle: 'Understand the Business, Audience, Goals & Requirements',
      description:
        'We begin by diving into your commercial landscape, target personas, customer pain points, and current technical architecture. We unpack what makes your brand distinct and isolate explicit KPIs.',
      deliverables: ['Discovery Brief', 'Stakeholder Insights Map', 'Technical Requirements Document'],
      icon: <Search className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
    {
      num: '02',
      name: 'Strategy',
      subtitle: 'Define the Scope, Approach, Deliverables & Priorities',
      description:
        'We construct the project blueprint: information architecture, data schema models, technical stack choices, sprint milestones, and risk mitigation strategies.',
      deliverables: ['System Architecture Diagram', 'Project Milestone Roadmap', 'Scope & Delivery Matrix'],
      icon: <FileText className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
    {
      num: '03',
      name: 'Design',
      subtitle: 'Develop the Visual Direction & User Experience',
      description:
        'From wireframes to interactive Figma prototypes and design token systems. We iterate until every flow feels effortless, high-contrast, and brand-authentic.',
      deliverables: ['Clickable Prototype', 'Component Design System', 'Responsive Screen Specs'],
      icon: <Palette className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
    {
      num: '04',
      name: 'Development',
      subtitle: 'Build & Integrate the Agreed Solution',
      description:
        'Our engineers translate design files into modular, performant, type-safe codebases. Frontend components, secure backend APIs, database indexing, and third-party integrations.',
      deliverables: ['Modular Codebase', 'API & Database Integration', 'Staging Environment Demos'],
      icon: <Code2 className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
    {
      num: '05',
      name: 'Testing',
      subtitle: 'Check Functionality, Responsiveness, Usability & Quality',
      description:
        'We execute rigorous cross-device testing, stress test payment flows and form validations, verify accessibility (WCAG AA), and optimize Core Web Vitals to guarantee sub-second speeds.',
      deliverables: ['Cross-Browser QA Audit', 'Core Web Vitals Benchmark Report', 'Security Verification'],
      icon: <CheckCircle className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
    {
      num: '06',
      name: 'Launch and Delivery',
      subtitle: 'Prepare the Approved Project for Launch or Handover',
      description:
        'We coordinate DNS and domain cutover, SSL configuration, CDN caching rules, and production deployment. We conduct recorded handover sessions so your team has complete ownership.',
      deliverables: ['Live Production Deployment', 'Admin Access & Source Repositories', 'Operational Runbook'],
      icon: <Rocket className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
    {
      num: '07',
      name: 'Ongoing Support',
      subtitle: 'Provide Additional Improvements & Maintenance When Agreed',
      description:
        'All projects include 30-day post-launch warranty support. Beyond launch, we offer flexible monthly maintenance retainers to ship continuous feature upgrades and system iterations.',
      deliverables: ['Post-Launch 30-Day Warranty', 'System Health Monitoring', 'Iterative Feature Sprints'],
      icon: <HeartHandshake className="w-5 h-5 text-[rgb(99,142,255)]" />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white overflow-hidden pt-28 font-sans">
      <StarryCosmicCanvas density={75} interactive={false} className="opacity-25" />

      {/* Hero Section */}
      <section className="relative py-20 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
          <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/60">
            How We Work
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold text-white tracking-[-0.02em] leading-[1.05] max-w-3xl mx-auto">
          From First Call to Launch
        </h1>

        <p className="mt-6 text-[16px] sm:text-[18px] text-white/60 max-w-2xl mx-auto leading-relaxed font-normal">
          We operate through a 7-stage delivery methodology designed to eliminate ambiguity, safeguard project timelines, and deliver digital products of enduring caliber.
        </p>
      </section>

      {/* Process Stages Timeline */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-white/[0.08]">
        <div className="space-y-8 relative">
          
          {/* Vertical Connecting Line */}
          <div className="hidden md:block absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-[rgb(99,142,255)] via-white/10 to-transparent" />

          {stages.map((stage) => (
            <div
              key={stage.num}
              className="relative rounded-[22px] bg-white/[0.02] border border-white/[0.08] p-6 sm:p-10 hover:border-[rgb(99,142,255)]/50 transition-all duration-300 md:pl-24 group shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Stage Number Badge */}
              <div className="md:absolute md:left-4 md:top-8 w-11 h-11 rounded-2xl bg-black border border-white/15 flex items-center justify-center font-mono font-semibold text-sm text-[rgb(99,142,255)] shadow-md mb-4 md:mb-0 group-hover:border-[rgb(99,142,255)] transition-colors">
                {stage.num}
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-white transition-colors">
                    Stage {stage.num}: {stage.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                    {stage.icon}
                  </div>
                </div>

                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[rgb(99,142,255)]">
                  {stage.subtitle}
                </p>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal pt-1">
                  {stage.description}
                </p>

                {/* Stage Deliverables */}
                <div className="pt-4 mt-4 border-t border-white/[0.06]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 block mb-2">
                    Key Outputs & Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stage.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/75"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Start A Project CTA */}
      <StartAProjectCTA onStartProject={onStartProject} />
    </div>
  );
};
