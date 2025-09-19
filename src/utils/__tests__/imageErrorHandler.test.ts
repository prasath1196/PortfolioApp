import { describe, it, expect, vi } from 'vitest';
import { handleImageError, withImageErrorHandling } from '../imageErrorHandler';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

describe('handleImageError', () => {
  it('sets fallback image source on error', () => {
    const mockImg = {
      src: 'original-image.jpg',
      classList: {
        add: vi.fn()
      },
      alt: '',
      title: ''
    } as any;

    const mockEvent = {
      target: mockImg
    } as React.SyntheticEvent<HTMLImageElement, Event>;

    handleImageError(mockEvent);

    expect(mockImg.src).toBe('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMzMzMzMzMiLz48cGF0aCBkPSJNNzQuNSAxMDIuNUw5NSAxMjNMMTI1LjUgNzcuNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=');
    expect(mockImg.classList.add).toHaveBeenCalledWith('image-fallback');
  });

  it('adds fallback class to image', () => {
    const mockImg = {
      src: 'original-image.jpg',
      classList: {
        add: vi.fn()
      },
      alt: '',
      title: ''
    } as any;

    const mockEvent = {
      target: mockImg
    } as React.SyntheticEvent<HTMLImageElement, Event>;

    handleImageError(mockEvent);

    expect(mockImg.classList.add).toHaveBeenCalledWith('image-fallback');
  });

  it('sets alt text when not present', () => {
    const mockImg = {
      src: 'original-image.jpg',
      classList: {
        add: vi.fn()
      },
      alt: '',
      title: ''
    } as any;

    const mockEvent = {
      target: mockImg
    } as React.SyntheticEvent<HTMLImageElement, Event>;

    handleImageError(mockEvent);

    expect(mockImg.alt).toBe('Image could not be loaded');
    expect(mockImg.title).toBe('Image could not be loaded');
  });

  it('preserves existing alt text', () => {
    const mockImg = {
      src: 'original-image.jpg',
      classList: {
        add: vi.fn()
      },
      alt: 'Existing alt text',
      title: ''
    } as any;

    const mockEvent = {
      target: mockImg
    } as React.SyntheticEvent<HTMLImageElement, Event>;

    handleImageError(mockEvent);

    expect(mockImg.alt).toBe('Existing alt text');
    expect(mockImg.title).toBe('Image could not be loaded');
  });

  it('sets title attribute for tooltip', () => {
    const mockImg = {
      src: 'original-image.jpg',
      classList: {
        add: vi.fn()
      },
      alt: '',
      title: ''
    } as any;

    const mockEvent = {
      target: mockImg
    } as React.SyntheticEvent<HTMLImageElement, Event>;

    handleImageError(mockEvent);

    expect(mockImg.title).toBe('Image could not be loaded');
  });
});

describe('withImageErrorHandling HOC', () => {
  it('wraps component with error handling', () => {
    const TestComponent = ({ src, alt, onError }: any) => (
      React.createElement('img', { src, alt, onError })
    );

    const WrappedComponent = withImageErrorHandling(TestComponent);

    render(React.createElement(WrappedComponent, { src: "test-image.jpg", alt: "Test image" }));

    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
  });

  it('applies error handler to wrapped component', () => {
    const TestComponent = ({ src, alt, onError }: any) => (
      React.createElement('img', { src, alt, onError, 'data-testid': 'test-img' })
    );

    const WrappedComponent = withImageErrorHandling(TestComponent);

    render(React.createElement(WrappedComponent, { src: "broken-image.jpg", alt: "Test image" }));

    const img = screen.getByTestId('test-img');
    
    // Mock the error event
    Object.defineProperty(img, 'src', {
      writable: true,
      value: 'broken-image.jpg'
    });
    Object.defineProperty(img, 'classList', {
      writable: true,
      value: { add: vi.fn() }
    });

    fireEvent.error(img);

    // The error handler should have been called
    expect(img.src).toBe('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMzMzMzMzMiLz48cGF0aCBkPSJNNzQuNSAxMDIuNUw5NSAxMjNMMTI1LjUgNzcuNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=');
  });

  it('preserves original component props', () => {
    const TestComponent = ({ src, alt, className, onError }: any) => (
      React.createElement('img', { src, alt, className, onError })
    );

    const WrappedComponent = withImageErrorHandling(TestComponent);

    render(
      React.createElement(WrappedComponent, {
        src: "test-image.jpg",
        alt: "Test image",
        className: "custom-class"
      })
    );

    const img = screen.getByAltText('Test image');
    expect(img).toHaveClass('custom-class');
    expect(img).toHaveAttribute('src', 'test-image.jpg');
  });
});