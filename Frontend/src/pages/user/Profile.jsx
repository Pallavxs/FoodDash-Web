import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import { logoutUser } from '../../redux/slice/authSlice';
import {
  User,
  Mail,
  Shield,
  CheckCircle,
  LogOut,
  ShoppingBag,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function Profile() {
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

  const displayName = user?.name || 'User Profile';
  const displayEmail = user?.email || 'N/A';
  const displayRole = user?.role || 'Customer';

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <PageHeader
          title="Account Profile"
          subtitle="Manage your personal information, delivery addresses, and account preferences."
          backLink="/dashboard"
          backText="Back to Dashboard"
        />

        <div className="bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 overflow-hidden mb-8">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-primary/10 via-primary-soft to-amber-100/30 p-6 sm:p-8 border-b border-[#E4DCD0]/60 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-heading font-extrabold text-3xl shadow-card shrink-0">
              {displayName ? displayName[0].toUpperCase() : 'U'}
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#E4DCD0] text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <span>{displayRole}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal">
                {displayName}
              </h1>
              <p className="text-xs sm:text-sm text-fooddash-muted mt-0.5">
                {displayEmail}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="h-[42px] px-5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Personal Information Grid */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-fooddash-cream/70 border border-[#E4DCD0] flex items-start gap-3">
                <User size={20} className="text-primary mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-fooddash-muted uppercase tracking-wider">Full Name</div>
                  <div className="text-sm font-bold text-fooddash-charcoal mt-0.5">{displayName}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-fooddash-cream/70 border border-[#E4DCD0] flex items-start gap-3">
                <Mail size={20} className="text-primary mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-fooddash-muted uppercase tracking-wider">Email Address</div>
                  <div className="text-sm font-bold text-fooddash-charcoal mt-0.5">{displayEmail}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-fooddash-cream/70 border border-[#E4DCD0] flex items-start gap-3">
                <Shield size={20} className="text-primary mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-fooddash-muted uppercase tracking-wider">Account Role</div>
                  <div className="text-sm font-bold text-fooddash-charcoal capitalize mt-0.5">{displayRole}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-fooddash-cream/70 border border-[#E4DCD0] flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-600 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-fooddash-muted uppercase tracking-wider">Account Status</div>
                  <div className="text-sm font-bold text-emerald-700 mt-0.5">Verified & Active</div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="pt-6 border-t border-[#E4DCD0]/70 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/orders"
                className="p-5 rounded-2xl border border-[#E4DCD0] hover:border-primary bg-white hover:bg-primary-soft/30 transition-all flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-fooddash-charcoal group-hover:text-primary transition-colors">
                      My Orders
                    </h4>
                    <span className="text-xs text-fooddash-muted">View past order receipts</span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-fooddash-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/cart"
                className="p-5 rounded-2xl border border-[#E4DCD0] hover:border-primary bg-white hover:bg-primary-soft/30 transition-all flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-primary flex items-center justify-center">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-fooddash-charcoal group-hover:text-primary transition-colors">
                      Shopping Cart
                    </h4>
                    <span className="text-xs text-fooddash-muted">View dishes in cart</span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-fooddash-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
