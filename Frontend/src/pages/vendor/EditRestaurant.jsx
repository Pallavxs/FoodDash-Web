import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import {
  fetchRestaurantById,
  editRestaurant,
  deleteRestaurant
} from '../../redux/slice/restaurantSlice';
import {
  UploadCloud,
  ArrowRight,
  Clock,
  Star,
  MapPin,
  Trash2,
  AlertCircle,
  Loader2,
  Navigation,
  X
} from 'lucide-react';

/**
 * EditRestaurant Component
 * Connected form for updating an existing restaurant's profile and cover image.
 */
export default function EditRestaurant() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { selectedRestaurant, loading } = useSelector((state) => state.restaurants);

  const [restaurantName, setRestaurantName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [location, setLocation] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('30');
  const [openingHours, setOpeningHours] = useState('');
  const [rating, setRating] = useState('5.0');
  const [description, setDescription] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
        setLocationError("Unable to retrieve location. Please check browser permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedRestaurant && (selectedRestaurant._id === id || selectedRestaurant.id === id)) {
      setRestaurantName(selectedRestaurant.name || '');
      setCuisineType(selectedRestaurant.cuisine || '');
      setLocation(selectedRestaurant.location || '');
      setDeliveryTime(selectedRestaurant.deliveryTime ? String(selectedRestaurant.deliveryTime) : '30');
      setOpeningHours(selectedRestaurant.Openinghours || '');
      setRating(selectedRestaurant.rating ? String(selectedRestaurant.rating) : '5.0');
      setDescription(selectedRestaurant.description || '');
      setExistingImageUrl(selectedRestaurant.image || '');
      if (selectedRestaurant.coordinates?.lat != null && selectedRestaurant.coordinates?.lng != null) {
        setCoordinates({
          lat: Number(selectedRestaurant.coordinates.lat),
          lng: Number(selectedRestaurant.coordinates.lng),
        });
      }
    }
  }, [selectedRestaurant, id]);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please select a valid image format (PNG, JPG, or WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image file size must be less than 5MB.');
      return;
    }

    setErrorMsg(null);
    setNewImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveNewImage = () => {
    setNewImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!restaurantName.trim()) {
      setErrorMsg('Restaurant name is required.');
      return;
    }
    if (!cuisineType.trim()) {
      setErrorMsg('Cuisine type is required.');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Location is required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', restaurantName.trim());
    formData.append('cuisine', cuisineType.trim());
    formData.append('location', location.trim());
    if (coordinates?.lat != null && coordinates?.lng != null) {
      formData.append(
        'coordinates',
        JSON.stringify({
          lat: Number(coordinates.lat),
          lng: Number(coordinates.lng),
        })
      );
      formData.append('coordinates[lat]', coordinates.lat);
      formData.append('coordinates[lng]', coordinates.lng);
    }
    formData.append('deliveryTime', Number(deliveryTime) || 30);
    if (rating) formData.append('rating', rating);
    if (openingHours) formData.append('Openinghours', openingHours);
    if (description) formData.append('description', description);
    if (newImageFile) {
      formData.append('image', newImageFile);
    }

    const result = await dispatch(editRestaurant({ id, data: formData }));

    if (editRestaurant.fulfilled.match(result)) {
      navigate('/vendor/restaurants');
    } else {
      setErrorMsg(
        typeof result.payload === 'string'
          ? result.payload
          : 'Failed to update restaurant. Please try again.'
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${restaurantName}"? This cannot be undone.`)) {
      setIsDeleting(true);
      const result = await dispatch(deleteRestaurant(id));
      setIsDeleting(false);

      if (deleteRestaurant.fulfilled.match(result)) {
        navigate('/vendor/restaurants');
      } else {
        setErrorMsg(
          typeof result.payload === 'string'
            ? result.payload
            : 'Failed to delete restaurant.'
        );
      }
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
              title="Edit Restaurant"
              subtitle={restaurantName ? `Update details and operational settings for ${restaurantName}.` : 'Update details for your restaurant.'}
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
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Kitchen Location / Street Address <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Shop 12, Central Market, Food Street"
                        className="w-full h-12 pl-11 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        required
                      />
                    </div>

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
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold animate-fadeIn">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>
                            Coordinates: <strong>{coordinates.lat.toFixed(6)}</strong>, <strong>{coordinates.lng.toFixed(6)}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => setCoordinates(null)}
                            className="text-emerald-700 hover:text-emerald-950 font-bold ml-1 text-sm leading-none cursor-pointer"
                            title="Remove coordinates"
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

                {/* 2. Operations & Estimates */}
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
                        Delivery Time (mins)
                      </label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
                        <input
                          type="number"
                          min="5"
                          max="180"
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          placeholder="30"
                          className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
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
                        Rating
                      </label>
                      <div className="relative">
                        <Star size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 fill-amber-400" />
                        <input
                          type="number"
                          step="0.1"
                          min="1.0"
                          max="5.0"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          placeholder="5.0"
                          className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Description & Story
                    </h3>
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell customers about your kitchen's culinary heritage, fresh ingredients, and specialties..."
                      className="w-full p-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                {/* 4. Restaurant Cover Photo */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4DCD0]/70">
                    <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
                      4
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-fooddash-charcoal">
                      Cover Photo
                    </h3>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  {imagePreview || existingImageUrl ? (
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#E4DCD0] shadow-sm bg-stone-900 group">
                      <img
                        src={imagePreview || existingImageUrl}
                        alt="Restaurant Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6 text-white">
                        <div>
                          <span className="font-bold text-sm block">
                            {newImageFile ? newImageFile.name : `${restaurantName || 'Restaurant'} Banner`}
                          </span>
                          <span className="text-xs text-stone-300">
                            {newImageFile ? 'Ready to upload on save' : 'Current active banner'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            Change Photo
                          </button>
                          {newImageFile && (
                            <button
                              type="button"
                              onClick={handleRemoveNewImage}
                              className="p-2 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                              title="Revert to Current Banner"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#E4DCD0] rounded-2xl p-8 text-center bg-fooddash-cream/40 hover:bg-fooddash-cream/70 transition-all cursor-pointer flex flex-col items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3">
                        <UploadCloud size={24} />
                      </div>
                      <span className="font-bold text-sm text-fooddash-charcoal block">
                        Upload restaurant cover banner
                      </span>
                      <span className="text-xs text-fooddash-muted mt-1 block">
                        PNG, JPG or WEBP up to 5MB
                      </span>
                    </div>
                  )}
                </div>

                {/* Danger Zone: Delete Restaurant */}
                <div className="pt-4 border-t border-rose-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-rose-800 block">Delete Restaurant</span>
                    <span className="text-[11px] text-fooddash-muted">Permanently remove this restaurant and its menu items.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="h-10 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                    <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                  </button>
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
                    className="h-12 px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>Save Changes</span>
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
