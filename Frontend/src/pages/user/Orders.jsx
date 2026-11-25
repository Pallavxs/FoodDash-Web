import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function Orders() {
  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <PageHeader
          title="My Orders"
          subtitle="Track live order status, review order history, and re-order dishes."
          backLink="/dashboard"
          backText="Back to Dashboard"
        />

        {/* Empty Orders State */}
        <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-12 sm:p-16 text-center max-w-md mx-auto">
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
      </main>

      <Footer />
    </div>
  );
}
