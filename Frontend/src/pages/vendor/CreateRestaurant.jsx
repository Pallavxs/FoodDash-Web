import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import VendorSidebar from "../../components/VendorSidebar";
import PageHeader from "../../components/PageHeader";
import { createRestaurant } from "../../redux/slice/restaurantSlice";
import {
  UploadCloud,
  ArrowRight,
  Clock,
  Star,
  MapPin,
  X,
  AlertCircle,
  Loader2,
  Navigation,
} from "lucide-react";

/**
 * CreateRestaurant Component
 * Connected form for registering a new kitchen partner branch with multipart image upload.
 */
export default function CreateRestaurant() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.restaurants);

  const [restaurantName, setRestaurantName] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [location, setLocation] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("30");
  const [openingHours, setOpeningHours] = useState("10:00 AM - 11:00 PM");
  const [rating, setRating] = useState("4.8");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fileInputRef = useRef(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({
          lat: latitude,
          lng: longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Unable to get current location. Please verify location permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Please select a valid image format (PNG, JPG, or WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image file size must be less than 5MB.");
      return;
    }

    setErrorMsg(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!restaurantName.trim()) {
      setErrorMsg("Restaurant name is required.");
      return;
    }
    if (!cuisineType.trim()) {
      setErrorMsg("Cuisine type is required.");
      return;
    }
    if (!location.trim()) {
      setErrorMsg("Location address is required.");
      return;
    }
    if (!imageFile) {
      setErrorMsg("Please upload a cover image for your restaurant.");
      return;
    }

    const formData = new FormData();
    formData.append("name", restaurantName.trim());
    formData.append("cuisine", cuisineType.trim());
    formData.append("location", location.trim());
    formData.append("deliveryTime", Number(deliveryTime) || 30);
    if (rating) formData.append("rating", rating);
    if (openingHours) formData.append("Openinghours", openingHours);
    if (description) formData.append("description", description);
    formData.append("image", imageFile);

    if (coordinates?.lat != null && coordinates?.lng != null) {
      formData.append(
        "coordinates",
        JSON.stringify({
          lat: Number(coordinates.lat),
          lng: Number(coordinates.lng),
        })
      );
      formData.append("coordinates[lat]", coordinates.lat);
      formData.append("coordinates[lng]", coordinates.lng);
    }

    const result = await dispatch(createRestaurant(formData));

    if (createRestaurant.fulfilled.match(result)) {
      navigate("/vendor/restaurants");
    } else {
      setErrorMsg(
        typeof result.payload === "string"
          ? result.payload
          : "Failed to create restaurant. Please verify all details and try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full max-w-[920px] space-y-6">
            <PageHeader
              title="Add New Restaurant"
              subtitle="Register a new kitchen or partner branch to the FoodDash delivery network."
              backLink="/vendor/restaurants"
              backText="Back to My Restaurants"
            />

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Restaurant Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Restaurant Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Restaurant Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="e.g. Spice Garden Bistro"
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        required
                      />
                      <span className="text-[11px] text-fooddash-muted mt-1 block">
                        Official brand or kitchen name shown to customers.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Cuisine Type <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                        placeholder="e.g. North Indian, Biryani, Mughlai"
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        required
                      />
                      <span className="text-[11px] text-fooddash-muted mt-1 block">
                        Comma separated primary food categories.
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Kitchen Location / Street Address{" "}
                      <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted"
                      />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Shop 14, Central Market, MG Road, New Delhi"
                        className="w-full h-12 pl-11 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        required
                      />
                    </div>
                    <span className="text-[11px] text-fooddash-muted mt-1 block">
                      Physical dispatch address used by delivery riders.
                    </span>

                    {/* Geolocation Coordinate Capture */}
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={isLocating}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-primary/30 bg-primary-soft hover:bg-red-100 text-primary font-bold text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer disabled:opacity-60"
                      >
                        {isLocating ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span>Detecting coordinates...</span>
                          </>
                        ) : (
                          <>
                            <Navigation size={14} />
                            <span>Use my current location</span>
                          </>
                        )}
                      </button>

                      {coordinates && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold animate-fadeIn">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>
                            Coordinates: <strong>{coordinates.lat.toFixed(6)}</strong>, <strong>{coordinates.lng.toFixed(6)}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => setCoordinates(null)}
                            className="text-emerald-700 hover:text-emerald-950 font-bold ml-1 text-sm leading-none cursor-pointer"
                            title="Clear coordinates"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>

                    {locationError && (
                      <p className="text-xs text-red-600 mt-2 font-medium">
                        {locationError}
                      </p>
                    )}
                  </div>
                </div>

                {/* 2. Operations & Timings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Operations & Estimates
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Delivery Time (mins){" "}
                        <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <Clock
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted"
                        />
                        <input
                          type="number"
                          min="5"
                          max="180"
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          placeholder="e.g. 30"
                          className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Opening Hours
                      </label>
                      <input
                        type="text"
                        value={openingHours}
                        onChange={(e) => setOpeningHours(e.target.value)}
                        placeholder="e.g. 10:00 AM - 11:00 PM"
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Initial Rating
                      </label>
                      <div className="relative">
                        <Star
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 fill-amber-400"
                        />
                        <input
                          type="number"
                          step="0.1"
                          min="1.0"
                          max="5.0"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          placeholder="4.8"
                          className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Restaurant Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Restaurant Story & Highlights
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Share your culinary heritage, chef signature dishes, farm-fresh ingredients, and dining philosophy..."
                      className="w-full p-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={getCurrentLocation}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 active:scale-[0.98]"
                >
                  <span className="text-lg">📍</span>
                  <span>Use my current location</span>
                </button>

                {/* 4. Restaurant Cover Photo with Upload & Preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      4
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Restaurant Cover Photo{" "}
                      <span className="text-primary">*</span>
                    </h3>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#E4DCD0] shadow-sm bg-stone-900 group">
                      <img
                        src={imagePreview}
                        alt="Restaurant Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6 text-white">
                        <div>
                          <span className="font-bold text-sm block">
                            {imageFile?.name}
                          </span>
                          <span className="text-xs text-stone-300">
                            {(imageFile.size / (1024 * 1024)).toFixed(2)} MB •
                            Ready to upload
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="p-2 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                            title="Remove Photo"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#E4DCD0] hover:border-primary bg-fooddash-cream/40 hover:bg-primary-soft/20 rounded-2xl p-8 sm:p-10 text-center transition-all flex flex-col items-center justify-center cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3.5 shadow-inner group-hover:scale-105 transition-transform">
                        <UploadCloud size={30} />
                      </div>
                      <span className="font-heading font-bold text-base text-fooddash-charcoal">
                        Click to upload restaurant image
                      </span>
                      <span className="text-xs text-fooddash-muted mt-1.5">
                        High resolution banner photo recommended • PNG, JPG, or
                        WEBP up to 5MB
                      </span>
                      <div className="mt-4 px-3 py-1 rounded-full bg-white border border-[#E4DCD0] text-[11px] font-semibold text-stone-600">
                        16:9 widescreen format recommended
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-[#E4DCD0]/70 flex items-center justify-end gap-3">
                  <Link
                    to="/vendor/restaurants"
                    className="h-12 px-6 rounded-full border border-stone-300 hover:bg-stone-100 text-fooddash-charcoal font-bold text-xs transition-colors flex items-center justify-center"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={loading}
                    className="h-12 px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Creating Kitchen...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Restaurant</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
