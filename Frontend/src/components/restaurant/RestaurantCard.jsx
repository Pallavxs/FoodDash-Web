import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import fallbackImage from '../../assets/images/login-banner.png';

/**
 * Helper to safely resolve image paths from backend (Cloudinary or local static uploads).
 */
export const getRestaurantImageUrl = (image) => {
  if (!image) return fallbackImage;
  if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) {
    return image;
  }
  if (typeof image === 'string' && image.startsWith('/')) {
    return `http://localhost:3000${image}`;
  }
  return `http://localhost:3000/${image}`;
};

/**
 * RestaurantCard component:
 * Displays single restaurant card using the FoodDash brand design system.
 */
export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  const {
    name,
    image,
    cuisine,
    location,
    rating,
    deliveryTime,
  } = restaurant;

  const displayRating = rating && rating !== '0' && rating !== 0 ? rating : '4.5';
  const displayDelivery = deliveryTime ? `${deliveryTime} mins` : '25-35 mins';
  const displayCuisine = cuisine || 'Artisan Dishes';
  const displayLocation = location || 'Neighborhood Kitchen';

  return (
    <article className="bg-white rounded-outer border border-[#E4DCD0]/80 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer">
      {/* Visual Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={getRestaurantImageUrl(image)}
          alt={name || 'Restaurant image'}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Ambient Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Delivery Time Badge */}
        <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide shadow-sm">
          <Clock size={12} className="text-amber-300" />
          <span>{displayDelivery}</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
          <Star size={11} fill="currentColor" />
          <span>{displayRating}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal group-hover:text-primary transition-colors line-clamp-1">
              {name || 'Artisan Kitchen'}
            </h3>
          </div>

          <p className="text-xs font-semibold text-fooddash-muted capitalize line-clamp-1 mb-2">
            {displayCuisine}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E4DCD0]/60 flex items-center justify-between text-xs text-fooddash-light">
          <div className="flex items-center gap-1 text-fooddash-muted line-clamp-1">
            <MapPin size={13} className="shrink-0 text-primary" />
            <span className="truncate">{displayLocation}</span>
          </div>
          <span className="text-[11px] font-bold text-primary group-hover:underline underline-offset-2 shrink-0">
            View Menu →
          </span>
        </div>
      </div>
    </article>
  );
}
