import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AuthLayout:
 * Global authentication layout handling background aesthetics, top brand bar,
 * full-width responsive stage, and footer.
 */
export default function AuthLayout({
  children,
}) {

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-fooddash-cream overflow-x-hidden p-3 sm:p-4 lg:py-3">
      {/* Edge-to-edge ambient warm background aesthetic */}
      <div
        className="absolute -top-[10vw] -left-[8vw] w-[42vw] h-[42vw] rounded-full blur-[100px] pointer-events-none opacity-70 bg-gradient-to-br from-amber-200/50 to-orange-100/20"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[12vw] -right-[10vw] w-[46vw] h-[46vw] rounded-full blur-[100px] pointer-events-none opacity-70 bg-gradient-to-tl from-rose-200/45 to-red-100/20"
        aria-hidden="true"
      />
      <div
        className="absolute top-[35%] left-[40%] w-[32vw] h-[32vw] rounded-full blur-[90px] pointer-events-none opacity-60 bg-gradient-to-tr from-orange-100/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(#d6cdc3_0.85px,transparent_0.85px)] [background-size:36px_36px] opacity-25 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Brand Navigation Bar */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-[1020px] mx-auto mb-2 px-1 sm:px-2">
        <Link to="/" className="flex items-center gap-2.5 select-none group transition-opacity hover:opacity-95">
          <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-fooddash-charcoal leading-none">
            Food<span className="text-primary">Dash</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-soft border border-primary/20 px-2 py-0.5 rounded-full">
            Deliveries
          </span>
        </Link>
      </header>

      {/* Main Stage: Compact and balanced width */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full max-w-[1020px] mx-auto py-1">
        {children}
      </main>

      {/* Minimal Footer Line */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-[1020px] mx-auto mt-2 px-1 sm:px-2 text-xs text-fooddash-light gap-2">
        <span>© {new Date().getFullYear()} FoodDash Technologies Inc. All rights reserved.</span>
        <div className="flex items-center gap-3">
          <span className="text-fooddash-muted hover:text-primary transition-colors cursor-pointer">Privacy</span>
          <span className="opacity-40">•</span>
          <span className="text-fooddash-muted hover:text-primary transition-colors cursor-pointer">Terms</span>
          <span className="opacity-40">•</span>
          <span className="text-fooddash-muted hover:text-primary transition-colors cursor-pointer">Security</span>
        </div>
      </footer>
    </div>
  );
}
