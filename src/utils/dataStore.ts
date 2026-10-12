import { useState, useEffect, useCallback } from 'react';
import { ProjectItem, ServiceItem, TestimonialItem } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { SERVICES_DATA } from '../data/servicesData';

const STORAGE_PROJECTS_KEY = 'cretify_live_projects_v2';
const STORAGE_REVIEWS_KEY = 'cretify_live_reviews_v2';
const STORAGE_SERVICES_KEY = 'cretify_live_services_v2';
const ADMIN_TOKEN_KEY = 'cretify_admin_token';

export const INITIAL_REVIEWS: TestimonialItem[] = [
  {
    id: 'review-1',
    author: 'Rajan Kumar Prasad',
    title: 'Founder',
    company: 'Career Growth Tribe',
    quote: 'Cretify didn’t just redesign our brand — they gave it gravity. A year on, it still feels three years ahead of everyone else.',
    rating: 5,
    verified: true,
  },
  {
    id: 'review-2',
    author: 'Marcus Vance',
    title: 'VP of Product',
    company: 'Nexus Capital Systems',
    quote: 'The financial engineering portal built by Cretify surpassed institutional security audits on day one. Lightning fast execution and breathtaking design.',
    rating: 5,
    verified: true,
  },
  {
    id: 'review-3',
    author: 'Elena Rostova',
    title: 'Co-Founder',
    company: 'Lumina Specialty Coffee',
    quote: 'Our subscription conversion jumped 42% within two weeks of launch. The aesthetic and checkout experience are peerless in the industry.',
    rating: 5,
    verified: true,
  },
  {
    id: 'review-4',
    author: 'Soren K.',
    title: 'Managing Partner',
    company: 'Aether Spatial Studio',
    quote: 'A design studio that understands both extreme aesthetic restraint and high-throughput technical delivery. They redefined how clients perceive us.',
    rating: 5,
    verified: true,
  },
];

// In-memory cache for synchronized projects
let cachedProjects: ProjectItem[] | null = null;
let isInitialFetchDone = false;
let ongoingFetchPromise: Promise<ProjectItem[]> | null = null;

// Helper to broadcast changes locally and across tabs
const broadcastUpdate = (detail: { type: 'projects' | 'reviews' | 'services' | 'all' }) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cretify_data_update', { detail }));
  }
};

export const getAdminToken = (): string => {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
};

export const setAdminToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const removeAdminToken = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
};

// ==========================================
// SHARED PERSISTENT PROJECTS API ENGINE
// ==========================================

export const fetchProjectsFromApi = async (): Promise<ProjectItem[]> => {
  if (ongoingFetchPromise) {
    return ongoingFetchPromise;
  }

  ongoingFetchPromise = (async () => {
    try {
      const response = await fetch('/api/projects', {
        headers: { credentials: 'omit', 'Cache-Control': 'no-cache' },
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data && Array.isArray(data.projects)) {
        cachedProjects = data.projects;
        isInitialFetchDone = true;
        // Also keep localStorage updated as offline mirror
        try {
          localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(data.projects));
        } catch (_) {}
        broadcastUpdate({ type: 'projects' });
        return data.projects;
      }
      throw new Error('Invalid response format');
    } catch (err) {
      console.warn('[DataStore] API fetch failed, falling back to cache:', err);
      // Fallback to local storage if API is temporarily unreachable
      if (!cachedProjects) {
        try {
          const raw = localStorage.getItem(STORAGE_PROJECTS_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              cachedProjects = parsed;
              return parsed;
            }
          }
        } catch (_) {}
        // Only if completely empty on first launch
        cachedProjects = PROJECTS_DATA;
      }
      return cachedProjects;
    } finally {
      ongoingFetchPromise = null;
    }
  })();

  return ongoingFetchPromise;
};

export const getStoredProjects = (): ProjectItem[] => {
  if (cachedProjects) return cachedProjects;
  if (typeof window === 'undefined') return PROJECTS_DATA;

  try {
    const raw = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedProjects = parsed;
        return parsed;
      }
    }
  } catch (_) {}

  return PROJECTS_DATA;
};

export const saveProjects = async (projects: ProjectItem[]): Promise<void> => {
  cachedProjects = projects;
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  } catch (_) {}
  broadcastUpdate({ type: 'projects' });
};

export const addProject = async (project: ProjectItem): Promise<{ success: boolean; error?: string }> => {
  const token = getAdminToken();
  try {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }

    // Refresh projects from shared server
    await fetchProjectsFromApi();
    return { success: true };
  } catch (err: any) {
    console.error('Failed to add project to server:', err);
    // Optimistic fallback
    const current = getStoredProjects();
    const updated = [project, ...current];
    await saveProjects(updated);
    return { success: false, error: err.message };
  }
};

export const updateProject = async (project: ProjectItem): Promise<{ success: boolean; error?: string }> => {
  const token = getAdminToken();
  try {
    const res = await fetch(`/api/projects/${encodeURIComponent(project.id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }

    // Refresh projects from shared server
    await fetchProjectsFromApi();
    return { success: true };
  } catch (err: any) {
    console.error('Failed to update project on server:', err);
    // Optimistic fallback
    const current = getStoredProjects();
    const updated = current.map((p) => (p.id === project.id ? project : p));
    await saveProjects(updated);
    return { success: false, error: err.message };
  }
};

export const deleteProject = async (id: string): Promise<{ success: boolean; error?: string }> => {
  const token = getAdminToken();
  try {
    const res = await fetch(`/api/projects/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }

    // Refresh projects from shared server
    await fetchProjectsFromApi();
    return { success: true };
  } catch (err: any) {
    console.error('Failed to delete project on server:', err);
    // Optimistic fallback
    const current = getStoredProjects();
    const updated = current.filter((p) => p.id !== id);
    await saveProjects(updated);
    return { success: false, error: err.message };
  }
};

// ==========================================
// REVIEWS / TESTIMONIALS DATA ENGINE
// ==========================================
export const getStoredReviews = (): TestimonialItem[] => {
  if (typeof window === 'undefined') return INITIAL_REVIEWS;
  try {
    const raw = localStorage.getItem(STORAGE_REVIEWS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_REVIEWS;
  } catch (err) {
    console.error('Error reading reviews from storage:', err);
    return INITIAL_REVIEWS;
  }
};

export const saveReviews = (reviews: TestimonialItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(reviews));
    broadcastUpdate({ type: 'reviews' });
  } catch (err) {
    console.error('Error saving reviews to storage:', err);
  }
};

export const addReview = (review: TestimonialItem): void => {
  const current = getStoredReviews();
  const updated = [review, ...current];
  saveReviews(updated);
};

export const updateReview = (review: TestimonialItem): void => {
  const current = getStoredReviews();
  const updated = current.map((r) => (r.id === review.id ? review : r));
  saveReviews(updated);
};

export const deleteReview = (id: string): void => {
  const current = getStoredReviews();
  const updated = current.filter((r) => r.id !== id);
  saveReviews(updated);
};

// ==========================================
// SERVICES / CAPABILITIES DATA ENGINE
// ==========================================
export const getStoredServices = (): ServiceItem[] => {
  if (typeof window === 'undefined') return SERVICES_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_SERVICES_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(SERVICES_DATA));
      return SERVICES_DATA;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SERVICES_DATA;
  } catch (err) {
    console.error('Error reading services from storage:', err);
    return SERVICES_DATA;
  }
};

export const saveServices = (services: ServiceItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(services));
    broadcastUpdate({ type: 'services' });
  } catch (err) {
    console.error('Error saving services to storage:', err);
  }
};

export const updateService = (service: ServiceItem): void => {
  const current = getStoredServices();
  const updated = current.map((s) => (s.id === service.id ? service : s));
  saveServices(updated);
};

// ==========================================
// BACKUP / EXPORT / IMPORT / RESET
// ==========================================
export const resetAllToDefaults = async (): Promise<void> => {
  const token = getAdminToken();
  try {
    await fetch('/api/projects/reset', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (_) {}

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(INITIAL_REVIEWS));
    localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(SERVICES_DATA));
  }
  await fetchProjectsFromApi();
  broadcastUpdate({ type: 'all' });
};

export const exportAllData = () => {
  return JSON.stringify(
    {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      projects: getStoredProjects(),
      reviews: getStoredReviews(),
      services: getStoredServices(),
    },
    null,
    2
  );
};

export const importAllData = async (jsonString: string): Promise<boolean> => {
  try {
    const data = JSON.parse(jsonString);
    if (data.projects && Array.isArray(data.projects)) {
      await saveProjects(data.projects);
    }
    if (data.reviews && Array.isArray(data.reviews)) {
      saveReviews(data.reviews);
    }
    if (data.services && Array.isArray(data.services)) {
      saveServices(data.services);
    }
    broadcastUpdate({ type: 'all' });
    return true;
  } catch (e) {
    console.error('Failed to parse imported JSON data', e);
    return false;
  }
};

// ==========================================
// REACT HOOKS FOR REAL-TIME INSTANT SYNC
// ==========================================

export interface ProjectsDataState {
  projects: ProjectItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProjectsData = (): ProjectsDataState => {
  const [projects, setProjects] = useState<ProjectItem[]>(() => cachedProjects || []);
  const [loading, setLoading] = useState<boolean>(() => !isInitialFetchDone);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (isMounted = true) => {
    try {
      const data = await fetchProjectsFromApi();
      if (isMounted) {
        setProjects(data);
        setError(null);
        setLoading(false);
      }
    } catch (err: any) {
      if (isMounted) {
        setError(err?.message || 'Failed to fetch projects');
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Initial fetch
    loadData(isMounted);

    // Event listeners for cross-tab and local updates
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.type === 'projects' || customEvent.detail.type === 'all') {
        if (cachedProjects && isMounted) {
          setProjects([...cachedProjects]);
        }
      }
    };

    const handleFocus = () => {
      loadData(isMounted);
    };

    window.addEventListener('cretify_data_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('focus', handleFocus);

    // Periodically refetch every 15 seconds to sync cross-session and cross-device changes automatically
    const interval = setInterval(() => {
      loadData(isMounted);
    }, 15000);

    return () => {
      isMounted = false;
      window.removeEventListener('cretify_data_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [loadData]);

  return {
    projects,
    loading,
    error,
    refetch: () => loadData(true),
  };
};

export const useProjects = (): ProjectItem[] => {
  const { projects } = useProjectsData();
  return projects;
};

export const useReviews = (): TestimonialItem[] => {
  const [reviews, setReviews] = useState<TestimonialItem[]>(getStoredReviews);

  useEffect(() => {
    const handleUpdate = () => {
      setReviews(getStoredReviews());
    };
    window.addEventListener('cretify_data_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('cretify_data_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return reviews;
};

export const useServices = (): ServiceItem[] => {
  const [services, setServices] = useState<ServiceItem[]>(getStoredServices);

  useEffect(() => {
    const handleUpdate = () => {
      setServices(getStoredServices());
    };
    window.addEventListener('cretify_data_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('cretify_data_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return services;
};

export const useService = (slug: string): ServiceItem | undefined => {
  const services = useServices();
  return services.find((s) => s.slug === slug || s.id === slug);
};
