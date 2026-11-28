import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Trash2, Clock } from 'lucide-react';

/**
 * MenuItemCard Component
 * Displays a food item with image, name, category, price, veg/non-veg indicator,
 * availability status, and edit/delete actions.
 */
export default function MenuItemCard({ item = {}, onDelete }) {
  const itemId = item._id || item.id || '';
  const restId = item.restaurant?._id || item.restaurant?.id || item.restaurant || item.restaurantId || '';
  const name = item.name || 'Untitled Dish';
  const category = item.category || 'Main Course';
  const description = item.description || '';
  const price = item.price || 0;
  const isVeg = item.isVeg ?? true;
  const isAvailable = item.isAvailable ?? true;
  const prepTime = item.prepTime || '';
  const image = item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-white rounded-outer border border-[#E4DCD0]/80 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      {/* Visual Header */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
          <img
            src={image}
            alt={name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center bg-white shadow-sm border ${
                isVeg ? 'border-emerald-600' : 'border-rose-600'
              }`}
              title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wide">
              {category}
            </span>
          </div>

          {prepTime && (
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
              <Clock size={11} className="text-amber-300" />
              <span>{prepTime}</span>
            </div>
          )}

          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-fooddash-charcoal text-white font-extrabold text-xs shadow-md">
            ₹{price}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="font-heading font-extrabold text-base text-fooddash-charcoal leading-snug group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h4>
          </div>

          <p className="text-xs text-fooddash-muted leading-relaxed line-clamp-2 mb-3">
            {description}
          </p>

          {/* Availability Status */}
          <div className="inline-flex items-center gap-1.5 rounded-full text-[11px] font-bold tracking-wide">
            {isAvailable ? (
              <div className="text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available</span>
              </div>
            ) : (
              <div className="text-stone-600 bg-stone-100 border border-stone-200 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                <span>Out of Stock</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-[#E4DCD0]/70 flex items-center justify-between gap-3 bg-white">
        <Link
          to={restId ? `/vendor/restaurants/${restId}/menu/${itemId}/edit` : `/vendor/menu/${itemId}/edit`}
          className="flex-1 h-9 px-3 rounded-full border border-stone-200 hover:border-primary text-fooddash-charcoal hover:text-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-all bg-fooddash-cream/40 hover:bg-white"
        >
          <Edit3 size={13} />
          <span>Edit</span>
        </Link>

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(itemId, name)}
            className="w-9 h-9 rounded-full border border-stone-200 hover:border-rose-300 text-stone-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
            title="Delete Dish"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
