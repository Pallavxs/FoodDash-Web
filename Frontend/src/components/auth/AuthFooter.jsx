import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AuthFooter:
 * Bottom row with account mode toggle link and terms of service.
 */
export default function AuthFooter({ mode = 'register', onToggleMode }) {
  const isRegister = mode === 'register';

  return (
    <div className="mt-5 text-center">
      <div className="flex items-center justify-center gap-1.5 text-sm text-fooddash-body">
        <span>
          {isRegister ? 'Already have an account?' : "Don't have an account yet?"}
        </span>
        <Link
          to={isRegister ? '/login' : '/register'}
          onClick={onToggleMode}
          className="text-primary font-bold hover:underline underline-offset-4 cursor-pointer outline-none bg-transparent p-0.5"
        >
          {isRegister ? 'Sign In' : 'Create Account'}
        </Link>
      </div>

      <p className="mt-3.5 text-xs text-fooddash-light leading-relaxed">
        By continuing, you agree to FoodDash’s{' '}
        <span className="text-fooddash-muted underline hover:text-primary transition-colors cursor-pointer">
          Terms of Service
        </span>{' '}
        and{' '}
        <span className="text-fooddash-muted underline hover:text-primary transition-colors cursor-pointer">
          Privacy Policy
        </span>.
      </p>
    </div>
  );
}
