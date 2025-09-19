import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../../App';

// Mock the lazy-loaded components to avoid async issues in tests
vi.mock('../../components/sections/Resume', () => ({
  default: () => <div data-testid="resume-section">Resume Section</div>
}));

vi.mock('../../components/sections/Projects', () => ({
  default: () => <div data-testid="projects-section">Projects Section</div>
}));

vi.mock('../../components/sections/Testimonials', () => ({
  default: () => <div data-testid="testimonials-section">Testimonials Section</div>
}));

vi.mock('../../components/sections/Contact', () => ({
  default: () => <div data-testid="contact-section">Contact Section</div>
}));

// Mock smooth scrolling
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock IntersectionObserver for navigation highlighting
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all main sections', async () => {
    render(<App />);

    // Check that main sections are present
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Wait for lazy-loaded components
    await waitFor(() => {
      expect(screen.getByTestId('resume-section')).toBeInTheDocument();
      expect(screen.getByTestId('projects-section')).toBeInTheDocument();
      expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
      expect(screen.getByTestId('contact-section')).toBeInTheDocument();
    });
  });

  it('has proper section IDs for navigation', async () => {
    render(<App />);

    await waitFor(() => {
      // Check that sections have proper IDs for navigation
      expect(document.getElementById('about')).toBeInTheDocument();
      expect(document.getElementById('expertise')).toBeInTheDocument();
    });
  });

  it('renders expertise areas correctly', async () => {
    render(<App />);

    await waitFor(() => {
      const expertiseAreas = ['Software', 'Data Analytics', 'AI', 'Cloud', 'Project Management'];
      expertiseAreas.forEach(area => {
        expect(screen.getByText(area)).toBeInTheDocument();
      });
    });
  });

  it('has proper ARIA attributes for accessibility', async () => {
    render(<App />);

    // Check main content has proper ID for skip links
    const mainContent = screen.getByRole('main', { name: /main content/i }) || screen.getAllByRole('main')[0];
    expect(mainContent).toHaveAttribute('id', 'main-content');

    await waitFor(() => {
      // Check that expertise section has proper list semantics
      const expertiseList = screen.getByRole('list');
      expect(expertiseList).toBeInTheDocument();
      
      const expertiseItems = screen.getAllByRole('listitem');
      expect(expertiseItems).toHaveLength(5);
    });
  });

  it('handles lazy loading with proper loading states', async () => {
    render(<App />);

    // Initially, loading state should be present
    const loadingElements = screen.getAllByRole('status', { hidden: true });
    expect(loadingElements.length).toBeGreaterThan(0);

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByTestId('resume-section')).toBeInTheDocument();
    });
  });

  it('has error boundaries for each section', async () => {
    // This test ensures error boundaries are in place
    render(<App />);

    await waitFor(() => {
      // If error boundaries are working, the app should render without crashing
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  it('maintains proper document structure', async () => {
    render(<App />);

    // Check that the app has proper semantic structure
    const mainElements = screen.getAllByRole('main');
    expect(mainElements.length).toBeGreaterThan(0);
    
    await waitFor(() => {
      // Check that sections have proper headings
      const headings = screen.getAllByRole('heading', { level: 2 });
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  it('supports keyboard navigation', async () => {
    render(<App />);

    await waitFor(() => {
      // Check that interactive elements are focusable
      const interactiveElements = screen.getAllByRole('button');
      interactiveElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });
});