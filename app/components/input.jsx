// ./components/input.jsx
import React from 'react';

export function Input({ placeholder, className, ...props }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`border border-gray-300 rounded-lg p-2 w-full ${className}`}
      {...props}
    />
  );
}
