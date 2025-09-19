import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header />
      <div className="flex-1 pt-20">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;