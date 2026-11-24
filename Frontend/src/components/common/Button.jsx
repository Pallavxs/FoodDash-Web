import React from 'react';

/**
 * Common Button component with Tailwind styling.
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) {
  const baseClasses =
    'w-full h-[50px] rounded-input font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer outline-none select-none';

  const variantClasses = {
    primary:
      'bg-primary text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none disabled:shadow-none bg-gradient-to-br from-primary to-primary-dark',
    secondary:
      'bg-white text-fooddash-charcoal border border-fooddash-border hover:border-primary hover:text-primary shadow-sm hover:shadow',
    outline:
      'bg-transparent text-primary border-2 border-primary hover:bg-primary-soft',
    ghost:
      'bg-transparent text-fooddash-body hover:text-primary p-2 h-auto',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-[18px] h-[18px] border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
