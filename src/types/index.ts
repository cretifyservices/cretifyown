export type ServiceId = 
  | 'website-development'
  | 'web-app-development'
  | 'ecommerce-development'
  | 'ui-ux-design'
  | 'video-editing'
  | 'branding'
  | 'seo'
  | 'ai-automation';

export interface ServiceItem {
  id: ServiceId;
  slug: string;
  title: string;
  shortTag: string;
  tagline: string;
  heroDescription: string;
  overview: string;
  problemsSolved: string[];
  capabilities: string[];
  deliverables: string[];
  businessBenefits: {
    title: string;
    description: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServiceIds: ServiceId[];
  iconName: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string; // Simple heading
  client: string;
  tagline: string; // Subheading
  category: 'Websites' | 'Web Applications' | 'E-commerce' | 'UI/UX' | 'Branding' | 'Video Editing' | 'AI Automation';
  categoryLabel?: string;
  image: string; // Dedicated box image
  year: string;
  liveUrl: string; // Direct link to open in Chrome
  keywords: string[]; // 2-3 keywords
  featuredOnHome?: boolean;
  // Backward compatibility fields
  overview?: string;
  objectives?: string[];
  challenges?: string[];
  solutions?: string[];
  deliverables?: string[];
  technologies?: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  rating?: number;
  verified: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: ServiceId | '';
  budget: string;
  timeline: string;
  description: string;
}
