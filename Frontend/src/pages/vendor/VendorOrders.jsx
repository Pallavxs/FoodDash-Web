import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bike,
  User,
  Phone,
  MapPin,
  FileText,
  Printer,
  ChevronRight,
  IndianRupee,
  Store
} from 'lucide-react';

/**
 * VendorOrders Component
 * Kitchen live order management screen with real-time status and ticket controls.
 * Displays clean empty state when no orders exist.
 */
export default function VendorOrders() {
  const { user } = useSelector((state) => state.auth);

  // Real orders array (empty until real orders are dispatched from backend)
  const orders = [];

  const tabs = [
    { label: 'All Orders', count: orders.length, active: true },
    { label: 'Pending', count: orders.filter((o) => o.status === 'Pending').length, active: false },
    { label: 'Preparing', count: orders.filter((o) => o.status === 'Preparing').length, active: false },
    { label: 'Out for Delivery', count: orders.filter((o) => o.status === 'Out for Delivery').length, active: false },
    { label: 'Completed', count: orders.filter((o) => o.status === 'Delivered' || o.status === 'Completed').length, active: false }
  ];

  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const preparingCount = orders.filter((o) => o.status === 'Preparing').length;
  const onDeliveryCount = orders.filter((o) => o.status === 'Out for Delivery').length;
  const completedCount = orders.filter((o) => o.status === 'Delivered' || o.status === 'Completed').length;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full space-y-6">
            <PageHeader
              title="Kitchen Order Management"
              subtitle="Live incoming tickets, kitchen preparation board, and dispatch status."
            />

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
                    {onDeliveryCount > 0 ? 'Rider in transit' : '0 in transit'}
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
                    ₹0 total today
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
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    tab.active
                      ? 'bg-fooddash-charcoal text-white shadow-xs'
                      : 'bg-fooddash-cream/70 text-fooddash-body hover:bg-stone-100 hover:text-fooddash-charcoal'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      tab.active ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Orders Content or Empty State */}
            {orders.length === 0 ? (
              <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-12 text-center shadow-card flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-primary flex items-center justify-center mb-4 border border-rose-100">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-fooddash-charcoal mb-2">
                  No Live Orders Yet
                </h3>
                <p className="text-sm text-fooddash-muted max-w-md">
                  Incoming customer orders for your kitchens will appear here in real time. Make sure your kitchens are active and accepting orders.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((order) => (
                  <div
                    key={order.id}
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
                              {order.id}
                            </span>
                            <span className="text-xs text-fooddash-muted">•</span>
                            <span className="inline-flex items-center gap-1 text-xs text-fooddash-muted">
                              <Clock size={12} />
                              {order.time} ({order.orderTime})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-primary font-bold mt-0.5">
                            <Store size={13} />
                            <span>{order.restaurant}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${order.statusColor}`}>
                          <span className={`w-2 h-2 rounded-full ${order.dotColor}`} />
                          <span>{order.status}</span>
                        </span>

                        <button
                          type="button"
                          className="p-2 rounded-xl border border-stone-200 text-stone-500 hover:text-fooddash-charcoal hover:bg-stone-50 transition-colors"
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
                          Customer Info
                        </span>
                        <div className="flex items-center gap-2 text-fooddash-charcoal font-bold">
                          <User size={14} className="text-primary shrink-0" />
                          <span>{order.customer?.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-fooddash-body">
                          <Phone size={14} className="text-stone-400 shrink-0" />
                          <span>{order.customer?.phone}</span>
                        </div>
                        <div className="flex items-start gap-2 text-fooddash-muted">
                          <MapPin size={14} className="text-stone-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{order.customer?.address}</span>
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
                                className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-stone-50 border border-stone-100"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-extrabold text-primary w-5 text-center">
                                    {item.quantity}x
                                  </span>
                                  <span className="font-semibold text-fooddash-charcoal">
                                    {item.name}
                                  </span>
                                </div>
                                <span className="font-bold text-fooddash-charcoal">₹{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {order.note && (
                          <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                            <FileText size={14} className="text-amber-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Note:</strong> {order.note}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Footer Actions & Total */}
                    <div className="pt-4 border-t border-[#E4DCD0]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-[11px] text-fooddash-muted block">Payment Method</span>
                          <span className="font-semibold text-xs text-fooddash-charcoal">{order.paymentMethod}</span>
                        </div>
                        <div className="w-px h-6 bg-[#E4DCD0]" />
                        <div>
                          <span className="text-[11px] text-fooddash-muted block">Total Bill</span>
                          <span className="font-heading font-extrabold text-base text-fooddash-charcoal">
                            {order.subtotal}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 flex-wrap">
                        {order.actionType === 'pending' && (
                          <>
                            <button
                              type="button"
                              className="h-10 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs transition-colors cursor-pointer"
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              className="h-10 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 size={14} />
                              <span>Accept Order</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
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
