import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import { UploadCloud, ArrowRight } from 'lucide-react';

export default function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [location, setLocation] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

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

          <div className="flex-1 w-full max-w-[900px]">
            <PageHeader
              title={`Edit Restaurant (#${id})`}
              subtitle="Update your restaurant brand information and settings."
              backLink={`/vendor/restaurants/${id}`}
              backText="Back to Manage Restaurant"
            />

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Trattoria Napoli"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Cuisine
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Italian, Wood-fired Pizza"
                      value={cuisine}
                      onChange={(e) => setCuisine(e.target.value)}
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Location / Street Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 104 Grand Avenue, Downtown"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Delivery Time (mins)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 25-35"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your kitchen and recipes..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Restaurant Cover Image
                  </label>
                  <div className="border-2 border-dashed border-[#E4DCD0] hover:border-primary rounded-2xl p-5 text-center bg-fooddash-cream/30 transition-colors flex flex-col items-center justify-center cursor-pointer">
                    <UploadCloud size={24} className="text-primary mb-2" />
                    <span className="text-xs font-bold text-fooddash-charcoal">
                      Upload replacement cover photo
                    </span>
                  </div>
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
