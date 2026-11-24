import React from 'react';

/**
 * Loading skeleton placeholder for restaurant cards.
 */
export default function RestaurantSkeleton() {
  return (
    <div className="bg-white rounded-outer border border-[#E4DCD0]/70 overflow-hidden shadow-sm animate-pulse flex flex-col">
      {/* Image Skeleton */}
      <div className="aspect-[16/10] bg-stone-200 relative" />

      {/* Content Skeleton */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-stone-200 rounded-md w-3/4" />
          <div className="h-4 bg-stone-200 rounded-md w-10" />
        </div>
        <div className="h-3.5 bg-stone-200 rounded-md w-1/2" />
        <div className="pt-3 border-t border-[#E4DCD0]/60 flex items-center justify-between">
          <div className="h-3 bg-stone-200 rounded-md w-2/3" />
          <div className="h-3 bg-stone-200 rounded-md w-12" />
        </div>
      </div>
    </div>
  );
}
