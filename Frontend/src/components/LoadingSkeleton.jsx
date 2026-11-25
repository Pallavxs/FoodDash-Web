import React from 'react';

/**
 * LoadingSkeleton Component
 * Placeholder skeleton loaders for restaurants, cards, and lists.
 */
export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  if (type === 'row') {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-16 w-full rounded-xl bg-stone-200/60 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-outer border border-[#E4DCD0]/70 overflow-hidden shadow-sm animate-pulse">
          <div className="aspect-[16/10] bg-stone-200/70" />
          <div className="p-5 flex flex-col gap-3">
            <div className="h-5 w-2/3 bg-stone-200/80 rounded" />
            <div className="h-4 w-1/2 bg-stone-100 rounded" />
            <div className="h-4 w-full bg-stone-100 rounded mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
