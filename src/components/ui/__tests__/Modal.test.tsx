import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Modal, { ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from '../Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    // Reset body overflow style before each test
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = 'unset';
  });

  it('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(
      <Modal {...defaultProps} title="Test Title" description="Test Description" />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders close button by default', () => {
    render(<Modal {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(<Modal {...defaultProps} showCloseButton={false} />);
    
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />);
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when Escape key is pressed and closeOnEscape is false', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Modal {...defaultProps} size="sm" />);
    expect(screen.getByRole('dialog').firstChild).toHaveClass('max-w-md');

    rerender(<Modal {...defaultProps} size="md" />);
    expect(screen.getByRole('dialog').firstChild).toHaveClass('max-w-2xl');

    rerender(<Modal {...defaultProps} size="lg" />);
    expect(screen.getByRole('dialog').firstChild).toHaveClass('max-w-4xl');

    rerender(<Modal {...defaultProps} size="xl" />);
    expect(screen.getByRole('dialog').firstChild).toHaveClass('max-w-6xl');

    rerender(<Modal {...defaultProps} size="full" />);
    expect(screen.getByRole('dialog').firstChild).toHaveClass('max-w-[95vw]');
  });

  it('locks body scroll when open', () => {
    render(<Modal {...defaultProps} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(<Modal {...defaultProps} />);
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<Modal {...defaultProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('unset');
  });

  it('focuses first focusable element when opened', () => {
    render(
      <Modal {...defaultProps}>
        <button>First button</button>
        <button>Second button</button>
      </Modal>
    );

    // The close button should be focused when modal opens
    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toHaveFocus();
  });

  it('applies custom className', () => {
    render(<Modal {...defaultProps} className="custom-modal" />);
    
    const modalContent = screen.getByRole('dialog').firstChild;
    expect(modalContent).toHaveClass('custom-modal');
  });

  it('sets correct ARIA attributes', () => {
    render(
      <Modal {...defaultProps} title="Test Title" description="Test Description" />
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
  });
});

describe('ModalHeader', () => {
  it('renders with correct styling', () => {
    render(<ModalHeader>Header content</ModalHeader>);
    
    const header = screen.getByText('Header content');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('p-6', 'pb-4', 'border-b');
  });
});

describe('ModalTitle', () => {
  it('renders with correct styling', () => {
    render(<ModalTitle>Modal Title</ModalTitle>);
    
    const title = screen.getByText('Modal Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'text-white');
  });
});

describe('ModalDescription', () => {
  it('renders with correct styling', () => {
    render(<ModalDescription>Modal description</ModalDescription>);
    
    const description = screen.getByText('Modal description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-white/70');
  });
});

describe('ModalContent', () => {
  it('renders with correct styling', () => {
    render(<ModalContent>Content</ModalContent>);
    
    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('p-6');
  });
});

describe('ModalFooter', () => {
  it('renders with correct styling', () => {
    render(<ModalFooter>Footer content</ModalFooter>);
    
    const footer = screen.getByText('Footer content');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('p-6', 'pt-4', 'border-t', 'flex', 'justify-end');
  });
});