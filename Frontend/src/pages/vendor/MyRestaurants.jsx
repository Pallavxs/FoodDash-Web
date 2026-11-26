import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { getMyRestraunt } from '../../redux/slice/restaurantSlice';
import {
  PlusCircle,
  Star,
  Clock,
  MapPin,
  Edit3,
  UtensilsCrossed,
  Eye,
  Store,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

/**
 * MyRestaurants Component
 * Displays the authenticated vendor's real restaurants from backend/Redux.
 * Clean loading and empty states when no restaurants exist.
 */
export default function MyRestaurants() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myRestaurants, restaurants, loading, error } = useSelector(
    (state) => state.restaurants
  );

  useEffect(() => {
    dispatch(getMyRestraunt());
  }, [dispatch]);

  const vendorRestaurants = Array.isArray(myRestaurants) && myRestaurants.length > 0
    ? myRestaurants
    : (Array.isArray(restaurants) ? restaurants : []);

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full space-y-6">
            <PageHeader
              title="My Restaurants"
              subtitle="Manage your registered kitchens, menus, and operational settings."
              actions={
                <Link
                  to="/vendor/restaurants/create"
                  className="h-11 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Add Restaurant</span>
                </Link>
              }
            />

            {/* Loading State */}
            {loading && <LoadingSkeleton count={3} />}

            {/* Error State */}
            {!loading && error && (() => {
              const errorMsg = typeof error === 'string' ? error : 'Unable to connect to your restaurant dashboard.';
              const isAuthError = /token|blacklisted|session|sign in|log in|unauthorized/i.test(errorMsg);

              return (
                <div className="w-full p-6 rounded-2xl bg-red-50 border border-red-200 text-center flex flex-col items-center gap-2">
                  <AlertCircle size={24} className="text-red-600" />
                  <h4 className="font-heading font-bold text-red-900 text-sm">
                    {isAuthError ? 'Vendor Sign In Required' : 'Failed to load your restaurants'}
                  </h4>
                  <p className="text-xs text-red-700 max-w-md">
                    {isAuthError
                      ? 'Your previous session was logged out or expired. Please sign in to manage your kitchens.'
                      : errorMsg}
                  </p>
                  {isAuthError ? (
                    <Link
                      to="/login"
                      className="mt-2 h-9 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover flex items-center justify-center transition-all cursor-pointer"
                    >
                      Sign In to Vendor Hub
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => dispatch(getMyRestraunt())}
                      className="mt-2 h-8 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      <span>Retry</span>
                    </button>
                  )}
                </div>
              );
            })()}

            {/* Empty State: No Restaurants Found */}
            {!loading && !error && vendorRestaurants.length === 0 && (
              <EmptyState
                icon={Store}
                title="No Restaurants Registered Yet"
                description="You haven't listed any restaurant or kitchen yet. Register your first kitchen now to start receiving orders from local foodies."
                actionText="Create Restaurant"
                actionLink="/vendor/restaurants/create"
              />
            )}

            {/* Real Restaurant Cards Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
            {!loading && !error && vendorRestaurants.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {vendorRestaurants.map((restaurant) => {
                  const id = restaurant._id || restaurant.id;
                  const name = restaurant.name || 'Untitled Restaurant';
                  const cuisine = restaurant.cuisine || 'Cuisine not specified';
                  const location = restaurant.location || 'Location not specified';
                  const rating = restaurant.rating ? Number(restaurant.rating).toFixed(1) : null;
                  const deliveryTime = restaurant.deliveryTime ? `${restaurant.deliveryTime} mins` : '30 mins';

                  return (
                    <div
                      key={id}
                      className="bg-white rounded-outer border border-[#E4DCD0]/80 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                    >
                      {/* Top Image Banner */}
                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                          {restaurant.image ? (
                            <img
                              src={restaurant.image}
                              alt={name}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                              <Store size={40} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75" />

                          {/* Status Badge */}
                          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold tracking-wide shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-fooddash-charcoal">Active</span>
                          </div>

                          {/* Rating */}
                          {rating && (
                            <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-extrabold shadow-md">
                              <Star size={12} className="fill-white" />
                              <span>{rating}</span>
                            </div>
                          )}

                          {/* Delivery Time */}
                          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide">
                            <Clock size={12} className="text-amber-300" />
                            <span>{deliveryTime}</span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 sm:p-6">
                          <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary-soft text-primary font-bold text-[11px] uppercase tracking-wider mb-2 border border-primary/20">
                            {cuisine}
                          </div>

                          <h3 className="font-heading font-extrabold text-xl text-fooddash-charcoal tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                            {name}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs text-fooddash-muted mt-2 line-clamp-1">
                            <MapPin size={14} className="text-primary shrink-0" />
                            <span className="truncate">{location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions Section */}
                      <div className="p-5 sm:p-6 pt-0 space-y-2.5">
                        <div className="grid grid-cols-2 gap-2.5">
                          <Link
                            to={`/vendor/restaurants/${id}/menu`}
                            className="h-10 px-3 rounded-xl bg-fooddash-cream hover:bg-amber-50 text-fooddash-charcoal hover:text-amber-700 font-bold text-xs border border-[#E4DCD0] hover:border-amber-300 flex items-center justify-center gap-1.5 transition-all"
                          >
                            <UtensilsCrossed size={13} />
                            <span>Manage Menu</span>
                          </Link>

                          <Link
                            to={`/vendor/restaurants/${id}/edit`}
                            className="h-10 px-3 rounded-xl bg-fooddash-cream hover:bg-white text-fooddash-charcoal hover:text-primary font-bold text-xs border border-[#E4DCD0] hover:border-primary flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Edit3 size={13} />
                            <span>Edit</span>
                          </Link>
                        </div>

                        <Link
                          to={`/restaurants/${id}`}
                          className="w-full h-10 px-3 rounded-xl bg-fooddash-charcoal hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                        >
                          <Eye size={13} />
                          <span>View Restaurant</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
