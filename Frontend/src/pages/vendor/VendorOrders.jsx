import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bike
} from 'lucide-react';

export default function VendorOrders() {
  const [selectedTab, setSelectedTab] = useState('All');

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar />

          <div className="flex-1 w-full space-y-8">
            <PageHeader
              title="Kitchen Order Management"
              subtitle="Real-time order board across all your restaurant locations."
            />

            {/* Order Statistics KPI Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Pending
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-fooddash-charcoal">
                    0 orders
                  </span>
                  <span className="text-[10px] text-fooddash-muted block mt-0.5">
                    Needs acceptance
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertCircle size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Preparing
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-fooddash-charcoal">
                    0 orders
                  </span>
                  <span className="text-[10px] text-fooddash-muted block mt-0.5">
                    In the kitchen
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Bike size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Out for Delivery
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-fooddash-charcoal">
                    0 orders
                  </span>
                  <span className="text-[10px] text-fooddash-muted block mt-0.5">
                    With couriers
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-outer p-5 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted block">
                    Completed
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-fooddash-charcoal">
                    0 orders
                  </span>
                  <span className="text-[10px] text-fooddash-muted block mt-0.5">
                    Delivered today
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'Pending', 'Preparing', 'Out for Delivery', 'Completed'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    selectedTab === tab
                      ? 'bg-fooddash-charcoal text-white shadow-sm'
                      : 'bg-white border border-[#E4DCD0] text-fooddash-body hover:border-primary hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Empty Orders State */}
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-12 text-center max-w-md mx-auto">
              <ShoppingBag size={40} className="text-fooddash-muted mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-fooddash-charcoal mb-1">
                No Orders Yet
              </h3>
              <p className="text-xs text-fooddash-muted">
                Incoming orders from customers will appear here in real time.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
