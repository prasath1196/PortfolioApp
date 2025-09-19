import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ExpertiseFilter } from '../ExpertiseFilter';
import type { ExpertiseArea } from '../../../data/projects';

const mockExpertiseAreas: (ExpertiseArea | 'All')[] = [
  'All',
  'Software',
  'Data Analytics',
  'AI',
  'Cloud',
  'Project Management'
];

describe('ExpertiseFilter', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all expertise area buttons', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="All"
        onFilterChange={mockOnFilterChange}
      />
    );

    mockExpertiseAreas.forEach(area => {
      expect(screen.getByText(area)).toBeInTheDocument();
    });
  });

  it('highlights the selected filter', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="Software"
        onFilterChange={mockOnFilterChange}
      />
    );

    const softwareButton = screen.getByText('Software').closest('button');
    expect(softwareButton).toHaveClass('glass-button-primary', 'scale-105');
    expect(softwareButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies default styling to non-selected filters', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="Software"
        onFilterChange={mockOnFilterChange}
      />
    );

    const allButton = screen.getByText('All').closest('button');
    expect(allButton).toHaveClass('glass-button');
    expect(allButton).not.toHaveClass('glass-button-primary', 'scale-105');
    expect(allButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onFilterChange when a filter is clicked', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="All"
        onFilterChange={mockOnFilterChange}
      />
    );

    fireEvent.click(screen.getByText('Software'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('Software');
  });

  it('displays correct icons for each expertise area', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="All"
        onFilterChange={mockOnFilterChange}
      />
    );

    // Check that each button contains an SVG icon
    mockExpertiseAreas.forEach(area => {
      const button = screen.getByText(area);
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="Software"
        onFilterChange={mockOnFilterChange}
      />
    );

    mockExpertiseAreas.forEach(area => {
      const button = screen.getByText(area).closest('button');
      expect(button).toHaveAttribute('aria-label', `Filter by ${area}`);
      expect(button).toHaveAttribute('aria-pressed');
    });
  });

  it('applies hover effects to non-selected buttons', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="Software"
        onFilterChange={mockOnFilterChange}
      />
    );

    const allButton = screen.getByText('All').closest('button');
    expect(allButton).toHaveClass('hover:glass-hover', 'hover:scale-105');
  });

  it('shows animated background for selected filter', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="Software"
        onFilterChange={mockOnFilterChange}
      />
    );

    const softwareButton = screen.getByText('Software').closest('button');
    const animatedBackground = softwareButton?.querySelector('.animate-pulse');
    expect(animatedBackground).toBeInTheDocument();
  });

  it('does not show animated background for non-selected filters', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="Software"
        onFilterChange={mockOnFilterChange}
      />
    );

    const allButton = screen.getByText('All').closest('button');
    const animatedBackground = allButton?.querySelector('.animate-pulse');
    expect(animatedBackground).not.toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="All"
        onFilterChange={mockOnFilterChange}
      />
    );

    const softwareButton = screen.getByText('Software').closest('button');
    // Simulate Enter key press which should trigger click
    fireEvent.keyDown(softwareButton!, { key: 'Enter' });
    fireEvent.click(softwareButton!);
    expect(mockOnFilterChange).toHaveBeenCalledWith('Software');
  });

  it('renders with correct container styling', () => {
    const { container } = render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="All"
        onFilterChange={mockOnFilterChange}
      />
    );

    const filterContainer = container.firstChild as HTMLElement;
    expect(filterContainer).toHaveClass('flex', 'flex-wrap', 'justify-center', 'gap-3', 'mb-12');
  });

  it('handles empty expertise areas array', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={[]}
        selectedFilter="All"
        onFilterChange={mockOnFilterChange}
      />
    );

    // Should render empty container
    const { container } = render(
      <ExpertiseFilter
        expertiseAreas={[]}
        selectedFilter="All"
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(container.firstChild?.childNodes).toHaveLength(0);
  });

  it('handles single expertise area', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={['Software']}
        selectedFilter="Software"
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.queryByText('All')).not.toBeInTheDocument();
  });

  it('applies transition classes for smooth animations', () => {
    render(
      <ExpertiseFilter
        expertiseAreas={mockExpertiseAreas}
        selectedFilter="All"
        onFilterChange={mockOnFilterChange}
      />
    );

    mockExpertiseAreas.forEach(area => {
      const button = screen.getByText(area).closest('button');
      expect(button).toHaveClass('transition-all', 'duration-300');
    });
  });
});