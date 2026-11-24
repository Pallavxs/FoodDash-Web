import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fooddash-cream text-fooddash-charcoal p-4 text-center">
      <div className="w-full max-w-[500px] bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 p-8 sm:p-12">
        <span className="font-heading text-6xl sm:text-7xl font-extrabold text-primary block mb-2">
          404
        </span>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-fooddash-muted mb-8 leading-relaxed">
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back to good food.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto h-[48px] px-6 rounded-full bg-primary text-white font-bold text-sm shadow-button hover:shadow-button-hover flex items-center justify-center gap-2 transition-all"
          >
            <Home size={16} />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/dashboard"
            className="w-full sm:w-auto h-[48px] px-6 rounded-full bg-white border border-fooddash-border hover:border-primary text-fooddash-charcoal hover:text-primary font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
