import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { logoutUser } from '../../redux/slice/authSlice';
import {
  CheckCircle2,
  LogOut,
  ShoppingBag,
  User,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
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

  const displayName = user?.name || 'Foodie';
  const displayEmail = user?.email || 'N/A';
  const displayRole = user?.role || 'Customer';

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Hero Card */}
        <div className="w-full bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 p-6 sm:p-10 mb-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center shrink-0 shadow-inner">
              <CheckCircle2 size={44} />
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary-soft border border-primary/20 px-3 py-1 rounded-full mb-2.5">
                <Sparkles size={12} />
                <span>Active FoodDash Session</span>
                <span>•</span>
                <span className="capitalize">{displayRole}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-fooddash-charcoal mb-1.5">
                Welcome back, {displayName}!
              </h1>

              <p className="text-sm text-fooddash-muted mb-6">
                Signed in as <strong className="text-fooddash-charcoal">{displayEmail}</strong>
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link
                  to="/cart"
                  className="h-[46px] px-6 rounded-full bg-primary text-white text-sm font-bold shadow-button hover:shadow-button-hover flex items-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  <ShoppingBag size={16} />
                  <span>View Cart</span>
                </Link>

                <Link
                  to="/orders"
                  className="h-[46px] px-6 rounded-full bg-white border border-[#E4DCD0] hover:border-primary text-fooddash-charcoal hover:text-primary text-sm font-bold shadow-2xs transition-all flex items-center gap-2"
                >
                  <Clock size={16} />
                  <span>My Orders</span>
                </Link>

                <Link
                  to="/profile"
                  className="h-[46px] px-6 rounded-full bg-white border border-[#E4DCD0] hover:border-primary text-fooddash-charcoal hover:text-primary text-sm font-bold shadow-2xs transition-all flex items-center gap-2"
                >
                  <User size={16} />
                  <span>Account Profile</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="h-[46px] px-5 rounded-full bg-stone-100 hover:bg-red-50 text-fooddash-charcoal hover:text-primary text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-outer p-6 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-primary flex items-center justify-center shrink-0">
              <ShoppingBag size={24} />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold text-fooddash-muted tracking-wider">Active Orders</div>
              <div className="font-heading text-2xl font-extrabold text-fooddash-charcoal">0 orders</div>
              <div className="text-xs text-fooddash-muted font-medium mt-0.5">Ready to order</div>
            </div>
          </div>

          <div className="bg-white rounded-outer p-6 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold text-fooddash-muted tracking-wider">Order History</div>
              <div className="font-heading text-2xl font-extrabold text-fooddash-charcoal">0 past orders</div>
              <div className="text-xs text-fooddash-muted font-medium mt-0.5">No previous orders</div>
            </div>
          </div>

          <div className="bg-white rounded-outer p-6 border border-[#E4DCD0]/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold text-fooddash-muted tracking-wider">Delivery Address</div>
              <div className="font-heading text-base font-extrabold text-fooddash-charcoal">Not set yet</div>
              <div className="text-xs text-fooddash-muted mt-0.5">Set during checkout</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
