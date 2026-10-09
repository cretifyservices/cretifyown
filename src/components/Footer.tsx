import React from 'react';
import { CretifyLogo } from './CretifyLogo';
import { SERVICES_DATA } from '../data/servicesData';
import { ArrowUpRight, Phone, Mail } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0A0B] border-t border-white/[0.08] text-white/50 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-14">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Brand Left Column */}
          <div className="lg:col-span-5 space-y-5">
            <button
              onClick={() => handleNav('/')}
              className="text-left focus:outline-none cursor-pointer group"
              aria-label="Cretify Home"
            >
              <CretifyLogo size="lg" />
            </button>
            <p className="text-[15px] text-white/50 max-w-md leading-relaxed font-normal">
              An independent digital agency crafting modern web applications, digital presence, and automated systems for companies reaching further than before.
            </p>
            
            {/* Direct Contact Details */}
            <div className="pt-2 space-y-2 text-[13px]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[rgb(99,142,255)]" />
                <a
                  href="mailto:cretifyservices@gmail.com"
                  className="text-white/70 hover:text-white transition-colors underline"
                >
                  cretifyservices@gmail.com
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/70">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[rgb(99,142,255)]" />
                  <a
                    href="tel:+917061899513"
                    className="hover:text-white transition-colors font-mono"
                  >
                    +91 7061899513
                  </a>
                </div>
                <span className="text-white/30">·</span>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+917485094642"
                    className="hover:text-white transition-colors font-mono"
                  >
                    +91 7485094642
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Navigation
            </h4>
            <ul className="space-y-3 text-[13px]">
              <li>
                <button
                  onClick={() => handleNav('/')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/work')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/process')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Disciplines Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Disciplines
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px]">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.slug}>
                  <button
                    onClick={() => handleNav(`/services/${srv.slug}`)}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
                  >
                    <span>{srv.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[rgb(99,142,255)] transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/40 font-mono">
          <p>© {new Date().getFullYear()} CRETIFY. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>Crafted in the dark — worldwide.</span>
            <a
              href="/cretify-website.zip"
              download="cretify-website.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(99,142,255)]/80 hover:text-[rgb(99,142,255)] transition-colors underline flex items-center gap-1.5"
              title="Download full project ZIP archive"
            >
              <span>Download ZIP (270 KB)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
