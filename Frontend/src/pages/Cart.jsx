import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { ShoppingBag, ArrowRight, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { addToCart, updateQuantity, removeFromCart, clearCart } from '../redux/slice/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return acc + price * qty;
  }, 0);

  const deliveryFee = subtotal > 0 ? (subtotal >= 499 ? 0 : 40) : 0;
  const taxes = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryFee + taxes;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <PageHeader
          title="Your Shopping Cart"
          subtitle="Review and customize your selected dishes before checkout."
          backLink="/"
          backText="Continue Browsing"
        />

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-outer shadow-card border border-[#E4DCD0]/80 p-8 sm:p-14 text-center max-w-lg mx-auto animate-fadeIn mt-6">
            <div className="w-24 h-24 bg-orange-100 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShoppingBag size={44} strokeWidth={1.75} />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-fooddash-charcoal mb-2">
              Your Cart is Empty
            </h2>

            <p className="text-sm text-fooddash-muted max-w-[360px] mx-auto mb-8 leading-relaxed">
              You haven't added any dishes to your order yet. Explore local artisan kitchens and discover delicious flavors.
            </p>

            <Link
              to="/"
              className="h-[50px] px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 flex items-center justify-center gap-2 transition-all mx-auto w-fit"
            >
              <span>Explore Restaurants</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          /* Active Cart Items & Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
            {/* Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl border border-[#E4DCD0]/80 shadow-sm p-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E4DCD0]/70 mb-4">
                  <h3 className="font-heading font-extrabold text-lg text-fooddash-charcoal">
                    Order Items ({cartItems.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => dispatch(clearCart())}
                    className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-[#E4DCD0]/60">
                  {cartItems.map((item) => {
                    const id = item._id || item.id;
                    const price = Number(item.price) || 0;
                    const qty = item.quantity || 1;
                    return (
                      <div key={id} className="py-4.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                            alt={item.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                            }}
                            className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#E4DCD0] shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-heading font-extrabold text-base text-fooddash-charcoal truncate">
                              {item.name}
                            </h4>
                            {item.category && (
                              <span className="text-[10px] uppercase font-bold text-primary">
                                {item.category}
                              </span>
                            )}
                            <div className="font-bold text-sm text-fooddash-charcoal mt-1">
                              ₹{price}
                            </div>
                          </div>
                        </div>

                        {/* Quantity & Delete Controls */}
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex items-center border border-[#E4DCD0] rounded-full bg-fooddash-cream px-2 py-1 gap-2.5 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => dispatch(updateQuantity({ id, quantity: qty - 1 }))}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-fooddash-charcoal hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-bold text-xs w-4 text-center text-fooddash-charcoal">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => dispatch(addToCart(item))}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-fooddash-charcoal hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="font-heading font-extrabold text-sm text-fooddash-charcoal w-16 text-right">
                            ₹{price * qty}
                          </div>

                          <button
                            type="button"
                            onClick={() => dispatch(removeFromCart(id))}
                            className="text-fooddash-muted hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                            title="Remove dish"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Price Breakdown & Checkout (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-[#E4DCD0]/80 shadow-card p-6 space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-fooddash-charcoal pb-3 border-b border-[#E4DCD0]/70">
                  Bill Details
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-fooddash-muted font-medium">
                    <span>Items Total</span>
                    <span className="font-bold text-fooddash-charcoal">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-fooddash-muted font-medium">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-fooddash-charcoal">
                      {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-fooddash-muted font-medium">
                    <span>Taxes & Restaurant Packaging</span>
                    <span className="font-bold text-fooddash-charcoal">₹{taxes}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E4DCD0]/70 flex justify-between items-center">
                  <span className="font-heading font-extrabold text-base text-fooddash-charcoal">
                    Grand Total
                  </span>
                  <span className="font-heading font-extrabold text-xl text-primary">
                    ₹{grandTotal}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/"
                  className="w-full py-2 flex items-center justify-center gap-1.5 text-xs font-bold text-fooddash-muted hover:text-primary transition-colors"
                >
                  <ArrowLeft size={13} />
                  <span>Add more items</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
