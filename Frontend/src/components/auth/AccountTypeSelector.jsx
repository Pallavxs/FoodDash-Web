import React from 'react';

/**
 * AccountTypeSelector:
 * Segmented control switching between Customer and Vendor accounts with Tailwind.
 */
export default function AccountTypeSelector({ role, onChangeRole }) {
  return (
    <div
      className="flex items-center bg-fooddash-border-light rounded-full p-1 mb-6 relative border border-[#EAE3D9]"
      role="radiogroup"
      aria-label="Account type"
    >
      <button
        type="button"
        role="radio"
        aria-checked={role === 'customer'}
        onClick={() => onChangeRole('customer')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-bold text-sm transition-all duration-250 cursor-pointer outline-none select-none ${
          role === 'customer'
            ? 'bg-primary text-white shadow-button'
            : 'text-[#6B5E55] hover:text-fooddash-charcoal bg-transparent'
        }`}
      >
        <span className="text-base leading-none">🍽️</span>
        <span>Customer</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={role === 'vendor'}
        onClick={() => onChangeRole('vendor')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-bold text-sm transition-all duration-250 cursor-pointer outline-none select-none ${
          role === 'vendor'
            ? 'bg-primary text-white shadow-button'
            : 'text-[#6B5E55] hover:text-fooddash-charcoal bg-transparent'
        }`}
      >
        <span className="text-base leading-none">🏪</span>
        <span>Vendor</span>
      </button>
    </div>
  );
}
