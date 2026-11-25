import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Store,
  PlusCircle,
  ShoppingBag,
  ArrowLeft,
  LogOut,
  Settings,
  ChefHat
} from 'lucide-react';

/**
 * VendorSidebar Component
 * SaaS sidebar navigation for the FoodDash Vendor portal.
 */
export default function VendorSidebar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
      isActive
        ? 'bg-primary text-white shadow-button'
        : 'text-fooddash-body hover:text-fooddash-charcoal hover:bg-black/5'
    }`;

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white border border-[#E4DCD0]/80 rounded-outer p-4 sm:p-5 shadow-sm flex flex-col justify-between h-fit lg:min-h-[640px] sticky top-20">
      <div className="flex flex-col gap-6">
        {/* Brand header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E4DCD0]/70">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-md">
            <ChefHat size={22} />
          </div>
          <div>
            <span className="font-heading text-lg font-extrabold text-fooddash-charcoal leading-tight block">
              Vendor<span className="text-primary">Hub</span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary bg-primary-soft px-2 py-0.5 rounded-full border border-primary/20">
              Kitchen Portal
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1.5">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted px-3 mb-1">
            Menu & Operations
          </div>

          <NavLink to="/vendor" end className={navLinkClass}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/vendor/restaurants" end className={navLinkClass}>
            <Store size={18} />
            <span>My Restaurants</span>
          </NavLink>

          <NavLink to="/vendor/restaurants/create" className={navLinkClass}>
            <PlusCircle size={18} />
            <span>Add Restaurant</span>
          </NavLink>

          <NavLink to="/vendor/orders" className={navLinkClass}>
            <ShoppingBag size={18} />
            <span>Live Orders</span>
          </NavLink>
        </nav>

        {/* Secondary Navigation */}
        <nav className="flex flex-col gap-1.5 pt-4 border-t border-[#E4DCD0]/70">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-fooddash-muted px-3 mb-1">
            General
          </div>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-fooddash-body hover:text-fooddash-charcoal hover:bg-black/5 transition-colors"
          >
            <Settings size={18} />
            <span>Profile & Settings</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-fooddash-body hover:text-primary hover:bg-primary-soft/50 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Customer View</span>
          </Link>
        </nav>
      </div>

      {/* Footer Profile card */}
      <div className="pt-6 border-t border-[#E4DCD0]/70 mt-6 flex flex-col gap-3">
        <div className="p-3 rounded-xl bg-fooddash-cream border border-[#E4DCD0] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
            {user?.name ? user.name[0].toUpperCase() : 'V'}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-fooddash-charcoal truncate">{user?.name || 'Kitchen Partner'}</div>
            <div className="text-[10px] text-fooddash-muted truncate">{user?.email || 'Vendor Account'}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="flex items-center justify-center gap-2 text-xs font-bold text-fooddash-muted hover:text-primary py-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
