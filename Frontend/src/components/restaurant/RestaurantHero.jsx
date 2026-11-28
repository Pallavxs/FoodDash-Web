import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export default function RestaurantHero({ heroImage, gallery = [] }) {
  const defaultFoodCover =
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';

  // Check if heroImage is a placeholder or generic coding image
  const isCodeOrBroken =
    !heroImage ||
    heroImage.includes('github') ||
    heroImage.includes('unsplash.com/photo-1555396273');

  const mainImage = isCodeOrBroken ? defaultFoodCover : heroImage;
  const hasGallery = Array.isArray(gallery) && gallery.length > 0;

  return (
    <div className="w-full mb-6">
      {/* Cover / Gallery Grid */}
      <div
        className={`grid grid-cols-1 ${
          hasGallery ? 'md:grid-cols-12' : ''
        } gap-3 sm:gap-4 h-[200px] sm:h-[260px] lg:h-[290px] overflow-hidden rounded-2xl sm:rounded-3xl border border-fooddash-border shadow-sm`}
      >
        {/* Left Side: Large Restaurant Image */}
        <div className={`${hasGallery ? 'md:col-span-8' : 'w-full'} h-full relative overflow-hidden group`}>
          <img
            src={mainImage}
            alt="Restaurant Ambience"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultFoodCover;
            }}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
        </div>

        {/* Right Side: Clean 2-photo image gallery stack if available */}
        {hasGallery && (
          <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-3 sm:gap-4 h-full">
            {gallery.slice(0, 2).map((imgUrl, idx) => (
              <div key={idx} className="relative overflow-hidden group rounded-xl">
                <img
                  src={imgUrl}
                  alt={`Restaurant Ambience ${idx + 1}`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = defaultFoodCover;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                {idx === 1 && (
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-white backdrop-blur-[2px] hover:bg-black/35 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                      <Camera size={16} />
                      <span>View all photos</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section Indicator Below the Cover: Order Online */}
      <div className="flex items-center gap-8 border-b border-fooddash-border mt-5 text-sm font-bold">
        <div className="pb-3 relative text-primary font-extrabold select-none">
          <span>Order Online</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
}
