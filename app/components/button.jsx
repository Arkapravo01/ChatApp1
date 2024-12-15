// ./components/button.jsx
import React from 'react';

export function Button({ variant, size, className, children, ...props }) {
  // Define base styles for the button
  const baseStyles = 'px-4 py-2 rounded-md text-sm font-medium';
  
  // Apply variant and size styles if provided
  const variantStyles = variant === 'ghost' ? 'bg-transparent' : 'bg-blue-500 text-white';
  const sizeStyles = size === 'icon' ? 'h-8 w-8' : 'h-10 w-32';
  
  // Combine all styles
  const buttonClasses = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`;
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
