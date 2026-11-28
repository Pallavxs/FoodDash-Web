import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slice/authSlice';
import {
  ShoppingBag,
  User,
  LayoutDashboard,
  Home,
  LogOut,
  Menu,
  X,
  Store,
  Clock
} from 'lucide-react';

/**
 * Navbar Component
 * Role-based navigation:
 * - Home: Always visible
 * - Dashboard, My Orders, Cart: Shown when user is logged in as Customer or Vendor
 * - Vendor Dashboard / Portal: Shown when role is Vendor (or Admin)
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRole = user?.role?.toLowerCase();
  const isVendor = isAuthenticated && (userRole === 'vendor' || userRole === 'admin');
  const isCustomerOrVendor =
    isAuthenticated && (userRole === 'customer' || userRole === 'vendor' || userRole === 'admin');

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch {
      // Ignore
    } finally {
      navigate('/login');
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 select-none ${
      isActive
        ? 'text-primary bg-primary-soft shadow-2xs'
        : 'text-fooddash-charcoal hover:text-primary hover:bg-stone-100/70'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EAE5DC] shadow-[0_2px_10px_rgba(30,20,10,0.03)]">
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center select-none group">
          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-[1.75rem] font-black tracking-tight text-fooddash-charcoal leading-none">
              Food<span className="text-primary">Dash</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-fooddash-muted leading-none mt-1">
              Artisan Delivery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-fooddash-cream/70 p-1 rounded-full border border-[#EAE5DC]">
          <NavLink to="/" end className={navLinkClass}>
            <Home size={15} />
            <span>Home</span>
          </NavLink>

          {/* Shown only when user is customer or vendor */}
          {isCustomerOrVendor && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                <LayoutDashboard size={15} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="/orders" className={navLinkClass}>
                <Clock size={15} />
                <span>My Orders</span>
              </NavLink>

              <NavLink to="/cart" className={navLinkClass}>
                <div className="relative flex items-center">
                  <ShoppingBag size={15} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-scaleIn">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Right CTA / Vendor Switcher / User Profile */}
        <div className="hidden md:flex items-center gap-3">
          {/* Vendor Dashboard shown ONLY when role is vendor */}
          {isVendor && (
            <>
              <Link
                to="/vendor"
                className="h-9 px-3.5 rounded-full bg-fooddash-cream hover:bg-stone-100 text-fooddash-charcoal text-xs font-bold transition-all flex items-center gap-1.5 border border-[#E6E2DA] hover:border-primary/40 shadow-2xs hover:shadow-xs"
              >
                <Store size={14} className="text-primary" />
                <span>Vendor Dashboard</span>
              </Link>
              <div className="h-4 w-px bg-[#EAE5DC]" />
            </>
          )}

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-fooddash-cream border border-[#E6E2DA] hover:border-primary/50 transition-colors shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-fooddash-charcoal leading-none">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-fooddash-muted capitalize leading-none mt-0.5">
                    {user.role || 'Customer'}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-bold text-fooddash-muted hover:text-primary p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold text-fooddash-charcoal hover:text-primary px-3.5 py-2 rounded-full hover:bg-stone-100/70 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="h-9 px-4 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center justify-center hover:-translate-y-0.5"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Hamburger Button & Cart */}
        <div className="flex md:hidden items-center gap-2">
          {isCustomerOrVendor && (
            <Link
              to="/cart"
              className="relative p-2 text-fooddash-charcoal hover:text-primary"
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-fooddash-charcoal hover:bg-black/5 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE5DC] bg-white px-4 py-4 space-y-2 animate-fadeIn shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-fooddash-charcoal hover:bg-primary-soft hover:text-primary"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          {isCustomerOrVendor && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-fooddash-charcoal hover:bg-primary-soft hover:text-primary"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-fooddash-charcoal hover:bg-primary-soft hover:text-primary"
              >
                <Clock size={18} />
                <span>My Orders</span>
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-fooddash-charcoal hover:bg-primary-soft hover:text-primary"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} />
                  <span>Cart</span>
                </div>
                {cartCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-fooddash-charcoal hover:bg-primary-soft hover:text-primary"
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
            </>
          )}

          {isVendor && (
            <div className="pt-2 border-t border-[#EAE5DC]">
              <Link
                to="/vendor"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-fooddash-cream text-fooddash-charcoal text-sm font-bold border border-[#E6E2DA]"
              >
                <Store size={16} className="text-primary" />
                <span>Vendor Dashboard</span>
              </Link>
            </div>
          )}

          {!isAuthenticated && (
            <div className="pt-2 border-t border-[#EAE5DC] grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 rounded-xl bg-stone-100 text-fooddash-charcoal text-sm font-bold text-center"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 rounded-xl bg-primary text-white text-sm font-bold text-center shadow-button"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
