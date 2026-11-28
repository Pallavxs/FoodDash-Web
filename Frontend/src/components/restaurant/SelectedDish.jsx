import React, { useState, useEffect } from 'react';
import { Star, Sparkles, Plus, Minus, ShoppingBag, Check, X } from 'lucide-react';

export default function SelectedDish({
  dish,
  cartQuantity = 0,
  onClose,
  onAddToCart,
  onUpdateQuantity
}) {
  const dishId = dish?._id || dish?.id;
  const [localQty, setLocalQty] = useState(cartQuantity > 0 ? cartQuantity : 1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setLocalQty(cartQuantity > 0 ? cartQuantity : 1);
  }, [dishId, cartQuantity]);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, localQty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      if (onClose) onClose();
    }, 1000);
  };

  const handleIncrement = () => {
    const next = localQty + 1;
    setLocalQty(next);
    if (cartQuantity > 0) {
      onUpdateQuantity(dishId, next);
    }
  };

  const handleDecrement = () => {
    const next = Math.max(1, localQty - 1);
    setLocalQty(next);
    if (cartQuantity > 0) {
      onUpdateQuantity(dishId, next);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-stone-600 hover:text-stone-900 hover:bg-white flex items-center justify-center shadow-md transition-all cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Dish Image */}
        <div className="relative h-56 sm:h-64 w-full bg-stone-100 overflow-hidden">
          <img
            src={dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
            alt={dish.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          {/* Veg / Non-Veg Indicator */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs">
            <div
              className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center p-0.5 ${
                (dish.isVeg ?? true) ? 'border-emerald-600' : 'border-rose-600'
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  (dish.isVeg ?? true) ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </div>
            <span className="text-[10px] font-bold text-fooddash-charcoal">
              {(dish.isVeg ?? true) ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
          </div>

          {dish.category && (
            <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
              {dish.category}
            </div>
          )}
        </div>

        {/* Dish Details Content */}
        <div className="p-5 sm:p-6 space-y-3.5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-heading text-xl font-extrabold text-fooddash-charcoal leading-tight">
                {dish.name}
              </h3>
              <p className="font-heading font-extrabold text-lg text-primary mt-0.5">
                ₹{dish.price}
              </p>
            </div>
            {dish.isBestseller && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                ★ Bestseller
              </span>
            )}
          </div>

          {dish.description && (
            <p className="text-xs text-fooddash-muted leading-relaxed">
              {dish.description}
            </p>
          )}

          {/* Quantity Stepper & Add to Cart Action */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3.5">
            <div className="flex items-center border border-stone-200 rounded-full bg-stone-50 px-2 py-1 shadow-2xs">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={localQty <= 1}
                className="w-7 h-7 rounded-full bg-white text-fooddash-charcoal hover:bg-stone-100 disabled:opacity-40 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <Minus size={13} />
              </button>
              <span className="w-8 text-center font-heading font-black text-xs text-fooddash-charcoal">
                {localQty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-7 h-7 rounded-full bg-white text-fooddash-charcoal hover:bg-stone-100 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <Plus size={13} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 h-11 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary hover:bg-primary-dark text-white hover:shadow-button active:scale-95'
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={15} />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={15} />
                  <span>Add to Cart • ₹{Number(dish.price) * localQty}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
