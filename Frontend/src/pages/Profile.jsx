import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { logoutUser } from '../redux/slice/authSlice';
import { User, Mail, Shield, LogOut, CheckCircle, ArrowLeft } from 'lucide-react';

export default function Profile() {
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

      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 py-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-fooddash-muted hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-primary/10 via-primary-soft to-amber-100/30 p-6 sm:p-8 border-b border-[#E4DCD0]/60 flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-heading font-extrabold text-2xl sm:text-3xl shadow-md">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal">
                {user?.name || 'User Profile'}
              </h1>
              <p className="text-sm text-fooddash-muted">
                FoodDash member • {user?.role || 'Customer'}
              </p>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-fooddash-cream/60 border border-[#E4DCD0]/60 flex items-start gap-3">
                <User size={20} className="text-primary mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-fooddash-muted uppercase tracking-wider">Full Name</div>
                  <div className="text-sm font-bold text-fooddash-charcoal mt-0.5">{user?.name || 'N/A'}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-fooddash-cream/60 border border-[#E4DCD0]/60 flex items-start gap-3">
                <Mail size={20} className="text-primary mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-fooddash-muted uppercase tracking-wider">Email Address</div>
                  <div className="text-sm font-bold text-fooddash-charcoal mt-0.5">{user?.email || 'N/A'}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-fooddash-cream/60 border border-[#E4DCD0]/60 flex items-start gap-3">
                <Shield size={20} className="text-primary mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-fooddash-muted uppercase tracking-wider">Account Role</div>
                  <div className="text-sm font-bold text-fooddash-charcoal capitalize mt-0.5">{user?.role || 'Customer'}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-fooddash-cream/60 border border-[#E4DCD0]/60 flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-fooddash-muted uppercase tracking-wider">Account Status</div>
                  <div className="text-sm font-bold text-green-700 mt-0.5">Verified & Active</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4DCD0]/70 flex justify-end">
              <button
                type="button"
                onClick={handleLogout}
                className="h-[44px] px-6 rounded-full bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
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
