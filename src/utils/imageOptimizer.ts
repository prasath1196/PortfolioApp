/**
 * Image optimization utilities
 * 
 * This file contains utility functions for image optimization and handling
 */

/**
 * Creates a placeholder image for failed image loads
 * @param width Width of the placeholder
 * @param height Height of the placeholder
 * @param text Optional text to display in the placeholder
 * @returns Base64 encoded SVG placeholder
 */
export const createPlaceholderImage = (
  width: number = 400, 
  height: number = 300, 
  text?: string
): string => {
  // Create a simple SVG placeholder with a light purple background
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#6D28D9" opacity="0.1"/>
      ${text ? 
        `<text x="${width/2}" y="${height/2}" font-family="Arial" font-size="24" fill="#6D28D9" text-anchor="middle" dominant-baseline="middle">${text}</text>` 
        : 
        `<rect x="${width/2 - width/10}" y="${height/2 - height/10}" width="${width/5}" height="${height/5}" fill="#6D28D9" opacity="0.2"/>`
      }
    </svg>
  `;
  
  // Convert SVG to base64
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Handles image loading errors by replacing with a placeholder
 * @param event The error event from the image
 * @param fallbackText Optional text to display in the placeholder
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackText?: string
): void => {
  const target = event.target as HTMLImageElement;
  const width = target.width || 400;
  const height = target.height || 300;
  
  // Replace with placeholder
  target.src = createPlaceholderImage(width, height, fallbackText);
  
  // Remove onerror to prevent infinite loop
  target.onerror = null;
};

/**
 * Preloads critical images
 * @param imagePaths Array of image paths to preload
 */
export const preloadCriticalImages = (imagePaths: string[]): void => {
  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Lazy loads images that are about to enter the viewport
 * Uses Intersection Observer API
 */
export const setupLazyImageLoading = (): void => {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute('data-src');
            lazyImageObserver.unobserve(lazyImage);
          }
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      lazyImageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
      const image = img as HTMLImageElement;
      if (image.dataset.src) {
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
      }
    });
  }
};