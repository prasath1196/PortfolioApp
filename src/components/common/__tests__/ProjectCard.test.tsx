import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectCard } from '../ProjectCard';
import type { Project } from '../../../data/projects';

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  description: 'This is a test project description',
  longDescription: 'This is a longer description for the test project',
  image: 'https://example.com/image.jpg',
  technologies: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'],
  category: 'work',
  expertiseAreas: ['Software', 'Cloud'],
  liveUrl: 'https://example.com/live',
  githubUrl: 'https://github.com/example/project',
  featured: true
};

describe('ProjectCard', () => {
  const mockOnViewDetails = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Project')).toBeInTheDocument();
  });

  it('displays featured badge when project is featured', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('does not display featured badge when project is not featured', () => {
    const nonFeaturedProject = { ...mockProject, featured: false };
    render(<ProjectCard project={nonFeaturedProject} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });

  it('displays project category', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.getByText('work')).toBeInTheDocument();
  });

  it('displays expertise areas as badges', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('Cloud')).toBeInTheDocument();
  });

  it('displays first 4 technologies and shows count for remaining', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('displays all technologies when there are 4 or fewer', () => {
    const projectWithFewTechs = {
      ...mockProject,
      technologies: ['React', 'TypeScript', 'Tailwind']
    };
    render(<ProjectCard project={projectWithFewTechs} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
  });

  it('calls onViewDetails when View Details button is clicked', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    fireEvent.click(screen.getByText('View Details'));
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockProject);
  });

  it('renders live URL button when liveUrl is provided', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    const buttons = screen.getAllByRole('button');
    // Should have 3 buttons: View Details, Live URL, GitHub
    expect(buttons).toHaveLength(3);
    
    // Check for external link icon in one of the buttons
    const liveButton = buttons.find(button => 
      button.querySelector('path[d*="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"]')
    );
    expect(liveButton).toBeInTheDocument();
  });

  it('renders GitHub button when githubUrl is provided', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    const buttons = screen.getAllByRole('button');
    // Check for GitHub icon in one of the buttons
    const githubButton = buttons.find(button => 
      button.querySelector('path[d*="M12 0c-6.626 0-12 5.373-12 12"]')
    );
    expect(githubButton).toBeInTheDocument();
  });

  it('does not render live URL button when liveUrl is not provided', () => {
    const projectWithoutLiveUrl = { ...mockProject, liveUrl: undefined };
    render(<ProjectCard project={projectWithoutLiveUrl} onViewDetails={mockOnViewDetails} />);
    
    const buttons = screen.getAllByRole('button');
    // Should only have 2 buttons: View Details and GitHub
    expect(buttons).toHaveLength(2);
    
    // Check that no button has external link icon
    const liveButton = buttons.find(button => 
      button.querySelector('path[d*="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"]')
    );
    expect(liveButton).toBeUndefined();
  });

  it('does not render GitHub button when githubUrl is not provided', () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: undefined };
    render(<ProjectCard project={projectWithoutGithub} onViewDetails={mockOnViewDetails} />);
    
    const buttons = screen.getAllByRole('button');
    // Should only have 2 buttons: View Details and Live URL
    expect(buttons).toHaveLength(2);
    
    // Check that no button has GitHub icon
    const githubButton = buttons.find(button => 
      button.querySelector('path[d*="M12 0c-6.626 0-12 5.373-12 12"]')
    );
    expect(githubButton).toBeUndefined();
  });

  it('opens live URL in new tab when live button is clicked', () => {
    const mockOpen = vi.fn();
    vi.stubGlobal('open', mockOpen);
    
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    const buttons = screen.getAllByRole('button');
    const liveButton = buttons.find(button => 
      button.querySelector('path[d*="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"]')
    );
    
    fireEvent.click(liveButton!);
    expect(mockOpen).toHaveBeenCalledWith('https://example.com/live', '_blank');
  });

  it('opens GitHub URL in new tab when GitHub button is clicked', () => {
    const mockOpen = vi.fn();
    vi.stubGlobal('open', mockOpen);
    
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    const buttons = screen.getAllByRole('button');
    const githubButton = buttons.find(button => 
      button.querySelector('path[d*="M12 0c-6.626 0-12 5.373-12 12"]')
    );
    
    fireEvent.click(githubButton!);
    expect(mockOpen).toHaveBeenCalledWith('https://github.com/example/project', '_blank');
  });

  it('handles image loading error with fallback', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    const image = screen.getByAltText('Test Project') as HTMLImageElement;
    
    // Mock the error event
    Object.defineProperty(image, 'onerror', {
      writable: true,
      value: null
    });
    
    fireEvent.error(image);
    
    // Should set fallback image
    expect(image.src).toContain('data:image/svg+xml');
  });

  it('prevents event propagation when external buttons are clicked', () => {
    const mockOpen = vi.fn();
    vi.stubGlobal('open', mockOpen);
    
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    const buttons = screen.getAllByRole('button');
    const liveButton = buttons.find(button => 
      button.querySelector('path[d*="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"]')
    );
    
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation');
    
    fireEvent(liveButton!, clickEvent);
    
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('applies hover effects with correct CSS classes', () => {
    render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails} />);
    
    const card = screen.getByText('Test Project').closest('.group');
    expect(card).toHaveClass('hover:scale-105', 'transition-all', 'duration-300', 'cursor-pointer');
  });
});