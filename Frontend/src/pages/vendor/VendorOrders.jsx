import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import { fetchVendorOrders, updateOrderStatus } from '../../redux/slice/orderSlice';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bike,
  User,
  Phone,
  MapPin,
  Printer,
  ChevronRight,
  IndianRupee,
  Store,
  RefreshCw,
  Loader2
} from 'lucide-react';

/**
 * VendorOrders Component
 * Live incoming kitchen tickets, preparation board, and order lifecycle dispatch.
 * Fully connected to real backend API and Redux state.
 */
export default function VendorOrders() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { vendorOrders = [], loading } = useSelector((state) => state.order);

  const [activeTab, setActiveTab] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchVendorOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus })).unwrap();
    } catch (err) {
      alert(typeof err === 'string' ? err : 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = vendorOrders.filter((o) => o.status === 'placed').length;
  const preparingCount = vendorOrders.filter((o) => o.status === 'preparing').length;
  const onDeliveryCount = vendorOrders.filter((o) => o.status === 'out_for_delivery').length;
  const completedCount = vendorOrders.filter((o) => o.status === 'delivered').length;

  const totalDeliveredRevenue = vendorOrders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const tabs = [
    { label: 'All', count: vendorOrders.length },
    { label: 'Pending', count: pendingCount, filterStatus: 'placed' },
    { label: 'Preparing', count: preparingCount, filterStatus: 'preparing' },
    { label: 'Out for Delivery', count: onDeliveryCount, filterStatus: 'out_for_delivery' },
    { label: 'Completed', count: completedCount, filterStatus: 'delivered' }
  ];

  const filteredOrders = vendorOrders.filter((order) => {
    if (activeTab === 'All') return true;
    const tab = tabs.find((t) => t.label === activeTab);
    return tab ? order.status === tab.filterStatus : true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'placed':
        return {
          label: 'Pending Acceptance',
          color: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500'
        };
      case 'preparing':
        return {
          label: 'In Kitchen Cooking',
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500 animate-pulse'
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery',
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500 animate-pulse'
        };
      case 'delivered':
        return {
          label: 'Delivered',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      default:
        return {
          label: status,
          color: 'bg-stone-50 text-stone-700 border-stone-200',
          dot: 'bg-stone-400'
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full space-y-6">
            <div className="flex items-center justify-between">
              <PageHeader
                title="Kitchen Order Management"
                subtitle="Live incoming tickets, kitchen preparation board, and dispatch status."
              />
              <button
                type="button"
                onClick={() => dispatch(fetchVendorOrders())}
                className="h-10 px-4 rounded-xl border border-[#E4DCD0] bg-white hover:bg-stone-50 text-xs font-bold text-fooddash-charcoal flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title="Refresh Orders"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
            </div>

            {/* KPI Statistics Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                  <Clock size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Pending
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-fooddash-charcoal">
                    {pendingCount} orders
                  </span>
                  <span className="text-[10px] text-rose-600 font-bold block mt-0.5">
                    {pendingCount > 0 ? 'Needs acceptance' : '0 awaiting'}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <AlertCircle size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Preparing
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-fooddash-charcoal">
                    {preparingCount} orders
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold block mt-0.5">
                    {preparingCount > 0 ? 'In kitchen cooking' : '0 in kitchen'}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Bike size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    On Delivery
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-fooddash-charcoal">
                    {onDeliveryCount} orders
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold block mt-0.5">
                    {onDeliveryCount > 0 ? 'Dispatched' : '0 dispatched'}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Completed
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-fooddash-charcoal">
                    {completedCount} orders
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                    ₹{totalDeliveredRevenue.toLocaleString()} total revenue
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Tabs Bar */}
            <div className="bg-white rounded-2xl p-3 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === tab.label
                      ? 'bg-fooddash-charcoal text-white shadow-xs'
                      : 'bg-fooddash-cream/70 text-fooddash-body hover:bg-stone-100 hover:text-fooddash-charcoal'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeTab === tab.label ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Orders Content or Empty State */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-12 text-center shadow-card flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-primary flex items-center justify-center mb-4 border border-rose-100">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-fooddash-charcoal mb-2">
                  No Live Orders Yet
                </h3>
                <p className="text-sm text-fooddash-muted max-w-md">
                  Incoming customer orders for your kitchens will appear here in real time. Ensure your kitchens and menu items are active.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredOrders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  const orderDate = new Date(order.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={order._id || order.id}
                      className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 shadow-sm hover:shadow-card transition-all space-y-5"
                    >
                      {/* Order Card Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4DCD0]/70">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary font-heading font-extrabold text-sm flex items-center justify-center shrink-0">
                            #
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-heading font-extrabold text-lg text-fooddash-charcoal">
                                #{(order._id || order.id).slice(-6).toUpperCase()}
                              </span>
                              <span className="text-xs text-fooddash-muted">•</span>
                              <span className="inline-flex items-center gap-1 text-xs text-fooddash-muted">
                                <Clock size={12} />
                                {orderDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-primary font-bold mt-0.5">
                              <Store size={13} />
                              <span>{order.restaurant?.name || 'Kitchen Order'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
                            <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                            <span>{badge.label}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => window.print()}
                            className="p-2 rounded-xl border border-stone-200 text-stone-500 hover:text-fooddash-charcoal hover:bg-stone-50 transition-colors cursor-pointer"
                            title="Print Kitchen Ticket"
                          >
                            <Printer size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Middle Section: Customer Info & Items */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-4 p-4 rounded-2xl bg-fooddash-cream/40 border border-[#E4DCD0]/70 space-y-2.5 text-xs">
                          <span className="font-heading font-bold text-xs uppercase tracking-wider text-fooddash-muted block">
                            Customer Details
                          </span>
                          <div className="flex items-center gap-2 text-fooddash-charcoal font-bold">
                            <User size={14} className="text-primary shrink-0" />
                            <span>{order.user?.name || 'Customer'}</span>
                          </div>
                          <div className="flex items-start gap-2 text-fooddash-muted">
                            <MapPin size={14} className="text-stone-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{order.deliveryAddress || 'Standard Delivery Address'}</span>
                          </div>
                        </div>

                        <div className="lg:col-span-8 flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="font-heading font-bold text-xs uppercase tracking-wider text-fooddash-muted block">
                              Ordered Items
                            </span>
                            <div className="space-y-1.5">
                              {order.items?.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-stone-50 border border-stone-100"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-primary w-5 text-center">
                                      {item.quantity}x
                                    </span>
                                    <span className="font-semibold text-fooddash-charcoal">
                                      {item.menuItem?.name || item.name || 'Menu Dish'}
                                    </span>
                                  </div>
                                  <span className="font-bold text-fooddash-charcoal">
                                    ₹{(item.price || item.menuItem?.price || 0) * item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Footer Actions & Total */}
                      <div className="pt-4 border-t border-[#E4DCD0]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="text-[11px] text-fooddash-muted block">Payment</span>
                            <span className="font-semibold text-xs text-fooddash-charcoal">
                              {order.paymentMethod || 'COD'} ({order.payment?.status || 'Paid'})
                            </span>
                          </div>
                          <div className="w-px h-6 bg-[#E4DCD0]" />
                          <div>
                            <span className="text-[11px] text-fooddash-muted block">Total Bill</span>
                            <span className="font-heading font-extrabold text-base text-fooddash-charcoal">
                              ₹{order.totalAmount}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 flex-wrap">
                          {updatingId === order._id ? (
                            <div className="flex items-center gap-2 text-xs font-bold text-stone-500">
                              <Loader2 size={16} className="animate-spin text-primary" />
                              <span>Updating order...</span>
                            </div>
                          ) : (
                            <>
                              {order.status === 'placed' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(order._id, 'preparing')}
                                  className="h-10 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                  <CheckCircle2 size={15} />
                                  <span>Accept & Start Preparing</span>
                                </button>
                              )}

                              {order.status === 'preparing' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(order._id, 'out_for_delivery')}
                                  className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Bike size={15} />
                                  <span>Mark Out for Delivery</span>
                                </button>
                              )}

                              {order.status === 'out_for_delivery' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(order._id, 'delivered')}
                                  className="h-10 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                  <CheckCircle2 size={15} />
                                  <span>Mark as Delivered</span>
                                </button>
                              )}

                              {order.status === 'delivered' && (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                                  <CheckCircle2 size={14} />
                                  <span>Order Completed</span>
                                </span>
                              )}
                            </>
                          )}
                        </div>
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
