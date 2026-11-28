import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import AuthCard from '../../components/auth/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader';
import AccountTypeSelector from '../../components/auth/AccountTypeSelector';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slice/authSlice';

export default function Login() {
  const dispatch = useDispatch();

  const { loading, error, user} = useSelector(
    (state) => state.auth
  )

  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email,
        password
      })
    );

    if(loginUser.fulfilled.match(result)) {
      if (role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <AuthCard mode="login">
      <div className="flex items-center justify-center mb-2 select-none">
        <Link to="/" className="inline-flex items-center group">
          <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-fooddash-charcoal leading-none">
            Food<span className="text-primary">Dash</span>
          </span>
        </Link>
      </div>

      <AuthHeader mode="login" />

      {/* Role Selector */}
      <AccountTypeSelector role={role} onChangeRole={setRole} />

      {/* Error Banner */}
      {error && (
        <div className="w-full mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600 text-center">
          <span>{typeof error === 'string' ? error : 'Login failed. Please check your credentials.'}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-3">
        {/* Email */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-fooddash-charcoal mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full h-10 pl-9 pr-3 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-xs sm:text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-fooddash-charcoal mb-1">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your secret password"
              className="w-full h-10 pl-9 pr-9 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-xs sm:text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fooddash-muted hover:text-fooddash-charcoal cursor-pointer"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password
        <div className="flex items-center justify-between text-xs pt-0.5">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded accent-primary w-3.5 h-3.5 cursor-pointer"
            />
            <span className="font-semibold text-fooddash-body text-xs">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-bold text-primary hover:underline underline-offset-2 transition-all text-xs"
          >
            Forgot password?
          </Link>
        </div>
        */}

        {/* Submit Button */}
        <button
          type="submit"
          className="h-[42px] w-full mt-1 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs sm:text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>
            {loading ? 'Signing In...' : 'Sign In to FoodDash'}
          </span>
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Switch to Register */}
      <div className="mt-6 pt-5 border-t border-[#E4DCD0] text-center text-xs text-fooddash-muted">
        <span>Don't have an account yet? </span>
        <Link to="/register" className="font-bold text-primary hover:underline ml-1">
          Create Account
        </Link>
      </div>
    </AuthCard>
  );
}
