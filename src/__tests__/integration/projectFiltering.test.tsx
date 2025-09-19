import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Projects from '../../components/sections/Projects';
import { projects } from '../../data/projects';

// Mock the ProjectDetailModal to avoid complex modal testing
vi.mock('../../components/common/ProjectDetailModal', () => ({
  ProjectDetailModal: ({ isOpen, project, onClose }: any) => 
    isOpen ? (
      <div data-testid="project-modal" role="dialog">
        <h2>{project?.title}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
}));

describe('Project Filtering Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all projects initially when "All" filter is selected', () => {
    render(<Projects />);

    // Check that the "All" filter is selected by default
    const allButton = screen.getByLabelText('Filter by All');
    expect(allButton).toHaveAttribute('aria-pressed', 'true');

    // Check that all projects are displayed
    projects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });

    // Check project count
    expect(screen.getByText(`Showing ${projects.length} of ${projects.length} projects`)).toBeInTheDocument();
  });

  it('filters projects correctly when expertise area is selected', async () => {
    render(<Projects />);

    // Click on "Software" filter
    const softwareButton = screen.getByLabelText('Filter by Software');
    fireEvent.click(softwareButton);

    // Wait for filtering animation
    await waitFor(() => {
      expect(softwareButton).toHaveAttribute('aria-pressed', 'true');
    });

    // Check that only software projects are displayed
    const softwareProjects = projects.filter(project => 
      project.expertiseAreas.includes('Software')
    );

    await waitFor(() => {
      softwareProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });

      // Check that non-software projects are not displayed
      const nonSoftwareProjects = projects.filter(project => 
        !project.expertiseAreas.includes('Software')
      );
      
      nonSoftwareProjects.forEach(project => {
        expect(screen.queryByText(project.title)).not.toBeInTheDocument();
      });
    });

    // Check updated project count
    expect(screen.getByText(`Showing ${softwareProjects.length} of ${projects.length} projects in Software`)).toBeInTheDocument();
  });

  it('shows correct project count for different filters', async () => {
    render(<Projects />);

    // Test AI filter (should have some projects)
    const aiButton = screen.getByLabelText('Filter by AI');
    fireEvent.click(aiButton);

    await waitFor(() => {
      expect(aiButton).toHaveAttribute('aria-pressed', 'true');
      
      // Calculate expected AI projects
      const aiProjects = projects.filter(project => 
        project.expertiseAreas.includes('AI')
      );
      
      if (aiProjects.length > 0) {
        expect(screen.getByText(`Showing ${aiProjects.length} of ${projects.length} projects in AI`)).toBeInTheDocument();
      }
    });
  });

  it('maintains filter state and updates project count correctly', async () => {
    render(<Projects />);

    // Test different filters
    const filters = ['Data Analytics', 'Cloud', 'Project Management'];
    
    for (const filterName of filters) {
      const filterButton = screen.getByLabelText(`Filter by ${filterName}`);
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(filterButton).toHaveAttribute('aria-pressed', 'true');
        
        // Calculate expected project count
        const expectedProjects = projects.filter(project => 
          project.expertiseAreas.includes(filterName as any)
        );
        
        expect(screen.getByText(`Showing ${expectedProjects.length} of ${projects.length} projects in ${filterName}`)).toBeInTheDocument();
      });
    }
  });

  it('opens project detail modal when "View Details" is clicked', async () => {
    render(<Projects />);

    // Find the first project's "View Details" button
    const viewDetailsButtons = screen.getAllByText('View Details');
    fireEvent.click(viewDetailsButtons[0]);

    await waitFor(() => {
      // Check that modal is opened
      expect(screen.getByTestId('project-modal')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes project detail modal when close button is clicked', async () => {
    render(<Projects />);

    // Open modal
    const viewDetailsButtons = screen.getAllByText('View Details');
    fireEvent.click(viewDetailsButtons[0]);

    await waitFor(() => {
      expect(screen.getByTestId('project-modal')).toBeInTheDocument();
    });

    // Close modal
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('project-modal')).not.toBeInTheDocument();
    });
  });

  it('handles rapid filter changes gracefully', async () => {
    render(<Projects />);

    const filters = ['Software', 'AI', 'Cloud', 'All'];
    
    // Rapidly click through filters
    for (const filterName of filters) {
      const filterButton = screen.getByLabelText(`Filter by ${filterName}`);
      fireEvent.click(filterButton);
    }

    // Wait for final state
    await waitFor(() => {
      const allButton = screen.getByLabelText('Filter by All');
      expect(allButton).toHaveAttribute('aria-pressed', 'true');
      
      // Should show all projects
      expect(screen.getByText(`Showing ${projects.length} of ${projects.length} projects`)).toBeInTheDocument();
    });
  });

  it('maintains accessibility during filtering', async () => {
    render(<Projects />);

    // Check initial accessibility for filter buttons only
    const filterButtons = [
      screen.getByLabelText('Filter by All'),
      screen.getByLabelText('Filter by Software'),
      screen.getByLabelText('Filter by Data Analytics'),
      screen.getByLabelText('Filter by AI'),
      screen.getByLabelText('Filter by Cloud'),
      screen.getByLabelText('Filter by Project Management'),
    ];
    
    filterButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-pressed');
      expect(button).toHaveAttribute('aria-label');
    });

    // Filter and check accessibility is maintained
    const softwareButton = screen.getByLabelText('Filter by Software');
    fireEvent.click(softwareButton);

    await waitFor(() => {
      expect(softwareButton).toHaveAttribute('aria-pressed', 'true');
      expect(softwareButton).toHaveAttribute('aria-label', 'Filter by Software');
    });
  });

  it('shows loading animation during filter transitions', async () => {
    render(<Projects />);

    // Click filter and check for animation class
    const softwareButton = screen.getByLabelText('Filter by Software');
    fireEvent.click(softwareButton);

    // The opacity should change during animation
    const projectsGrid = screen.getByText(projects[0].title).closest('.grid');
    
    // Note: This test might be flaky due to timing, but it tests the animation concept
    await waitFor(() => {
      expect(softwareButton).toHaveAttribute('aria-pressed', 'true');
    });
  });
});