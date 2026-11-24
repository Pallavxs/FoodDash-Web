import React from 'react';

/**
 * AuthHeader:
 * Displays page title and subtitle with Tailwind typography.
 */
export default function AuthHeader({ mode = 'register' }) {
  const isRegister = mode === 'register';

  return (
    <div className="mb-5 text-center">
      <h1 className="font-heading text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-fooddash-charcoal tracking-tight leading-tight mb-1.5">
        {isRegister ? 'Create Account' : 'Welcome Back'}
      </h1>
      <p className="text-sm text-fooddash-muted leading-relaxed max-w-[380px] mx-auto">
        {isRegister
          ? 'Experience extraordinary flavors delivered straight to your door.'
          : 'Sign in to access your favorite restaurants, saved dishes, and orders.'}
      </p>
    </div>
  );
}
