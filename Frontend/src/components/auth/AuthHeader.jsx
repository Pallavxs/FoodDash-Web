import React from 'react';

/**
 * AuthHeader:
 * Displays page title and subtitle with Tailwind typography.
 */
export default function AuthHeader({ mode = 'register' }) {
  const isRegister = mode === 'register';

  return (
    <div className="mb-3 text-center">
      <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-fooddash-charcoal tracking-tight leading-tight mb-1">
        {isRegister ? 'Create Account' : 'Welcome Back'}
      </h1>
      <p className="text-xs sm:text-[13px] text-fooddash-muted leading-relaxed max-w-[340px] mx-auto">
        {isRegister
          ? 'Experience extraordinary flavors delivered straight to your door.'
          : 'Sign in to access your favorite restaurants, saved dishes, and orders.'}
      </p>
    </div>
  );
}
