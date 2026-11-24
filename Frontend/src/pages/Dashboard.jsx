import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import { logoutUser } from '../redux/slice/authSlice';
import {
  CheckCircle2,
  LogOut,
  ShoppingBag,
  User,
  UtensilsCrossed,
  Clock,
  MapPin,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
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

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Hero Card */}
        <div className="w-full bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 p-8 sm:p-12 mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 size={44} />
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary-soft border border-primary/20 px-3 py-1 rounded-full mb-3">
                <span>Active Session</span>
                <span>•</span>
                <span className="capitalize">{user?.role || 'Customer'}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-fooddash-charcoal mb-2">
                Welcome back, {user?.name || 'Foodie'}!
              </h1>

              <p className="text-sm text-fooddash-muted mb-6">
                Signed in as <strong className="text-fooddash-charcoal">{user?.email}</strong>
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/cart"
                  className="h-[46px] px-5 rounded-full bg-primary text-white text-sm font-bold shadow-button hover:shadow-button-hover flex items-center gap-2 transition-all"
                >
                  <ShoppingBag size={16} />
                  <span>View Cart</span>
                </Link>

                <Link
                  to="/profile"
                  className="h-[46px] px-5 rounded-full bg-white border border-fooddash-border hover:border-primary text-fooddash-charcoal hover:text-primary text-sm font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  <User size={16} />
                  <span>My Profile</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="h-[46px] px-5 rounded-full bg-gray-100 hover:bg-red-50 text-fooddash-charcoal hover:text-primary text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-[#E4DCD0]/70 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-primary flex items-center justify-center shrink-0">
              <ShoppingBag size={24} />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-fooddash-muted tracking-wider">Active Orders</div>
              <div className="font-heading text-2xl font-extrabold text-fooddash-charcoal">0 orders</div>
              <div className="text-xs text-green-600 font-semibold mt-0.5">Ready to order</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#E4DCD0]/70 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <UtensilsCrossed size={24} />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-fooddash-muted tracking-wider">Favorite Kitchens</div>
              <div className="font-heading text-2xl font-extrabold text-fooddash-charcoal">4 Places</div>
              <div className="text-xs text-fooddash-muted mt-0.5">Saved for quick order</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#E4DCD0]/70 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-fooddash-muted tracking-wider">Delivery Address</div>
              <div className="font-heading text-2xl font-extrabold text-fooddash-charcoal">Home</div>
              <div className="text-xs text-fooddash-muted mt-0.5">Default delivery point</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E4DCD0] bg-white py-6 text-center text-xs text-fooddash-light">
        <p>© {new Date().getFullYear()} FoodDash Technologies Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
