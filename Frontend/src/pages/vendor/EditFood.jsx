import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import { UploadCloud, ArrowRight } from 'lucide-react';

export default function EditFood() {
  const { restaurantId, id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Pizzas');
  const [available, setAvailable] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/vendor/restaurants/${restaurantId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar />

          <div className="flex-1 w-full max-w-[800px]">
            <PageHeader
              title={`Edit Food Dish (#${id})`}
              subtitle={`Managing menu item for restaurant #${restaurantId}.`}
              backLink={`/vendor/restaurants/${restaurantId}`}
              backText="Back to Menu"
            />

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Dish Name
                  </label>
                  <input
                    type="text"
                    placeholder="Dish Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
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
                      Price ($ USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Description & Ingredients
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Dish Image
                  </label>
                  <div className="border-2 border-dashed border-[#E4DCD0] hover:border-primary rounded-2xl p-5 text-center bg-fooddash-cream/30 transition-colors flex flex-col items-center justify-center cursor-pointer mb-3">
                    <UploadCloud size={24} className="text-primary mb-2" />
                    <span className="text-xs font-bold text-fooddash-charcoal">
                      Upload dish photograph
                    </span>
                  </div>
                </div>

                <label className="p-4 rounded-2xl border border-[#E4DCD0] bg-fooddash-cream/40 flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-fooddash-charcoal block">Available for Ordering</span>
                    <span className="text-[11px] text-fooddash-muted">Toggle off if ingredients are out of stock</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </label>

                <div className="pt-6 border-t border-[#E4DCD0]/70 flex items-center justify-end gap-3">
                  <Link
                    to={`/vendor/restaurants/${restaurantId}`}
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
