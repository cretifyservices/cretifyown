import { useState, useEffect } from 'react';
import { ProjectItem, ServiceItem, TestimonialItem } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { SERVICES_DATA } from '../data/servicesData';

const STORAGE_PROJECTS_KEY = 'cretify_live_projects_v2';
const STORAGE_REVIEWS_KEY = 'cretify_live_reviews_v2';
const STORAGE_SERVICES_KEY = 'cretify_live_services_v2';

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

// Helper to broadcast changes locally and across tabs
const broadcastUpdate = (detail: { type: 'projects' | 'reviews' | 'services' | 'all' }) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cretify_data_update', { detail }));
  }
};

// ==========================================
// PROJECTS / WORKS DATA ENGINE
// ==========================================
export const getStoredProjects = (): ProjectItem[] => {
  if (typeof window === 'undefined') return PROJECTS_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(PROJECTS_DATA));
      return PROJECTS_DATA;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PROJECTS_DATA;
  } catch (err) {
    console.error('Error reading projects from storage:', err);
    return PROJECTS_DATA;
  }
};

export const saveProjects = (projects: ProjectItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    broadcastUpdate({ type: 'projects' });
  } catch (err) {
    console.error('Error saving projects to storage:', err);
  }
};

export const addProject = (project: ProjectItem): void => {
  const current = getStoredProjects();
  const updated = [project, ...current];
  saveProjects(updated);
};

export const updateProject = (project: ProjectItem): void => {
  const current = getStoredProjects();
  const updated = current.map((p) => (p.id === project.id ? project : p));
  saveProjects(updated);
};

export const deleteProject = (id: string): void => {
  const current = getStoredProjects();
  const updated = current.filter((p) => p.id !== id);
  saveProjects(updated);
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
export const resetAllToDefaults = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(PROJECTS_DATA));
  localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(INITIAL_REVIEWS));
  localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(SERVICES_DATA));
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

export const importAllData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    if (data.projects && Array.isArray(data.projects)) {
      saveProjects(data.projects);
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
export const useProjects = (): ProjectItem[] => {
  const [projects, setProjects] = useState<ProjectItem[]>(getStoredProjects);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(getStoredProjects());
    };
    window.addEventListener('cretify_data_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('cretify_data_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

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
