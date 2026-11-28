import React from 'react';
import { Plus, Star, Sparkles, Store } from 'lucide-react';

/**
 * FoodCard Component
 * Displays a delicious food dish with image, veg indicator, description, price, and Add CTA.
 */
export default function FoodCard({ food, onAdd }) {
  if (!food) return null;

  const {
    _id,
    id = _id,
    name = 'Delicious Dish',
    description = '',
    price = 0,
    category = 'Main Course',
    image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    isVeg = true,
    rating = 4.8,
    isPopular = false,
    available,
    isAvailable = available ?? true,
    restaurant,
  } = food;

  const restaurantName = restaurant?.name || (typeof restaurant === 'string' ? '' : '');

  return (
    <div className={`bg-white rounded-outer border border-[#E4DCD0]/80 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group ${!isAvailable ? 'opacity-70 grayscale-20' : ''}`}>
      {/* Food Visual */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm">
          <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center p-0.5 ${isVeg ? 'border-emerald-600' : 'border-rose-600'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
          </div>
          <span className="text-[10px] font-bold tracking-tight text-fooddash-charcoal">
            {isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Category Tag */}
        {category && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wide shadow-sm">
            <span>{category}</span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {restaurantName && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-fooddash-muted mb-1 truncate">
              <Store size={12} className="text-primary shrink-0" />
              <span className="truncate">{restaurantName}</span>
            </div>
          )}

          <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal group-hover:text-primary transition-colors line-clamp-1 mt-0.5 mb-1.5">
            {name}
          </h3>
          <p className="text-xs text-fooddash-muted line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Bottom Price & Add Button */}
        <div className="pt-3 border-t border-[#E4DCD0]/70 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-fooddash-muted">Price</span>
            <span className="font-heading text-lg font-extrabold text-fooddash-charcoal">
              ₹{price}
            </span>
          </div>

          <button
            type="button"
            onClick={onAdd}
            disabled={!isAvailable}
            className={`h-[40px] px-4 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
              isAvailable
                ? 'bg-primary hover:bg-primary-dark text-white shadow-button hover:shadow-button-hover active:scale-95 cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>{isAvailable ? 'Add' : 'Sold Out'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
