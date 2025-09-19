import React from 'react';
import { cn } from '../../utils/cn';

// Form Container
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ariaLabel, ariaDescribedBy, ...props }, ref) => (
    <form
      ref={ref}
      className={cn('space-y-6', className)}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      noValidate={props.noValidate !== false} // Default to true for client-side validation
      {...props}
    >
      {children}
    </form>
  )
);
Form.displayName = 'Form';

// Form Field Container
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  error?: boolean;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, children, error, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('space-y-2', error && 'animate-pulse', className)}
      {...props}
    >
      {children}
    </div>
  )
);
FormField.displayName = 'FormField';

// Label
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium text-white mb-2',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  )
);
Label.displayName = 'Label';

// Input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  ariaErrorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, ariaInvalid, ariaDescribedBy, ariaErrorMessage, ...props }, ref) => {
    const baseClasses = 'glass-input';
    const errorClasses = error 
      ? 'border-red-400/50 bg-red-500/10 focus:border-red-400 focus:ring-red-400/20' 
      : '';
    
    const inputProps = {
      ref,
      className: cn(baseClasses, errorClasses, className),
      'aria-invalid': ariaInvalid || error || undefined,
      'aria-describedby': ariaDescribedBy,
      'aria-errormessage': ariaErrorMessage,
      ...props
    };

    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" aria-hidden="true">
              {leftIcon}
            </div>
          )}
          <input
            {...inputProps}
            className={cn(
              inputProps.className,
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return <input {...inputProps} />;
  }
);
Input.displayName = 'Input';

// Textarea
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  ariaErrorMessage?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ariaInvalid, ariaDescribedBy, ariaErrorMessage, ...props }, ref) => {
    const errorClasses = error 
      ? 'border-red-400/50 bg-red-500/10 focus:border-red-400 focus:ring-red-400/20' 
      : '';

    return (
      <textarea
        ref={ref}
        className={cn('glass-textarea', errorClasses, className)}
        aria-invalid={ariaInvalid || error || undefined}
        aria-describedby={ariaDescribedBy}
        aria-errormessage={ariaErrorMessage}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

// Select
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    const errorClasses = error 
      ? 'border-red-400/50 bg-red-500/10 focus:border-red-400 focus:ring-red-400/20' 
      : '';

    return (
      <select
        ref={ref}
        className={cn('glass-select', errorClasses, className)}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

// Checkbox
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'w-5 h-5 rounded border-2 border-glass-border bg-glass-light-subtle',
              'checked:bg-primary-500 checked:border-primary-500',
              'focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0',
              'transition-all duration-200',
              error && 'border-red-400/50',
              className
            )}
            {...props}
          />
          <svg
            className="absolute top-0.5 left-0.5 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm text-white cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

// Error Message
export interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const ErrorMessage = React.forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-red-400 flex items-center gap-1', className)}
      {...props}
    >
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </p>
  )
);
ErrorMessage.displayName = 'ErrorMessage';

// Helper Text
export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-white/60', className)}
      {...props}
    >
      {children}
    </p>
  )
);
HelperText.displayName = 'HelperText';

export default Form;