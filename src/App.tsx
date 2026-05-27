/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId, ServiceId, BlogPost } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEOManager from './components/SEOManager';
import SEOInspector from './components/SEOInspector';
import PolicyModals from './components/PolicyModals';
import WhatsAppWidget from './components/WhatsAppWidget';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import { SERVICES_DATA } from './data';
import { DEFAULT_BLOG_POSTS } from './blogData';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [activeServiceId, setActiveServiceId] = useState<ServiceId | null>(null);
  const [activeModal, setActiveModal] = useState<'privacy' | 'guidelines' | 'sitemap' | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Load and synchronize dynamic educational guides state
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lagos_ivf_blog_posts');
      if (stored) {
        setBlogPosts(JSON.parse(stored));
      } else {
        localStorage.setItem('lagos_ivf_blog_posts', JSON.stringify(DEFAULT_BLOG_POSTS));
        setBlogPosts(DEFAULT_BLOG_POSTS);
      }
    } catch (e) {
      setBlogPosts(DEFAULT_BLOG_POSTS);
    }
  }, []);

  const handleUpdateBlogPosts = (updatedPosts: BlogPost[]) => {
    setBlogPosts(updatedPosts);
    localStorage.setItem('lagos_ivf_blog_posts', JSON.stringify(updatedPosts));
  };

  const handleResetToDefaults = () => {
    localStorage.setItem('lagos_ivf_blog_posts', JSON.stringify(DEFAULT_BLOG_POSTS));
    setBlogPosts(DEFAULT_BLOG_POSTS);
  };

  // Scroll to top upon page navigation trigger
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage, activeServiceId]);

  // Command routers
  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    setActiveServiceId(null);
  };

  const handleNavigateToService = (serviceId: ServiceId | null) => {
    setActivePage('services');
    setActiveServiceId(serviceId);
  };

  const handleBookWithService = (serviceId: ServiceId) => {
    setActivePage('book');
    setActiveServiceId(null);
  };

  const currentService = SERVICES_DATA.find(s => s.id === activeServiceId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDFC] text-navy-950 font-sans selection:bg-orange-100 selection:text-orange-950">
      
      {/* 1. Dynamic document metadata & schema injector (SEO from the get-go) */}
      <SEOManager pageId={activePage} currentService={currentService} />

      {/* 2. Primary Navigation Bar */}
      <Navbar 
        activePage={activePage} 
        onNavigate={handleNavigate} 
        onNavigateToService={handleNavigateToService} 
      />

      {/* 3. Main Dynamic Content Hub */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <Home 
            onNavigate={handleNavigate} 
            onNavigateToService={handleNavigateToService} 
          />
        )}
        
        {activePage === 'about' && (
          <About />
        )}
        
        {activePage === 'services' && (
          <Services 
            activeServiceId={activeServiceId} 
            onNavigateToService={handleNavigateToService} 
            onBookWithService={handleBookWithService} 
            onNavigate={handleNavigate}
          />
        )}
        
        {activePage === 'contact' && (
          <Contact />
        )}
        
        {activePage === 'book' && (
          <BookAppointment 
            initialServiceId={activeServiceId} 
          />
        )}

        {activePage === 'blog' && (
          <Blog 
            blogPosts={blogPosts}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'admin' && (
          <Admin 
            blogPosts={blogPosts}
            onUpdateBlogPosts={handleUpdateBlogPosts}
            onResetToDefaults={handleResetToDefaults}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 4. Global Foot notesitemap & disclaimers */}
      <Footer 
        onNavigate={handleNavigate} 
        onNavigateToService={handleNavigateToService} 
        onOpenPrivacy={() => setActiveModal('privacy')}
        onOpenGuidelines={() => setActiveModal('guidelines')}
        onOpenSitemap={() => setActiveModal('sitemap')}
      />

      {/* 5. Floating Interactive Crawler Verification System */}
      <SEOInspector pageId={activePage} currentService={currentService} />

      {/* 6. Dynamic Modal Overlays */}
      <PolicyModals 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)} 
        onNavigate={handleNavigate} 
        onNavigateToService={handleNavigateToService} 
      />

      {/* 7. Dedicated Instant WhatsApp Floating Specialist Chat */}
      <WhatsAppWidget />

    </div>
  );
}
