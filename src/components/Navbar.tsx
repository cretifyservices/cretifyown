import React, { useState, useEffect } from 'react';
import { CretifyLogo } from './CretifyLogo';
import { SERVICES_DATA } from '../data/servicesData';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenProjectModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  navigate,
  onOpenProjectModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services', hasDropdown: true },
    { label: 'Process', path: '/process' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0B]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-[#0A0A0B]/60 backdrop-blur-md border-b border-white/[0.07] py-4'
      }`}
      style={{
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center focus:outline-none group cursor-pointer text-left"
            aria-label="Cretify Home"
          >
            <CretifyLogo size="md" />
          </button>

          {/* Desktop Links (Vesper format: Work, About, Services, Process, Contact) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.path);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('/services')}
                      className={`flex items-center gap-1.5 text-[13px] font-medium tracking-[0.1em] uppercase transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'text-white'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-[rgb(99,142,255)]' : 'text-white/40'
                        }`}
                      />
                    </button>

                    {/* Vesper-styled Services Flyout */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[460px] bg-[#0A0A0B]/98 border border-white/10 rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl grid grid-cols-2 gap-2 animate-in fade-in duration-200">
                        <div className="col-span-2 pb-2 mb-1 border-b border-white/[0.08] flex items-center justify-between px-2">
                          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50">
                            Disciplines
                          </span>
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="text-[11px] text-[rgb(99,142,255)] hover:underline flex items-center gap-1"
                          >
                            <span>All Capabilities</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                        {SERVICES_DATA.map((srv, idx) => (
                          <button
                            key={srv.slug}
                            onClick={() => handleNavClick(`/services/${srv.slug}`)}
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/5 text-left transition-colors group cursor-pointer"
                          >
                            <span className="text-[11px] font-mono text-[rgb(99,142,255)] shrink-0 pt-0.5">
                              0{idx + 1}
                            </span>
                            <div>
                              <p className="text-xs font-medium text-white group-hover:text-[rgb(99,142,255)] transition-colors leading-snug">
                                {srv.title}
                              </p>
                              <p className="text-[10px] text-white/40 line-clamp-1 mt-0.5">
                                {srv.tagline}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-[13px] font-medium tracking-[0.1em] uppercase transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Designeous Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenProjectModal ? onOpenProjectModal() : handleNavClick('/contact')}
              className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[rgb(99,142,255)]/70 text-white text-[12px] font-medium tracking-[0.12em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(99,142,255,0.35)] cursor-pointer group active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)]" />
              <span>Start a Project</span>
            </button>
          </div>

          {/* Mobile Designeous Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => handleNavClick('/contact')}
              className="px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] rounded-full border border-white/20 bg-white/[0.04] text-white"
            >
              Start
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-white hover:border-[rgb(99,142,255)]/60 transition-colors cursor-pointer flex flex-col justify-center items-center gap-1.5 w-10 h-10"
              aria-label="Toggle navigation menu"
            >
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-200 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-200 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Full Screen Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[60px] sm:top-[68px] bottom-0 z-50 bg-[#0A0A0B]/98 backdrop-blur-3xl border-t border-white/10 flex flex-col justify-between overflow-y-auto overscroll-contain animate-in fade-in duration-200"
          style={{ height: 'calc(100dvh - 60px)' }}
        >
          <div className="p-6 sm:p-8 flex flex-col gap-5">
            {navLinks.map((link) => (
              <div key={link.path}>
                <div className="flex items-center justify-between border-b border-white/[0.08]">
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`flex-1 text-left py-2.5 text-xl font-medium uppercase tracking-[0.12em] cursor-pointer transition-colors ${
                      currentPath === link.path ? 'text-[rgb(99,142,255)]' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                  {link.hasDropdown && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileServicesOpen(!mobileServicesOpen);
                      }}
                      className="p-3 text-white/50 hover:text-white transition-colors cursor-pointer"
                      aria-label="Toggle services list"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileServicesOpen ? 'rotate-180 text-[rgb(99,142,255)]' : 'text-white/40'
                        }`}
                      />
                    </button>
                  )}
                </div>

                {link.hasDropdown && mobileServicesOpen && (
                  <div className="pl-3 py-2.5 space-y-2 border-l-2 border-white/10 my-2">
                    {SERVICES_DATA.map((srv, idx) => (
                      <button
                        key={srv.slug}
                        onClick={() => handleNavClick(`/services/${srv.slug}`)}
                        className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white/5 text-xs text-white/60 hover:text-white flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-[rgb(99,142,255)]">0{idx + 1}</span>
                          <span className="font-medium text-white/80">{srv.title}</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/30" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-6 mt-2 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenProjectModal) {
                    onOpenProjectModal();
                  } else {
                    handleNavClick('/contact');
                  }
                }}
                className="w-full py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white bg-[rgb(99,142,255)]/20 hover:bg-[rgb(99,142,255)] hover:text-white border border-[rgb(99,142,255)]/40 rounded-full transition-all duration-300 shadow-[0_0_24px_rgba(99,142,255,0.3)] cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[rgb(99,142,255)] shadow-[0_0_8px_rgb(99,142,255)] animate-pulse" />
                <span>Start a Project</span>
              </button>
              
              <div className="text-center pt-2">
                <p className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-1">Direct Inquiries</p>
                <a
                  href="mailto:cretifyservices@gmail.com"
                  className="text-xs font-mono text-[rgb(99,142,255)] hover:underline transition-colors"
                >
                  cretifyservices@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Footer brand marker inside menu */}
          <div className="px-6 py-4 border-t border-white/[0.06] bg-black/40 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>© {new Date().getFullYear()} CRETIFY</span>
            <span className="text-[rgb(99,142,255)]">COSMIC DIGITAL STUDIO</span>
          </div>
        </div>
      )}
    </header>
  );
};
