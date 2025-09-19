import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Form,
  FormField,
  Label,
  Input,
  Textarea,
  Select,
  Checkbox,
  ErrorMessage,
  HelperText
} from '../Form';

describe('Form', () => {
  it('renders with default props', () => {
    render(
      <Form>
        <div>Form content</div>
      </Form>
    );
    
    const form = screen.getByText('Form content').closest('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass('space-y-6');
    expect(form).toHaveAttribute('noValidate');
  });

  it('applies ARIA attributes', () => {
    render(
      <Form ariaLabel="Contact form" ariaDescribedBy="form-description">
        <div>Form content</div>
      </Form>
    );
    
    const form = screen.getByLabelText('Contact form');
    expect(form).toHaveAttribute('aria-describedby', 'form-description');
  });

  it('handles form submission', () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    
    fireEvent.click(screen.getByText('Submit'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('FormField', () => {
  it('renders with default styling', () => {
    render(
      <FormField>
        <div>Field content</div>
      </FormField>
    );
    
    const field = screen.getByText('Field content').parentElement;
    expect(field).toHaveClass('space-y-2');
  });

  it('applies error styling', () => {
    render(
      <FormField error>
        <div>Error field</div>
      </FormField>
    );
    
    const field = screen.getByText('Error field').parentElement;
    expect(field).toHaveClass('animate-pulse');
  });
});

describe('Label', () => {
  it('renders with default styling', () => {
    render(<Label>Field label</Label>);
    
    const label = screen.getByText('Field label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-white');
  });

  it('shows required indicator', () => {
    render(<Label required>Required field</Label>);
    
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-400');
  });

  it('associates with form control', () => {
    render(
      <>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" />
      </>
    );
    
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });
});

describe('Input', () => {
  it('renders with default styling', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('glass-input');
  });

  it('applies error styling', () => {
    render(<Input error placeholder="Error input" />);
    
    const input = screen.getByPlaceholderText('Error input');
    expect(input).toHaveClass('border-red-400/50', 'bg-red-500/10');
  });

  it('renders with left icon', () => {
    const leftIcon = <span data-testid="left-icon">🔍</span>;
    render(<Input leftIcon={leftIcon} placeholder="Search" />);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Search');
    expect(input).toHaveClass('pl-10');
  });

  it('renders with right icon', () => {
    const rightIcon = <span data-testid="right-icon">✓</span>;
    render(<Input rightIcon={rightIcon} placeholder="Valid input" />);
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Valid input');
    expect(input).toHaveClass('pr-10');
  });

  it('handles input changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Type here" />);
    
    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies ARIA attributes for accessibility', () => {
    render(
      <Input
        ariaInvalid
        ariaDescribedBy="help-text"
        ariaErrorMessage="error-message"
        placeholder="Accessible input"
      />
    );
    
    const input = screen.getByPlaceholderText('Accessible input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'help-text');
    expect(input).toHaveAttribute('aria-errormessage', 'error-message');
  });
});

describe('Textarea', () => {
  it('renders with default styling', () => {
    render(<Textarea placeholder="Enter message" />);
    
    const textarea = screen.getByPlaceholderText('Enter message');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('glass-textarea');
  });

  it('applies error styling', () => {
    render(<Textarea error placeholder="Error textarea" />);
    
    const textarea = screen.getByPlaceholderText('Error textarea');
    expect(textarea).toHaveClass('border-red-400/50', 'bg-red-500/10');
  });

  it('handles textarea changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} placeholder="Type message" />);
    
    const textarea = screen.getByPlaceholderText('Type message');
    fireEvent.change(textarea, { target: { value: 'test message' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe('Select', () => {
  it('renders with options', () => {
    render(
      <Select>
        <option value="">Choose option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass('glass-select');
    expect(screen.getByText('Choose option')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('applies error styling', () => {
    render(
      <Select error>
        <option>Error select</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-400/50', 'bg-red-500/10');
  });

  it('handles selection changes', () => {
    const handleChange = vi.fn();
    render(
      <Select onChange={handleChange}>
        <option value="">Choose</option>
        <option value="test">Test Option</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Accept terms');
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('handles checkbox changes', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test checkbox" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies error styling', () => {
    render(<Checkbox label="Error checkbox" error />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('border-red-400/50');
  });

  it('generates unique ID when not provided', () => {
    render(<Checkbox label="Auto ID checkbox" />);
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Auto ID checkbox');
    
    expect(checkbox).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', checkbox.getAttribute('id'));
  });
});

describe('ErrorMessage', () => {
  it('renders with error styling and icon', () => {
    render(<ErrorMessage>This field is required</ErrorMessage>);
    
    const message = screen.getByText('This field is required');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-sm', 'text-red-400');
    
    // Check for error icon
    const icon = message.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});

describe('HelperText', () => {
  it('renders with helper styling', () => {
    render(<HelperText>This is helpful information</HelperText>);
    
    const helper = screen.getByText('This is helpful information');
    expect(helper).toBeInTheDocument();
    expect(helper).toHaveClass('text-sm', 'text-white/60');
  });
});