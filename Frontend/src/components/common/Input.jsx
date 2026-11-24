import React from 'react';

/**
 * Common Input component with Tailwind styling.
 */
export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  autoComplete,
  error,
  rightElement,
  className = '',
  ...props
}) {
  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-fooddash-body mb-1.5 tracking-wide"
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-center bg-fooddash-input rounded-input px-3.5 h-12 transition-all duration-200 border ${
          error
            ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-100'
            : 'border-fooddash-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-soft'
        }`}
      >
        {Icon && (
          <span className={`mr-2.5 flex items-center flex-shrink-0 ${error ? 'text-red-500' : 'text-[#9E948B]'}`}>
            <Icon size={19} />
          </span>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className="flex-1 h-full border-none outline-none bg-transparent text-sm text-fooddash-charcoal placeholder-[#9E948B] w-full"
          {...props}
        />

        {rightElement && (
          <div className="ml-2 flex items-center flex-shrink-0">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <span className="block text-xs text-red-500 mt-1.5 ml-1 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
}
