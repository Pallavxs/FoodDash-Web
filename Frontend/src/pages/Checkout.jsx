import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { createOrder } from "../redux/slice/orderSlice";
import { clearCart } from "../redux/slice/cartSlice";
import {
  MapPin,
  CreditCard,
  Banknote,
  ShieldCheck,
  Lock,
  ShoppingBag,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.items || []);
  const { user } = useSelector((state) => state.auth);
  const { loading: orderLoading } = useSelector((state) => state.order);

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("Bhopal");
  const [zipCode, setZipCode] = useState("462001");
  const [errorMsg, setErrorMsg] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setDeliveryLocation({
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => {
        console.error(error);
        alert("Unable to get your location.");
      },
    );
  };

  const itemsSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const deliveryFee = itemsSubtotal > 0 ? (itemsSubtotal > 500 ? 0 : 40) : 0;
  const grandTotal = itemsSubtotal + deliveryFee;

  // Extract restaurant ID from first cart item
  const firstItem = cartItems[0];
  const restaurantId =
    firstItem?.restaurant?._id ||
    firstItem?.restaurant?.id ||
    firstItem?.restaurant ||
    firstItem?.restaurantId ||
    null;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (cartItems.length === 0) {
      setErrorMsg("Your cart is empty. Add dishes before checking out.");
      return;
    }

    if (!restaurantId) {
      setErrorMsg("Unable to determine restaurant for items in your cart.");
      return;
    }

    if (!streetAddress.trim()) {
      setErrorMsg("Please provide your complete street delivery address.");
      return;
    }

    const payload = {
      restaurant: restaurantId,
      items: cartItems.map((item) => ({
        menuItem: item._id || item.id,
        quantity: item.quantity || 1,
      })),
      deliveryAddress: `${streetAddress.trim()}, ${city.trim()} ${zipCode.trim()}`,
      paymentMethod: paymentMethod === "cod" ? "COD" : "UPI",
      deliveryLocation: {
        lat: deliveryLocation.lat,
        lng: deliveryLocation.lng,
      },
    };

    try {
      const createdOrder = await dispatch(createOrder(payload)).unwrap();
      dispatch(clearCart());
      const orderId =
        createdOrder?._id ||
        createdOrder?.id ||
        createdOrder?.orderId ||
        createdOrder?.order?._id ||
        createdOrder?.order?.id;

      if (orderId && orderId !== "undefined" && orderId !== "null") {
        navigate(`/order-success?id=${orderId}`);
      } else {
        navigate("/orders");
      }
    } catch (err) {
      setErrorMsg(
        typeof err === "string"
          ? err
          : "Failed to place your order. Please check your details and try again.",
      );
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
        <Navbar />
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-primary flex items-center justify-center mb-4 border border-rose-100">
            <ShoppingBag size={32} />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-fooddash-charcoal mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-sm text-fooddash-muted max-w-sm mb-6">
            You don't have any dishes in your cart to checkout. Browse our
            kitchens and add something delicious!
          </p>
          <Link
            to="/"
            className="h-11 px-8 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover flex items-center gap-2 transition-all"
          >
            <span>Explore Restaurants</span>
            <ArrowRight size={15} />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

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

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5">
            <AlertCircle size={18} className="text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
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
                    Street Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. Flat 402, Green Valley Apartments, New Market"
                    className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1.5">
                      City <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bhopal"
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <button
                    onClick={getCurrentLocation}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 active:scale-[0.98]"
                  >
                    <span className="text-lg">📍</span>
                    <span>Use my current location</span>
                  </button>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-1.5">
                      ZIP / Postal Code <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="e.g. 462001"
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
                  onClick={() => setPaymentMethod("online")}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === "online"
                      ? "border-primary bg-primary-soft/30 shadow-xs"
                      : "border-[#E4DCD0] bg-white hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <span className="font-heading font-extrabold text-sm text-fooddash-charcoal block">
                          Online Payment (Simulated)
                        </span>
                        <span className="text-[11px] text-fooddash-muted">
                          UPI, Credit / Debit Card
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="accent-primary mt-1"
                    />
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary-soft/30 shadow-xs"
                      : "border-[#E4DCD0] bg-white hover:border-stone-300"
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
                          Pay upon delivery at your door
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
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
              Order Summary (
              {cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items)
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-1"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-primary">
                      {item.quantity}x
                    </span>
                    <span className="font-medium text-fooddash-charcoal truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-fooddash-charcoal shrink-0">
                    ₹{(item.price || 0) * (item.quantity || 1)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E4DCD0]/70 flex flex-col gap-2 text-xs text-fooddash-body">
              <div className="flex items-center justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-fooddash-charcoal">
                  ₹{itemsSubtotal}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Delivery Fee</span>
                <span className="font-bold text-fooddash-charcoal">
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E4DCD0]/70 flex items-center justify-between">
                <span className="font-heading text-base font-extrabold text-fooddash-charcoal">
                  Total Amount
                </span>
                <span className="font-heading text-2xl font-extrabold text-primary">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={orderLoading}
              className="h-[52px] w-full rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-button hover:shadow-button-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {orderLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Placing Order...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Place Order • ₹{grandTotal}</span>
                </>
              )}
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
