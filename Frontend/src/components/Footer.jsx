import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Share2,
  MessageCircle,
  Award
} from 'lucide-react';

/**
 * Official GitHub SVG Icon
 */
const GithubIcon = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

/**
 * Footer Component
 * Intentionally minimal, refined SaaS/food-delivery footer.
 */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E4DCD0] text-fooddash-charcoal pt-10 pb-6 mt-auto">
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: 4 Logical Columns (Brand 2 cols, Account 1 col, FoodDash 1 col, Company 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-9 border-b border-[#E4DCD0]">
          {/* Brand Info (Left Column: 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <Link to="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_4px_14px_rgba(229,43,35,0.28)] group-hover:scale-105 transition-transform duration-200">
                <span className="text-lg leading-none text-white">⚡</span>
              </div>
              <span className="font-heading text-2xl font-extrabold tracking-tight text-fooddash-charcoal">
                Food<span className="text-primary">Dash</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-fooddash-muted leading-relaxed max-w-[340px]">
              Connecting passionate food lovers with artisan local kitchens, gourmet neighborhood chefs, and beloved eateries with ultra-fast delivery.
            </p>

            {/* Social / Action Icon Row */}
            <div className="flex items-center gap-2.5 pt-1 text-fooddash-muted">
              <span
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Global Community"
              >
                <Globe size={15} />
              </span>
              <span
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Share FoodDash"
              >
                <Share2 size={15} />
              </span>
              <span
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Customer Support"
              >
                <MessageCircle size={15} />
              </span>
              <span
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Artisan Quality"
              >
                <Award size={15} />
              </span>
            </div>
          </div>

          {/* Column 1: ACCOUNT */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-fooddash-charcoal">
              Account
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-fooddash-muted font-medium">
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: FOODDASH */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-fooddash-charcoal">
              FoodDash
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-fooddash-muted font-medium">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary transition-colors">
                  My Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-primary transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Partner Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary transition-colors">
                  Join FoodDash
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-fooddash-charcoal">
              Company
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-fooddash-muted font-medium">
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Contact Support
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Privacy & Terms
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Culinary Standards
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-xs text-fooddash-muted gap-3">
          {/* Left: Copyright */}
          <p>© {new Date().getFullYear()} FoodDash Inc. All rights reserved.</p>

          {/* Center / Right: Developer Credit */}
          <div className="flex items-center gap-1.5 text-fooddash-muted">
            <span>Built with precision by</span>
            <a
              href="https://github.com/Pallavxs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-fooddash-charcoal hover:text-primary transition-colors group"
            >
              <GithubIcon size={14} className="text-fooddash-charcoal group-hover:text-primary transition-colors" />
              <span>Pallavxs</span>
            </a>
          </div>

          {/* Right: Legal links */}
          <div className="flex items-center gap-3">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy</span>
            <span className="text-stone-300">•</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
