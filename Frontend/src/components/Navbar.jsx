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
 * Global top navigation with brand logo, routes, authenticated user state, and responsive drawer.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    `px-3 py-2 rounded-xl text-sm font-bold transition-all duration-150 flex items-center gap-1.5 ${
      isActive
        ? 'text-primary bg-primary-soft'
        : 'text-fooddash-charcoal hover:text-primary hover:bg-black/5'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E4DCD0]/80 shadow-xs">
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[70px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_4px_14px_rgba(229,43,35,0.3)] group-hover:scale-105 transition-transform">
            <span className="text-xl leading-none text-white">⚡</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-fooddash-charcoal leading-none">
              Food<span className="text-primary">Dash</span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-fooddash-muted">
              Artisan Delivery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            <Home size={16} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/dashboard" className={navLinkClass}>
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/orders" className={navLinkClass}>
            <Clock size={16} />
            <span>My Orders</span>
          </NavLink>

          <NavLink to="/cart" className={navLinkClass}>
            <ShoppingBag size={16} />
            <span>Cart</span>
          </NavLink>
        </nav>

        {/* Right CTA / Vendor Switcher / User Profile */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/vendor"
            className="h-[38px] px-3.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-fooddash-charcoal text-xs font-bold transition-all flex items-center gap-1.5 border border-stone-200"
          >
            <Store size={14} className="text-primary" />
            <span>Vendor Portal</span>
          </Link>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-fooddash-cream border border-[#E4DCD0] hover:border-primary/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-fooddash-charcoal leading-none">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-fooddash-muted capitalize">
                    {user.role || 'Customer'}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-bold text-fooddash-muted hover:text-primary px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold text-fooddash-charcoal hover:text-primary px-3 py-2 rounded-full transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark hover:shadow-button px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/cart"
            className="p-2 text-fooddash-charcoal hover:text-primary"
          >
            <ShoppingBag size={22} />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-fooddash-charcoal hover:bg-black/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4DCD0] bg-white px-4 py-4 space-y-2 animate-fadeIn shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-fooddash-charcoal hover:bg-primary-soft hover:text-primary"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
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
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-fooddash-charcoal hover:bg-primary-soft hover:text-primary"
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
          </Link>
          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-fooddash-charcoal hover:bg-primary-soft hover:text-primary"
          >
            <User size={18} />
            <span>Profile</span>
          </Link>
          <div className="pt-2 border-t border-[#E4DCD0] flex flex-col gap-2">
            <Link
              to="/vendor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-stone-100 text-fooddash-charcoal text-sm font-bold"
            >
              <Store size={16} className="text-primary" />
              <span>Vendor Dashboard</span>
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-button"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
