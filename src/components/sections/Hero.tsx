import React, { useState, useEffect } from 'react';
import professionalPhoto from '../../assets/images/professional_photo.jpg';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    ' Fault-Tolerant APIs ⚙️',
    'Zero-Downtime Deployments 🚀',
    'Payments Infrastructure That Scales 💳',
    'Scalable Cloud Infrastructure ☁️',  
    'AI-Native Systems Powered by LLMs 🤖'
  ];

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, roles]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center relative px-6 ${className}`}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/20 via-blue-900/10 to-navy-800/20" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center hero-fade-in">
        {/* Professional photo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 glass-crystal p-2 hero-photo-glow hero-photo-crop">
              <img
                src={professionalPhoto}
                alt="Professional headshot"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM2RDI4RDkiIG9wYWNpdHk9IjAuMiIvPjxwYXRoIGQ9Ik0xMDAgNjBDODMuNDMxNSA2MCA3MCA3My40MzE1IDcwIDkwQzcwIDEwNi41NjkgODMuNDMxNSAxMjAgMTAwIDEyMEMxMTYuNTY5IDEyMCAxMzAgMTA2LjU2OSAxMzAgOTBDMTMwIDczLjQzMTUgMTE2LjU2OSA2MCAxMDAgNjBaIiBmaWxsPSIjNkQyOEQ5IiBvcGFjaXR5PSIwLjQiLz48cGF0aCBkPSJNNTUgMTYwQzU1IDE0Mi45MDkgNjguOTA4NiAxMjkgODYgMTI5SDExNEMxMzEuMDkxIDEyOSAxNDUgMTQyLjkwOSAxNDUgMTYwVjE3MEMxNDUgMTcxLjEwNSAxNDQuMTA1IDE3MiAxNDMgMTcySDU3QzU1Ljg5NTQgMTcyIDU1IDE3MS4xMDUgNTUgMTcwVjE2MFoiIGZpbGw9IiM2RDI4RDkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==';
                }}
              />
            </div>
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-blue-600/30 blur-2xl -z-10 animate-pulse" />
          </div>
        </div>

        {/* Name and title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow-lg">
            Prasath Rajasekaran
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light h-12 flex items-center justify-center">
            <span className="mr-2">I build</span>
            <span className="text-blue-300 font-medium min-w-[280px] text-left">
              {displayText}
              <span className="typing-cursor">|</span>
            </span>
          </div>
        </div>

        {/* Brief introduction */}
        <div className="mb-12">
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-6 text-left">
              <li className="flex items-start gap-4 text-lg md:text-xl text-white/90 leading-relaxed">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
                  </svg>
                </div>
                <span>Software Engineer with <strong className="text-blue-300">6 years of experience</strong> at Financial Technology startups backed by Artis Ventures, Fuel Ventures, operating at Series A/Seed stages with 50–100 employees</span>
              </li>
              
              <li className="flex items-start gap-4 text-lg md:text-xl text-white/90 leading-relaxed">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span>Scaled reliability for <strong className="text-green-300">100k+ users</strong> by cutting fee errors by <strong className="text-green-300">75%</strong> through resilient microservice design</span>
              </li>
              
              <li className="flex items-start gap-4 text-lg md:text-xl text-white/90 leading-relaxed">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Accelerated release cycles by <strong className="text-purple-300">50%</strong> and automated e-KYC onboarding with OCR, improving onboarding time by <strong className="text-purple-300">3 days</strong></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass-button-primary text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
          >
            View My Work
          </button>
          <button
            onClick={() => window.open('https://prasath-rajasekaran.tiiny.site/', '_blank')}
            className="glass-button text-lg px-8 py-4 hover:scale-105 transition-transform duration-300 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass-button text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
          >
            Let's Connect
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 mb-16">
          <a
            href="https://github.com/prasath1196/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-300 group"
            aria-label="GitHub Profile"
          >
            <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/prasath-rajasekaran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-300 group"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center text-white/70 hover:text-white transition-all duration-300 group"
          aria-label="Scroll to next section"
        >
          <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Scroll Down
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-white/50 transition-colors duration-300">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 scroll-indicator group-hover:bg-white/70" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;