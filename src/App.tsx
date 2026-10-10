import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { WorkPage } from './pages/WorkPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { QuickContactModal } from './components/QuickContactModal';
import { ServiceId } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);
  const [selectedContactService, setSelectedContactService] = useState<ServiceId | ''>('');

  // Handle browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartProject = (serviceId?: string) => {
    if (serviceId) {
      setSelectedContactService(serviceId as ServiceId);
    }
    navigate('/contact');
  };

  const isAdminRoute = currentPath === '/admin' || currentPath.startsWith('/admin/');

  // Route matching logic
  const renderCurrentRoute = () => {
    const path = currentPath;

    // Secret Admin Portal: ONLY accessible via /admin
    if (path === '/admin' || path.startsWith('/admin/')) {
      return <AdminPage navigate={navigate} />;
    }

    // Home
    if (path === '/' || path === '') {
      return (
        <HomePage
          navigate={navigate}
          onStartProject={() => handleStartProject()}
        />
      );
    }

    // About Us
    if (path === '/about') {
      return (
        <AboutPage
          navigate={navigate}
          onStartProject={() => handleStartProject()}
        />
      );
    }

    // Services Overview
    if (path === '/services') {
      return (
        <ServicesPage
          navigate={navigate}
          onStartProject={() => handleStartProject()}
        />
      );
    }

    // Individual Dedicated Service Pages: /services/:slug
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      return (
        <ServiceDetailPage
          slug={slug}
          navigate={navigate}
          onStartProject={(srvId) => handleStartProject(srvId)}
        />
      );
    }

    // Portfolio / Work
    if (path === '/work' || path.startsWith('/work/')) {
      return (
        <WorkPage
          navigate={navigate}
          onStartProject={() => handleStartProject()}
        />
      );
    }

    // Process
    if (path === '/process') {
      return (
        <ProcessPage
          navigate={navigate}
          onStartProject={() => handleStartProject()}
        />
      );
    }

    // Contact Us
    if (path === '/contact') {
      return (
        <ContactPage
          navigate={navigate}
          initialService={selectedContactService}
        />
      );
    }

    // Fallback: 404 / default to Home
    return (
      <HomePage
        navigate={navigate}
        onStartProject={() => handleStartProject()}
      />
    );
  };

  // If in Admin route, render dedicated admin portal without public navbar & footer
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#070709] text-white selection:bg-[rgb(99,142,255)] selection:text-white">
        {renderCurrentRoute()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col font-sans selection:bg-[rgb(99,142,255)] selection:text-white">
      {/* Top Premium Navigation Bar (NO admin button present) */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        onOpenProjectModal={() => handleStartProject()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentRoute()}
      </main>

      {/* Footer (NO admin button present) */}
      <Footer navigate={navigate} />

      {/* Quick Contact Modal */}
      <QuickContactModal
        isOpen={isQuickContactOpen}
        onClose={() => setIsQuickContactOpen(false)}
        initialService={selectedContactService}
      />
    </div>
  );
}
