import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { StarryCosmicCanvas } from '../components/StarryCosmicCanvas';
import { ContactFormData, ServiceId } from '../types';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Phone,
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck 
} from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
  initialService?: ServiceId | '';
}

export const ContactPage: React.FC<ContactPageProps> = ({
  navigate,
  initialService = '',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: initialService,
    budget: '$3,000 – $10,000 (₹2.5L – ₹8L)',
    timeline: '1 – 2 Months',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contactFaqs = [
    {
      q: 'What happens immediately after I submit this enquiry?',
      a: 'Your requirements are delivered directly to Cretify’s solutions team. We review your goals and reply within two business days with an exploratory assessment and scheduling link.',
    },
    {
      q: 'Do you require upfront payment or milestone-based contracts?',
      a: 'We work on transparent, milestone-based contracts (typically initial deposit, milestone demonstration, and final production sign-off and repository handover).',
    },
    {
      q: 'Can Cretify sign a Non-Disclosure Agreement (NDA) before we discuss details?',
      a: 'Yes. We frequently sign mutual NDAs for proprietary ideas, intellectual property, and enterprise confidential systems before beginning detailed technical discovery.',
    },
    {
      q: 'Do you work with international clients outside of India?',
      a: 'Yes. We regularly collaborate with startups, agencies, and enterprises in the US, UK, Middle East, Europe, and Southeast Asia, coordinating across time zones seamlessly.',
    },
  ];

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.service) errs.service = 'Please select a discipline';
    if (!formData.description.trim() || formData.description.trim().length < 15) {
      errs.description = 'Please share at least 15 characters describing your project scope';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 700);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white overflow-hidden pt-28 font-sans">
      <StarryCosmicCanvas density={75} interactive={false} className="opacity-25" />

      {/* Hero Welcome Header */}
      <section className="relative py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
          <span className="text-[13px] font-medium tracking-[0.26em] uppercase text-white/60">
            Enquiries
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold text-white tracking-[-0.02em] leading-[1.05] max-w-3xl mx-auto">
          Tell us what you’re building — we’ll help make it inevitable.
        </h1>

        <p className="mt-6 text-[16px] sm:text-[18px] text-white/60 max-w-2xl mx-auto leading-relaxed font-normal">
          New projects, collaborations, or technical systems — we read every message and reply within two business days.
        </p>
      </section>

      {/* Main Grid: Form on Left + Information on Right */}
      <section className="py-12 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.08] rounded-[24px] p-6 sm:p-10 shadow-2xl">
            {submissionSuccess ? (
              <div className="py-16 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[rgb(99,142,255)]/15 border border-[rgb(99,142,255)]/30 flex items-center justify-center mx-auto text-[rgb(99,142,255)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-semibold text-white">
                  Enquiry Successfully Received
                </h2>
                <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed font-normal">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your project enquiry has been logged. Our solutions team will review your specifications and reply to <span className="text-[rgb(99,142,255)]">{formData.email}</span> within two business days.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmissionSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        service: '',
                        budget: '$3,000 – $10,000 (₹2.5L – ₹8L)',
                        timeline: '1 – 2 Months',
                        description: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Project Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Project Enquiry
                  </h2>
                  <p className="text-xs text-white/50 mt-1">
                    Fill out the fields below. All fields with an asterisk (*) are required.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Company & Required Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">
                      Company or Brand
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Organization name"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">
                      Required Discipline *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceId })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-white text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                    >
                      <option value="" disabled>Select from all 8 disciplines</option>
                      {SERVICES_DATA.map((s, idx) => (
                        <option key={s.id} value={s.id}>
                          0{idx + 1} · {s.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="text-[11px] text-red-400 mt-1">{errors.service}</p>}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-white text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                    >
                      <option value="Under $2,000 (Under ₹1.5L)">Under $2,000 (Under ₹1.5L)</option>
                      <option value="$2,000 – $5,000 (₹1.5L – ₹4L)">$2,000 – $5,000 (₹1.5L – ₹4L)</option>
                      <option value="$5,000 – $15,000 (₹4L – ₹12L)">$5,000 – $15,000 (₹4L – ₹12L)</option>
                      <option value="$15,000+ (₹12L+)">$15,000+ (₹12L+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">
                      Preferred Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-white text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                    >
                      <option value="Urgent (< 3 weeks)">Urgent (&lt; 3 weeks)</option>
                      <option value="1 – 2 Months">1 – 2 Months</option>
                      <option value="3+ Months">3+ Months</option>
                      <option value="Flexible Schedule">Flexible Schedule</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">
                    Project Brief *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us about the project, timelines, and scope..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors resize-none"
                  />
                  {errors.description && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full border border-white/20 bg-white hover:bg-[rgb(99,142,255)] text-black hover:text-white text-xs font-medium uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                  >
                    {isSubmitting ? (
                      <span>Sending Project Enquiry...</span>
                    ) : (
                      <>
                        <span>Send Project Enquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & What Happens Next */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Contact Card with User Phone Numbers */}
            <div className="p-8 rounded-[24px] bg-white/[0.02] border border-white/[0.08] space-y-6">
              <h3 className="text-xl font-semibold text-white">
                Contact & Availability
              </h3>
              
              <div className="space-y-5 text-xs text-white/70">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-[rgb(99,142,255)] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-white/40 text-[11px] uppercase tracking-wider font-mono">
                      Email
                    </span>
                    <a
                      href="mailto:cretifyservices@gmail.com"
                      className="text-white hover:text-[rgb(99,142,255)] transition-colors font-medium underline"
                    >
                      cretifyservices@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-[rgb(99,142,255)] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-white/40 text-[11px] uppercase tracking-wider font-mono">
                      Direct Phone
                    </span>
                    <div className="space-y-1">
                      <a
                        href="tel:+917061899513"
                        className="text-white hover:text-[rgb(99,142,255)] transition-colors font-mono block"
                      >
                        +91 7061899513
                      </a>
                      <a
                        href="tel:+917485094642"
                        className="text-white hover:text-[rgb(99,142,255)] transition-colors font-mono block"
                      >
                        +91 7485094642
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-[rgb(99,142,255)] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-white/40 text-[11px] uppercase tracking-wider font-mono">
                      Response time
                    </span>
                    <span className="text-white font-medium">Within two business days</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-white/[0.04] text-[rgb(99,142,255)] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-white/40 text-[11px] uppercase tracking-wider font-mono">
                      Location
                    </span>
                    <span className="text-white font-medium">India & Worldwide · Remote</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What Happens After Submitting an Enquiry */}
            <div className="p-8 rounded-[24px] bg-white/[0.02] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[rgb(99,142,255)]" />
                <span>What happens next</span>
              </h3>
              
              <div className="space-y-3 text-xs text-white/60 font-normal">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono text-[10px] text-[rgb(99,142,255)] shrink-0">
                    1
                  </span>
                  <p>
                    <strong className="text-white">Requirements Review:</strong> We read every message and analyze project viability.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono text-[10px] text-[rgb(99,142,255)] shrink-0">
                    2
                  </span>
                  <p>
                    <strong className="text-white">Discovery Call:</strong> A focused 30-minute session to define milestones and scope.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono text-[10px] text-[rgb(99,142,255)] shrink-0">
                    3
                  </span>
                  <p>
                    <strong className="text-white">Proposal & Kickoff:</strong> Transparent milestone contract with sprint deliverables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-4xl mx-auto border-t border-white/[0.08]">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[rgb(99,142,255)]">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
            Questions About Starting a Project
          </h2>
        </div>

        <div className="space-y-3">
          {contactFaqs.map((faq, i) => {
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
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/40 transition-transform ${
                      isOpen ? 'rotate-180 text-[rgb(99,142,255)]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/[0.06] pt-3 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
