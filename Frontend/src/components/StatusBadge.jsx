import React from 'react';

/**
 * StatusBadge Component
 * Renders stylized status badges with appropriate colors for orders and restaurants.
 */
export default function StatusBadge({ status, size = 'md' }) {
  const normalized = (status || '').toLowerCase().trim();

  let colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';
  let dotColor = 'bg-gray-400';

  if (normalized.includes('delivered') || normalized.includes('completed') || normalized === 'open' || normalized === 'active') {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (normalized.includes('out for delivery')) {
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
    dotColor = 'bg-blue-500 animate-pulse';
  } else if (normalized.includes('preparing')) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-500 animate-pulse';
  } else if (normalized.includes('confirmed')) {
    colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
    dotColor = 'bg-purple-500';
  } else if (normalized.includes('placed') || normalized.includes('pending')) {
    colorClasses = 'bg-orange-50 text-orange-700 border-orange-200';
    dotColor = 'bg-orange-500';
  } else if (normalized.includes('cancelled') || normalized.includes('rejected') || normalized === 'paused') {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  }

  const sizeClasses = size === 'sm' 
    ? 'text-[11px] px-2 py-0.5 gap-1.5' 
    : 'text-xs px-2.5 py-1 gap-2';

  return (
    <span className={`inline-flex items-center font-bold rounded-full border shadow-2xs whitespace-nowrap ${colorClasses} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{status || 'Unknown'}</span>
    </span>
  );
}
