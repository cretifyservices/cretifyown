import React, { useState, useEffect } from 'react';
import {
  useProjects,
  useReviews,
  useServices,
  addProject,
  updateProject,
  deleteProject,
  addReview,
  updateReview,
  deleteReview,
  updateService,
  exportAllData,
  importAllData,
  resetAllToDefaults,
} from '../utils/dataStore';
import { ProjectItem, TestimonialItem, ServiceItem } from '../types';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Star,
  CheckCircle,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Layers,
  MessageSquare,
  Briefcase,
  X,
  Check,
  Eye,
  AlertCircle,
} from 'lucide-react';

interface AdminPageProps {
  navigate: (path: string) => void;
}

// SHA-256 Hashes of credentials:
// username: cretifyservices4508 -> 8ffe0d031860cf208dc3b39a2c91fd4b4ae43c9700d75f5c8cc6ee41c956a8af
// password: Cretify@4508        -> 1035ee1b948d0842734013f0d66d864da67d0af215231200b21eeebd4b1229c4
const AUTH_USER_HASH = '8ffe0d031860cf208dc3b39a2c91fd4b4ae43c9700d75f5c8cc6ee41c956a8af';
const AUTH_PASS_HASH = '1035ee1b948d0842734013f0d66d864da67d0af215231200b21eeebd4b1229c4';
const SESSION_KEY = 'cretify_admin_session_auth';

async function hashSHA256(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const CATEGORIES = [
  'Websites',
  'Web Applications',
  'E-commerce',
  'UI/UX',
  'Branding',
  'Video Editing',
  'AI Automation',
] as const;

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'granted';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'works' | 'reviews' | 'services' | 'sync'>('works');

  // Real-time Synced Data
  const projects = useProjects();
  const reviews = useReviews();
  const services = useServices();

  // Project Modal State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectKeywordInput, setProjectKeywordInput] = useState('');

  // Review Modal State
  const [editingReview, setEditingReview] = useState<TestimonialItem | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Service Edit State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [newCapabilityText, setNewCapabilityText] = useState('');
  const [newDeliverableText, setNewDeliverableText] = useState('');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const uHash = await hashSHA256(usernameInput.trim());
      const pHash = await hashSHA256(passwordInput.trim());

      if (uHash === AUTH_USER_HASH && pHash === AUTH_PASS_HASH) {
        sessionStorage.setItem(SESSION_KEY, 'granted');
        setIsAuthenticated(true);
        setUsernameInput('');
        setPasswordInput('');
        showToast('Administrative session established');
      } else {
        setLoginError('Invalid administrative credentials. Access denied.');
      }
    } catch (err) {
      setLoginError('Security verification failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  // ==========================================
  // PROJECT ACTIONS
  // ==========================================
  const handleOpenAddProject = () => {
    setEditingProject({
      id: `work-${Date.now()}`,
      slug: `work-${Date.now()}`,
      title: '',
      client: '',
      tagline: '',
      category: 'Web Applications',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      year: new Date().getFullYear().toString(),
      liveUrl: 'https://',
      keywords: ['Web App', 'Strategy'],
      featuredOnHome: true,
    });
    setProjectKeywordInput('');
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (project: ProjectItem) => {
    setEditingProject({ ...project });
    setProjectKeywordInput('');
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title.trim()) {
      alert('Please provide a work title / heading');
      return;
    }

    const exists = projects.some((p) => p.id === editingProject.id);
    if (exists) {
      updateProject(editingProject);
      showToast(`Work "${editingProject.title}" updated successfully`);
    } else {
      addProject(editingProject);
      showToast(`New work "${editingProject.title}" added to portfolio`);
    }

    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the portfolio?`)) {
      deleteProject(id);
      showToast(`Work "${title}" removed`);
    }
  };

  const handleAddKeyword = () => {
    if (!projectKeywordInput.trim() || !editingProject) return;
    const currentKws = editingProject.keywords || [];
    if (currentKws.length >= 4) {
      alert('Maximum 3-4 keywords recommended for clean presentation');
      return;
    }
    setEditingProject({
      ...editingProject,
      keywords: [...currentKws, projectKeywordInput.trim()],
    });
    setProjectKeywordInput('');
  };

  const handleRemoveKeyword = (index: number) => {
    if (!editingProject) return;
    const currentKws = [...(editingProject.keywords || [])];
    currentKws.splice(index, 1);
    setEditingProject({ ...editingProject, keywords: currentKws });
  };

  // ==========================================
  // REVIEW ACTIONS
  // ==========================================
  const handleOpenAddReview = () => {
    setEditingReview({
      id: `review-${Date.now()}`,
      author: '',
      title: 'Founder & CEO',
      company: '',
      quote: '',
      rating: 5,
      verified: true,
    });
    setIsReviewModalOpen(true);
  };

  const handleOpenEditReview = (review: TestimonialItem) => {
    setEditingReview({ ...review });
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    if (!editingReview.quote.trim() || !editingReview.author.trim()) {
      alert('Please fill out the testimonial quote and author');
      return;
    }

    const exists = reviews.some((r) => r.id === editingReview.id);
    if (exists) {
      updateReview(editingReview);
      showToast(`Review from ${editingReview.author} updated`);
    } else {
      addReview(editingReview);
      showToast(`New review from ${editingReview.author} added`);
    }

    setIsReviewModalOpen(false);
    setEditingReview(null);
  };

  const handleDeleteReview = (id: string, author: string) => {
    if (window.confirm(`Delete review from "${author}"?`)) {
      deleteReview(id);
      showToast(`Review removed`);
    }
  };

  // ==========================================
  // SERVICE ACTIONS
  // ==========================================
  const handleOpenEditService = (srv: ServiceItem) => {
    setEditingService(JSON.parse(JSON.stringify(srv)));
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    updateService(editingService);
    showToast(`Service "${editingService.title}" updated`);
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  const handleAddCapability = () => {
    if (!newCapabilityText.trim() || !editingService) return;
    setEditingService({
      ...editingService,
      capabilities: [...editingService.capabilities, newCapabilityText.trim()],
    });
    setNewCapabilityText('');
  };

  const handleRemoveCapability = (idx: number) => {
    if (!editingService) return;
    const caps = [...editingService.capabilities];
    caps.splice(idx, 1);
    setEditingService({ ...editingService, capabilities: caps });
  };

  const handleAddDeliverable = () => {
    if (!newDeliverableText.trim() || !editingService) return;
    setEditingService({
      ...editingService,
      deliverables: [...editingService.deliverables, newDeliverableText.trim()],
    });
    setNewDeliverableText('');
  };

  const handleRemoveDeliverable = (idx: number) => {
    if (!editingService) return;
    const dels = [...editingService.deliverables];
    dels.splice(idx, 1);
    setEditingService({ ...editingService, deliverables: dels });
  };

  // ==========================================
  // BACKUP / EXPORT / IMPORT / RESET
  // ==========================================
  const handleExportBackup = () => {
    const dataStr = exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cretify-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON backup downloaded');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importAllData(content)) {
        showToast('All portfolio, reviews & services successfully imported!');
      } else {
        alert('Invalid JSON file format. Import failed.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to restore default factory data for all works, reviews, and capabilities?'
      )
    ) {
      resetAllToDefaults();
      showToast('All data reset to initial studio standards');
    }
  };

  // ==========================================
  // LOGIN SCREEN (If not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070708] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden font-sans">
        {/* Subtle Ambient Glow */}
        <div className="absolute w-[500px] h-[500px] bg-[rgb(99,142,255)]/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-[#111114] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[rgb(99,142,255)]/15 border border-[rgb(99,142,255)]/30 flex items-center justify-center text-[rgb(99,142,255)] mb-4 shadow-[0_0_20px_rgba(99,142,255,0.2)]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Cretify Admin Portal
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1">
              Encrypted Authentication Required
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.1em] text-white/60 mb-2">
                Administrative Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[rgb(99,142,255)] focus:ring-1 focus:ring-[rgb(99,142,255)] transition-all"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.1em] text-white/60 mb-2">
                Administrative Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[rgb(99,142,255)] focus:ring-1 focus:ring-[rgb(99,142,255)] transition-all"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[rgb(99,142,255)] hover:bg-[rgb(80,125,245)] text-white text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-[0_0_20px_rgba(99,142,255,0.4)] disabled:opacity-50 cursor-pointer"
            >
              {loginLoading ? 'Verifying Credentials...' : 'Unlock Admin Portal'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              ← Return to public website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans selection:bg-[rgb(99,142,255)] selection:text-white pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0D]/90 backdrop-blur-xl border-b border-white/10 px-5 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[rgb(99,142,255)]/20 border border-[rgb(99,142,255)]/40 flex items-center justify-center text-[rgb(99,142,255)] shadow-[0_0_12px_rgba(99,142,255,0.3)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  Cretify Studio Admin
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-white/50">
                Authorized Administrator · Real-time Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-xs font-medium text-red-300 hover:text-red-200 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('works')}
            className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] transition-all cursor-pointer ${
              activeTab === 'works'
                ? 'bg-[rgb(99,142,255)] text-white shadow-[0_0_20px_rgba(99,142,255,0.4)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Works & Portfolio</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-black/30 text-[11px]">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-[rgb(99,142,255)] text-white shadow-[0_0_20px_rgba(99,142,255,0.4)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Client Reviews</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-black/30 text-[11px]">
              {reviews.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[rgb(99,142,255)] text-white shadow-[0_0_20px_rgba(99,142,255,0.4)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Capabilities & Services</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-black/30 text-[11px]">
              {services.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] transition-all cursor-pointer ${
              activeTab === 'sync'
                ? 'bg-[rgb(99,142,255)] text-white shadow-[0_0_20px_rgba(99,142,255,0.4)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Backup & Sync</span>
          </button>
        </div>

        {/* TAB 1: WORKS & PORTFOLIO */}
        {activeTab === 'works' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Portfolio Works Management
                </h2>
                <p className="text-xs text-white/50 mt-1">
                  Each work shows a dedicated box image, heading, subheading, 2-3 keywords, and a direct button to open in Chrome.
                </p>
              </div>

              <button
                onClick={handleOpenAddProject}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgb(99,142,255)] hover:bg-[rgb(80,125,245)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(99,142,255,0.35)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Work</span>
              </button>
            </div>

            {/* Works Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#111114] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[rgb(99,142,255)]/40 transition-all group"
                >
                  <div>
                    {/* Dedicated Box Image */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40 border border-white/10 mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-white border border-white/15">
                        {project.category}
                      </span>
                      {project.featuredOnHome && (
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[rgb(99,142,255)] text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Heading */}
                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                      {project.title}
                    </h3>

                    {/* Subheading */}
                    <p className="text-xs text-white/60 line-clamp-2 mt-1">
                      {project.tagline}
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(project.keywords || []).map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/70"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    {/* Live Link URL Preview */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[rgb(99,142,255)]">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline truncate max-w-[240px]"
                      >
                        {project.liveUrl || 'No URL configured'}
                      </a>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/70 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Open in Chrome</span>
                      <ExternalLink className="w-3 h-3 text-[rgb(99,142,255)]" />
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditProject(project)}
                        aria-label="Edit project"
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-white/80 hover:text-white transition-all cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id, project.title)}
                        aria-label="Delete project"
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT REVIEWS */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Client Reviews & Testimonials
                </h2>
                <p className="text-xs text-white/50 mt-1">
                  Reviews are synchronized directly with the "In Their Words" section on the homepage.
                </p>
              </div>

              <button
                onClick={handleOpenAddReview}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgb(99,142,255)] hover:bg-[rgb(80,125,245)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(99,142,255,0.35)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#111114] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[rgb(99,142,255)]/40 transition-all"
                >
                  <div>
                    {/* Stars & Verified */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-[rgb(99,142,255)]">
                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      {rev.verified && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Verified Client</span>
                        </span>
                      )}
                    </div>

                    <blockquote className="text-sm sm:text-base text-white/90 italic leading-relaxed mb-4">
                      &ldquo;{rev.quote}&rdquo;
                    </blockquote>

                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {rev.author}
                      </h4>
                      <p className="text-xs text-white/50">
                        {rev.title} · {rev.company}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditReview(rev)}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteReview(rev.id, rev.author)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-400 hover:text-red-300 transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES & CAPABILITIES */}
        {activeTab === 'services' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Services & Capabilities Editor
              </h2>
              <p className="text-xs text-white/50 mt-1">
                Edit service descriptions, headlines, capabilities, deliverables, and problems solved across the platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-[#111114] border border-white/10 rounded-2xl p-6 hover:border-[rgb(99,142,255)]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-semibold tracking-wider text-[rgb(99,142,255)]">
                        {srv.shortTag}
                      </span>
                      <span className="text-[11px] text-white/40 font-mono">
                        {srv.slug}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-white/60 mb-4 line-clamp-2">
                      {srv.tagline}
                    </p>

                    {/* Capabilities count */}
                    <div className="text-xs text-white/50 mb-2">
                      <span className="font-semibold text-white/80">
                        {srv.capabilities.length} Capabilities:
                      </span>
                    </div>
                    <ul className="text-xs text-white/60 space-y-1 mb-4">
                      {srv.capabilities.slice(0, 3).map((c, i) => (
                        <li key={i} className="flex items-center gap-1.5 truncate">
                          <span className="w-1 h-1 rounded-full bg-[rgb(99,142,255)]" />
                          <span className="truncate">{c}</span>
                        </li>
                      ))}
                      {srv.capabilities.length > 3 && (
                        <li className="text-[11px] text-white/40 italic">
                          +{srv.capabilities.length - 3} more capabilities
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex justify-end">
                    <button
                      onClick={() => handleOpenEditService(srv)}
                      className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-[rgb(99,142,255)] text-white text-xs font-medium uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit Service & Capabilities</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BACKUP & SYNC */}
        {activeTab === 'sync' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#111114] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-2">
                Export & Download Backup
              </h3>
              <p className="text-xs text-white/60 mb-6 leading-relaxed">
                Download a complete JSON snapshot containing all current works, client reviews, and service capabilities. You can keep this on your local machine or commit to your GitHub repository.
              </p>
              <button
                onClick={handleExportBackup}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[rgb(99,142,255)] hover:bg-[rgb(80,125,245)] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(99,142,255,0.35)]"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON Backup</span>
              </button>
            </div>

            <div className="bg-[#111114] border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-2">
                Import Data from JSON File
              </h3>
              <p className="text-xs text-white/60 mb-6 leading-relaxed">
                Restore or update all works, reviews, and services from an existing backup JSON file. Changes take effect across the entire website instantly.
              </p>
              <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Choose Backup JSON File</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>
            </div>

            <div className="bg-[#111114] border border-red-500/20 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-red-400 mb-2">
                Reset to Original Studio Defaults
              </h3>
              <p className="text-xs text-white/60 mb-6 leading-relaxed">
                If you ever wish to clear custom edits and restore the official initial studio portfolio and capabilities.
              </p>
              <button
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ========================================== */}
      {/* MODAL: ADD / EDIT WORK                     */}
      {/* ========================================== */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#121217] border border-white/15 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-xl font-bold text-white">
                {projects.some((p) => p.id === editingProject.id)
                  ? 'Edit Work'
                  : 'Add New Work'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-5">
              {/* Heading (Title) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Heading (Work Title) *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  placeholder="e.g. Career Growth Tribe"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                />
              </div>

              {/* Subheading (Tagline) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Subheading (Short Description) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingProject.tagline}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, tagline: e.target.value })
                  }
                  placeholder="e.g. Modern digital ecosystem and automated member acquisition engine."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                />
              </div>

              {/* Category & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1a22] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year || '2025'}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, year: e.target.value })
                    }
                    placeholder="2025"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Website URL for Chrome Button */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Direct Chrome Website Link (URL) *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    value={editingProject.liveUrl}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, liveUrl: e.target.value })
                    }
                    placeholder="https://example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                  />
                  <ExternalLink className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
                </div>
                <p className="text-[11px] text-white/40 mt-1">
                  Clicking the "Open in Chrome" button on the work card opens this link in a new tab.
                </p>
              </div>

              {/* Dedicated Box Image URL */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Dedicated Box Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={editingProject.image}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                />

                {/* Quick Image Preview */}
                {editingProject.image && (
                  <div className="mt-2 relative aspect-[16/9] w-48 rounded-xl overflow-hidden border border-white/10 bg-black">
                    <img
                      src={editingProject.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 2-3 Keywords */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  2-3 Keywords
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={projectKeywordInput}
                    onChange={(e) => setProjectKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder="e.g. Web App, Automation, React"
                    className="flex-1 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[rgb(99,142,255)] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    Add Keyword
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(editingProject.keywords || []).map((kw, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[rgb(99,142,255)]/20 border border-[rgb(99,142,255)]/40 text-xs text-white"
                    >
                      <span>{kw}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(idx)}
                        className="hover:text-red-400 cursor-pointer ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured on Home Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={editingProject.featuredOnHome || false}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      featuredOnHome: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-[rgb(99,142,255)] bg-white/10 border-white/20 cursor-pointer"
                />
                <label
                  htmlFor="featuredToggle"
                  className="text-xs text-white/80 cursor-pointer select-none"
                >
                  Feature in Selected Works on Homepage
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white/70 hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[rgb(99,142,255)] hover:bg-[rgb(80,125,245)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(99,142,255,0.4)] cursor-pointer"
                >
                  Save & Publish Work
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: ADD / EDIT REVIEW                   */}
      {/* ========================================== */}
      {isReviewModalOpen && editingReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#121217] border border-white/15 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-xl font-bold text-white">
                {reviews.some((r) => r.id === editingReview.id)
                  ? 'Edit Client Review'
                  : 'Add New Client Review'}
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Client Testimonial Quote *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingReview.quote}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, quote: e.target.value })
                  }
                  placeholder="&ldquo;Cretify transformed our digital infrastructure...&rdquo;"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Author Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingReview.author}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, author: e.target.value })
                  }
                  placeholder="Rajan Kumar Prasad"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Title / Role
                  </label>
                  <input
                    type="text"
                    value={editingReview.title}
                    onChange={(e) =>
                      setEditingReview({ ...editingReview, title: e.target.value })
                    }
                    placeholder="Founder"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editingReview.company}
                    onChange={(e) =>
                      setEditingReview({ ...editingReview, company: e.target.value })
                    }
                    placeholder="Career Growth Tribe"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Rating
                  </label>
                  <select
                    value={editingReview.rating || 5}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        rating: Number(e.target.value),
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-[#1a1a22] border border-white/10 text-white text-xs focus:border-[rgb(99,142,255)] focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="verifiedCheck"
                    checked={editingReview.verified}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        verified: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[rgb(99,142,255)] bg-white/10 border-white/20 cursor-pointer"
                  />
                  <label
                    htmlFor="verifiedCheck"
                    className="text-xs text-white/80 cursor-pointer select-none"
                  >
                    Verified Client Badge
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white/70 hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[rgb(99,142,255)] hover:bg-[rgb(80,125,245)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(99,142,255,0.4)] cursor-pointer"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: EDIT SERVICE & CAPABILITIES         */}
      {/* ========================================== */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#121217] border border-white/15 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Edit Service: {editingService.title}
                </h3>
                <p className="text-xs text-white/50">
                  Update capabilities and deliverables for {editingService.slug}
                </p>
              </div>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Short Tag (e.g. Web Development)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.shortTag}
                    onChange={(e) =>
                      setEditingService({ ...editingService, shortTag: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Tagline *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingService.tagline}
                  onChange={(e) =>
                    setEditingService({ ...editingService, tagline: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Hero Description
                </label>
                <textarea
                  rows={3}
                  value={editingService.heroDescription}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      heroDescription: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[rgb(99,142,255)] focus:outline-none"
                />
              </div>

              {/* Dynamic Capabilities List */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  Service Capabilities ({editingService.capabilities.length})
                </label>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={newCapabilityText}
                    onChange={(e) => setNewCapabilityText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCapability();
                      }
                    }}
                    placeholder="Add a new capability..."
                    className="flex-1 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[rgb(99,142,255)] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCapability}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {editingService.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white/80"
                    >
                      <span className="truncate">{cap}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCapability(idx)}
                        className="text-white/40 hover:text-red-400 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Deliverables List */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  Key Deliverables ({editingService.deliverables.length})
                </label>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={newDeliverableText}
                    onChange={(e) => setNewDeliverableText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    placeholder="Add a new deliverable..."
                    className="flex-1 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[rgb(99,142,255)] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {editingService.deliverables.map((del, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white/80"
                    >
                      <span className="truncate">{del}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-white/40 hover:text-red-400 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white/70 hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[rgb(99,142,255)] hover:bg-[rgb(80,125,245)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(99,142,255,0.4)] cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
