import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { 
  Star, 
  Clock, 
  MapPin, 
  Heart, 
  Share2, 
  Info, 
  ShoppingBag,
  UtensilsCrossed
} from 'lucide-react';

export default function RestaurantDetails() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PageHeader
          title=""
          backLink="/"
          backText="Back to all restaurants"
          className="mb-4"
        />

        {/* Hero Cover Placeholder */}
        <div className="relative rounded-[32px] overflow-hidden bg-stone-900 border border-[#E4DCD0] shadow-card mb-8">
          <div className="relative h-64 sm:h-80 lg:h-96 w-full flex items-center justify-center bg-stone-800 text-stone-300">
            <div className="text-center p-6">
              <UtensilsCrossed size={48} className="mx-auto mb-3 text-stone-500" />
              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
                Restaurant Details
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Restaurant ID: {id}
              </p>
            </div>

            <div className="absolute top-5 right-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isFavorite 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-black/40 text-white hover:bg-black/60'
                }`}
                title="Favorite restaurant"
              >
                <Heart size={20} className={isFavorite ? 'fill-white' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Empty Menu State */}
        <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-12 text-center max-w-lg mx-auto mb-12">
          <UtensilsCrossed size={42} className="text-fooddash-muted mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-fooddash-charcoal mb-1">
            Menu Dishes
          </h3>
          <p className="text-xs text-fooddash-muted mb-6">
            The menu dishes for this kitchen will appear here when connected to the menu service.
          </p>
          <Link
            to="/"
            className="h-10 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs inline-flex items-center gap-2 shadow-button"
          >
            <span>Explore Other Restaurants</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
