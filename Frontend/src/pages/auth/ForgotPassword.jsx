import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import AuthCard from '../../components/auth/AuthCard';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
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

      <div className="mb-4 text-center">
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-fooddash-charcoal mb-1">
          Reset Your Password
        </h1>
        <p className="text-xs sm:text-[13px] text-fooddash-muted leading-relaxed max-w-[340px] mx-auto">
          Enter your registered email address and we'll send you recovery instructions to reset your password.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fadeIn space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-base text-emerald-900">
              Check Your Inbox
            </h3>
            <p className="text-xs text-emerald-700 mt-1">
              We sent password reset instructions to <strong>{email}</strong>.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
          >
            <ArrowLeft size={14} />
            <span>Return to Sign In</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1.5">
              Registered Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@fooddash.com"
                className="w-full h-12 pl-11 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium text-fooddash-charcoal outline-none focus:border-primary focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="h-[50px] w-full rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Send Reset Instructions</span>
            <ArrowRight size={18} />
          </button>

          <div className="pt-4 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-fooddash-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </AuthCard>
  );
}
