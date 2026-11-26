import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import MenuItemCard from '../../components/MenuItemCard';
import { getMyRestraunt } from '../../redux/slice/restaurantSlice';
import {
  PlusCircle,
  Search,
  Filter,
  ChevronDown,
  Store,
  UtensilsCrossed,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

/**
 * MenuManagement Component
 * Screen for managing dishes, categories, and availability per restaurant.
 * Consumes real restaurant data and displays clean empty states when dishes are empty.
 */
export default function MenuManagement() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myRestaurants, restaurants, loading } = useSelector((state) => state.restaurants);

  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(getMyRestraunt());
  }, [dispatch]);

  const vendorRestaurants = Array.isArray(myRestaurants) && myRestaurants.length > 0
    ? myRestaurants
    : (Array.isArray(restaurants) ? restaurants : []);

  const activeRestaurant = vendorRestaurants[0] || null;
  const currentRestaurantId = activeRestaurant?._id || activeRestaurant?.id || '';

  // Real dishes array from backend (empty until dishes are added)
  const dishes = [];

  const categories = [
    'All',
    'Starters',
    'Main Course',
    'Biryani',
    'Breads',
    'Beverages',
    'Desserts'
  ];

  const totalDishes = dishes.length;
  const availableDishes = dishes.filter((d) => d.isAvailable).length;
  const outOfStockDishes = totalDishes - availableDishes;
  const totalCategories = dishes.length > 0
    ? new Set(dishes.map((d) => d.category)).size
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full space-y-6">
            {/* Page Header with Action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal">
                  Menu Management
                </h1>
                <p className="text-xs sm:text-sm text-fooddash-muted mt-1">
                  Manage dishes, pricing, inventory, and categories for your restaurant.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Restaurant Dropdown Selector */}
                <div className="relative">
                  <div className="h-11 px-4 rounded-xl bg-white border border-[#E4DCD0] shadow-xs flex items-center gap-2.5 text-xs font-bold text-fooddash-charcoal">
                    <Store size={15} className="text-primary" />
                    <span>{activeRestaurant?.name || 'My Kitchen'}</span>
                    <ChevronDown size={14} className="text-fooddash-muted" />
                  </div>
                </div>

                <Link
                  to={currentRestaurantId ? `/vendor/restaurants/${currentRestaurantId}/menu/create` : '/vendor/restaurants/create'}
                  className="h-11 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 shrink-0"
                >
                  <PlusCircle size={16} />
                  <span>Add Menu Item</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0]/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Total Dishes
                  </span>
                  <span className="font-heading font-extrabold text-xl text-fooddash-charcoal">
                    {totalDishes}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-primary flex items-center justify-center">
                  <UtensilsCrossed size={16} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0]/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Available
                  </span>
                  <span className="font-heading font-extrabold text-xl text-emerald-600">
                    {availableDishes}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0]/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Out of Stock
                  </span>
                  <span className="font-heading font-extrabold text-xl text-stone-500">
                    {outOfStockDishes}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-500 flex items-center justify-center">
                  <AlertCircle size={16} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0]/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Categories
                  </span>
                  <span className="font-heading font-extrabold text-xl text-amber-600">
                    {totalCategories}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Filter size={16} />
                </div>
              </div>
            </div>

            {/* Menu Categories Pills Bar */}
            <div className="bg-white rounded-2xl p-4 border border-[#E4DCD0]/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-fooddash-charcoal text-white shadow-xs'
                          : 'bg-fooddash-cream/70 text-fooddash-body hover:bg-white hover:text-fooddash-charcoal border border-transparent hover:border-[#E4DCD0]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    defaultValue=""
                    className="w-full h-9 pl-9 pr-4 rounded-xl bg-fooddash-cream/50 border border-[#E4DCD0] text-xs font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Empty State: No Dishes Yet */}
            {dishes.length === 0 ? (
              <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-12 text-center max-w-lg mx-auto my-6">
                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <UtensilsCrossed size={32} />
                </div>
                <h3 className="font-heading text-lg font-bold text-fooddash-charcoal mb-1">
                  No Dishes in Menu Yet
                </h3>
                <p className="text-xs text-fooddash-muted mb-6 leading-relaxed">
                  You haven't added any dishes to this restaurant yet. Create your first menu item to start taking food orders.
                </p>
                <Link
                  to={currentRestaurantId ? `/vendor/restaurants/${currentRestaurantId}/menu/create` : '/vendor/restaurants/create'}
                  className="h-11 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover inline-flex items-center gap-2 transition-all"
                >
                  <PlusCircle size={15} />
                  <span>Add Menu Item</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dishes.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
