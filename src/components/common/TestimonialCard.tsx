import React from 'react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  image?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  className = '' 
}) => {
  return (
    <div className={`glass p-6 rounded-2xl ${className}`}>
      {/* Quote */}
      <div className="mb-6">
        <svg 
          className="w-8 h-8 text-white/60 mb-4" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
        <p className="text-white/90 text-lg leading-relaxed italic">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        {/* Author Photo */}
        <div className="flex-shrink-0">
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={`${testimonial.author} profile`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          
          {/* Fallback initials circle */}
          <div 
            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold"
            style={{ display: testimonial.image ? 'none' : 'flex' }}
          >
            {testimonial.author.split(' ').map(name => name[0]).join('')}
          </div>
        </div>

        {/* Author Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-base truncate">
            {testimonial.author}
          </h4>
          <p className="text-white/70 text-sm truncate">
            {testimonial.title}
          </p>
          <p className="text-white/60 text-sm truncate">
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};