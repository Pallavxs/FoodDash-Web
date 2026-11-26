import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  CheckCircle2,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';

/**
 * EditFood Component
 * Form for updating menu item details.
 */
export default function EditFood() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full max-w-[960px] space-y-6">
            <PageHeader
              title="Edit Menu Item"
              subtitle="Update recipe details, pricing, availability, and presentation image."
              backLink="/vendor/menu"
              backText="Back to Menu"
            />

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                {/* 2-Column Desktop Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column (Primary Details) */}
                  <div className="lg:col-span-7 space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Food Item Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Handmade Tagliatelle al Tartufo"
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
                            placeholder="0"
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
                            defaultValue=""
                            className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Dietary Preference <span className="text-primary">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2 h-12">
                          <label className="flex items-center justify-center gap-2 rounded-xl border border-fooddash-border bg-fooddash-cream/30 text-xs font-bold cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-colors">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                            <span>Veg</span>
                          </label>
                          <label className="flex items-center justify-center gap-2 rounded-xl border border-fooddash-border bg-fooddash-cream/30 text-xs font-bold cursor-pointer hover:bg-rose-50 hover:border-rose-300 transition-colors">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
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

                  {/* Right Column (Image Upload & Availability) */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Food Image Upload Dropzone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Dish Photo
                      </label>

                      <div className="border-2 border-dashed border-[#E4DCD0] rounded-2xl p-6 text-center bg-fooddash-cream/40 hover:bg-fooddash-cream/70 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px]">
                        <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-2">
                          <UploadCloud size={20} />
                        </div>
                        <span className="font-bold text-xs text-fooddash-charcoal block">
                          Upload food photo
                        </span>
                        <span className="text-[11px] text-fooddash-muted mt-0.5 block">
                          PNG, JPG, or WEBP up to 5MB
                        </span>
                        <span className="text-[10px] text-fooddash-muted/70 mt-1 block">
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
                      <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>Available for ordering</span>
                      </span>
                    </div>

                    {/* Danger Zone: Delete Action */}
                    <div className="pt-2">
                      <button
                        type="button"
                        className="w-full h-11 px-4 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 size={14} />
                        <span>Delete Dish from Menu</span>
                      </button>
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
                    <span>Save Changes</span>
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
