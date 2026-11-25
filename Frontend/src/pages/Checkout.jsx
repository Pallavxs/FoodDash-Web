import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import {
  MapPin,
  CreditCard,
  Banknote,
  ShieldCheck,
  Lock,
  Clock,
  ShoppingBag
} from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('online');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    navigate('/order-success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <PageHeader
          title="Checkout"
          subtitle="Complete your delivery details and choose your payment preference."
          backLink="/cart"
          backText="Back to Cart"
        />

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address & Payment */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Delivery Address Card */}
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E4DCD0]/70 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal">
                    Delivery Address
                  </h3>
                  <p className="text-xs text-fooddash-muted">
                    Enter where you want your order delivered
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco"
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1.5">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 94107"
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E4DCD0]/70 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal">
                    Payment Method
                  </h3>
                  <p className="text-xs text-fooddash-muted">
                    Choose how you would like to pay for your meal
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Online Payment */}
                <label
                  onClick={() => setPaymentMethod('online')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'online'
                      ? 'border-primary bg-primary-soft/30 shadow-xs'
                      : 'border-[#E4DCD0] bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <span className="font-heading font-extrabold text-sm text-fooddash-charcoal block">
                          Online Payment
                        </span>
                        <span className="text-[11px] text-fooddash-muted">
                          Credit / Debit Card, Net Banking
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="accent-primary mt-1"
                    />
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-primary bg-primary-soft/30 shadow-xs'
                      : 'border-[#E4DCD0] bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                        <Banknote size={18} />
                      </div>
                      <div>
                        <span className="font-heading font-extrabold text-sm text-fooddash-charcoal block">
                          Cash on Delivery
                        </span>
                        <span className="text-[11px] text-fooddash-muted">
                          Pay upon delivery
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-primary mt-1"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-7 shadow-card flex flex-col gap-5 sticky top-24">
            <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal pb-3 border-b border-[#E4DCD0]/70">
              Order Summary
            </h3>

            <div className="flex flex-col gap-2 text-xs text-fooddash-body">
              <div className="flex items-center justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-fooddash-charcoal">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Delivery Fee</span>
                <span className="font-bold text-fooddash-charcoal">$0.00</span>
              </div>
              <div className="pt-3 border-t border-[#E4DCD0]/70 flex items-center justify-between">
                <span className="font-heading text-base font-extrabold text-fooddash-charcoal">Total Amount</span>
                <span className="font-heading text-2xl font-extrabold text-primary">$0.00</span>
              </div>
            </div>

            <button
              type="submit"
              className="h-[52px] w-full rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock size={16} />
              <span>Place Order</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-fooddash-muted">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Secure SSL Checkout</span>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
