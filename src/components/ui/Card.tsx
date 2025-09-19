import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong' | 'subtle' | 'frosted' | 'crystal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  gradient?: 'purple' | 'blue' | 'pink' | 'green' | 'none';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      hover = false,
      gradient = 'none',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'glass transition-all duration-300 ease-in-out';

    const variants = {
      default: 'glass-card',
      strong: 'glass-card-lg glass-strong',
      subtle: 'glass-card-sm glass-subtle',
      frosted: 'glass-frosted',
      crystal: 'glass-crystal',
    };

    const sizes = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const gradients = {
      purple: 'glass-gradient-purple',
      blue: 'glass-gradient-blue',
      pink: 'glass-gradient-pink',
      green: 'glass-gradient-green',
      none: '',
    };

    const hoverClasses = hover ? 'glass-hover cursor-pointer' : '';

    return (
      <div
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          gradients[gradient],
          hoverClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components for better composition
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-semibold leading-none tracking-tight text-white', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-white/70', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export default Card;