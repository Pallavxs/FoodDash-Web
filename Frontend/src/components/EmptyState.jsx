import React from 'react';
import { Link } from 'react-router-dom';

/**
 * EmptyState Component
 * Displays helpful illustrations and call-to-actions when lists or states are empty.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  onActionClick,
  secondaryActionText,
  secondaryActionLink,
}) {
  return (
    <div className="w-full bg-white rounded-outer border border-[#E4DCD0]/80 shadow-sm p-8 sm:p-12 text-center flex flex-col items-center justify-center my-6">
      {Icon && (
        <div className="w-20 h-20 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-5 shadow-inner">
          <Icon size={38} strokeWidth={1.75} />
        </div>
      )}

      <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-fooddash-charcoal mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-fooddash-muted max-w-[440px] mx-auto mb-6 leading-relaxed">
          {description}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionText && actionLink && (
          <Link
            to={actionLink}
            className="h-[46px] px-7 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>{actionText}</span>
          </Link>
        )}

        {actionText && onActionClick && !actionLink && (
          <button
            type="button"
            onClick={onActionClick}
            className="h-[46px] px-7 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{actionText}</span>
          </button>
        )}

        {secondaryActionText && secondaryActionLink && (
          <Link
            to={secondaryActionLink}
            className="h-[46px] px-6 rounded-full bg-white border border-[#E4DCD0] text-fooddash-charcoal hover:text-primary hover:border-primary font-bold text-sm transition-all flex items-center gap-2 shadow-2xs"
          >
            <span>{secondaryActionText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
