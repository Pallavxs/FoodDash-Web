import React from 'react';
import { Link } from 'react-router-dom';

/**
 * FoodDash Text Branding Component
 * Clean text-based logo with consistent sizing across desktop and mobile:
 * - Desktop: 24–30px (text-2xl sm:text-[1.75rem])
 * - Mobile: 22–26px (text-xl sm:text-2xl)
 * - Font weight: 800/900 (font-black / font-extrabold)
 * - "Food" in charcoal (#1E140A), "Dash" in FoodDash red (#E52B23)
 */
export default function Logo({
  to = '/',
  subtitle,
  className = '',
  textSize = 'text-2xl sm:text-[1.75rem]'
}) {
  const content = (
    <div className={`flex flex-col select-none ${className}`}>
      <span className={`font-heading font-black tracking-tight text-fooddash-charcoal leading-none ${textSize}`}>
        Food<span className="text-primary">Dash</span>
      </span>
      {subtitle && (
        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-fooddash-muted leading-none mt-1">
          {subtitle}
        </span>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center group transition-opacity hover:opacity-95">
        {content}
      </Link>
    );
  }

  return content;
}
