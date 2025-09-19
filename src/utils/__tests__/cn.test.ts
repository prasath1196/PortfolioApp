import { describe, it, expect } from 'vitest';
import { cn } from '../cn';

describe('cn utility', () => {
  it('combines class names correctly', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles conditional classes', () => {
    const result = cn('base', true && 'conditional', false && 'hidden');
    expect(result).toBe('base conditional');
  });

  it('merges Tailwind classes correctly', () => {
    const result = cn('p-4', 'p-6'); // p-6 should override p-4
    expect(result).toBe('p-6');
  });

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles objects with boolean values', () => {
    const result = cn({
      'active': true,
      'disabled': false,
      'visible': true
    });
    expect(result).toBe('active visible');
  });

  it('handles undefined and null values', () => {
    const result = cn('base', undefined, null, 'end');
    expect(result).toBe('base end');
  });

  it('handles empty strings', () => {
    const result = cn('base', '', 'end');
    expect(result).toBe('base end');
  });

  it('handles complex Tailwind class merging', () => {
    const result = cn(
      'bg-red-500 text-white p-4',
      'bg-blue-500 p-6', // bg-blue-500 and p-6 should override
      'hover:bg-green-500'
    );
    expect(result).toContain('bg-blue-500');
    expect(result).toContain('p-6');
    expect(result).toContain('text-white');
    expect(result).toContain('hover:bg-green-500');
    expect(result).not.toContain('bg-red-500');
    expect(result).not.toContain('p-4');
  });

  it('handles responsive classes correctly', () => {
    const result = cn('w-full', 'md:w-1/2', 'lg:w-1/3');
    expect(result).toBe('w-full md:w-1/2 lg:w-1/3');
  });

  it('handles variant classes with conflicts', () => {
    const result = cn(
      'text-sm font-normal',
      'text-lg font-bold' // Should override text-sm and font-normal
    );
    expect(result).toContain('text-lg');
    expect(result).toContain('font-bold');
    expect(result).not.toContain('text-sm');
    expect(result).not.toContain('font-normal');
  });
});