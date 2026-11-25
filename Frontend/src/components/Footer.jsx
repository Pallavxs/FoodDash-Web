import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Share2, 
  MessageCircle, 
  Award 
} from 'lucide-react';

/**
 * Footer Component
 * Production-ready SaaS/food-delivery footer with links, branding, and app highlights.
 */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E4DCD0] text-fooddash-charcoal pt-10 pb-8 mt-auto">
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#E4DCD0]">
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_4px_14px_rgba(229,43,35,0.3)]">
                <span className="text-lg leading-none text-white">⚡</span>
              </div>
              <span className="font-heading text-2xl font-extrabold tracking-tight text-fooddash-charcoal">
                Food<span className="text-primary">Dash</span>
              </span>
            </Link>

            <p className="text-sm text-fooddash-muted leading-relaxed max-w-[360px]">
              Connecting passionate food lovers with artisan local kitchens, gourmet neighborhood chefs, and beloved eateries with ultra-fast delivery.
            </p>

            <div className="flex items-center gap-3 pt-2 text-fooddash-muted">
              <span className="w-9 h-9 rounded-full bg-fooddash-subtle hover:bg-primary hover:text-white flex items-center justify-center transition-colors cursor-pointer" title="Global Community">
                <Globe size={17} />
              </span>
              <span className="w-9 h-9 rounded-full bg-fooddash-subtle hover:bg-primary hover:text-white flex items-center justify-center transition-colors cursor-pointer" title="Share FoodDash">
                <Share2 size={17} />
              </span>
              <span className="w-9 h-9 rounded-full bg-fooddash-subtle hover:bg-primary hover:text-white flex items-center justify-center transition-colors cursor-pointer" title="Customer Chat">
                <MessageCircle size={17} />
              </span>
              <span className="w-9 h-9 rounded-full bg-fooddash-subtle hover:bg-primary hover:text-white flex items-center justify-center transition-colors cursor-pointer" title="Award-Winning Dining">
                <Award size={17} />
              </span>
            </div>
          </div>

          {/* Column 1: Customer */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-fooddash-charcoal">
              Explore
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-fooddash-muted">
              <li><Link to="/" className="hover:text-primary transition-colors">Popular Restaurants</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">My Cart</Link></li>
              <li><Link to="/orders" className="hover:text-primary transition-colors">Past Orders</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Customer Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Column 2: Partner / Vendor */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-fooddash-charcoal">
              Vendor Portal
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-fooddash-muted">
              <li><Link to="/vendor" className="hover:text-primary transition-colors">Vendor Dashboard</Link></li>
              <li><Link to="/vendor/restaurants" className="hover:text-primary transition-colors">Manage Restaurants</Link></li>
              <li><Link to="/vendor/restaurants/create" className="hover:text-primary transition-colors">Add Restaurant</Link></li>
              <li><Link to="/vendor/orders" className="hover:text-primary transition-colors">Live Order Board</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Partner Sign In</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-fooddash-charcoal">
              Company
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-fooddash-muted">
              <li><span className="hover:text-primary transition-colors cursor-pointer">About FoodDash</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Careers (Hiring!)</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Culinary Standards</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Privacy & Terms</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Contact Support</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-fooddash-muted gap-4">
          <p>© {new Date().getFullYear()} FoodDash Inc. All rights reserved. Built with precision for artisan dining.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary transition-colors cursor-pointer">Security</span>
            <span>•</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
