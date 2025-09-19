import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestimonialCard } from '../TestimonialCard';

const mockTestimonial = {
  id: '1',
  quote: 'This is an excellent testimonial about the work quality.',
  author: 'John Doe',
  title: 'Senior Developer',
  company: 'Tech Company Inc.',
  image: 'https://example.com/john-doe.jpg'
};

describe('TestimonialCard', () => {
  it('renders testimonial content correctly', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByText('"This is an excellent testimonial about the work quality."')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Company Inc.')).toBeInTheDocument();
  });

  it('displays author image when provided', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const image = screen.getByAltText('John Doe profile');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/john-doe.jpg');
  });

  it('displays initials fallback when no image is provided', () => {
    const testimonialWithoutImage = { ...mockTestimonial, image: undefined };
    render(<TestimonialCard testimonial={testimonialWithoutImage} />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.queryByAltText('John Doe profile')).not.toBeInTheDocument();
  });

  it('handles image loading error by showing initials fallback', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const image = screen.getByAltText('John Doe profile') as HTMLImageElement;
    
    // Mock the error event
    Object.defineProperty(image, 'style', {
      writable: true,
      value: { display: '' }
    });
    
    Object.defineProperty(image, 'nextElementSibling', {
      writable: true,
      value: {
        style: { display: '' }
      }
    });
    
    fireEvent.error(image);
    
    expect(image.style.display).toBe('none');
  });

  it('generates correct initials for single name', () => {
    const singleNameTestimonial = { ...mockTestimonial, author: 'Madonna' };
    render(<TestimonialCard testimonial={singleNameTestimonial} />);
    
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('generates correct initials for multiple names', () => {
    const multipleNameTestimonial = { ...mockTestimonial, author: 'Mary Jane Watson' };
    render(<TestimonialCard testimonial={multipleNameTestimonial} />);
    
    expect(screen.getByText('MJW')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TestimonialCard testimonial={mockTestimonial} className="custom-class" />
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('glass', 'p-6', 'rounded-2xl'); // Should still have base classes
  });

  it('renders quote icon', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const quoteIcon = screen.getByText('"This is an excellent testimonial about the work quality."')
      .closest('div')?.querySelector('svg');
    expect(quoteIcon).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('glass', 'p-6', 'rounded-2xl');
  });

  it('handles long text content appropriately', () => {
    const longTestimonial = {
      ...mockTestimonial,
      quote: 'This is a very long testimonial that should still be displayed properly without breaking the layout or causing any issues with the component rendering.',
      author: 'Very Long Name That Should Be Truncated',
      title: 'Senior Software Engineer and Team Lead',
      company: 'Very Long Company Name That Should Also Be Truncated'
    };
    
    render(<TestimonialCard testimonial={longTestimonial} />);
    
    expect(screen.getByText(`"${longTestimonial.quote}"`)).toBeInTheDocument();
    expect(screen.getByText(longTestimonial.author)).toBeInTheDocument();
    expect(screen.getByText(longTestimonial.title)).toBeInTheDocument();
    expect(screen.getByText(longTestimonial.company)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const image = screen.getByAltText('John Doe profile');
    expect(image).toHaveAttribute('alt', 'John Doe profile');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  it('applies proper text styling for different elements', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const quote = screen.getByText('"This is an excellent testimonial about the work quality."');
    expect(quote).toHaveClass('text-white/90', 'text-lg', 'leading-relaxed', 'italic');
    
    const author = screen.getByText('John Doe');
    expect(author).toHaveClass('text-white', 'font-semibold', 'text-base', 'truncate');
    
    const title = screen.getByText('Senior Developer');
    expect(title).toHaveClass('text-white/70', 'text-sm', 'truncate');
    
    const company = screen.getByText('Tech Company Inc.');
    expect(company).toHaveClass('text-white/60', 'text-sm', 'truncate');
  });
});