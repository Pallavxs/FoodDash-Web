import React from 'react';

export default function MenuCategories({
  categories = [],
  activeCategory = 'All',
  onSelectCategory,
  categoryCounts = {}
}) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      {/* Desktop Sticky Vertical Menu */}
      <div className="hidden lg:block sticky top-24 bg-white rounded-2xl border border-fooddash-border/80 p-3 shadow-xs">
        <div className="px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-fooddash-muted border-b border-fooddash-border mb-1">
          Menu Categories
        </div>

        <nav className="space-y-0.5 pt-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-button'
                    : 'text-fooddash-charcoal hover:bg-stone-50 hover:text-primary'
                }`}
              >
                <span>{cat}</span>
                {count > 0 && (
                  <span
                    className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-fooddash-muted'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Horizontal Category Pills */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const count = categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-primary text-white shadow-button'
                  : 'bg-white border border-fooddash-border text-fooddash-charcoal hover:border-primary'
              }`}
            >
              <span>{cat}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
