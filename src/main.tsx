import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/glassmorphism.css';
import './styles/animations.css';
import App from './App.tsx';
import { setupLazyImageLoading, preloadCriticalImages } from './utils/imageOptimizer';

// Preload critical images (hero section)
preloadCriticalImages([
  '/src/assets/images/professional-photo.svg'
]);

// Setup lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
  setupLazyImageLoading();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
