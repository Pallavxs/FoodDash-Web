import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import { fetchMenuItemById, updateMenuItem, deleteMenuItem } from '../../redux/slice/menuSlice';
import {
  UploadCloud,
  ArrowRight,
  Clock,
  IndianRupee,
  CheckCircle2,
  Trash2,
  AlertCircle,
  X,
  Loader2
} from 'lucide-react';

/**
 * EditFood Component
 * Connected form for updating an existing dish's pricing, details, availability, and image.
 */
export default function EditFood() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { selectedItem, loading } = useSelector((state) => state.menu);

  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState('Main Course');
  const [price, setPrice] = useState('');
  const [prepTime, setPrepTime] = useState('20 mins');
  const [diet, setDiet] = useState('veg');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchMenuItemById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedItem && (selectedItem._id === id || selectedItem.id === id)) {
      setDishName(selectedItem.name || '');
      setCategory(selectedItem.category || 'Main Course');
      setPrice(selectedItem.price !== undefined ? String(selectedItem.price) : '');
      setDescription(selectedItem.description || '');
      setIsAvailable(selectedItem.isAvailable ?? true);
      setExistingImageUrl(selectedItem.image || '');
      if (selectedItem.prepTime) setPrepTime(selectedItem.prepTime);
      if (selectedItem.isVeg !== undefined) {
        setDiet(selectedItem.isVeg ? 'veg' : 'non-veg');
      }
    }
  }, [selectedItem, id]);

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

    const formData = new FormData();
    formData.append('name', dishName.trim());
    formData.append('description', description.trim());
    formData.append('price', Number(price));
    formData.append('category', category);
    formData.append('isAvailable', isAvailable);
    formData.append('availability', isAvailable);
    if (newImageFile) {
      formData.append('image', newImageFile);
    }

    const result = await dispatch(updateMenuItem({ id, data: formData }));

    if (updateMenuItem.fulfilled.match(result)) {
      navigate(-1);
    } else {
      setErrorMsg(
        typeof result.payload === 'string'
          ? result.payload
          : 'Failed to update dish. Please check details and try again.'
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${dishName}" from your menu?`)) {
      setIsDeleting(true);
      const result = await dispatch(deleteMenuItem(id));
      setIsDeleting(false);

      if (deleteMenuItem.fulfilled.match(result)) {
        navigate(-1);
      } else {
        setErrorMsg(
          typeof result.payload === 'string'
            ? result.payload
            : 'Failed to delete dish.'
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

          <div className="flex-1 w-full max-w-[960px] space-y-6">
            <PageHeader
              title="Edit Menu Item"
              subtitle={dishName ? `Update recipe details, pricing, and availability for ${dishName}.` : 'Update recipe details, pricing, and availability.'}
              backLink="/vendor/menu"
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
                {/* 2-Column Desktop Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column (Primary Details) */}
                  <div className="lg:col-span-7 space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Food Item Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        placeholder="e.g. Handmade Tagliatelle al Tartufo"
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
                            placeholder="0"
                            className="w-full h-12 pl-10 pr-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Prep Time (mins)
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

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                          Dietary Preference
                        </label>
                        <div className="grid grid-cols-2 gap-2 h-12">
                          <button
                            type="button"
                            onClick={() => setDiet('veg')}
                            className={`flex items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                              diet === 'veg'
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                                : 'bg-fooddash-cream/30 border-fooddash-border text-fooddash-charcoal'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                            <span>Veg</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDiet('non-veg')}
                            className={`flex items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                              diet === 'non-veg'
                                ? 'bg-rose-50 border-rose-400 text-rose-800'
                                : 'bg-fooddash-cream/30 border-fooddash-border text-fooddash-charcoal'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                            <span>Non-Veg</span>
                          </button>
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

                  {/* Right Column (Image Upload & Availability) */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Food Image Upload Dropzone / Preview */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                        Dish Photo
                      </label>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={handleImageSelect}
                        className="hidden"
                      />

                      {imagePreview || existingImageUrl ? (
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E4DCD0] shadow-sm bg-stone-900 group">
                          <img
                            src={imagePreview || existingImageUrl}
                            alt="Dish Cover"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 text-white">
                            <div>
                              <span className="font-bold text-xs block">
                                {newImageFile ? newImageFile.name : `${dishName || 'Dish'} Photo`}
                              </span>
                              <span className="text-[11px] text-stone-300">
                                {newImageFile ? 'Ready to upload' : 'Current photo'}
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
                              {newImageFile && (
                                <button
                                  type="button"
                                  onClick={handleRemoveNewImage}
                                  className="p-1.5 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                                  title="Revert Photo"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-[#E4DCD0] rounded-2xl p-6 text-center bg-fooddash-cream/40 hover:bg-fooddash-cream/70 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px]"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-2">
                            <UploadCloud size={20} />
                          </div>
                          <span className="font-bold text-xs text-fooddash-charcoal block">
                            Upload food photo
                          </span>
                          <span className="text-[11px] text-fooddash-muted mt-0.5 block">
                            PNG, JPG, or WEBP up to 5MB
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

                    {/* Danger Zone: Delete Action */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-full h-11 px-4 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        <span>{isDeleting ? 'Deleting...' : 'Delete Dish from Menu'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-[#E4DCD0]/70 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="h-12 px-6 rounded-full border border-stone-300 hover:bg-stone-100 text-fooddash-charcoal font-bold text-xs transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Cancel
                  </button>

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
