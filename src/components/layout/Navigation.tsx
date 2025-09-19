import React, { useState, useEffect } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationProps {
  className?: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'hero', label: 'About', href: '#hero' },
  { id: 'resume', label: 'Resume', href: '#resume' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll function - handles both mouse and keyboard events
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, 
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80; // Account for fixed header
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Set focus to the target section for better accessibility
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    }
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, href: string) => {
    // Trigger navigation on Enter or Space key
    if (e.key === 'Enter' || e.key === ' ') {
      handleSmoothScroll(e, href);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${className}`}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1" role="navigation">
        <ul className="flex items-center space-x-1 list-none" role="menubar">
          {navigationItems.map((item) => (
            <li key={item.id} role="none">
              <a
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                onKeyDown={(e) => handleKeyDown(e, item.href)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  hover:bg-white/10 hover:backdrop-blur-sm
                  ${activeSection === item.id 
                    ? 'bg-white/15 text-white border border-white/20' 
                    : 'text-white/80 hover:text-white'
                  }
                `}
                role="menuitem"
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li role="none">
            <a
              href="https://prasath-rajasekaran.tiiny.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-primary-600 hover:bg-primary-700 text-white border border-primary-500 hover:border-primary-400 inline-flex items-center gap-2"
              role="menuitem"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CV
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center" aria-hidden="true">
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Slide-out Panel */}
          <div id="mobile-menu" className="absolute top-0 right-0 h-full w-80 max-w-[80vw] glass-strong animate-slide-in-right">
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-all duration-300"
                  aria-label="Close mobile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation Items */}
              <nav>
                <ul className="flex flex-col space-y-3 list-none" role="menu">
                  {navigationItems.map((item) => (
                    <li key={item.id} role="none">
                      <a
                        href={item.href}
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                        onKeyDown={(e) => handleKeyDown(e, item.href)}
                        className={`
                          px-4 py-3 rounded-lg text-base font-medium transition-all duration-300
                          hover:bg-white/10 hover:scale-105
                          ${activeSection === item.id 
                            ? 'bg-white/15 text-white border border-white/20 shadow-lg' 
                            : 'text-white/80 hover:text-white'
                          }
                        `}
                        role="menuitem"
                        aria-current={activeSection === item.id ? 'page' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li role="none">
                    <a
                      href="https://prasath-rajasekaran.tiiny.site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 bg-primary-600 hover:bg-primary-700 text-white border border-primary-500 hover:border-primary-400 inline-flex items-center gap-2 hover:scale-105"
                      role="menuitem"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download CV
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;