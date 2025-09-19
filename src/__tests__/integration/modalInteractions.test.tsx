import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ProjectDetailModal } from '../../components/common/ProjectDetailModal';
import type { Project } from '../../data/projects';

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  description: 'This is a test project description',
  longDescription: 'This is a longer description for the test project with more details about the implementation and features.',
  image: 'https://example.com/image.jpg',
  technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  category: 'work',
  expertiseAreas: ['Software', 'Cloud'],
  liveUrl: 'https://example.com/live',
  githubUrl: 'https://github.com/example/project',
  featured: true
};

describe('Modal Interactions Integration Tests', () => {
  const user = userEvent.setup();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.open
    vi.stubGlobal('open', vi.fn());
  });

  it('renders modal with project details when open', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Check modal is rendered
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    // Check project details are displayed
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
    expect(screen.getByText('This is a longer description for the test project with more details about the implementation and features.')).toBeInTheDocument();
    
    // Check expertise areas
    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('Cloud')).toBeInTheDocument();
    
    // Check technologies
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('does not render when isOpen is false', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={false}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not render when project is null', () => {
    render(
      <ProjectDetailModal
        project={null}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const closeButtons = screen.getAllByLabelText('Close modal');
    await user.click(closeButtons[0]); // Click the X button

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('closes modal when "Close" button is clicked', async () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByText('Close');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('opens live demo in new tab when "View Live Demo" is clicked', async () => {
    const mockOpen = vi.fn();
    vi.stubGlobal('open', mockOpen);

    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const liveDemoButton = screen.getByText('View Live Demo');
    await user.click(liveDemoButton);

    expect(mockOpen).toHaveBeenCalledWith('https://example.com/live', '_blank');
  });

  it('opens GitHub repository in new tab when "View Source Code" is clicked', async () => {
    const mockOpen = vi.fn();
    vi.stubGlobal('open', mockOpen);

    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const sourceCodeButton = screen.getByText('View Source Code');
    await user.click(sourceCodeButton);

    expect(mockOpen).toHaveBeenCalledWith('https://github.com/example/project', '_blank');
  });

  it('does not render live demo button when liveUrl is not provided', () => {
    const projectWithoutLiveUrl = { ...mockProject, liveUrl: undefined };
    
    render(
      <ProjectDetailModal
        project={projectWithoutLiveUrl}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText('View Live Demo')).not.toBeInTheDocument();
  });

  it('does not render source code button when githubUrl is not provided', () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: undefined };
    
    render(
      <ProjectDetailModal
        project={projectWithoutGithub}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText('View Source Code')).not.toBeInTheDocument();
  });

  it('handles image loading error with fallback', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

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

  it('closes modal when Escape key is pressed', async () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    await user.keyboard('{Escape}');

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('closes modal when clicking outside the modal content', async () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const modalOverlay = screen.getByRole('dialog');
    await user.click(modalOverlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('maintains focus within modal (focus trap)', async () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Get all focusable elements
    const closeButton = screen.getAllByLabelText('Close modal')[0];
    const liveDemoButton = screen.getByText('View Live Demo');
    const sourceCodeButton = screen.getByText('View Source Code');
    const modalCloseButton = screen.getByText('Close');

    // Focus should start on the first focusable element
    expect(closeButton).toHaveFocus();

    // Tab through elements
    await user.tab();
    expect(liveDemoButton).toHaveFocus();

    await user.tab();
    expect(sourceCodeButton).toHaveFocus();

    await user.tab();
    expect(modalCloseButton).toHaveFocus();
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    
    // Check that close buttons have proper labels
    const closeButtons = screen.getAllByLabelText('Close modal');
    expect(closeButtons).toHaveLength(2); // X button and modal's built-in close button
  });

  it('displays project information in correct sections', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Check section headings
    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByText('Technologies Used')).toBeInTheDocument();

    // Check that long description is displayed in the details section
    const detailsSection = screen.getByText('Project Details').closest('div');
    expect(detailsSection).toContainElement(screen.getByText(/This is a longer description/));
  });

  it('handles projects with many technologies correctly', () => {
    const projectWithManyTechs = {
      ...mockProject,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Jest', 'Docker', 'AWS', 'GraphQL']
    };

    render(
      <ProjectDetailModal
        project={projectWithManyTechs}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // All technologies should be displayed
    projectWithManyTechs.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('handles projects with multiple expertise areas', () => {
    const projectWithManyAreas = {
      ...mockProject,
      expertiseAreas: ['Software', 'Data Analytics', 'AI', 'Cloud', 'Project Management'] as any
    };

    render(
      <ProjectDetailModal
        project={projectWithManyAreas}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // All expertise areas should be displayed as badges
    projectWithManyAreas.expertiseAreas.forEach(area => {
      expect(screen.getByText(area)).toBeInTheDocument();
    });
  });

  it('preserves line breaks in long description', () => {
    const projectWithMultilineDescription = {
      ...mockProject,
      longDescription: 'First paragraph.\n\nSecond paragraph with more details.\n\nThird paragraph with conclusion.'
    };

    render(
      <ProjectDetailModal
        project={projectWithMultilineDescription}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const description = screen.getByText(/First paragraph/);
    expect(description).toHaveClass('whitespace-pre-line');
  });
});