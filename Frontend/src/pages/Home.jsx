import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import {
  fetchRestaurants,
  searchRestaurants,
} from '../redux/slice/restaurantSlice';

import {
  ArrowRight,
  Clock,
  Star,
  Sparkles,
  ShoppingBag,
  Search,
  X,
  RefreshCw,
  AlertCircle,
  UtensilsCrossed,
  Bike,
  Flame,
  PlusCircle,
  Store
} from 'lucide-react';
import loginBanner from '../assets/images/login-banner.png';

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { restaurants = [], loading, error } = useSelector((state) => state.restaurants);

  const [searchInput, setSearchInput] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

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
      dispatch(searchRestaurants(cuisine));
    }
  };

  const cuisineOptions = [
    'All',
    'Indian',
    'Italian',
    'Fast Food',
    'Pizza',
    'Burgers',
    'Asian',
    'Continental',
    'Mexican',
  ];

  const totalRestaurants = restaurants?.length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20">
        {/* Ambient subtle glow backdrops */}
        <div
          className="absolute -top-[8vw] -left-[6vw] w-[38vw] h-[38vw] rounded-full blur-[110px] pointer-events-none opacity-45 bg-gradient-to-br from-amber-200/40 to-orange-100/20"
          aria-hidden="true"
        />
        <div
          className="absolute top-[25%] -right-[8vw] w-[36vw] h-[36vw] rounded-full blur-[110px] pointer-events-none opacity-40 bg-gradient-to-tl from-rose-200/35 to-red-100/15"
          aria-hidden="true"
        />

        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#E6E2DA] shadow-2xs text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-primary">
                <Sparkles size={14} className="text-amber-500 shrink-0" />
                <span>Superfast Gourmet Food Delivery</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold tracking-tight leading-[1.08] text-fooddash-charcoal">
                Extraordinary flavors delivered straight to your{' '}
                <span className="text-primary underline decoration-primary/25 decoration-wavy underline-offset-4">
                  doorstep.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base lg:text-lg text-fooddash-body max-w-[560px] leading-relaxed">
                Discover artisan local kitchens and top-rated neighborhood chefs. Order freshly prepared gourmet meals in 25–35 minutes.
              </p>

              {/* Primary & Secondary Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
                <a
                  href="#popular-restaurants"
                  className="h-12 sm:h-[52px] px-7 sm:px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-sm sm:text-base shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Explore Restaurants</span>
                  <ArrowRight size={17} />
                </a>
              </div>

              {/* Feature Stats Strip */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-4 sm:pt-6 border-t border-[#EAE5DC] w-full max-w-[560px]">
                <div className="bg-white/80 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-[#E6E2DA] shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-100 text-primary flex items-center justify-center shrink-0">
                    <Bike size={16} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-heading font-extrabold text-xs sm:text-sm text-fooddash-charcoal leading-none truncate">
                      25–35 min
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-fooddash-muted mt-0.5 truncate">
                      Avg delivery
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-[#E6E2DA] shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Star size={16} className="fill-emerald-600" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-heading font-extrabold text-xs sm:text-sm text-fooddash-charcoal leading-none truncate">
                      4.9 / 5.0
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-fooddash-muted mt-0.5 truncate">
                      Top chefs
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-[#E6E2DA] shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Flame size={16} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-heading font-extrabold text-xs sm:text-sm text-fooddash-charcoal leading-none truncate">
                      100% Fresh
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-fooddash-muted mt-0.5 truncate">
                      To order
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Column */}
            <div className="lg:col-span-5 relative mt-2 lg:mt-0">
              <div className="relative mx-auto max-w-[500px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-card border-4 border-white/95 group">
                <img
                  src={loginBanner}
                  alt="Delicious artisan food delivery"
                  className="w-full h-[320px] sm:h-[420px] lg:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                {/* Floating Culinary Badge Top Left */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55e]" />
                  <span>Artisan Kitchens • Local Chefs</span>
                </div>

                {/* Floating Food Detail Badge Bottom */}
                <div className="absolute bottom-4 inset-x-4 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0 font-bold text-lg">
                      🍕
                    </div>
                    <div className="min-w-0">
                      <span className="font-heading font-extrabold text-xs sm:text-sm text-fooddash-charcoal block truncate">
                        Wood-Fired Artisan Pizza
                      </span>
                      <span className="text-[11px] text-fooddash-muted truncate block">
                        Fresh mozzarella, hand-stretched dough
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-2">
                    <span className="font-heading font-extrabold text-sm sm:text-base text-primary block leading-none">
                      ₹349
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                      ★ 4.9
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Restaurant Discovery Section */}
      <section id="popular-restaurants" className="py-10 sm:py-16 scroll-mt-20">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header & Search Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E2DA] shadow-xs space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-primary mb-1.5">
                  <UtensilsCrossed size={14} />
                  <span>Neighborhood Dining</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-fooddash-charcoal tracking-tight">
                  Popular Restaurants Near You
                </h2>
                <p className="text-xs sm:text-sm text-fooddash-muted mt-1 max-w-xl">
                  Handcrafted neighborhood kitchens, artisan dishes, and local culinary favorites delivered hot to your door.
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-96">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-fooddash-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search food, cuisine or area..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-12 pl-11 pr-10 rounded-full bg-fooddash-cream/70 border border-[#E6E2DA] focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15 text-sm font-medium text-fooddash-charcoal outline-none transition-all placeholder:text-fooddash-muted shadow-2xs"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted hover:text-fooddash-charcoal p-1 cursor-pointer"
                    title="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>
            </div>

            {/* Cuisine Filter Pills Bar */}
            <div className="pt-4 border-t border-[#EAE5DC]">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {cuisineOptions.map((cuisine) => {
                  const isSelected = selectedCuisine === cuisine;
                  return (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => handleCuisineFilter(cuisine)}
                      className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                        isSelected
                          ? 'bg-fooddash-charcoal text-white shadow-xs'
                          : 'bg-fooddash-cream/70 border border-[#E6E2DA] text-fooddash-body hover:border-primary hover:text-primary hover:bg-white'
                      }`}
                    >
                      {cuisine}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Restaurant Results Grid Area */}
          <div className="mt-8 sm:mt-10">
            {/* Loading Skeleton */}
            {loading && <LoadingSkeleton count={4} />}

            {/* Error State */}
            {!loading && error && (
              <div className="w-full max-w-lg mx-auto my-6 p-8 rounded-3xl bg-red-50 border border-red-200 text-center flex flex-col items-center gap-3">
                <AlertCircle size={28} className="text-red-600" />
                <h3 className="font-heading font-extrabold text-base text-red-900">
                  Failed to load restaurants
                </h3>
                <p className="text-xs text-red-700 leading-relaxed">
                  {typeof error === 'string' ? error : 'Unable to connect to restaurants right now.'}
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(fetchRestaurants())}
                  className="mt-1 h-9 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <RefreshCw size={13} />
                  <span>Retry Connection</span>
                </button>
              </div>
            )}

            {/* Empty State: No Restaurants Found */}
            {!loading && !error && (!restaurants || totalRestaurants === 0) && (
              <div className="bg-white rounded-3xl border border-[#E6E2DA] p-10 sm:p-14 text-center max-w-lg mx-auto shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-primary flex items-center justify-center mx-auto mb-4 border border-orange-100 shadow-inner">
                  <UtensilsCrossed size={30} />
                </div>
                <h3 className="font-heading text-xl font-extrabold text-fooddash-charcoal mb-1.5">
                  {searchInput ? 'No matching restaurants' : 'No restaurants available yet'}
                </h3>
                <p className="text-xs sm:text-sm text-fooddash-muted mb-6 leading-relaxed max-w-sm mx-auto">
                  {searchInput
                    ? `No restaurants matched "${searchInput}". Try adjusting your keywords or clearing the search filter.`
                    : 'We are onboarding fantastic local artisan kitchens. Check back shortly or register your kitchen.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {searchInput ? (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="h-10 px-6 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-button hover:shadow-button-hover transition-all cursor-pointer"
                    >
                      View All Restaurants
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/vendor/restaurants/create"
                        className="h-10 px-6 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-button hover:shadow-button-hover inline-flex items-center gap-2 transition-all"
                      >
                        <PlusCircle size={15} />
                        <span>Add Restaurant</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => dispatch(fetchRestaurants())}
                        className="h-10 px-5 rounded-full bg-fooddash-cream hover:bg-stone-100 text-fooddash-charcoal border border-[#E6E2DA] text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <RefreshCw size={13} />
                        <span>Refresh</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Dynamic Restaurant Cards Grid */}
            {!loading && !error && restaurants && totalRestaurants > 0 && (
              <div
                className={
                  totalRestaurants === 1
                    ? 'max-w-md mx-auto'
                    : totalRestaurants === 2
                    ? 'grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7'
                }
              >
                {restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant._id || restaurant.id || restaurant.name}
                    restaurant={restaurant}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
