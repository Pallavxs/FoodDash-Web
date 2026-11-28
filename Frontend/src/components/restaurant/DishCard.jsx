import React from 'react';
import { Star, Plus, Minus, Check } from 'lucide-react';

export default function DishCard({
  dish,
  quantity = 0,
  onSelectDish,
  onAddDish,
  onUpdateQuantity
}) {
  const dishId = dish?._id || dish?.id;
  const isAdded = quantity > 0;

  return (
    <div
      onClick={() => onSelectDish && onSelectDish(dish)}
      className="bg-white rounded-2xl border border-stone-200/80 p-4 sm:p-5 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group hover:shadow-sm hover:border-primary/40 shadow-2xs"
    >
      {/* Left Info Column */}
      <div className="flex-1 space-y-1.5 pr-0 sm:pr-4">
        {/* Indicators: Veg/Non-Veg + Bestseller */}
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-xs border flex items-center justify-center p-0.5 bg-white ${
              (dish.isVeg ?? true) ? 'border-emerald-600' : 'border-rose-600'
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                (dish.isVeg ?? true) ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </div>

          {dish.isBestseller && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
              ★ Bestseller
            </span>
          )}
        </div>

        {/* Dish Name */}
        <h4 className="font-heading text-base sm:text-lg font-extrabold text-fooddash-charcoal group-hover:text-primary transition-colors leading-snug">
          {dish.name}
        </h4>

        {/* Price & Rating */}
        <div className="flex items-center gap-3">
          <span className="font-heading font-extrabold text-sm sm:text-base text-fooddash-charcoal">
            ₹{dish.price}
          </span>
          {dish.rating && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              <Star size={11} fill="currentColor" />
              <span>{dish.rating}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {dish.description && (
          <p className="text-xs text-fooddash-muted leading-relaxed line-clamp-2 max-w-lg">
            {dish.description}
          </p>
        )}
      </div>

      {/* Right Image & Action Column */}
      <div className="relative self-center sm:self-auto shrink-0 w-32 sm:w-36 flex flex-col items-center">
        <div className="w-32 h-24 sm:w-36 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/70 shadow-2xs">
          <img
            src={dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
            alt={dish.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Action Button: ADD or Stepper [- qty +] */}
        <div className="absolute -bottom-3 z-10">
          {isAdded ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center border border-primary rounded-full bg-white px-2 py-1 gap-2.5 shadow-sm"
            >
              <button
                type="button"
                onClick={() => onUpdateQuantity(dishId, quantity - 1)}
                className="w-5 h-5 rounded-full hover:bg-stone-100 flex items-center justify-center text-primary transition-colors cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <span className="font-heading font-black text-xs text-primary min-w-3 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(dishId, quantity + 1)}
                className="w-5 h-5 rounded-full hover:bg-stone-100 flex items-center justify-center text-primary transition-colors cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAddDish(dish);
              }}
              className="h-8 px-5 rounded-full bg-white hover:bg-primary text-primary hover:text-white border-2 border-primary/90 font-heading font-black text-xs uppercase tracking-wider shadow-sm hover:shadow-button active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>ADD</span>
              <Plus size={12} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
