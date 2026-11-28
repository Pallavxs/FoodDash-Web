import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';

/**
 * RestaurantCard Component
 * Displays restaurant presentation card, ratings, delivery time, location,
 * and seamless navigation to restaurant details and digital menu.
 */
export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  const restaurantId = restaurant._id || restaurant.id || '1';

  const {
    name = 'Artisan Kitchen',
    image = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    cuisine = 'Artisan Dishes',
    location = 'Neighborhood Kitchen',
    rating = 4.8,
    deliveryTime = '25-35',
    priceRange = '$$',
  } = restaurant;

  const displayDelivery = deliveryTime ? `${deliveryTime} mins` : '25–35 mins';
  const displayRating = rating ? Number(rating).toFixed(1) : '4.8';

  return (
    <Link
      to={`/restaurants/${restaurantId}`}
      className="bg-white rounded-2xl sm:rounded-outer border border-[#E6E2DA] shadow-xs hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Visual Header / Food Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Ambient Gradient overlay for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30 opacity-80" />

        {/* Top Badges Strip */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {cuisine ? (
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider border border-white/15 shadow-xs">
              {cuisine}
            </span>
          ) : (
            <span />
          )}

          {/* Rating Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold shadow-sm">
            <Star size={11} fill="currentColor" strokeWidth={0} />
            <span>{displayRating}</span>
          </div>
        </div>

        {/* Bottom Delivery Time Badge */}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/10 shadow-xs">
          <Clock size={12} className="text-amber-300" />
          <span>{displayDelivery}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-extrabold text-fooddash-charcoal group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-fooddash-muted line-clamp-1 mb-3">
            <MapPin size={13} className="shrink-0 text-primary" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="pt-3.5 border-t border-[#EAE5DC] flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-fooddash-muted uppercase tracking-wider">
            {priceRange || '$$'} • Freshly Cooked
          </span>

          <div className="h-8 px-3.5 rounded-full bg-fooddash-cream group-hover:bg-primary text-fooddash-charcoal group-hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all duration-200 border border-[#E6E2DA] group-hover:border-primary">
            <span>View Menu</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
