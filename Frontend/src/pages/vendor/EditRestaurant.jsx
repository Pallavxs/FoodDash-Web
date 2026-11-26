import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import { getMyRestraunt } from '../../redux/slice/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  UploadCloud,
  ArrowRight,
  Store,
  Clock,
  Star,
  MapPin,
  UtensilsCrossed
} from 'lucide-react';

/**
 * EditRestaurant Component
 * Form for updating restaurant profile, connected to real Redux restaurant data.
 */
export default function EditRestaurant() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myRestaurants, restaurants } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getMyRestraunt());
  }, [dispatch]);

  const allRestaurants = Array.isArray(myRestaurants) && myRestaurants.length > 0
    ? myRestaurants
    : (Array.isArray(restaurants) ? restaurants : []);

  const restaurant = allRestaurants.find(
    (r) => (r._id || r.id) === id
  ) || null;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full max-w-[920px] space-y-6">
            <PageHeader
              title="Edit Restaurant"
              subtitle={restaurant ? `Update details and settings for ${restaurant.name}.` : "Update details and settings for your restaurant."}
              backLink="/vendor/restaurants"
              backText="Back to My Restaurants"
            />

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card space-y-8">
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
                        defaultValue={restaurant?.name || ""}
                        placeholder="e.g. Spice Garden Bistro"
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Cuisine Type <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={restaurant?.cuisine || ""}
                        placeholder="e.g. North Indian, Biryani, Mughlai"
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
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
                        defaultValue={restaurant?.location || ""}
                        placeholder="e.g. Shop 12, Central Market, Food Street"
                        className="w-full h-12 pl-11 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Operations & Estimates */}
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
                          type="number"
                          defaultValue={restaurant?.deliveryTime || ""}
                          placeholder="30"
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
                        defaultValue=""
                        placeholder="e.g. 10:00 AM - 11:00 PM"
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Rating
                      </label>
                      <div className="relative">
                        <Star size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 fill-amber-400" />
                        <input
                          type="number"
                          step="0.1"
                          defaultValue={restaurant?.rating || ""}
                          placeholder="5.0"
                          className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Description & Story
                    </h3>
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      defaultValue=""
                      placeholder="Tell customers about your kitchen's culinary heritage, fresh ingredients, and specialties..."
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
                      Cover Photo
                    </h3>
                  </div>

                  {restaurant?.image ? (
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#E4DCD0] shadow-sm bg-stone-900 group">
                      <img
                        src={restaurant.image}
                        alt="Current Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6 text-white">
                        <div>
                          <span className="font-bold text-sm block">{restaurant.name} Cover</span>
                          <span className="text-xs text-stone-300">Active Banner</span>
                        </div>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-[#E4DCD0] rounded-2xl p-8 text-center bg-fooddash-cream/40 hover:bg-fooddash-cream/70 transition-all cursor-pointer flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3">
                        <UploadCloud size={24} />
                      </div>
                      <span className="font-bold text-sm text-fooddash-charcoal block">
                        Upload restaurant cover banner
                      </span>
                      <span className="text-xs text-fooddash-muted mt-1 block">
                        High-resolution 16:9 photo recommended (JPG, PNG or WEBP up to 5MB)
                      </span>
                    </div>
                  )}
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
