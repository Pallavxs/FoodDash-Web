import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { Calendar, ShoppingBag, ArrowRight, MapPin, ReceiptText } from 'lucide-react';

/**
 * OrderCard Component
 * Displays a summary of a customer order with status badge and link to track/details.
 */
export default function OrderCard({ order }) {
  if (!order) return null;

  const {
    id,
    date,
    restaurant,
    restaurantImage,
    items,
    itemsCount,
    total,
    status,
    deliveryAddress,
  } = order;

  return (
    <div className="bg-white rounded-outer border border-[#E4DCD0]/80 shadow-sm hover:shadow-card transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4DCD0]/60">
        <div className="flex items-center gap-3">
          {restaurantImage ? (
            <img
              src={restaurantImage}
              alt={restaurant}
              className="w-12 h-12 rounded-xl object-cover border border-[#E4DCD0]"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center font-bold">
              <ShoppingBag size={20} />
            </div>
          )}

          <div>
            <h4 className="font-heading font-extrabold text-base sm:text-lg text-fooddash-charcoal">
              {restaurant}
            </h4>
            <div className="flex items-center gap-2 text-xs text-fooddash-muted mt-0.5">
              <span className="font-mono font-bold text-fooddash-charcoal">#{id}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{date}</span>
              </span>
            </div>
          </div>
        </div>

        <StatusBadge status={status} />
      </div>

      {/* Items Preview */}
      <div className="py-4">
        <div className="text-xs font-bold text-fooddash-muted uppercase tracking-wider mb-2">
          Ordered Dishes ({itemsCount || items?.length || 0})
        </div>
        <div className="flex flex-col gap-1.5">
          {items && items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs text-fooddash-body">
              <span className="line-clamp-1">
                <strong className="text-fooddash-charcoal font-semibold">{item.qty}x</strong> {item.name}
              </span>
              <span className="font-medium text-fooddash-muted shrink-0 ml-2">
                ${Number(item.price).toFixed(2)}
              </span>
            </div>
          ))}
          {items && items.length > 3 && (
            <span className="text-[11px] text-fooddash-muted italic">
              +{items.length - 3} more items...
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-4 border-t border-[#E4DCD0]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] uppercase font-bold text-fooddash-muted block">Total Paid</span>
          <span className="font-heading text-xl font-extrabold text-fooddash-charcoal">
            ${Number(total).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/orders/${id}`}
            className="h-[40px] px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-1.5"
          >
            <span>Track Order</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
