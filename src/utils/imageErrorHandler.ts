import React from 'react';

/**
 * Utility function to handle image loading errors
 * Replaces broken images with a fallback placeholder
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
  const target = event.target as HTMLImageElement;
  
  // Set a fallback image
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMzMzMzMzMiLz48cGF0aCBkPSJNNzQuNSAxMDIuNUw5NSAxMjNMMTI1LjUgNzcuNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=';
  
  // Add a class to indicate it's a fallback image
  target.classList.add('image-fallback');
  
  // Add an appropriate alt text if not already present
  if (!target.alt) {
    target.alt = 'Image could not be loaded';
  }
  
  // Optional: Add a title attribute for tooltip on hover
  target.title = 'Image could not be loaded';
};

/**
 * HOC to add image error handling to any component that renders images
 */
export const withImageErrorHandling = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    return React.createElement(Component, { ...props, onError: handleImageError });
  };
};

export default handleImageError;