import React from 'react';
import DishCard from './DishCard';

export default function MenuSection({
  title,
  dishes = [],
  selectedDishId,
  cartQuantities = {},
  onSelectDish,
  onAddDish,
  onUpdateQuantity
}) {
  if (!dishes || dishes.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Category Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b-2 border-stone-200 mb-4">
        <h3 className="font-heading text-lg sm:text-xl font-extrabold uppercase tracking-wide text-fooddash-charcoal">
          {title}
        </h3>
        <span className="text-xs font-extrabold text-fooddash-muted bg-stone-100 px-2 py-0.5 rounded-full">
          {dishes.length}
        </span>
      </div>

      {/* List of Dish Cards */}
      <div className="space-y-4">
        {dishes.map((dish) => {
          const dishId = dish._id || dish.id;
          return (
            <DishCard
              key={dishId}
              dish={dish}
              isSelected={selectedDishId === dishId}
              quantity={cartQuantities[dishId] || 0}
              onSelectDish={onSelectDish}
              onAddDish={onAddDish}
              onUpdateQuantity={onUpdateQuantity}
            />
          );
        })}
      </div>
    </div>
  );
}
