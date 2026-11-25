import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import {
  PlusCircle,
  Store,
  UtensilsCrossed,
  ShoppingBag,
  DollarSign,
  Sparkles,
  Inbox
} from 'lucide-react';

export default function VendorDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar />

          <div className="flex-1 w-full space-y-8">
            {/* Top Welcome Card */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-outer p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles size={13} />
                  <span>Kitchen Partner Hub</span>
                </div>
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome to FoodDash VendorHub
                </h1>
                <p className="text-sm text-stone-300 mt-1 max-w-[520px]">
                  Track live kitchen orders, manage menus, and monitor daily revenue across all your active restaurants.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/vendor/restaurants/create"
                  className="h-[46px] px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 shrink-0"
                >
                  <PlusCircle size={16} />
                  <span>Add Restaurant</span>
                </Link>

                <Link
                  to="/vendor/orders"
                  className="h-[46px] px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>Live Orders</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-fooddash-muted mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider">Restaurants</span>
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-primary flex items-center justify-center">
                    <Store size={16} />
                  </div>
                </div>
                <div>
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal">
                    0
                  </span>
                  <span className="text-[11px] text-fooddash-muted block mt-0.5">
                    No restaurants listed
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-fooddash-muted mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider">Active Dishes</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <UtensilsCrossed size={16} />
                  </div>
                </div>
                <div>
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal">
                    0
                  </span>
                  <span className="text-[11px] text-fooddash-muted block mt-0.5">
                    No dishes created
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-fooddash-muted mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider">Orders Today</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <ShoppingBag size={16} />
                  </div>
                </div>
                <div>
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal">
                    0
                  </span>
                  <span className="text-[11px] text-fooddash-muted block mt-0.5">
                    0 live orders
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-fooddash-muted mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider">Revenue Today</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <DollarSign size={16} />
                  </div>
                </div>
                <div>
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
                    $0.00
                  </span>
                  <span className="text-[11px] text-fooddash-muted block mt-0.5">
                    No revenue recorded
                  </span>
                </div>
              </div>
            </div>

            {/* Empty State Card */}
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-10 sm:p-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mx-auto mb-4">
                <Inbox size={32} />
              </div>
              <h3 className="font-heading text-xl font-bold text-fooddash-charcoal mb-2">
                No Restaurants or Orders Yet
              </h3>
              <p className="text-xs text-fooddash-muted max-w-sm mx-auto mb-6">
                Get started by creating your first restaurant location to publish your menu and receive orders.
              </p>
              <Link
                to="/vendor/restaurants/create"
                className="h-11 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs inline-flex items-center gap-2 shadow-button"
              >
                <PlusCircle size={15} />
                <span>Create Restaurant</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
