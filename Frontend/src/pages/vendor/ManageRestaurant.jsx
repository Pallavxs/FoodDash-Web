import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import {
  PlusCircle,
  Edit,
  UtensilsCrossed
} from 'lucide-react';

export default function ManageRestaurant() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar />

          <div className="flex-1 w-full space-y-8">
            <PageHeader
              title={`Manage Restaurant (#${id})`}
              subtitle="Update live menu dishes, pricing, and operating profile."
              backLink="/vendor/restaurants"
              backText="Back to My Restaurants"
            />

            {/* Restaurant Details Header Card */}
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-8 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-fooddash-charcoal">
                  Restaurant Location #{id}
                </h2>
                <p className="text-xs text-fooddash-muted mt-1">
                  Manage your menu items and restaurant configuration.
                </p>
              </div>

              <Link
                to={`/vendor/restaurants/${id}/edit`}
                className="h-9 px-4 rounded-full border border-stone-300 hover:border-primary text-fooddash-charcoal hover:text-primary font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Edit size={14} />
                <span>Edit Details</span>
              </Link>
            </div>

            {/* Menu Management Section */}
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DCD0]/70 mb-6">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-fooddash-charcoal">
                    Menu Management
                  </h3>
                  <p className="text-xs text-fooddash-muted">
                    Active dishes available for ordering
                  </p>
                </div>

                <Link
                  to={`/vendor/restaurants/${id}/menu/create`}
                  className="h-[44px] px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 w-fit"
                >
                  <PlusCircle size={16} />
                  <span>Add Food Dish</span>
                </Link>
              </div>

              {/* Empty Menu State */}
              <div className="p-10 text-center max-w-sm mx-auto">
                <UtensilsCrossed size={40} className="text-fooddash-muted mx-auto mb-3" />
                <h4 className="font-heading text-base font-bold text-fooddash-charcoal mb-1">
                  No Food Items Added Yet
                </h4>
                <p className="text-xs text-fooddash-muted mb-5">
                  Your kitchen has no dishes on the menu yet. Click below to add your first dish.
                </p>
                <Link
                  to={`/vendor/restaurants/${id}/menu/create`}
                  className="h-9 px-5 rounded-full bg-primary text-white font-bold text-xs shadow-button inline-flex items-center gap-1.5"
                >
                  <PlusCircle size={14} />
                  <span>Add First Dish</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
