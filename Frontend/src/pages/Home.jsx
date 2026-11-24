import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/common/Navbar';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import RestaurantSkeleton from '../components/restaurant/RestaurantSkeleton';
import {
  fetchRestaurants,
  searchRestaurants,
} from '../redux/slice/restaurantSlice';
import {
  ArrowRight,
  Clock,
  Star,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Search,
  X,
  RefreshCw,
  AlertCircle,
  UtensilsCrossed,
  SlidersHorizontal,
} from 'lucide-react';
import loginBanner from '../assets/images/login-banner.png';

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { restaurants, loading, error } = useSelector((state) => state.restaurants);

  const [searchInput, setSearchInput] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  // Initial fetch on component mount
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // Handle live or debounced search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(searchRestaurants(searchInput.trim()));
    } else {
      dispatch(fetchRestaurants());
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSelectedCuisine('All');
    dispatch(fetchRestaurants());
  };

  const handleCuisineFilter = (cuisine) => {
    setSelectedCuisine(cuisine);
    if (cuisine === 'All') {
      if (searchInput.trim()) {
        dispatch(searchRestaurants(searchInput.trim()));
      } else {
        dispatch(fetchRestaurants());
      }
    } else {
      // Use backend search capability which matches cuisine
      dispatch(searchRestaurants(cuisine));
    }
  };

  // Cuisine chip options
  const cuisineOptions = [
    'All',
    'Italian',
    'Fast Food',
    'Pizza',
    'Burgers',
    'Asian',
    'Continental',
    'Mexican',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20">
        {/* Edge-to-edge ambient warm background aesthetic */}
        <div
          className="absolute -top-[10vw] -left-[8vw] w-[42vw] h-[42vw] rounded-full blur-[100px] pointer-events-none opacity-60 bg-gradient-to-br from-amber-200/50 to-orange-100/20"
          aria-hidden="true"
        />
        <div
          className="absolute top-[30%] -right-[10vw] w-[40vw] h-[40vw] rounded-full blur-[100px] pointer-events-none opacity-50 bg-gradient-to-tl from-rose-200/40 to-red-100/20"
          aria-hidden="true"
        />

        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E4DCD0] shadow-sm text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles size={14} className="text-amber-500" />
                <span>Superfast Food Delivery</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-fooddash-charcoal">
                Extraordinary flavors delivered straight to your{' '}
                <span className="text-primary underline decoration-primary/30 decoration-wavy">
                  doorstep.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-fooddash-muted max-w-[580px] leading-relaxed">
                Discover artisan local kitchens and premium neighborhood chefs. Order freshly prepared gourmet meals in minutes.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="h-[52px] px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="h-[52px] px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    >
                      <span>Order Now</span>
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      to="/register"
                      className="h-[52px] px-8 rounded-full bg-white text-fooddash-charcoal border border-fooddash-border hover:border-primary hover:text-primary font-bold text-base shadow-sm hover:shadow transition-all"
                    >
                      Create Account
                    </Link>
                  </>
                )}
                <Link
                  to="/cart"
                  className="h-[52px] px-6 rounded-full bg-white/80 hover:bg-white text-fooddash-charcoal border border-[#E4DCD0] font-semibold text-sm flex items-center gap-2 shadow-sm transition-all"
                >
                  <ShoppingBag size={18} className="text-primary" />
                  <span>View Cart</span>
                </Link>
              </div>

              {/* Feature Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E4DCD0]/70 w-full max-w-[520px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-orange-100 text-primary flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-sm sm:text-base leading-tight">25-35 min</div>
                    <div className="text-[11px] text-fooddash-muted">Express Delivery</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Star size={18} />
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-sm sm:text-base leading-tight">4.9 ★</div>
                    <div className="text-[11px] text-fooddash-muted">Top Rated</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-sm sm:text-base leading-tight">100% Fresh</div>
                    <div className="text-[11px] text-fooddash-muted">Artisan Quality</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 aspect-[4/3] lg:aspect-[1/1] max-w-[500px] mx-auto">
                <img
                  src={loginBanner}
                  alt="Delicious Food"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                    Chef's Daily Special
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold mt-1">
                    Authentic Artisan Italian & Continental
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">
                    Crafted daily using fresh organic farm produce.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Restaurants Section */}
      <section className="relative z-10 py-12 bg-white/70 backdrop-blur-sm border-t border-[#E4DCD0]/70">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <span>Neighborhood Gems</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-fooddash-charcoal tracking-tight">
                Explore Top Restaurants
              </h2>
              <p className="text-sm text-fooddash-muted mt-1 max-w-[540px]">
                Browse menus, ratings, and delivery estimates from verified local restaurants.
              </p>
            </div>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="w-full md:w-[360px] relative flex items-center"
            >
              <div className="absolute left-3.5 text-fooddash-muted pointer-events-none">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search restaurant or cuisine..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-[46px] pl-10 pr-10 rounded-full bg-white border border-[#E4DCD0] focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-fooddash-charcoal placeholder-fooddash-light outline-none transition-all shadow-sm"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 text-fooddash-muted hover:text-fooddash-charcoal p-1"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </form>
          </div>

          {/* Cuisine Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {cuisineOptions.map((cuisine) => {
              const isActive = selectedCuisine === cuisine;
              return (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => handleCuisineFilter(cuisine)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-button'
                      : 'bg-white text-fooddash-charcoal border border-[#E4DCD0] hover:border-primary hover:text-primary shadow-sm'
                  }`}
                >
                  {cuisine}
                </button>
              );
            })}
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <RestaurantSkeleton key={idx} />
              ))}
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="w-full max-w-[620px] mx-auto my-8 p-6 rounded-outer bg-red-50 border border-red-200 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <AlertCircle size={26} />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-red-900">
                Failed to load restaurants
              </h3>
              <p className="text-xs sm:text-sm text-red-700 max-w-[420px]">
                {typeof error === 'string'
                  ? error
                  : 'We encountered an error while connecting to the restaurant service. Please ensure the backend server is running.'}
              </p>
              <button
                type="button"
                onClick={() => dispatch(fetchRestaurants())}
                className="mt-2 h-[42px] px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <RefreshCw size={14} />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && (!restaurants || restaurants.length === 0) && (
            <div className="w-full max-w-[520px] mx-auto my-12 p-8 rounded-outer bg-white border border-[#E4DCD0]/80 text-center shadow-card flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-primary flex items-center justify-center mb-4">
                <UtensilsCrossed size={32} />
              </div>
              <h3 className="font-heading text-xl font-extrabold text-fooddash-charcoal mb-1">
                No restaurants available
              </h3>
              <p className="text-xs sm:text-sm text-fooddash-muted mb-6">
                {searchInput
                  ? `No restaurants matched "${searchInput}". Try another keyword or browse all kitchens.`
                  : 'Check back later or refresh to discover new neighborhood kitchens.'}
              </p>
              {(searchInput || selectedCuisine !== 'All') && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="h-[42px] px-6 rounded-full bg-primary text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all"
                >
                  View All Restaurants
                </button>
              )}
            </div>
          )}

          {/* SUCCESS STATE */}
          {!loading && !error && restaurants && restaurants.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id || restaurant.id || restaurant.name}
                  restaurant={restaurant}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E4DCD0] bg-white py-6 text-center text-xs text-fooddash-light">
        <p>© {new Date().getFullYear()} FoodDash Technologies Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
