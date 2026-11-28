import React from 'react';
import loginBanner from '../../assets/images/login-banner.png';

/**
 * AuthCard:
 * The centerpiece full-width responsive authentication card.
 * Left: Immersive Food visual hero (~53% on desktop)
 * Right: Authentication form container (~47% on desktop)
 */
export default function AuthCard({ mode = 'register', children }) {
  return (
    <div className="w-full min-h-[520px] lg:min-h-[560px] max-h-[720px] bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 flex flex-col lg:flex-row overflow-hidden transition-all duration-300">
      {/* Left Food Hero Visual (50% on desktop) */}
      <section className="lg:flex-[0_0_50%] lg:w-[50%] relative overflow-hidden flex flex-col justify-between p-5 sm:p-7 lg:p-7 bg-[#1A1614] min-h-[200px] lg:min-h-full">
        {/* High-res food background photo */}
        <img
          src={loginBanner}
          alt="Artisan food delivered hot and fresh"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />

        {/* Multi-step gradient scrim to keep image vibrant and text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 via-50% to-black/85 pointer-events-none" />

        {/* Top Floating Culinary Badge */}
        <div className="relative z-10 self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
          <span>Artisan Italian</span>
          <span className="opacity-45">•</span>
          <span className="text-amber-200">Local Kitchens</span>
        </div>

        {/* Food Visual Content & Typography */}
        <div className="relative z-10 flex flex-col gap-2 max-w-[440px] mt-auto">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-100 bg-black/40 border border-white/20 px-2.5 py-0.5 rounded-full w-fit">
            <span className="text-amber-400">★</span>
            <span>Artisan Italian • Handcrafted Recipes</span>
          </div>

          <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight drop-shadow-md">
            {mode === 'register' ? (
              <span>
                <span>Craving something </span>
                <span className="text-red-300 italic">fresh?</span>
              </span>
            ) : (
              <span>
                <span>Welcome back to </span>
                <span className="text-red-300 italic">fresh flavors.</span>
              </span>
            )}
          </h2>

          <p className="hidden sm:block text-xs text-white/90 leading-relaxed max-w-[420px]">
            From local kitchens, delivered fresh. Experience authentic artisan flavors crafted with passion by neighborhood chefs.
          </p>

          {/* Social Proof & Metrics Strip */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4 mt-1.5 pt-2.5 border-t border-white/20">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xs sm:text-sm text-white">25–35 min</span>
              <span className="text-[10px] text-white/70 whitespace-nowrap">Fast doorstep delivery</span>
            </div>
            <div className="w-px h-5 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xs sm:text-sm text-white">4.9 ★</span>
              <span className="text-[10px] text-white/70 whitespace-nowrap">From 18,000+ foodies</span>
            </div>
            <div className="w-px h-5 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xs sm:text-sm text-white">100% Fresh</span>
              <span className="text-[10px] text-white/70 whitespace-nowrap">Local farm ingredients</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right Form Column (50% on desktop) */}
      <section className="lg:flex-[0_0_50%] lg:w-[50%] flex items-center justify-center p-5 sm:p-6 lg:p-7 bg-white relative overflow-y-auto">
        <div className="w-full max-w-[360px] mx-auto flex flex-col justify-center">
          {children}
        </div>
      </section>
    </div>
  );
}
