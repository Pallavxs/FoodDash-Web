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
  Award
} from 'lucide-react';
import loginBanner from '../assets/images/login-banner.png';

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { restaurants, loading, error } = useSelector((state) => state.restaurants);

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
    'Italian',
    'Fast Food',
    'Pizza',
    'Burgers',
    'Asian',
    'Continental',
    'Mexican',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
        <div
          className="absolute -top-[10vw] -left-[8vw] w-[42vw] h-[42vw] rounded-full blur-[100px] pointer-events-none opacity-60 bg-gradient-to-br from-amber-200/50 to-orange-100/20"
          aria-hidden="true"
        />
        <div
          className="absolute top-[30%] -right-[10vw] w-[40vw] h-[40vw] rounded-full blur-[100px] pointer-events-none opacity-50 bg-gradient-to-tl from-rose-200/40 to-red-100/20"
          aria-hidden="true"
        />

        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E4DCD0] shadow-2xs text-xs font-extrabold uppercase tracking-wider text-primary">
                <Sparkles size={14} className="text-amber-500" />
                <span>Superfast Gourmet Food Delivery</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-fooddash-charcoal">
                Extraordinary flavors delivered straight to your{' '}
                <span className="text-primary underline decoration-primary/30 decoration-wavy">
                  doorstep.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-fooddash-muted max-w-[580px] leading-relaxed">
                Discover artisan local kitchens and top-rated neighborhood chefs. Order freshly prepared gourmet meals in 25–35 minutes.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
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
                    <a
                      href="#popular-restaurants"
                      className="h-[52px] px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center gap-2.5"
                    >
                      <span>Explore Restaurants</span>
                      <ArrowRight size={18} />
                    </a>
                    <Link
                      to="/login"
                      className="h-[52px] px-7 rounded-full bg-white text-fooddash-charcoal border border-[#E4DCD0] hover:border-primary hover:text-primary font-bold text-base shadow-2xs hover:shadow-sm transition-all flex items-center gap-2"
                    >
                      Sign In
                    </Link>
                  </>
                )}
                <Link
                  to="/cart"
                  className="h-[52px] px-7 rounded-full bg-white text-fooddash-charcoal border border-[#E4DCD0] hover:border-primary hover:text-primary font-bold text-base shadow-2xs hover:shadow-sm transition-all flex items-center gap-2"
                >
                  <ShoppingBag size={18} className="text-primary" />
                  <span>View Cart</span>
                </Link>
              </div>

              {/* Delivery Stats Strip */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E4DCD0]/70 w-full max-w-[560px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-primary flex items-center justify-center shrink-0">
                    <Bike size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-extrabold text-sm text-fooddash-charcoal leading-none">25–35 min</span>
                    <span className="text-[11px] text-fooddash-muted mt-0.5">Average delivery</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Star size={18} className="fill-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-extrabold text-sm text-fooddash-charcoal leading-none">4.9 / 5.0</span>
                    <span className="text-[11px] text-fooddash-muted mt-0.5">Top-rated chefs</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Flame size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-extrabold text-sm text-fooddash-charcoal leading-none">100% Fresh</span>
                    <span className="text-[11px] text-fooddash-muted mt-0.5">Cooked to order</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[520px] rounded-[36px] overflow-hidden shadow-card border-4 border-white/80 group">
                <img
                  src={loginBanner}
                  alt="Delicious artisan pizza"
                  className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Search & Cuisine Filter */}
      <section id="popular-restaurants" className="py-10 bg-white/70 border-y border-[#E4DCD0]/70">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <span>Neighborhood Dining</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-fooddash-charcoal">
                Popular Restaurants Near You
              </h2>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-fooddash-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search food, cuisine or area..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-[46px] pl-11 pr-10 rounded-full bg-fooddash-cream border border-[#E4DCD0] focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium text-fooddash-charcoal outline-none transition-all placeholder:text-fooddash-muted"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted hover:text-fooddash-charcoal"
                >
                  <X size={16} />
                </button>
              )}
            </form>
          </div>

          {/* Cuisine Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {cuisineOptions.map((cuisine) => {
              const isSelected = selectedCuisine === cuisine;
              return (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => handleCuisineFilter(cuisine)}
                  className={`px-5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-fooddash-charcoal text-white shadow-sm'
                      : 'bg-white border border-[#E4DCD0] text-fooddash-body hover:border-primary hover:text-primary'
                  }`}
                >
                  {cuisine}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restaurants Grid Section */}
      <section className="py-12 sm:py-16">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading */}
          {loading && <LoadingSkeleton count={6} />}

          {/* Error State */}
          {!loading && error && (
            <div className="w-full max-w-[560px] mx-auto my-8 p-6 rounded-outer bg-red-50 border border-red-200 text-center flex flex-col items-center gap-3">
              <AlertCircle size={26} className="text-red-600" />
              <h3 className="font-heading font-extrabold text-base text-red-900">
                Failed to load restaurants
              </h3>
              <p className="text-xs text-red-700">
                {typeof error === 'string' ? error : 'Unable to connect to restaurants.'}
              </p>
              <button
                type="button"
                onClick={() => dispatch(fetchRestaurants())}
                className="mt-1 h-9 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw size={13} />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && (!restaurants || restaurants.length === 0) && (
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-12 text-center max-w-md mx-auto">
              <UtensilsCrossed size={40} className="text-fooddash-muted mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-fooddash-charcoal mb-1">
                No restaurants available
              </h3>
              <p className="text-xs text-fooddash-muted mb-4">
                {searchInput
                  ? `No restaurants matched "${searchInput}". Try another keyword.`
                  : 'Check back soon as local kitchens join the platform.'}
              </p>
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-5 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-button"
                >
                  View All Restaurants
                </button>
              )}
            </div>
          )}

          {/* Restaurants Grid */}
          {!loading && !error && restaurants && restaurants.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

      <Footer />
    </div>
  );
}
