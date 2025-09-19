// Export Hero directly as it's loaded eagerly (above the fold)
export { default as Hero } from './Hero';

// Other sections are lazy loaded in App.tsx
// These exports are kept for compatibility with any existing imports
export { default as Resume } from './Resume';
export { default as Projects } from './Projects';
export { default as Testimonials } from './Testimonials';
export { default as Contact } from './Contact';