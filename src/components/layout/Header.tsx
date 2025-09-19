import React from 'react';
import Navigation from './Navigation';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`glass-nav ${className}`} role="banner">
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="skip-to-content focus-visible">
        Skip to content
      </a>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <a href="#hero" className="flex items-center space-x-2" aria-label="Go to homepage">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center" aria-hidden="true">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white font-semibold text-lg">Prasath Rajasekaran</span>
          </a>
        </div>

        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  );
};

export default Header;