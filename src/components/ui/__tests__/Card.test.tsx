import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('glass', 'glass-card');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Card variant="strong">Strong card</Card>);
    expect(screen.getByText('Strong card')).toHaveClass('glass-card-lg', 'glass-strong');

    rerender(<Card variant="subtle">Subtle card</Card>);
    expect(screen.getByText('Subtle card')).toHaveClass('glass-card-sm', 'glass-subtle');

    rerender(<Card variant="frosted">Frosted card</Card>);
    expect(screen.getByText('Frosted card')).toHaveClass('glass-frosted');

    rerender(<Card variant="crystal">Crystal card</Card>);
    expect(screen.getByText('Crystal card')).toHaveClass('glass-crystal');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Card size="sm">Small card</Card>);
    expect(screen.getByText('Small card')).toHaveClass('p-4');

    rerender(<Card size="md">Medium card</Card>);
    expect(screen.getByText('Medium card')).toHaveClass('p-6');

    rerender(<Card size="lg">Large card</Card>);
    expect(screen.getByText('Large card')).toHaveClass('p-8');

    rerender(<Card size="xl">Extra large card</Card>);
    expect(screen.getByText('Extra large card')).toHaveClass('p-10');
  });

  it('applies hover effects when hover prop is true', () => {
    render(<Card hover>Hoverable card</Card>);
    
    const card = screen.getByText('Hoverable card');
    expect(card).toHaveClass('glass-hover', 'cursor-pointer');
  });

  it('renders with gradient backgrounds', () => {
    const { rerender } = render(<Card gradient="purple">Purple gradient</Card>);
    expect(screen.getByText('Purple gradient')).toHaveClass('glass-gradient-purple');

    rerender(<Card gradient="blue">Blue gradient</Card>);
    expect(screen.getByText('Blue gradient')).toHaveClass('glass-gradient-blue');

    rerender(<Card gradient="pink">Pink gradient</Card>);
    expect(screen.getByText('Pink gradient')).toHaveClass('glass-gradient-pink');

    rerender(<Card gradient="green">Green gradient</Card>);
    expect(screen.getByText('Green gradient')).toHaveClass('glass-gradient-green');
  });

  it('handles click events when hoverable', () => {
    const handleClick = vi.fn();
    render(<Card hover onClick={handleClick}>Clickable card</Card>);
    
    fireEvent.click(screen.getByText('Clickable card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom card</Card>);
    
    const card = screen.getByText('Custom card');
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('glass'); // Should still have base classes
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Ref card</Card>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});

describe('CardHeader', () => {
  it('renders with correct styling', () => {
    render(<CardHeader>Header content</CardHeader>);
    
    const header = screen.getByText('Header content');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'pb-4');
  });

  it('applies custom className', () => {
    render(<CardHeader className="custom-header">Header</CardHeader>);
    
    const header = screen.getByText('Header');
    expect(header).toHaveClass('custom-header');
  });
});

describe('CardTitle', () => {
  it('renders as h3 with correct styling', () => {
    render(<CardTitle>Card Title</CardTitle>);
    
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-xl', 'font-semibold', 'text-white');
  });

  it('applies custom className', () => {
    render(<CardTitle className="custom-title">Title</CardTitle>);
    
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('custom-title');
  });
});

describe('CardDescription', () => {
  it('renders with correct styling', () => {
    render(<CardDescription>Card description</CardDescription>);
    
    const description = screen.getByText('Card description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm', 'text-white/70');
  });

  it('applies custom className', () => {
    render(<CardDescription className="custom-desc">Description</CardDescription>);
    
    const description = screen.getByText('Description');
    expect(description).toHaveClass('custom-desc');
  });
});

describe('CardContent', () => {
  it('renders with minimal styling', () => {
    render(<CardContent>Content</CardContent>);
    
    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CardContent className="custom-content">Content</CardContent>);
    
    const content = screen.getByText('Content');
    expect(content).toHaveClass('custom-content');
  });
});

describe('CardFooter', () => {
  it('renders with correct styling', () => {
    render(<CardFooter>Footer content</CardFooter>);
    
    const footer = screen.getByText('Footer content');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('flex', 'items-center', 'pt-4');
  });

  it('applies custom className', () => {
    render(<CardFooter className="custom-footer">Footer</CardFooter>);
    
    const footer = screen.getByText('Footer');
    expect(footer).toHaveClass('custom-footer');
  });
});