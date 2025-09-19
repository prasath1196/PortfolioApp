import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'glass-button inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

    const variants = {
      default: 'glass-button',
      primary: 'glass-button-primary',
      secondary: 'bg-glass-dark hover:bg-glass-dark-strong border-glass-border-dark',
      ghost: 'bg-transparent hover:bg-glass-light-subtle border-transparent hover:border-glass-border-subtle',
      outline: 'bg-transparent border-glass-border hover:bg-glass-light-subtle hover:border-glass-border-strong',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm rounded-glass-sm',
      md: 'px-6 py-3 text-base rounded-glass',
      lg: 'px-8 py-4 text-lg rounded-glass-lg',
      xl: 'px-10 py-5 text-xl rounded-glass-xl',
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          isLoading && 'glass-loading',
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;