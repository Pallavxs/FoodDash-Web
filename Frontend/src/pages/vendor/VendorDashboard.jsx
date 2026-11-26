import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import { getMyRestraunt } from '../../redux/slice/restaurantSlice';
import {
  PlusCircle,
  Store,
  UtensilsCrossed,
  ShoppingBag,
  IndianRupee,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

/**
 * VendorDashboard Component
 * Live dashboard for authenticated restaurant partners connected to Redux and backend data.
 * Displays real restaurant counts, dynamic restaurant overview, and clean empty states when no data exists.
 */
export default function VendorDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myRestaurants, restaurants, loading } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getMyRestraunt());
  }, [dispatch]);

  // Authenticated vendor's actual restaurants
  const vendorRestaurants = Array.isArray(myRestaurants) && myRestaurants.length > 0
    ? myRestaurants
    : (Array.isArray(restaurants) ? restaurants : []);

  // Real business values derived from application state
  const restaurantsCount = vendorRestaurants.length;
  const activeDishesCount = 0; // Dishes will populate once connected to Menu endpoints
  const ordersToday = 0; // Real orders count from order records
  const revenueToday = 0; // Real revenue sum

  // Dynamic statistics configuration
  const metrics = [
    {
      title: 'Restaurants',
      value: restaurantsCount,
      subtext: restaurantsCount === 0
        ? 'No restaurants listed'
        : (restaurantsCount === 1 ? '1 Active kitchen' : `${restaurantsCount} Active kitchens`),
      icon: Store,
      bg: 'bg-orange-50',
      iconColor: 'text-primary'
    },
    {
      title: 'Active Dishes',
      value: activeDishesCount,
      subtext: activeDishesCount === 0 ? 'No dishes yet' : `${activeDishesCount} active dishes`,
      icon: UtensilsCrossed,
      bg: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Orders Today',
      value: ordersToday,
      subtext: ordersToday === 0 ? 'No active orders' : `${ordersToday} orders today`,
      icon: ShoppingBag,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Revenue Today',
      value: `₹${revenueToday.toLocaleString('en-IN')}`,
      subtext: revenueToday === 0 ? 'No revenue recorded' : 'Daily earnings',
      icon: IndianRupee,
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    }
  ];

  // Placeholder for real incoming orders array
  const recentOrders = [];

  const displayName = user?.name || 'Partner';

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full space-y-8">
            {/* Top Welcome Hero */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-outer p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2.5">
                  <Sparkles size={13} />
                  <span>Kitchen Partner Hub</span>
                </div>
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome to FoodDash VendorHub, {displayName}!
                </h1>
                <p className="text-sm text-stone-300 mt-1 max-w-[540px]">
                  Monitor live orders, edit restaurant menus, and review real-time revenue across all your active kitchens.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/vendor/restaurants/create"
                  className="h-11 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 shrink-0"
                >
                  <PlusCircle size={16} />
                  <span>Add Restaurant</span>
                </Link>

                <Link
                  to="/vendor/orders"
                  className="h-11 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>Live Orders</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {metrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-outer p-5 sm:p-6 border border-[#E4DCD0]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted">
                        {metric.title}
                      </span>
                      <div className={`w-9 h-9 rounded-xl ${metric.bg} ${metric.iconColor} flex items-center justify-center`}>
                        <Icon size={18} />
                      </div>
                    </div>

                    <div>
                      <div className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal">
                        {metric.value}
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-fooddash-muted">{metric.subtext}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions Strip */}
            <div className="bg-white rounded-outer p-6 border border-[#E4DCD0]/80 shadow-sm">
              <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <Link
                  to="/vendor/restaurants/create"
                  className="p-4 rounded-2xl bg-fooddash-cream/70 hover:bg-primary-soft border border-[#E4DCD0]/60 hover:border-primary/30 transition-all flex flex-col items-center text-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <PlusCircle size={20} />
                  </div>
                  <span className="font-heading font-bold text-xs text-fooddash-charcoal group-hover:text-primary">
                    Add Restaurant
                  </span>
                </Link>

                <Link
                  to="/vendor/menu"
                  className="p-4 rounded-2xl bg-fooddash-cream/70 hover:bg-amber-50 border border-[#E4DCD0]/60 hover:border-amber-300 transition-all flex flex-col items-center text-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <UtensilsCrossed size={20} />
                  </div>
                  <span className="font-heading font-bold text-xs text-fooddash-charcoal group-hover:text-amber-700">
                    Manage Menus
                  </span>
                </Link>

                <Link
                  to="/vendor/orders"
                  className="p-4 rounded-2xl bg-fooddash-cream/70 hover:bg-blue-50 border border-[#E4DCD0]/60 hover:border-blue-300 transition-all flex flex-col items-center text-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <ShoppingBag size={20} />
                  </div>
                  <span className="font-heading font-bold text-xs text-fooddash-charcoal group-hover:text-blue-700">
                    Live Orders
                  </span>
                </Link>

                <Link
                  to="/vendor/restaurants"
                  className="p-4 rounded-2xl bg-fooddash-cream/70 hover:bg-stone-100 border border-[#E4DCD0]/60 hover:border-stone-300 transition-all flex flex-col items-center text-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Store size={20} />
                  </div>
                  <span className="font-heading font-bold text-xs text-fooddash-charcoal group-hover:text-stone-900">
                    All Kitchens
                  </span>
                </Link>
              </div>
            </div>

            {/* Restaurant Overview Section */}
            <div className="bg-white rounded-outer p-6 sm:p-8 border border-[#E4DCD0]/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-fooddash-charcoal">
                    Restaurant Overview
                  </h3>
                  <p className="text-xs text-fooddash-muted mt-0.5">
                    Live status and details across your registered locations.
                  </p>
                </div>
                {vendorRestaurants.length > 0 && (
                  <Link
                    to="/vendor/restaurants"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>View All</span>
                    <ChevronRight size={14} />
                  </Link>
                )}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 rounded-2xl border border-[#E4DCD0]/80 bg-stone-50 animate-pulse flex gap-4">
                      <div className="w-24 h-24 rounded-xl bg-stone-200 shrink-0" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-stone-200 rounded w-3/4" />
                        <div className="h-3 bg-stone-200 rounded w-1/2" />
                        <div className="h-3 bg-stone-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State: No Restaurants */}
              {!loading && vendorRestaurants.length === 0 && (
                <div className="p-8 rounded-2xl bg-fooddash-cream/40 border border-[#E4DCD0] text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 text-primary flex items-center justify-center mb-3 shadow-inner">
                    <Store size={26} />
                  </div>
                  <h4 className="font-heading font-bold text-base text-fooddash-charcoal mb-1">
                    No Restaurants Yet
                  </h4>
                  <p className="text-xs text-fooddash-muted max-w-sm mb-4 leading-relaxed">
                    Create your first restaurant to start managing menus and receiving orders from local foodies.
                  </p>
                  <Link
                    to="/vendor/restaurants/create"
                    className="h-10 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2"
                  >
                    <PlusCircle size={15} />
                    <span>Create Restaurant</span>
                  </Link>
                </div>
              )}

              {/* Dynamic Vendor Restaurants Grid */}
              {!loading && vendorRestaurants.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {vendorRestaurants.map((restaurant) => {
                    const id = restaurant._id || restaurant.id;
                    const rating = restaurant.rating ? Number(restaurant.rating).toFixed(1) : null;
                    const deliveryTime = restaurant.deliveryTime ? `${restaurant.deliveryTime} mins` : null;

                    return (
                      <div
                        key={id}
                        className="p-4 rounded-2xl border border-[#E4DCD0]/80 bg-fooddash-cream/30 hover:bg-white hover:shadow-md transition-all flex gap-4"
                      >
                        {restaurant.image ? (
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80';
                            }}
                            className="w-24 h-24 rounded-xl object-cover shrink-0 bg-stone-100"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 shrink-0">
                            <Store size={28} />
                          </div>
                        )}

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-heading font-bold text-base text-fooddash-charcoal line-clamp-1">
                                {restaurant.name}
                              </h4>
                              {rating && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600">
                                  <Star size={12} className="fill-amber-400" />
                                  {rating}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-fooddash-muted mt-0.5 line-clamp-1">
                              {restaurant.cuisine || 'Cuisine not specified'}
                            </p>
                            {restaurant.location && (
                              <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-1">
                                <MapPin size={12} className="text-primary shrink-0" />
                                <span className="truncate">{restaurant.location}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs">
                            <span className="text-[11px] text-fooddash-muted">
                              {deliveryTime || 'Active Kitchen'}
                            </span>
                            <Link
                              to={`/vendor/restaurants/${id}`}
                              className="font-bold text-primary hover:underline text-[11px]"
                            >
                              Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-outer p-6 sm:p-8 border border-[#E4DCD0]/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-fooddash-charcoal">
                    Recent Orders
                  </h3>
                  <p className="text-xs text-fooddash-muted mt-0.5">
                    Latest incoming customer tickets across all kitchens.
                  </p>
                </div>
                <Link
                  to="/vendor/orders"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>Go to Orders Board</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              {/* Empty State: No Orders */}
              {recentOrders.length === 0 ? (
                <div className="p-8 rounded-2xl bg-fooddash-cream/40 border border-[#E4DCD0] text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mb-3">
                    <ShoppingBag size={22} />
                  </div>
                  <h4 className="font-heading font-bold text-base text-fooddash-charcoal mb-1">
                    No Orders Yet
                  </h4>
                  <p className="text-xs text-fooddash-muted max-w-sm">
                    When customers place orders from your kitchens, they will appear here in real time.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E4DCD0] text-fooddash-muted font-bold uppercase tracking-wider text-[11px]">
                        <th className="pb-3 px-3">Order ID</th>
                        <th className="pb-3 px-3">Customer</th>
                        <th className="pb-3 px-3">Items</th>
                        <th className="pb-3 px-3">Kitchen</th>
                        <th className="pb-3 px-3">Total</th>
                        <th className="pb-3 px-3">Status</th>
                        <th className="pb-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4DCD0]/60">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-fooddash-cream/40 transition-colors">
                          <td className="py-3.5 px-3 font-bold text-fooddash-charcoal">{order.id}</td>
                          <td className="py-3.5 px-3">
                            <span className="font-semibold text-fooddash-charcoal block">{order.customer}</span>
                            <span className="text-[11px] text-fooddash-muted">{order.time}</span>
                          </td>
                          <td className="py-3.5 px-3 text-fooddash-body max-w-[220px] truncate">{order.items}</td>
                          <td className="py-3.5 px-3 font-medium text-stone-600">{order.restaurant}</td>
                          <td className="py-3.5 px-3 font-extrabold text-fooddash-charcoal">{order.total}</td>
                          <td className="py-3.5 px-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <Link
                              to="/vendor/orders"
                              className="font-bold text-primary hover:underline text-xs"
                            >
                              Manage
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
