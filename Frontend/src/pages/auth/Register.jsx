import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import AuthCard from '../../components/auth/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader';
import AccountTypeSelector from '../../components/auth/AccountTypeSelector';
import { useDispatch } from "react-redux"
import { registerUser } from '../../redux/slice/authSlice'

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      try {
        const result = await dispatch(
        registerUser({
          name, email, password, confirmPassword, role
        })
      ).unwrap();

      if(registerUser.fulfilled.match(result)){
        if (role === 'vendor') {
          navigate('/vendor');
        } else {
          navigate('/dashboard');
        }
      }
      
      } catch (error) {
        console.error("Registration failed:", error);
      }

    
  };

  return (
    <AuthCard mode="register">
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_4px_14px_rgba(229,43,35,0.3)]">
          <span className="text-base leading-none">⚡</span>
        </div>
        <span className="font-heading text-xl font-extrabold tracking-tight text-fooddash-charcoal">
          Food<span className="text-primary">Dash</span>
        </span>
      </div>

      <AuthHeader mode="register" />

      {/* Role Selection UI */}
      <AccountTypeSelector role={role} onChangeRole={setRole} />

      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-3.5">
        {/* Name Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1">
            Full Name
          </label>
          <div className="relative">
            <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full h-11 pl-11 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alex@fooddash.com"
              className="w-full h-11 pl-11 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1">
            Password
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full h-11 pl-11 pr-11 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted hover:text-fooddash-charcoal cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full h-11 pl-11 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="h-[50px] w-full mt-2 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Create {role === 'vendor' ? 'Kitchen Partner' : 'Foodie'} Account</span>
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-5 pt-4 border-t border-[#E4DCD0] text-center text-xs text-fooddash-muted">
        <span>Already have an account? </span>
        <Link to="/login" className="font-bold text-primary hover:underline ml-1">
          Sign In
        </Link>
      </div>
    </AuthCard>
  );
}
