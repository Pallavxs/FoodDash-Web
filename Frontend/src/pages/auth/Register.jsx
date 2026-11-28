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
      <div className="flex items-center justify-center mb-2 select-none">
        <Link to="/" className="inline-flex items-center group">
          <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-fooddash-charcoal leading-none">
            Food<span className="text-primary">Dash</span>
          </span>
        </Link>
      </div>

      <AuthHeader mode="register" />

      {/* Role Selection UI */}
      <AccountTypeSelector role={role} onChangeRole={setRole} />

      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2.5">
        {/* Name Field */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-fooddash-charcoal mb-1">
            Full Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full h-10 pl-9 pr-3 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-xs sm:text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        {/* Email Field */}
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
              placeholder="e.g. alex@fooddash.com"
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
              placeholder="At least 8 characters"
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

        {/* Confirm Password */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-fooddash-charcoal mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fooddash-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full h-10 pl-9 pr-3 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-xs sm:text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="h-[42px] w-full mt-1 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs sm:text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Create {role === 'vendor' ? 'Kitchen Partner' : 'Foodie'} Account</span>
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-4 pt-3 border-t border-[#E4DCD0] text-center text-xs text-fooddash-muted">
        <span>Already have an account? </span>
        <Link to="/login" className="font-bold text-primary hover:underline ml-1">
          Sign In
        </Link>
      </div>
    </AuthCard>
  );
}
