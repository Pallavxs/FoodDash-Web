import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';

/**
 * RestaurantCard Component
 * Displays restaurant information, rating, delivery time, location, and links to restaurant details.
 */
export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  const {
    id = '1',
    name = 'Artisan Kitchen',
    image = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    cuisine = 'Artisan Dishes',
    location = 'Neighborhood Kitchen',
    rating = 4.8,
    deliveryTime = '25-35',
    priceRange = '$$',
    distance = '1.2 miles',
  } = restaurant;

  const displayDelivery = deliveryTime ? `${deliveryTime} mins` : '25-35 mins';

  return (
    <Link
      to={`/restaurants/${id}`}
      className="bg-white rounded-outer border border-[#E4DCD0]/80 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Visual Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
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
          <span>{rating}</span>
        </div>

        {/* Price Range */}
        {priceRange && (
          <div className="absolute top-2.5 left-2.5 inline-flex items-center px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-extrabold">
            {priceRange}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {name}
          </h3>

          <p className="text-xs font-semibold text-fooddash-muted capitalize line-clamp-1 mb-3">
            {cuisine}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E4DCD0]/60 flex items-center justify-between text-xs text-fooddash-light">
          <div className="flex items-center gap-1 text-fooddash-muted line-clamp-1">
            <MapPin size={13} className="shrink-0 text-primary" />
            <span className="truncate">{location}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-primary group-hover:translate-x-0.5 transition-transform shrink-0">
            <span>View Menu</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}
