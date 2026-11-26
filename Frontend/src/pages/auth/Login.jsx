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
    
    console.log("1. Form submitted");

    const result = await dispatch(
      loginUser({
        email,
        password
      })
    );

    console.log(result)

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
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_4px_14px_rgba(229,43,35,0.3)]">
          <span className="text-base leading-none">⚡</span>
        </div>
        <span className="font-heading text-xl font-extrabold tracking-tight text-fooddash-charcoal">
          Food<span className="text-primary">Dash</span>
        </span>
      </div>

      <AuthHeader mode="login" />

      {/* Role Selector */}
      <AccountTypeSelector role={role} onChangeRole={setRole} />

      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full h-12 pl-11 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your secret password"
              className="w-full h-12 pl-11 pr-11 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted hover:text-fooddash-charcoal cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded accent-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-semibold text-fooddash-body">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-bold text-primary hover:underline underline-offset-2 transition-all"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="h-[50px] w-full mt-2 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>
            {loading ? 'Signing In...' : 'Sign In to FoodDash'}
          </span>
          <ArrowRight size={18} />
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
