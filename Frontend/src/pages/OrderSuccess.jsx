import React from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export default function OrderSuccess() {
  const { id: paramId } = useParams();
  const [searchParams] = useSearchParams();
  const { currentOrder } = useSelector((state) => state.order || {});

  const queryId = searchParams.get('id');
  const candidateId = paramId || queryId || currentOrder?._id || currentOrder?.id;
  const orderId =
    candidateId && candidateId !== 'undefined' && candidateId !== 'null'
      ? candidateId
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 p-8 sm:p-12 text-center overflow-hidden relative animate-fadeIn">
          <div className="relative z-10 w-24 h-24 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200/70 flex items-center justify-center mx-auto mb-6 shadow-md">
            <CheckCircle2 size={54} strokeWidth={2.2} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>Order Confirmed</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-fooddash-charcoal mb-2">
            Order Placed Successfully!
          </h1>

          {orderId && (
            <p className="text-xs font-mono font-bold text-fooddash-charcoal bg-stone-100 px-3 py-1.5 rounded-lg w-fit mx-auto mb-4 border border-stone-200">
              Order ID: #{orderId.slice(-8).toUpperCase()}
            </p>
          )}

          <p className="text-sm sm:text-base text-fooddash-muted max-w-[480px] mx-auto mb-8 leading-relaxed">
            Thank you for ordering with FoodDash. Your kitchen partner has received your order and is preparing your meal.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={orderId ? `/orders/${orderId}` : '/orders'}
              className="h-[50px] px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span>{orderId ? 'Track Live Order' : 'View My Orders'}</span>
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/"
              className="h-[50px] px-8 rounded-full bg-white border border-[#E4DCD0] hover:border-primary text-fooddash-charcoal hover:text-primary font-bold text-sm transition-all flex items-center gap-2 shadow-2xs"
            >
              <ShoppingBag size={17} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
