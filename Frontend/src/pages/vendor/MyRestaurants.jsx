import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import EmptyState from '../../components/EmptyState';
import PageHeader from '../../components/PageHeader';
import { Store, PlusCircle } from 'lucide-react';

export default function MyRestaurants() {
  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar />

          <div className="flex-1 w-full space-y-6">
            <PageHeader
              title="My Restaurants"
              subtitle="Manage your registered kitchens, menus, and operational settings."
              actions={
                <Link
                  to="/vendor/restaurants/create"
                  className="h-[44px] px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Add Restaurant</span>
                </Link>
              }
            />

            {/* Empty State */}
            <EmptyState
              icon={Store}
              title="No Restaurants Registered Yet"
              description="You haven't listed any restaurant or kitchen yet. Register your first kitchen now to start receiving orders from local foodies."
              actionText="Create Restaurant"
              actionLink="/vendor/restaurants/create"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
