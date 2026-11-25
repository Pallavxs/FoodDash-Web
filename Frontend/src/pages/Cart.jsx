import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <PageHeader
          title="Your Shopping Cart"
          subtitle="Review and customize your selected dishes before checkout."
          backLink="/"
          backText="Continue Browsing"
        />

        {/* Empty Cart State */}
        <div className="bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 p-8 sm:p-14 text-center max-w-lg mx-auto animate-fadeIn">
          <div className="w-24 h-24 bg-orange-100 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShoppingBag size={44} strokeWidth={1.75} />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal mb-2">
            Your Cart is Empty
          </h2>

          <p className="text-sm text-fooddash-muted max-w-[360px] mx-auto mb-8 leading-relaxed">
            You haven't added any dishes to your order yet. Explore local artisan kitchens and discover delicious flavors.
          </p>

          <Link
            to="/"
            className="h-[50px] px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 flex items-center justify-center gap-2 transition-all mx-auto w-fit"
          >
            <span>Explore Restaurants</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
