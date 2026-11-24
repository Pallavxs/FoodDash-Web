import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { ShoppingBag, ArrowRight, ArrowLeft, Utensils } from 'lucide-react';

export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[900px] mx-auto px-4 sm:px-6 py-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-fooddash-muted hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-orange-100 text-primary rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
            <ShoppingBag size={38} />
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal mb-2">
            Your Cart is Empty
          </h1>

          <p className="text-sm text-fooddash-muted max-w-[420px] mx-auto mb-8">
            You haven't added any dishes to your order yet. Explore artisan local kitchens and discover delicious flavors.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/dashboard"
              className="h-[48px] px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover flex items-center gap-2 transition-all"
            >
              <span>Explore Restaurants</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E4DCD0] bg-white py-6 text-center text-xs text-fooddash-light">
        <p>© {new Date().getFullYear()} FoodDash Technologies Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
