import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slice/authSlice';
import {
  ShoppingBag,
  User,
  LayoutDashboard,
  Home,
  LogOut,
  Menu,
  X,
  ChefHat
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch {
      // Ignore error
    } finally {
      navigate('/login');
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
      isActive
        ? 'text-primary bg-primary-soft/60'
        : 'text-fooddash-charcoal hover:text-primary hover:bg-black/5'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E4DCD0]/70 shadow-sm">
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_4px_14px_rgba(229,43,35,0.3)] group-hover:scale-105 transition-transform">
            <span className="text-lg leading-none">⚡</span>
          </div>
          <span className="font-heading text-2xl font-extrabold tracking-tight text-fooddash-charcoal">
            Food<span className="text-primary">Dash</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass}>
            <Home size={16} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            <ShoppingBag size={16} />
            <span>Cart</span>
          </NavLink>
          <NavLink to="/profile" className={navLinkClass}>
            <User size={16} />
            <span>Profile</span>
          </NavLink>
        </nav>

        {/* Auth CTA or User Menu */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-fooddash-cream border border-[#E4DCD0] hover:border-primary/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-fooddash-charcoal leading-none">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-[10px] text-fooddash-muted capitalize">
                    {user?.role || 'Customer'}
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-bold text-fooddash-muted hover:text-primary px-3 py-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-bold text-fooddash-charcoal hover:text-primary px-4 py-2 rounded-full transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm font-bold text-white bg-gradient-to-r from-primary to-primary-dark hover:shadow-button px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-fooddash-charcoal hover:bg-black/5"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4DCD0] bg-white px-4 pt-3 pb-5 flex flex-col gap-2 animate-fadeIn">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            <Home size={18} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            <User size={18} />
            <span>Profile</span>
          </NavLink>

          <div className="border-t border-gray-100 pt-3 mt-1">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-fooddash-charcoal">
                      {user?.name || 'User'}
                    </div>
                    <div className="text-xs text-fooddash-muted">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-xs font-bold text-primary flex items-center gap-1 bg-primary-soft px-3 py-1.5 rounded-full"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-bold text-fooddash-charcoal border border-fooddash-border rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-bold text-white bg-primary rounded-lg"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
