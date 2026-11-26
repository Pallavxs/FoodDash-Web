import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import {
  UploadCloud,
  ArrowRight,
  Clock,
  IndianRupee,
  UtensilsCrossed,
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';

/**
 * AddFood Component (UI ONLY)
 * Form for adding a new menu item to a restaurant.
 */
export default function AddFood() {
  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar />

          <div className="flex-1 w-full max-w-[960px] space-y-6">
            <PageHeader
              title="Add Menu Item"
              subtitle="Introduce a delicious new dish to your restaurant's digital menu."
              backLink="/vendor/menu"
              backText="Back to Menu"
            />

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                {/* 2-Column Desktop Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column (Primary Details) - 7 cols */}
                  <div className="lg:col-span-7 space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Food Item Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Paneer Tikka Masala"
                        defaultValue=""
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Category <span className="text-primary">*</span>
                        </label>
                        <select
                          defaultValue="Main Course"
                          className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        >
                          <option value="Starters">Starters</option>
                          <option value="Main Course">Main Course</option>
                          <option value="Biryani">Biryani</option>
                          <option value="Breads">Breads</option>
                          <option value="Beverages">Beverages</option>
                          <option value="Desserts">Desserts</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Price (₹ INR) <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <IndianRupee size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
                          <input
                            type="number"
                            placeholder="249"
                            defaultValue=""
                            className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Prep Time (mins)
                        </label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
                          <input
                            type="text"
                            placeholder="e.g. 20 mins"
                            defaultValue="20 mins"
                            className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Dietary Type (Veg / Non-Veg) */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Dietary Preference <span className="text-primary">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <label className="flex items-center justify-center gap-2 h-12 px-3 rounded-input border border-emerald-300 bg-emerald-50/50 cursor-pointer text-xs font-bold text-emerald-800">
                            <input
                              type="radio"
                              name="diet"
                              defaultChecked
                              className="accent-emerald-600"
                            />
                            <span>Veg</span>
                          </label>

                          <label className="flex items-center justify-center gap-2 h-12 px-3 rounded-input border border-stone-200 bg-fooddash-cream/40 cursor-pointer text-xs font-bold text-fooddash-charcoal hover:bg-stone-50">
                            <input
                              type="radio"
                              name="diet"
                              className="accent-rose-600"
                            />
                            <span>Non-Veg</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Description <span className="text-primary">*</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Detail key ingredients, spice levels, allergens, or culinary style..."
                        defaultValue=""
                        className="w-full p-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Right Column (Image Upload & Availability) - 5 cols */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Food Image Upload Card */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Dish Photo <span className="text-primary">*</span>
                      </label>
                      <div className="border-2 border-dashed border-[#E4DCD0] hover:border-primary bg-fooddash-cream/40 hover:bg-primary-soft/20 rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center cursor-pointer group">
                        <div className="w-14 h-14 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 transition-transform">
                          <UploadCloud size={26} />
                        </div>
                        <span className="font-heading font-bold text-sm text-fooddash-charcoal">
                          Upload food photo
                        </span>
                        <span className="text-xs text-fooddash-muted mt-1">
                          PNG, JPG, or WEBP up to 5MB
                        </span>
                        <span className="text-[11px] text-stone-500 mt-2 px-2.5 py-0.5 rounded-full bg-white border border-[#E4DCD0]">
                          Square or 4:3 ratio recommended
                        </span>
                      </div>
                    </div>

                    {/* Availability Switch UI */}
                    <div className="p-4 rounded-2xl bg-fooddash-cream/60 border border-[#E4DCD0] space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-heading font-bold text-sm text-fooddash-charcoal block">
                            Item Availability
                          </span>
                          <span className="text-xs text-fooddash-muted">
                            Can customers order this dish right now?
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
                        </label>
                      </div>
                      <div className="pt-2 border-t border-stone-200/70 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>Available for ordering</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-[#E4DCD0]/70 flex items-center justify-end gap-3">
                  <Link
                    to="/vendor/menu"
                    className="h-12 px-6 rounded-full border border-stone-300 hover:bg-stone-100 text-fooddash-charcoal font-bold text-xs transition-colors flex items-center justify-center"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="h-12 px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Add Menu Item</span>
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

