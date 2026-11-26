import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import {
  UploadCloud,
  ArrowRight,
  Store,
  Clock,
  Star,
  MapPin,
  UtensilsCrossed,
  Info,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';

/**
 * CreateRestaurant Component (UI ONLY)
 * Presentational screen for registering a new kitchen partner branch.
 */
export default function CreateRestaurant() {
  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar />

          <div className="flex-1 w-full max-w-[920px] space-y-6">
            <PageHeader
              title="Add New Restaurant"
              subtitle="Register a new kitchen or partner branch to the FoodDash delivery network."
              backLink="/vendor/restaurants"
              backText="Back to My Restaurants"
            />

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card space-y-8">
              {/* Form container (Visual only) */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                {/* 1. Restaurant Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Restaurant Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Restaurant Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Spice Garden Bistro"
                        defaultValue=""
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
                      <span className="text-[11px] text-fooddash-muted mt-1 block">
                        Official brand or kitchen name shown to customers.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Cuisine Type <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. North Indian, Biryani, Mughlai"
                        defaultValue=""
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
                      <span className="text-[11px] text-fooddash-muted mt-1 block">
                        Comma separated primary food categories.
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Kitchen Location / Street Address <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
                      <input
                        type="text"
                        placeholder="e.g. Shop 14, Central Market, MG Road, New Delhi"
                        defaultValue=""
                        className="w-full h-12 pl-11 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                    <span className="text-[11px] text-fooddash-muted mt-1 block">
                      Physical dispatch address used by delivery riders.
                    </span>
                  </div>
                </div>

                {/* 2. Operations & Timings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Operations & Estimates
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Delivery Time (mins)
                      </label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
                        <input
                          type="text"
                          placeholder="e.g. 25-35"
                          defaultValue="30"
                          className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Opening Hours
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 10:00 AM - 11:00 PM"
                        defaultValue="11:00 AM - 11:00 PM"
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Initial Rating
                      </label>
                      <div className="relative">
                        <Star size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 fill-amber-400" />
                        <input
                          type="number"
                          step="0.1"
                          min="1.0"
                          max="5.0"
                          placeholder="4.5"
                          defaultValue="4.8"
                          className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Restaurant Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Restaurant Story & Highlights
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your culinary heritage, chef signature dishes, farm-fresh ingredients, and dining philosophy..."
                      defaultValue=""
                      className="w-full p-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                {/* 4. Restaurant Cover Photo */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      4
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Restaurant Image
                    </h3>
                  </div>

                  {/* Drag and Drop Upload UI with Preview Styling */}
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-[#E4DCD0] hover:border-primary bg-fooddash-cream/40 hover:bg-primary-soft/20 rounded-2xl p-8 sm:p-10 text-center transition-all flex flex-col items-center justify-center cursor-pointer group">
                      <div className="w-16 h-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3.5 shadow-inner group-hover:scale-105 transition-transform">
                        <UploadCloud size={30} />
                      </div>
                      <span className="font-heading font-bold text-base text-fooddash-charcoal">
                        Click to upload restaurant image or drag and drop
                      </span>
                      <span className="text-xs text-fooddash-muted mt-1.5">
                        High resolution banner photo recommended • PNG, JPG, or WEBP up to 5MB
                      </span>

                      <div className="mt-4 px-3 py-1 rounded-full bg-white border border-[#E4DCD0] text-[11px] font-semibold text-stone-600">
                        16:9 widescreen format recommended
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-[#E4DCD0]/70 flex items-center justify-end gap-3">
                  <Link
                    to="/vendor/restaurants"
                    className="h-12 px-6 rounded-full border border-stone-300 hover:bg-stone-100 text-fooddash-charcoal font-bold text-xs transition-colors flex items-center justify-center"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="h-12 px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Create Restaurant</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

