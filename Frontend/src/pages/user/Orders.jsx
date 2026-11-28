import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import { fetchCustomerOrders } from '../../redux/slice/orderSlice';
import {
  ShoppingBag,
  ArrowRight,
  Clock,
  Store,
  MapPin,
  ChevronRight,
  Loader2,
  RefreshCw
} from 'lucide-react';

export default function Orders() {
  const dispatch = useDispatch();
  const { customerOrders = [], loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-2">
          <PageHeader
            title="My Orders"
            subtitle="Track live order status, review order history, and re-order dishes."
            backLink="/dashboard"
            backText="Back to Dashboard"
          />
          <button
            type="button"
            onClick={() => dispatch(fetchCustomerOrders())}
            className="h-10 px-4 rounded-xl border border-[#E4DCD0] bg-white hover:bg-stone-50 text-xs font-bold text-fooddash-charcoal flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            title="Refresh Orders"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {loading && customerOrders.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 size={32} className="animate-spin text-primary" />
            <span className="text-sm font-bold text-fooddash-muted">Loading your orders...</span>
          </div>
        ) : customerOrders.length === 0 ? (
          /* Empty Orders State */
          <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-12 sm:p-16 text-center max-w-md mx-auto my-6 shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-orange-100 text-primary flex items-center justify-center mx-auto mb-5 shadow-inner">
              <ShoppingBag size={38} strokeWidth={1.75} />
            </div>
            <h3 className="font-heading text-xl font-bold text-fooddash-charcoal mb-2">
              No Orders Yet
            </h3>
            <p className="text-xs text-fooddash-muted mb-6 leading-relaxed">
              You haven't placed any orders yet. Discover delicious local food from neighborhood kitchens and place your first order!
            </p>
            <Link
              to="/"
              className="h-11 px-7 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover flex items-center justify-center gap-2 mx-auto w-fit transition-all"
            >
              <span>Explore Restaurants</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {customerOrders.map((order) => {
              const orderId = order._id || order.id;
              const dateStr = new Date(order.createdAt).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={orderId}
                  className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 shadow-sm hover:shadow-card transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4DCD0]/70">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                        <Store size={22} />
                      </div>
                      <div>
                        <h4 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                          {order.restaurant?.name || 'Local Kitchen Partner'}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-fooddash-muted mt-0.5">
                          <span>#{orderId.slice(-6).toUpperCase()}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {dateStr}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <Link
                        to={`/orders/${orderId}`}
                        className="h-9 px-4 rounded-full bg-fooddash-cream hover:bg-stone-100 text-fooddash-charcoal border border-[#E4DCD0] font-bold text-xs flex items-center gap-1.5 transition-all"
                      >
                        <span>Track Order</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="py-3 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2 text-xs text-fooddash-charcoal">
                      {order.items?.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200"
                        >
                          {item.quantity}x {item.menuItem?.name || item.name || 'Dish'}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-fooddash-charcoal">
                      <span className="text-xs font-normal text-fooddash-muted">Total Paid:</span>
                      <span className="font-heading font-extrabold text-base text-primary">
                        ₹{order.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
