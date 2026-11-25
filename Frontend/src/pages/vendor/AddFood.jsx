import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import { UploadCloud, ArrowRight } from 'lucide-react';

export default function AddFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [available, setAvailable] = useState(true);
  const [isVeg, setIsVeg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/vendor/restaurants/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar />

          <div className="flex-1 w-full max-w-[800px]">
            <PageHeader
              title="Add New Food Dish"
              subtitle={`Adding new dish to restaurant (#${id}) menu.`}
              backLink={`/vendor/restaurants/${id}`}
              backText="Back to Menu"
            />

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Dish Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Handmade Tagliatelle al Tartufo"
                    className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Category <span className="text-primary">*</span>
                    </label>
                    <select
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      defaultValue="Pizzas"
                    >
                      <option value="Pizzas">Pizzas</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Burgers">Burgers</option>
                      <option value="Bowls">Bowls</option>
                      <option value="Appetizers">Appetizers</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Price ($ USD) <span className="text-primary">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 18.50"
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Dish Description & Ingredients
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe flavor notes, artisan ingredients, allergies..."
                    className="w-full p-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Dish Photograph
                  </label>
                  <div className="border-2 border-dashed border-[#E4DCD0] hover:border-primary rounded-2xl p-5 text-center bg-fooddash-cream/30 transition-colors flex flex-col items-center justify-center cursor-pointer mb-3">
                    <UploadCloud size={24} className="text-primary mb-2" />
                    <span className="text-xs font-bold text-fooddash-charcoal">
                      Click to upload dish photo
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <label className="p-4 rounded-2xl border border-[#E4DCD0] bg-fooddash-cream/40 flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-fooddash-charcoal block">Dish Availability</span>
                      <span className="text-[11px] text-fooddash-muted">Toggle off if sold out</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={available}
                      onChange={(e) => setAvailable(e.target.checked)}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </label>

                  <label className="p-4 rounded-2xl border border-[#E4DCD0] bg-fooddash-cream/40 flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-fooddash-charcoal block">Vegetarian Dish</span>
                      <span className="text-[11px] text-fooddash-muted">Display green vegetarian badge</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isVeg}
                      onChange={(e) => setIsVeg(e.target.checked)}
                      className="w-5 h-5 accent-emerald-600 cursor-pointer"
                    />
                  </label>
                </div>

                <div className="pt-6 border-t border-[#E4DCD0]/70 flex items-center justify-end gap-3">
                  <Link
                    to={`/vendor/restaurants/${id}`}
                    className="h-12 px-6 rounded-full border border-stone-300 hover:bg-stone-100 text-fooddash-charcoal font-bold text-xs transition-colors flex items-center justify-center"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="h-12 px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Add Dish to Menu</span>
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
