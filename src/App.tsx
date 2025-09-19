import React, { lazy, Suspense } from 'react';
import { Layout } from './components/layout';
import { Card, CardContent, LoadingState } from './components/ui';
import { Hero } from './components/sections';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

// Lazy load components for code splitting
const Resume = lazy(() => import('./components/sections/Resume'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const Contact = lazy(() => import('./components/sections/Contact'));



function App() {
  return (
    <ErrorBoundary>
      {/* Floating Tech Icons */}
      <div className="floating-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M8 6L4 16L8 26M24 6L28 16L24 26" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="floating-icon">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <ellipse cx="14" cy="7" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 7V21C6 23.2091 9.58172 25 14 25C18.4183 25 22 23.2091 22 21V7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 14C6 16.2091 9.58172 18 14 18C18.4183 18 22 16.2091 22 14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="floating-icon">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="15" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 6H21M9 9L12 21M21 9L18 21" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="floating-icon">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M20 15C22.2091 15 24 13.2091 24 11C24 8.79086 22.2091 7 20 7C19.82 7 19.64 7.01 19.47 7.03C18.6 4.64 16.46 3 14 3C10.69 3 8 5.69 8 9C8 9.2 8.01 9.39 8.04 9.58C6.28 9.9 5 11.4 5 13.2C5 15.3 6.7 17 8.8 17H20Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="floating-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <text x="2" y="8" fontFamily="monospace" fontSize="4" fill="currentColor">Py</text>
          <text x="2" y="16" fontFamily="monospace" fontSize="4" fill="currentColor">Rb</text>
        </svg>
      </div>
      <div className="floating-icon">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 3V19M3 11H19" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <Layout>
        {/* Main content container with ID for skip link */}
        <main id="main-content">
        {/* Hero Section - Not lazy loaded as it's above the fold */}
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>



        {/* Lazy loaded sections with Suspense */}
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center" aria-live="polite" aria-busy="true"><LoadingState /></div>}>
          {/* Resume Section */}
          <ErrorBoundary>
            <Resume />
          </ErrorBoundary>

          {/* Projects Section */}
          <ErrorBoundary>
            <Projects />
          </ErrorBoundary>



          {/* Testimonials Section */}
          <ErrorBoundary>
            <Testimonials />
          </ErrorBoundary>

          {/* Contact Section */}
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </Suspense>
        </main>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
