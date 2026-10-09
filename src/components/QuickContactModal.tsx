import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ContactFormData, ServiceId } from '../types';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceId | '';
}

export const QuickContactModal: React.FC<QuickContactModalProps> = ({
  isOpen,
  onClose,
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.service) errs.service = 'Please select a discipline';
    if (!formData.description.trim()) errs.description = 'Please describe your project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-contact-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#0A0A0B] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[rgb(99,142,255)]/15 border border-[rgb(99,142,255)]/30 flex items-center justify-center mx-auto text-[rgb(99,142,255)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-white">
              Enquiry Received
            </h3>
            <p className="text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our team will review your project brief and reply to <span className="text-[rgb(99,142,255)]">{formData.email}</span> within two business days.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
                <span className="text-[12px] font-medium text-white/50 uppercase tracking-[0.2em]">
                  Start a Project
                </span>
              </div>
              <h3 id="quick-contact-title" className="text-2xl sm:text-3xl font-semibold text-white">
                Tell us what you’re building
              </h3>
              <p className="text-xs text-white/50 mt-1">
                We review every message and reply within two business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                  />
                  {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                  />
                  {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1">
                    Discipline *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceId })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0B] border border-white/15 text-white text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors"
                  >
                    <option value="" disabled>Select discipline</option>
                    {SERVICES_DATA.map((s, idx) => (
                      <option key={s.id} value={s.id}>
                        0{idx + 1} · {s.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-[10px] text-red-400 mt-1">{errors.service}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1">
                  Project Brief *
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us what you're building..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[rgb(99,142,255)] transition-colors resize-none"
                />
                {errors.description && (
                  <p className="text-[10px] text-red-400 mt-1">{errors.description}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full border border-white/20 bg-white hover:bg-[rgb(99,142,255)] text-black hover:text-white text-xs font-medium uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Project Enquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
