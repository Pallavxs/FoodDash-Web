import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import {
  Bike,
  Clock,
  MapPin,
  ChefHat,
  ShoppingBag
} from 'lucide-react';

export default function OrderTracking() {
  const { id } = useParams();

  const timelineSteps = [
    { label: 'Order Placed', time: 'Pending', description: 'Order request received' },
    { label: 'Restaurant Confirmed', time: 'Pending', description: 'Restaurant confirmed the order' },
    { label: 'Preparing Your Food', time: 'In Progress', description: 'Dishes being freshly cooked' },
    { label: 'Out for Delivery', time: 'Upcoming', description: 'Courier pickup and dispatch' },
    { label: 'Delivered', time: 'Upcoming', description: 'Delivered to your door' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <PageHeader
          title={`Order #${id || 'Tracking'}`}
          subtitle="Real-time delivery progress and order details."
          backLink="/orders"
          backText="Back to My Orders"
          badge={<StatusBadge status="Preparing" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Timeline */}
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-8 shadow-sm">
              <h3 className="font-heading text-xl font-extrabold text-fooddash-charcoal pb-4 border-b border-[#E4DCD0]/70 mb-6">
                Order Status Timeline
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-7 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4DCD0]">
                {timelineSteps.map((step, idx) => {
                  const isDone = idx <= 2;
                  const isCurrent = idx === 2;

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div
                        className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          isCurrent
                            ? 'bg-primary text-white ring-4 ring-primary/20 scale-110'
                            : isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className={`font-heading text-sm sm:text-base font-extrabold ${isCurrent ? 'text-primary' : 'text-fooddash-charcoal'}`}>
                            {step.label}
                          </h4>
                          <span className="text-xs font-semibold text-fooddash-muted">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs text-fooddash-muted mt-0.5">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-7 shadow-sm">
              <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal mb-3">
                Live Courier Route Map
              </h3>

              <div className="relative h-64 sm:h-80 rounded-2xl bg-stone-100 overflow-hidden border border-[#E4DCD0] flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#b8aba0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40" />
                <div className="flex flex-col items-center gap-2 text-fooddash-muted z-10">
                  <Bike size={32} className="text-primary animate-pulse" />
                  <span className="text-xs font-bold">Courier tracking route active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-4 bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-7 shadow-card flex flex-col gap-6 sticky top-24">
            <div>
              <span className="text-[11px] uppercase font-bold text-primary tracking-wider">
                Order Information
              </span>
              <h3 className="font-heading text-xl font-extrabold text-fooddash-charcoal mt-0.5">
                Order #{id || 'Pending'}
              </h3>
            </div>

            <div className="py-4 border-y border-[#E4DCD0]/70 text-xs text-fooddash-muted flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="font-bold text-fooddash-charcoal">In Progress</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Arrival</span>
                <span className="font-bold text-fooddash-charcoal">25-35 mins</span>
              </div>
            </div>

            <Link
              to="/orders"
              className="h-10 rounded-full border border-stone-300 hover:border-primary text-fooddash-charcoal hover:text-primary font-bold text-xs flex items-center justify-center transition-colors"
            >
              View All My Orders
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
