import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VendorSidebar from '../../components/VendorSidebar';
import PageHeader from '../../components/PageHeader';
import { 
  UploadCloud, 
  ArrowRight, 
  Trash2, 
  Image as ImageIcon, 
  AlertCircle 
} from 'lucide-react';

export default function CreateRestaurant() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // File state (raw File object for future FormData submission)
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  // Clean up object URLs on unmount or replace
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Format file size in readable format
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  // Validate and set selected file
  const validateAndSetFile = (file) => {
    setError('');
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    const isTypeValid = validTypes.includes(file.type) || /\.(png|jpe?g|webp)$/i.test(file.name);
    const isSizeValid = file.size <= 5 * 1024 * 1024; // 5MB

    if (!isTypeValid || !isSizeValid) {
      setError('Please upload a PNG, JPG, or WEBP image under 5MB.');
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Handle native file input change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  // Remove selected image and reset state
  const handleRemoveImage = (e) => {
    e.stopPropagation();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    setPreviewUrl(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag and drop event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    validateAndSetFile(droppedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/vendor/restaurants');
  };

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <VendorSidebar />

          <div className="flex-1 w-full max-w-[900px]">
            <PageHeader
              title="Add New Restaurant"
              subtitle="Register a new kitchen or partner branch to FoodDash."
              backLink="/vendor/restaurants"
              backText="Back to My Restaurants"
            />

            <div className="bg-white rounded-outer border border-[#E4DCD0]/80 p-6 sm:p-10 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Restaurant Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Trattoria Napoli"
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
                      placeholder="e.g. Italian, Wood-fired Pizza, Pasta"
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                {/* 2. Location & Delivery Estimates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Kitchen Location / Street Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 104 Grand Avenue, Downtown"
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Delivery Time (mins)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 25-35"
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* 3. Rating & Opening Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Initial Rating
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="5.0"
                      placeholder="4.5"
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                      Opening Hours
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 11:00 AM - 10:30 PM"
                      className="w-full h-12 px-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* 4. Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Restaurant Story & Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell food lovers about your culinary background, specialty dishes, and ingredients..."
                    className="w-full p-4 rounded-input border border-fooddash-border bg-fooddash-cream/40 text-sm font-medium outline-none focus:border-primary focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* 5. Restaurant Image Upload UI */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-fooddash-charcoal mb-2">
                    Restaurant Cover Photo
                  </label>

                  {/* Hidden native file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* Upload Dropzone or Preview */}
                  {!previewUrl ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none group ${
                        isDragging
                          ? 'border-primary bg-primary-soft/60 scale-[1.005] shadow-xs'
                          : 'border-[#E4DCD0] bg-fooddash-cream/40 hover:border-primary hover:bg-primary-soft/25'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 transition-transform">
                        <UploadCloud size={26} />
                      </div>
                      <span className="text-sm font-bold text-fooddash-charcoal">
                        Click to upload restaurant image or drag and drop
                      </span>
                      <span className="text-xs text-fooddash-muted mt-1">
                        PNG, JPG, or WEBP up to 5MB
                      </span>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-80 w-full rounded-2xl overflow-hidden border border-[#E4DCD0] shadow-sm bg-stone-900 group">
                      <img
                        src={previewUrl}
                        alt="Restaurant Cover Preview"
                        className="w-full h-full object-cover"
                      />

                      {/* Top Action: Remove Image */}
                      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="h-8 px-3 rounded-full bg-white/95 hover:bg-white text-rose-600 hover:text-rose-700 font-bold text-xs shadow-md backdrop-blur-sm transition-all flex items-center gap-1.5 cursor-pointer"
                          title="Remove image"
                        >
                          <Trash2 size={13} />
                          <span>Remove image</span>
                        </button>
                      </div>

                      {/* Bottom Info Bar: File Name and Size */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 sm:p-5 flex items-end justify-between gap-4 text-white">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                            <ImageIcon size={16} />
                          </div>
                          <div className="overflow-hidden">
                            <span className="font-bold text-xs sm:text-sm block truncate max-w-[280px] sm:max-w-md">
                              {image?.name}
                            </span>
                            <span className="text-[11px] text-stone-300 block">
                              {formatFileSize(image?.size || 0)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-7 px-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-[11px] font-bold transition-colors cursor-pointer shrink-0"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 animate-fadeIn">
                      <AlertCircle size={15} className="shrink-0 text-red-600" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-[#E4DCD0]/70 flex items-center justify-end gap-3">
                  <Link
                    to="/vendor/restaurants"
                    className="h-12 px-6 rounded-full border border-stone-300 hover:bg-stone-100 text-fooddash-charcoal font-bold text-xs transition-colors flex items-center justify-center"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="h-12 px-8 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs shadow-button hover:shadow-button-hover transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Create Restaurant</span>
                    <ArrowRight size={16} />
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
