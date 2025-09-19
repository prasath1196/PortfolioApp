import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import Contact from '../../components/sections/Contact';

// Mock EmailJS
const mockSend = vi.fn();
const mockInit = vi.fn();

vi.mock('@emailjs/browser', () => ({
  default: {
    send: mockSend,
    init: mockInit,
  },
}));

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_EMAILJS_SERVICE_ID: 'test_service_id',
    VITE_EMAILJS_TEMPLATE_ID: 'test_template_id',
    VITE_EMAILJS_PUBLIC_KEY: 'test_public_key',
  }
}));

describe('Form Submission Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mockSend.mockResolvedValue({ status: 200 });
  });

  const fillValidForm = async () => {
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/company/i), 'Test Company');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for coffee chat request.');
  };

  it('renders contact form with all required fields', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send coffee chat request/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send coffee chat request/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });

    // Form should not be submitted
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('shows real-time validation for email field', async () => {
    render(<Contact />);

    const emailInput = screen.getByLabelText(/email address/i);
    
    // Type invalid email
    await user.type(emailInput, 'invalid-email');
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    // Clear and type valid email
    await user.clear(emailInput);
    await user.type(emailInput, 'valid@example.com');

    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });
  });

  it('shows character count for message field', async () => {
    render(<Contact />);

    const messageInput = screen.getByLabelText(/message/i);
    const testMessage = 'Test message';
    
    await user.type(messageInput, testMessage);

    expect(screen.getByText(`${testMessage.length}/1000 characters`)).toBeInTheDocument();
  });

  it('validates message length constraints', async () => {
    render(<Contact />);

    const messageInput = screen.getByLabelText(/message/i);
    
    // Test minimum length
    await user.type(messageInput, 'Short');
    
    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });

    // Test maximum length
    await user.clear(messageInput);
    const longMessage = 'a'.repeat(1001);
    await user.type(messageInput, longMessage);

    await waitFor(() => {
      expect(screen.getByText('Message must be less than 1000 characters')).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    render(<Contact />);

    await fillValidForm();

    const submitButton = screen.getByRole('button', { name: /send coffee chat request/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSend).toHaveBeenCalledWith(
        'test_service_id',
        'test_template_id',
        expect.objectContaining({
          from_name: 'John Doe',
          from_email: 'john.doe@example.com',
          company: 'Test Company',
          message: 'This is a test message for coffee chat request.',
          reply_to: 'john.doe@example.com',
          subject: 'Coffee Chat Request from John Doe',
        })
      );
    });

    // Check success message
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
      expect(screen.getByText(/Thanks for reaching out! I'll get back to you within 24 hours/)).toBeInTheDocument();
    });

    // Form should be cleared
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('');
    expect(screen.getByLabelText(/company/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  it('handles form submission errors gracefully', async () => {
    mockSend.mockRejectedValue(new Error('Network error'));
    
    render(<Contact />);

    await fillValidForm();

    const submitButton = screen.getByRole('button', { name: /send coffee chat request/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to send message')).toBeInTheDocument();
      expect(screen.getByText(/Something went wrong with the email service/)).toBeInTheDocument();
    });

    // Form data should be preserved on error
    expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('john.doe@example.com');
  });

  it('shows loading state during form submission', async () => {
    // Make the mock return a promise that resolves after a delay
    mockSend.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ status: 200 }), 100)));
    
    render(<Contact />);

    await fillValidForm();

    const submitButton = screen.getByRole('button', { name: /send coffee chat request/i });
    await user.click(submitButton);

    // Check loading state
    expect(screen.getByText('Sending Message...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
    });
  });

  it('disables submit button when form has validation errors', async () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send coffee chat request/i });
    
    // Initially disabled due to empty form
    expect(submitButton).toBeDisabled();

    // Fill name only
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    
    // Still disabled due to missing required fields
    expect(submitButton).toBeDisabled();

    // Fill all required fields with valid data
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a valid message for testing.');

    // Should be enabled now
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('prevents rapid form submissions (rate limiting)', async () => {
    render(<Contact />);

    await fillValidForm();

    const submitButton = screen.getByRole('button', { name: /send coffee chat request/i });
    
    // First submission
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
    });

    // Fill form again
    await fillValidForm();

    // Try to submit again immediately
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to send message')).toBeInTheDocument();
      expect(screen.getByText('Please wait 30 seconds before submitting another message.')).toBeInTheDocument();
    });

    // Should only have been called once
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it('clears submit status when user starts typing again', async () => {
    render(<Contact />);

    await fillValidForm();

    const submitButton = screen.getByRole('button', { name: /send coffee chat request/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
    });

    // Start typing in name field
    const nameInput = screen.getByLabelText(/full name/i);
    await user.type(nameInput, ' Updated');

    // Success message should disappear
    await waitFor(() => {
      expect(screen.queryByText('Message sent successfully!')).not.toBeInTheDocument();
    });
  });

  it('handles company field as optional', async () => {
    render(<Contact />);

    // Fill required fields only (skip company)
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for coffee chat request.');

    const submitButton = screen.getByRole('button', { name: /send coffee chat request/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSend).toHaveBeenCalledWith(
        'test_service_id',
        'test_template_id',
        expect.objectContaining({
          company: 'Not specified', // Should default to this when empty
        })
      );
    });
  });

  it('maintains form accessibility throughout interaction', async () => {
    render(<Contact />);

    // Check ARIA attributes
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute('aria-required', 'true');
    expect(emailInput).toHaveAttribute('aria-required', 'true');
    expect(messageInput).toHaveAttribute('aria-required', 'true');

    // Type invalid email to trigger error
    await user.type(emailInput, 'invalid-email');

    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });

    // Fix email
    await user.clear(emailInput);
    await user.type(emailInput, 'valid@example.com');

    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-invalid', 'false');
    });
  });
});