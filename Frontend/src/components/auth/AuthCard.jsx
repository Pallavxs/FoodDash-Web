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
    <div className="w-full min-h-[660px] lg:min-h-[84vh] max-h-[860px] bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 flex flex-col lg:flex-row overflow-hidden transition-all duration-300">
      {/* Left Food Hero Visual (53% on desktop) */}
      <section className="lg:flex-[0_0_53%] lg:w-[53%] relative overflow-hidden flex flex-col justify-between p-6 sm:p-9 lg:p-10 bg-[#1A1614] min-h-[230px] lg:min-h-full">
        {/* High-res food background photo */}
        <img
          src={loginBanner}
          alt="Artisan food delivered hot and fresh"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />

        {/* Multi-step gradient scrim to keep image vibrant and text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 via-50% to-black/85 pointer-events-none" />

        {/* Top Floating Culinary Badge */}
        <div className="relative z-10 self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-xs font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
          <span>Artisan Italian</span>
          <span className="opacity-45">•</span>
          <span className="text-amber-200">Local Kitchens</span>
        </div>

        {/* Food Visual Content & Typography */}
        <div className="relative z-10 flex flex-col gap-2.5 max-w-[560px] mt-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-100 bg-black/40 border border-white/20 px-3 py-1 rounded-full w-fit">
            <span className="text-amber-400">★</span>
            <span>Artisan Italian • Handcrafted Recipes</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
            {mode === 'register' ? (
              <>
                Craving something <span className="text-red-300 italic">fresh?</span>
              </>
            ) : (
              <>
                Welcome back to <span className="text-red-300 italic">fresh flavors.</span>
              </>
            )}
          </h2>

          <p className="hidden sm:block text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed max-w-[480px]">
            From local kitchens, delivered fresh. Experience authentic artisan flavors crafted with passion by neighborhood chefs.
          </p>

          {/* Social Proof & Metrics Strip */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6 mt-2 pt-3 border-t border-white/20">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm lg:text-base text-white">25–35 min</span>
              <span className="text-[11px] text-white/70 whitespace-nowrap">Fast doorstep delivery</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm lg:text-base text-white">4.9 ★</span>
              <span className="text-[11px] text-white/70 whitespace-nowrap">From 18,000+ foodies</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm lg:text-base text-white">100% Fresh</span>
              <span className="text-[11px] text-white/70 whitespace-nowrap">Local farm ingredients</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right Form Column (47% on desktop) */}
      <section className="lg:flex-[0_0_47%] lg:w-[47%] flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-white relative overflow-y-auto">
        <div className="w-full max-w-[460px] mx-auto flex flex-col justify-center">
          {children}
        </div>
      </section>
    </div>
  );
}
