import React, { useState, useEffect } from 'react';
import { Download, Check, FileArchive, Copy, ExternalLink, X, ShieldCheck, HardDrive } from 'lucide-react';
import { ZIP_FILE_SIZE, ZIP_FILE_COUNT } from '../utils/zipData';

export const PreviewDownloadWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [fullUrl, setFullUrl] = useState('/cretify-website.zip');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      // Pre-resolve absolute download URL
      setFullUrl(`${origin}/cretify-website.zip`);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback prompt for clipboard
      const input = document.createElement('input');
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenNewTab = () => {
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTriggerDownload = () => {
    setDownloading(true);
    // Direct link trigger
    const link = document.createElement('a');
    link.href = '/cretify-website.zip';
    link.download = 'cretify-website.zip';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Launcher Pill */}
      <aside
        aria-label="Download Package"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0A0A0B]/95 hover:bg-[#12141a] text-white border border-white/20 hover:border-[rgb(99,142,255)] text-xs font-mono tracking-wider shadow-[0_12px_36px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          title="Download complete verified ZIP archive of all website codes, assets, and pages"
        >
          <FileArchive className="w-3.5 h-3.5 text-[rgb(99,142,255)]" />
          <span className="flex items-center gap-1.5">
            <span>Download Website ZIP</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.08] text-white/60 group-hover:text-white transition-colors">
              {ZIP_FILE_SIZE}
            </span>
          </span>
          <Download className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
        </button>
      </aside>

      {/* Download Modal / Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0E0F12] border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-7 text-white font-sans overflow-hidden">
            
            {/* Background subtle glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[rgb(99,142,255)]/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgb(99,142,255)]/15 border border-[rgb(99,142,255)]/30 flex items-center justify-center text-[rgb(99,142,255)]">
                  <FileArchive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-wide">
                    Website Source Archive (.zip)
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/50 font-mono mt-0.5">
                    <span className="text-[rgb(99,142,255)] font-medium">{ZIP_FILE_SIZE} compressed</span>
                    <span>•</span>
                    <span>{ZIP_FILE_COUNT} files verified</span>
                    <span>•</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Validated
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <div className="py-4 text-xs text-white/70 leading-relaxed space-y-2">
              <p>
                Complete export of the CRETIFY production codebase: React 19, TypeScript, Tailwind CSS, Vite build config, cosmic Starry canvas, interactive scroll Saturn model, case studies, and assets.
              </p>
            </div>

            {/* Download Options */}
            <div className="space-y-3 pt-1">
              
              {/* Option 1: Direct Download */}
              <a
                href="/cretify-website.zip"
                download="cretify-website.zip"
                onClick={handleTriggerDownload}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[rgb(99,142,255)] hover:bg-[rgb(80,125,245)] text-white font-medium text-xs tracking-wider transition-all duration-200 shadow-[0_4px_20px_rgba(99,142,255,0.3)] cursor-pointer group"
              >
                <span className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  <span>{downloading ? 'Starting Download...' : 'Direct Download ZIP Archive'}</span>
                </span>
                <span className="text-[11px] font-mono bg-black/25 px-2 py-0.5 rounded">
                  {ZIP_FILE_SIZE}
                </span>
              </a>

              {/* Option 2: Open In New Browser Tab (bypasses iframe sandboxes) */}
              <button
                onClick={handleOpenNewTab}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-normal text-xs tracking-wide transition-all duration-200 cursor-pointer group"
              >
                <span className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white" />
                  <span>Open Direct Download Link in New Tab</span>
                </span>
                <span className="text-[10px] text-white/40 group-hover:text-white/70 font-mono">
                  Bypasses iframe
                </span>
              </button>

              {/* Option 3: Copy Full URL */}
              <div className="pt-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5">
                  Direct Download URL (Click to copy or paste into browser)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={fullUrl}
                    onClick={handleCopyLink}
                    className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white/80 text-xs font-mono select-all focus:outline-none focus:border-[rgb(99,142,255)] cursor-pointer"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-white/60" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono">
              <span>Ready for: <code className="text-white/60">npm install && npm run dev</code></span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white underline cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
