import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import MenuItemCard from '../../components/MenuItemCard';
import { getMyRestraunt } from '../../redux/slice/restaurantSlice';
import {
  PlusCircle,
  Edit3,
  UtensilsCrossed,
  Star,
  Clock,
  MapPin,
  ExternalLink,
  Store,
  ChevronRight
} from 'lucide-react';

/**
 * ManageRestaurant Component
 * Displays restaurant header and dishes from real backend data.
 * Shows clean empty states when no dishes exist.
 */
export default function ManageRestaurant() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myRestaurants, restaurants } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getMyRestraunt());
  }, [dispatch]);

  const allRestaurants = Array.isArray(myRestaurants) && myRestaurants.length > 0
    ? myRestaurants
    : (Array.isArray(restaurants) ? restaurants : []);

  const restaurant = allRestaurants.find(
    (r) => (r._id || r.id) === id
  ) || allRestaurants[0] || null;

  const restaurantName = restaurant?.name || 'Restaurant';
  const cuisine = restaurant?.cuisine || 'Cuisine not specified';
  const location = restaurant?.location || 'Location not specified';
  const rating = restaurant?.rating ? Number(restaurant?.rating).toFixed(1) : null;
  const deliveryTime = restaurant?.deliveryTime ? `${restaurant.deliveryTime} mins` : '30 mins';
  const image = restaurant?.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80';

  // Real dishes array from backend (empty until dishes endpoint is populated)
  const starters = [];
  const mainCourses = [];
  const desserts = [];
  const totalDishesCount = starters.length + mainCourses.length + desserts.length;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full space-y-8">
            <PageHeader
              title="Restaurant Menu Detail"
              subtitle={`View complete menu dishes and category layout for ${restaurantName}.`}
              backLink="/vendor/restaurants"
              backText="Back to My Restaurants"
            />

            {/* Restaurant Profile Hero Card */}
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 shadow-card overflow-hidden">
              <div className="relative h-48 sm:h-64 w-full bg-stone-900 overflow-hidden">
                <img
                  src={image}
                  alt={restaurantName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-fooddash-charcoal shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active Restaurant</span>
                </div>

                <div className="absolute bottom-5 inset-x-5 sm:inset-x-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {restaurantName}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-200 mt-1 flex flex-wrap items-center gap-2">
                      <span>{cuisine} • {location}</span>
                      {rating && (
                        <>
                          <span className="opacity-40">•</span>
                          <span className="inline-flex items-center gap-1 text-amber-300 font-bold">
                            <Star size={13} className="fill-amber-300" />
                            {rating}
                          </span>
                        </>
                      )}
                      <span className="opacity-40">•</span>
                      <span className="inline-flex items-center gap-1 text-stone-300">
                        <Clock size={13} />
                        {deliveryTime}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {restaurant && (
                      <Link
                        to={`/vendor/restaurants/${restaurant._id || restaurant.id}/edit`}
                        className="h-10 px-4 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
                      >
                        <Edit3 size={14} />
                        <span>Edit Restaurant</span>
                      </Link>
                    )}

                    <Link
                      to="/vendor/menu"
                      className="h-10 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-1.5"
                    >
                      <UtensilsCrossed size={14} />
                      <span>Manage Menu</span>
                    </Link>

                    {restaurant && (
                      <Link
                        to={`/restaurants/${restaurant._id || restaurant.id}`}
                        className="h-10 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
                        title="Customer Live View"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Summary Strip */}
              <div className="p-4 sm:px-8 bg-fooddash-cream/40 border-t border-[#E4DCD0]/70 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-fooddash-muted block">Total Dishes</span>
                    <span className="font-extrabold text-fooddash-charcoal text-sm">{totalDishesCount} items</span>
                  </div>
                  <div className="w-px h-6 bg-[#E4DCD0]" />
                  <div>
                    <span className="text-fooddash-muted block">Active Categories</span>
                    <span className="font-extrabold text-fooddash-charcoal text-sm">0 categories</span>
                  </div>
                  <div className="w-px h-6 bg-[#E4DCD0]" />
                  <div>
                    <span className="text-fooddash-muted block">Kitchen Status</span>
                    <span className="font-extrabold text-emerald-700 text-sm">Active</span>
                  </div>
                </div>

                <Link
                  to={restaurant ? `/vendor/restaurants/${restaurant._id || restaurant.id}/menu/create` : '/vendor/menu/create'}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <PlusCircle size={15} />
                  <span>Add New Dish to this Kitchen</span>
                </Link>
              </div>
            </div>

            {/* Menu Sections or Empty State */}
            {totalDishesCount === 0 ? (
              <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-12 text-center shadow-card flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-4 border border-primary/20">
                  <UtensilsCrossed size={28} />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-fooddash-charcoal mb-2">
                  No Dishes in Menu Yet
                </h3>
                <p className="text-sm text-fooddash-muted max-w-md mb-6">
                  This kitchen currently has no dishes listed. Add your signature starters, main courses, and desserts to make them available to customers.
                </p>
                <Link
                  to={restaurant ? `/vendor/restaurants/${restaurant._id || restaurant.id}/menu/create` : '/vendor/menu/create'}
                  className="h-11 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Add First Dish</span>
                </Link>
              </div>
            ) : (
              <>
                {/* CATEGORY 1: STARTERS */}
                {starters.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E4DCD0]">
                      <div>
                        <h3 className="font-heading font-extrabold text-lg text-fooddash-charcoal uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                          <span>Starters</span>
                        </h3>
                        <p className="text-xs text-fooddash-muted">Appetizers and snacks ({starters.length})</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {starters.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                )}

                {/* CATEGORY 2: MAIN COURSE */}
                {mainCourses.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E4DCD0]">
                      <div>
                        <h3 className="font-heading font-extrabold text-lg text-fooddash-charcoal uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span>Main Course</span>
                        </h3>
                        <p className="text-xs text-fooddash-muted">Main dishes and gravies ({mainCourses.length})</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mainCourses.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                )}

                {/* CATEGORY 3: DESSERTS */}
                {desserts.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E4DCD0]">
                      <div>
                        <h3 className="font-heading font-extrabold text-lg text-fooddash-charcoal uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span>Desserts & Beverages</span>
                        </h3>
                        <p className="text-xs text-fooddash-muted">Sweet delicacies and drinks ({desserts.length})</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {desserts.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
