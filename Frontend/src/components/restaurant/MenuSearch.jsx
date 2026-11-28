import React from 'react';
import { Search, X } from 'lucide-react';

export default function MenuSearch({
  searchQuery = '',
  onSearchChange,
  isVegOnly = false,
  onToggleVegOnly
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-fooddash-border/80 shadow-xs mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search within restaurant menu..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-11 pl-10 pr-9 rounded-xl bg-fooddash-cream/70 border border-fooddash-border focus:border-primary focus:bg-white text-xs font-semibold text-fooddash-charcoal outline-none transition-all placeholder:text-fooddash-muted"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-fooddash-muted hover:text-fooddash-charcoal cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Veg Only Filter Toggle */}
      <div className="flex items-center gap-2.5 px-3 py-1.5 self-start sm:self-center">
        <button
          type="button"
          onClick={() => onToggleVegOnly(!isVegOnly)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isVegOnly
              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
              : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
          }`}
        >
          <div className="w-4 h-4 rounded border border-emerald-600 flex items-center justify-center p-0.5 bg-white">
            <div className={`w-2 h-2 rounded-full ${isVegOnly ? 'bg-emerald-600' : 'bg-transparent'}`} />
          </div>
          <span>Veg Only</span>
        </button>
      </div>
    </div>
  );
}
