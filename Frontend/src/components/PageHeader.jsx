import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * PageHeader Component
 * Clean top header for views with optional back button, badges, and action buttons.
 */
export default function PageHeader({
  title,
  subtitle,
  backLink,
  backText = 'Back',
  badge,
  actions,
  className = '',
}) {
  return (
    <div className={`mb-8 ${className}`}>
      {backLink && (
        <Link
          to={backLink}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-fooddash-muted hover:text-primary mb-3 transition-colors uppercase tracking-wider group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>{backText}</span>
        </Link>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {badge && (
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-soft text-primary text-[11px] font-extrabold uppercase tracking-wider mb-2 border border-primary/20">
              {badge}
            </div>
          )}
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-fooddash-charcoal tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-fooddash-muted mt-1 max-w-[650px] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
