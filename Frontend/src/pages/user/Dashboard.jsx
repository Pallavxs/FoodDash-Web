import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { logoutUser } from '../../redux/slice/authSlice';
import { fetchCustomerOrders } from '../../redux/slice/orderSlice';
import {
  ShoppingBag,
  User,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  LogOut,
  Store,
  Bike,
  Compass,
  CheckCircle2,
  ChevronRight,
  UtensilsCrossed,
  ChefHat
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { customerOrders = [], loading: ordersLoading } = useSelector((state) => state.order);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch {
      // Ignore
    } finally {
      navigate('/login');
    }
  };

  const displayName = user?.name || 'Foodie';
  const displayEmail = user?.email || 'N/A';
  const displayRole = user?.role || 'Customer';
  const isVendor = user?.role?.toLowerCase() === 'vendor' || user?.role?.toLowerCase() === 'admin';

  // Calculate real active orders (in progress) & completed orders
  const activeOrders = useMemo(() => {
    return customerOrders.filter(
      (o) => o.status && o.status !== 'delivered' && o.status !== 'cancelled'
    );
  }, [customerOrders]);

  const completedOrders = useMemo(() => {
    return customerOrders.filter((o) => o.status === 'delivered');
  }, [customerOrders]);

  const latestAddress = useMemo(() => {
    return customerOrders[0]?.deliveryAddress || user?.address || 'Set during checkout';
  }, [customerOrders, user]);

  const liveActiveOrder = activeOrders[0] || null;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* ========================================================
            1. WELCOME HERO CARD
            ======================================================== */}
        <div className="w-full bg-white rounded-3xl shadow-card border border-fooddash-border/80 p-6 sm:p-8 animate-fadeIn overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              {/* User Avatar Initials */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-heading font-black text-2xl sm:text-3xl shadow-md shrink-0">
                {displayName ? displayName[0].toUpperCase() : 'U'}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-primary bg-primary-soft border border-primary/20 px-3 py-0.5 rounded-full">
                    <Sparkles size={11} className="text-amber-500 fill-amber-500" />
                    <span>FoodDash Member</span>
                    <span>•</span>
                    <span className="capitalize">{displayRole}</span>
                  </span>
                  {isVendor && (
                    <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                      Kitchen Partner
                    </span>
                  )}
                </div>

                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal tracking-tight">
                  Welcome back, {displayName}!
                </h1>

                <p className="text-xs sm:text-sm text-fooddash-muted font-medium">
                  Signed in as <strong className="text-fooddash-charcoal">{displayEmail}</strong>
                </p>
              </div>
            </div>

          </div>

          {/* Quick Actions Action Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-6 mt-6 border-t border-stone-100">
            <Link
              to="/cart"
              className="h-10 px-5 rounded-xl bg-primary text-white text-xs font-bold shadow-button hover:bg-primary-dark transition-all flex items-center gap-2 active:scale-95"
            >
              <ShoppingBag size={14} />
              <span>View Cart</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-white text-primary text-[10px] font-black">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/orders"
              className="h-10 px-5 rounded-xl bg-white border border-fooddash-border hover:border-primary text-fooddash-charcoal hover:text-primary text-xs font-bold shadow-2xs transition-all flex items-center gap-2 active:scale-95"
            >
              <Clock size={14} />
              <span>My Orders</span>
            </Link>

            <Link
              to="/"
              className="h-10 px-5 rounded-xl bg-white border border-fooddash-border hover:border-primary text-fooddash-charcoal hover:text-primary text-xs font-bold shadow-2xs transition-all flex items-center gap-2 active:scale-95"
            >
              <Compass size={14} />
              <span>Explore Restaurants</span>
            </Link>

            <Link
              to="/profile"
              className="h-10 px-5 rounded-xl bg-white border border-fooddash-border hover:border-primary text-fooddash-charcoal hover:text-primary text-xs font-bold shadow-2xs transition-all flex items-center gap-2 active:scale-95"
            >
              <User size={14} />
              <span>Account Profile</span>
            </Link>
            
          </div>
        </div>

        {/* ========================================================
            2. LIVE ORDER SPOTLIGHT (SHOWN WHEN AN ACTIVE ORDER EXISTS)
            ======================================================== */}
        {liveActiveOrder && (
          <div className="bg-gradient-to-r from-red-500 via-primary to-primary-dark text-white rounded-3xl p-5 sm:p-6 shadow-lg animate-fadeIn flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
                <Bike size={24} className="animate-bounce" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE ORDER IN PROGRESS
                  </span>
                  <span className="text-xs text-white/80 font-bold">
                    #{liveActiveOrder._id?.slice(-6).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-tight">
                  {liveActiveOrder.restaurant?.name || 'Kitchen Partner'}
                </h3>
                <p className="text-xs text-white/80 font-medium">
                  Status:{' '}
                  <span className="font-bold uppercase tracking-wider">
                    {liveActiveOrder.status?.replace(/_/g, ' ')}
                  </span>
                  {' '}• {liveActiveOrder.items?.length || 1} items
                </p>
              </div>
            </div>

            <Link
              to={`/orders/${liveActiveOrder._id}`}
              className="h-11 px-6 rounded-full bg-white hover:bg-stone-50 text-primary font-heading font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 self-stretch md:self-auto justify-center cursor-pointer active:scale-95"
            >
              <span>Track Live Order</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* ========================================================
            3. REAL STATS OVERVIEW CARDS
            ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {/* Active Orders Card */}
          <Link
            to="/orders"
            className="bg-white rounded-3xl p-5 sm:p-6 border border-fooddash-border/80 shadow-xs hover:shadow-card hover:border-primary/40 transition-all flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Bike size={24} />
            </div>
            <div className="truncate">
              <div className="text-[10px] uppercase font-black text-fooddash-muted tracking-wider">
                Active Orders
              </div>
              <div className="font-heading text-2xl font-black text-fooddash-charcoal leading-tight">
                {activeOrders.length} {activeOrders.length === 1 ? 'order' : 'orders'}
              </div>
              <div className="text-xs text-blue-600 font-bold mt-0.5 truncate">
                {activeOrders.length > 0 ? 'Live in transit' : 'Ready to order'}
              </div>
            </div>
          </Link>

          {/* Order History Card */}
          <Link
            to="/orders"
            className="bg-white rounded-3xl p-5 sm:p-6 border border-fooddash-border/80 shadow-xs hover:shadow-card hover:border-primary/40 transition-all flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Clock size={24} />
            </div>
            <div className="truncate">
              <div className="text-[10px] uppercase font-black text-fooddash-muted tracking-wider">
                Order History
              </div>
              <div className="font-heading text-2xl font-black text-fooddash-charcoal leading-tight">
                {completedOrders.length} {completedOrders.length === 1 ? 'past order' : 'past orders'}
              </div>
              <div className="text-xs text-emerald-700 font-bold mt-0.5 truncate">
                {completedOrders.length > 0 ? 'Delivered safely' : 'No previous orders'}
              </div>
            </div>
          </Link>

          {/* Delivery Address Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-fooddash-border/80 shadow-xs flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-rose-50 text-primary flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div className="truncate">
              <div className="text-[10px] uppercase font-black text-fooddash-muted tracking-wider">
                Default Address
              </div>
              <div className="font-heading text-sm sm:text-base font-extrabold text-fooddash-charcoal truncate leading-tight">
                {latestAddress}
              </div>
              <div className="text-xs text-fooddash-muted mt-0.5">
                Saved delivery destination
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. RECENT ORDERS SECTION
            ======================================================== */}
        <div className="bg-white rounded-3xl border border-fooddash-border/80 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-extrabold text-fooddash-charcoal">
                Recent Orders
              </h2>
              <p className="text-xs text-fooddash-muted">
                Track status and quickly view order details
              </p>
            </div>
            <Link
              to="/orders"
              className="text-xs font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {ordersLoading && customerOrders.length === 0 ? (
            <div className="py-10 text-center text-xs text-fooddash-muted font-bold">
              Loading recent orders...
            </div>
          ) : customerOrders.length === 0 ? (
            /* Clean Empty State */
            <div className="py-10 text-center max-w-sm mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mx-auto shadow-2xs">
                <UtensilsCrossed size={26} />
              </div>
              <h4 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                No orders placed yet
              </h4>
              <p className="text-xs text-fooddash-muted leading-relaxed">
                Discover artisan local kitchens and fresh meals delivered straight to your doorstep.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-button hover:bg-primary-dark transition-all"
              >
                <span>Browse Menu</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            /* Orders List */
            <div className="space-y-3">
              {customerOrders.slice(0, 4).map((order) => {
                const orderId = order._id || order.id;
                const isDelivered = order.status === 'delivered';
                const dateStr = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Recent';

                return (
                  <div
                    key={orderId}
                    className="p-4 sm:p-5 rounded-2xl border border-stone-100 hover:border-primary/40 bg-fooddash-cream/40 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-white border border-fooddash-border/80 flex items-center justify-center text-primary font-bold shrink-0 shadow-2xs">
                        <Store size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-extrabold text-sm sm:text-base text-fooddash-charcoal leading-tight">
                            {order.restaurant?.name || 'Kitchen Partner'}
                          </h4>
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isDelivered
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-orange-50 text-primary border border-orange-200'
                            }`}
                          >
                            {order.status?.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-fooddash-muted mt-0.5">
                          {dateStr} • {order.items?.length || 1} {order.items?.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <span className="font-heading font-black text-sm sm:text-base text-fooddash-charcoal">
                        ₹{order.totalAmount}
                      </span>
                      <Link
                        to={`/orders/${orderId}`}
                        className={`h-9 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                          isDelivered
                            ? 'bg-white border border-fooddash-border hover:border-primary text-fooddash-charcoal hover:text-primary'
                            : 'bg-primary text-white hover:bg-primary-dark shadow-button'
                        }`}
                      >
                        <span>{isDelivered ? 'View Summary' : 'Track Order'}</span>
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
