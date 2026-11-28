import React, { useState } from 'react';
import { Star, MapPin, Phone, Share2, Clock, Check } from 'lucide-react';

export default function RestaurantHeader({ restaurant = {} }) {
  const [copied, setCopied] = useState(false);

  const defaultFoodCover =
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';

  const name = restaurant.name || 'Restaurant Details';
  const cuisines = Array.isArray(restaurant.cuisines)
    ? restaurant.cuisines.join(' • ')
    : (restaurant.cuisine || 'Artisan Food & Beverages');
  const location = restaurant.location || 'Local Kitchen';
  const timings = restaurant.timings || (restaurant.deliveryTime ? `${restaurant.deliveryTime} mins delivery` : 'Open Now');
  const phone = restaurant.phone || '';
  const rating = restaurant.rating ? Number(restaurant.rating) : 4.8;
  const image = restaurant.image || defaultFoodCover;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-fooddash-border/80 p-5 sm:p-7 lg:p-8 shadow-card mb-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Metadata & Actions (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1.5">
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-fooddash-charcoal tracking-tight leading-tight">
                {name}
              </h1>
              {rating > 0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-xs">
                  <span>{rating.toFixed(1)}</span>
                  <Star size={12} fill="currentColor" />
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm font-semibold text-fooddash-muted">
              {cuisines}
            </p>
          </div>

          {/* Meta Badges Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fooddash-cream border border-fooddash-border/80 text-fooddash-charcoal font-bold">
              <MapPin size={13} className="text-primary shrink-0" />
              <span>{location}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-800 font-bold">
              <Clock size={13} className="text-emerald-600 shrink-0" />
              <span>{timings}</span>
            </div>

            {phone && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200/70 text-fooddash-muted font-semibold">
                <Phone size={13} className="shrink-0" />
                <span>{phone}</span>
              </div>
            )}
          </div>

          {/* Quick Action Button: Share */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-fooddash-border bg-stone-50 hover:bg-white hover:border-primary text-fooddash-charcoal text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-600">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={14} className="text-fooddash-muted" />
                  <span>Share Restaurant</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Restaurant Photo Showcase (5 cols on lg) */}
        <div className="lg:col-span-5 relative h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-sm group">
          <img
            src={image}
            alt={name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultFoodCover;
            }}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider">
            Verified Kitchen
          </div>
        </div>
      </div>
    </div>
  );
}
