import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import { createMenuItem } from '../../redux/slice/menuSlice';
import { getMyRestraunt } from '../../redux/slice/restaurantSlice';
import {
  UploadCloud,
  ArrowRight,
  Clock,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2
} from 'lucide-react';

/**
 * AddFood Component
 * Connected form for adding a new dish to a restaurant's digital menu with multipart image upload.
 */
export default function AddFood() {
  const { restaurantId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { myRestaurants, restaurants } = useSelector((state) => state.restaurants);
  const { loading } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(getMyRestraunt());
  }, [dispatch]);

  const vendorRestaurants = Array.isArray(myRestaurants) ? myRestaurants : [];

  const effectiveRestaurantId = restaurantId || id || (vendorRestaurants[0]?._id || vendorRestaurants[0]?.id) || '';

  const [targetRestaurantId, setTargetRestaurantId] = useState(effectiveRestaurantId);

  useEffect(() => {
    if (!targetRestaurantId && effectiveRestaurantId) {
      setTargetRestaurantId(effectiveRestaurantId);
    }
  }, [effectiveRestaurantId, targetRestaurantId]);

  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState('Main Course');
  const [price, setPrice] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [diet, setDiet] = useState('veg');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fileInputRef = useRef(null);

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
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!targetRestaurantId) {
      setErrorMsg('No restaurant selected. Please register a restaurant first.');
      return;
    }

    if (!dishName.trim()) {
      setErrorMsg('Dish name is required.');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('Dish description is required.');
      return;
    }

    if (!price || Number(price) <= 0) {
      setErrorMsg('A valid positive price is required.');
      return;
    }

    if (!imageFile) {
      setErrorMsg('Please upload a dish presentation photo.');
      return;
    }

    const formData = new FormData();
    formData.append('restaurant', targetRestaurantId);
    formData.append('name', dishName.trim());
    formData.append('description', description.trim());
    formData.append('price', Number(price));
    formData.append('category', category);
    formData.append('isAvailable', isAvailable);
    formData.append('availability', isAvailable);
    formData.append('image', imageFile);

    const result = await dispatch(createMenuItem(formData));

    if (createMenuItem.fulfilled.match(result)) {
      navigate(targetRestaurantId ? `/vendor/restaurants/${targetRestaurantId}/menu` : '/vendor/menu');
    } else {
      setErrorMsg(
        typeof result.payload === 'string'
          ? result.payload
          : 'Failed to create menu item. Please verify all details and try again.'
      );
    }
  };

  const currentRestaurant = vendorRestaurants.find(
    (r) => (r._id || r.id) === targetRestaurantId
  ) || vendorRestaurants[0] || null;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar user={user} />

          <div className="flex-1 w-full max-w-[960px] space-y-6">
            <PageHeader
              title="Add Menu Item"
              subtitle={currentRestaurant ? `Add a delicious new dish to ${currentRestaurant.name}'s menu.` : "Introduce a delicious new dish to your restaurant's digital menu."}
              backLink={targetRestaurantId ? `/vendor/restaurants/${targetRestaurantId}/menu` : '/vendor/menu'}
              backText="Back to Menu"
            />

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Restaurant Selector if multiple */}
                {vendorRestaurants.length > 1 && !restaurantId && !id && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Assign to Restaurant <span className="text-primary">*</span>
                    </label>
                    <select
                      value={targetRestaurantId}
                      onChange={(e) => setTargetRestaurantId(e.target.value)}
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                    >
                      {vendorRestaurants.map((r) => {
                        const rId = r._id || r.id;
                        return (
                          <option key={rId} value={rId}>
                            {r.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}

                {/* 2-Column Desktop Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column (Primary Details) - 7 cols */}
                  <div className="lg:col-span-7 space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Food Item Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        placeholder="e.g. Paneer Tikka Masala"
                        className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Category <span className="text-primary">*</span>
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="Starters">Starters</option>
                          <option value="Main Course">Main Course</option>
                          <option value="Biryani">Biryani</option>
                          <option value="Breads">Breads</option>
                          <option value="Beverages">Beverages</option>
                          <option value="Desserts">Desserts</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Price (₹ INR) <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <IndianRupee size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
                          <input
                            type="number"
                            min="1"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g. 199"
                            className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Prep Time
                        </label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fooddash-muted" />
                          <input
                            type="text"
                            value={prepTime}
                            onChange={(e) => setPrepTime(e.target.value)}
                            placeholder="e.g. 20 mins"
                            className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Dietary Type (Veg / Non-Veg) */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Dietary Preference <span className="text-primary">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <label
                            onClick={() => setDiet('veg')}
                            className={`flex items-center justify-center gap-2 h-12 px-3 rounded-input border cursor-pointer text-xs font-bold transition-all ${
                              diet === 'veg'
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                : 'border-stone-200 bg-fooddash-cream/40 text-fooddash-charcoal'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                            <span>Veg</span>
                          </label>

                          <label
                            onClick={() => setDiet('non-veg')}
                            className={`flex items-center justify-center gap-2 h-12 px-3 rounded-input border cursor-pointer text-xs font-bold transition-all ${
                              diet === 'non-veg'
                                ? 'border-rose-500 bg-rose-50 text-rose-800'
                                : 'border-stone-200 bg-fooddash-cream/40 text-fooddash-charcoal'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                            <span>Non-Veg</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Description <span className="text-primary">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detail key ingredients, spice levels, allergens, or culinary style..."
                        className="w-full p-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column (Image Upload & Availability) - 5 cols */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Food Image Upload Card with Preview */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Dish Photo <span className="text-primary">*</span>
                      </label>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={handleImageSelect}
                        className="hidden"
                      />

                      {imagePreview ? (
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E4DCD0] shadow-sm bg-stone-900 group">
                          <img
                            src={imagePreview}
                            alt="Dish Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 text-white">
                            <div>
                              <span className="font-bold text-xs block">{imageFile?.name}</span>
                              <span className="text-[11px] text-stone-300">
                                {(imageFile.size / (1024 * 1024)).toFixed(2)} MB • Ready
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-colors cursor-pointer"
                              >
                                Replace
                              </button>
                              <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="p-1.5 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-[#E4DCD0] hover:border-primary bg-fooddash-cream/40 hover:bg-primary-soft/20 rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center cursor-pointer group min-h-[170px]"
                        >
                          <div className="w-14 h-14 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 transition-transform">
                            <UploadCloud size={26} />
                          </div>
                          <span className="font-heading font-bold text-sm text-fooddash-charcoal">
                            Upload food photo
                          </span>
                          <span className="text-xs text-fooddash-muted mt-1">
                            PNG, JPG, or WEBP up to 5MB
                          </span>
                          <span className="text-[11px] text-stone-500 mt-2 px-2.5 py-0.5 rounded-full bg-white border border-[#E4DCD0]">
                            Square or 4:3 ratio recommended
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Availability Switch UI */}
                    <div className="p-4 rounded-2xl bg-fooddash-cream/60 border border-[#E4DCD0] space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-heading font-bold text-sm text-fooddash-charcoal block">
                            Item Availability
                          </span>
                          <span className="text-xs text-fooddash-muted">
                            Can customers order this dish right now?
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isAvailable}
                            onChange={(e) => setIsAvailable(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
                        </label>
                      </div>
                      <div className="pt-2 border-t border-stone-200/70 text-[11px] font-semibold flex items-center gap-1.5">
                        {isAvailable ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 size={13} />
                            Available for ordering
                          </span>
                        ) : (
                          <span className="text-stone-500">
                            Currently Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-[#E4DCD0]/70 flex items-center justify-end gap-3">
                  <Link
                    to={targetRestaurantId ? `/vendor/restaurants/${targetRestaurantId}/menu` : '/vendor/menu'}
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
                        <span>Adding Dish...</span>
                      </>
                    ) : (
                      <>
                        <span>Add Menu Item</span>
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
