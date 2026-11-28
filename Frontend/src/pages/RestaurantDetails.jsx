import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RestaurantHeader from '../components/restaurant/RestaurantHeader';
import MenuCategories from '../components/restaurant/MenuCategories';
import MenuSearch from '../components/restaurant/MenuSearch';
import SelectedDish from '../components/restaurant/SelectedDish';
import MenuSection from '../components/restaurant/MenuSection';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchRestaurantById } from '../redux/slice/restaurantSlice';
import { fetchMenuByRestaurant } from '../redux/slice/menuSlice';
import { addToCart, updateQuantity } from '../redux/slice/cartSlice';
import { ArrowLeft, UtensilsCrossed, AlertCircle, RefreshCw } from 'lucide-react';

export default function RestaurantDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Redux state
  const { selectedRestaurant: restaurant, loading: restaurantLoading, error: restaurantError } = useSelector(
    (state) => state.restaurants
  );

  const { items: dishes = [], loading: menuLoading, error: menuError } = useSelector(
    (state) => state.menu
  );

  const cartItems = useSelector((state) => state.cart?.items || []);

  // UI interaction states
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Fetch real restaurant and real dishes on mount or ID change
  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id));
      dispatch(fetchMenuByRestaurant(id));
    }
  }, [dispatch, id]);

  // Extract categories dynamically from real dishes
  const categories = useMemo(() => {
    const rawCategories = dishes.map((d) => d.category).filter(Boolean);
    const unique = ['All', ...new Set(rawCategories)];
    return unique.length > 1 ? unique : ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];
  }, [dishes]);

  // Calculate dish count per category
  const categoryCounts = useMemo(() => {
    const counts = { All: dishes.length };
    dishes.forEach((d) => {
      if (d.category) {
        counts[d.category] = (counts[d.category] || 0) + 1;
      }
    });
    return counts;
  }, [dishes]);

  // Filter dishes based on activeCategory, searchQuery, and isVegOnly
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchCategory =
        activeCategory === 'All' ||
        (dish.category && dish.category.toLowerCase() === activeCategory.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        (dish.name && dish.name.toLowerCase().includes(query)) ||
        (dish.description && dish.description.toLowerCase().includes(query)) ||
        (dish.category && dish.category.toLowerCase().includes(query));

      const matchVeg = !isVegOnly || dish.isVeg;

      return matchCategory && matchSearch && matchVeg;
    });
  }, [dishes, activeCategory, searchQuery, isVegOnly]);

  // Group filtered dishes by category
  const groupedSections = useMemo(() => {
    if (activeCategory !== 'All') {
      return [{ category: activeCategory, dishes: filteredDishes }];
    }

    const availableCategories = categories.filter((c) => c !== 'All');
    const sections = [];

    availableCategories.forEach((cat) => {
      const dishesInCat = filteredDishes.filter((d) => d.category === cat);
      if (dishesInCat.length > 0) {
        sections.push({ category: cat, dishes: dishesInCat });
      }
    });

    // Fallback: If dishes don't match any categorized bucket, put them in a General bucket
    if (sections.length === 0 && filteredDishes.length > 0) {
      sections.push({ category: 'Menu Items', dishes: filteredDishes });
    }

    return sections;
  }, [activeCategory, categories, filteredDishes]);

  // Handle dish selection to open detail modal
  const handleSelectDish = (dish) => {
    setSelectedDish(dish);
  };

  // Real Redux Cart actions
  const handleAddDish = (dish, count = 1) => {
    for (let i = 0; i < count; i++) {
      dispatch(addToCart(dish));
    }
  };

  const handleUpdateQuantity = (dishId, newQty) => {
    dispatch(updateQuantity({ id: dishId, quantity: newQty }));
  };

  // Derive cart quantities map from real Redux cart items
  const cartQuantities = useMemo(() => {
    const map = {};
    cartItems.forEach((item) => {
      const dishId = item._id || item.id;
      map[dishId] = item.quantity || 1;
    });
    return map;
  }, [cartItems]);

  const selectedDishId = selectedDish?._id || selectedDish?.id;
  const isLoading = restaurantLoading || menuLoading;

  return (
    <div className="min-h-screen flex flex-col bg-fooddash-cream text-fooddash-charcoal selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-fooddash-muted mb-4">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span>Restaurants</span>
          <span>/</span>
          <span className="text-fooddash-charcoal truncate">
            {restaurant?.name || 'Restaurant Details'}
          </span>
        </div>

        {/* ==============================================================
            1. LOADING STATE
           ============================================================== */}
        {isLoading && !restaurant && (
          <div className="space-y-6 my-6">
            <div className="h-64 sm:h-72 rounded-3xl bg-stone-200 animate-pulse" />
            <LoadingSkeleton count={4} />
          </div>
        )}

        {/* ==============================================================
            2. RESTAURANT NOT FOUND / ERROR STATE
           ============================================================== */}
        {!isLoading && (restaurantError || !restaurant) && (
          <div className="bg-white rounded-3xl border border-red-200 p-10 sm:p-14 text-center max-w-lg mx-auto shadow-card my-12 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="font-heading text-2xl font-extrabold text-fooddash-charcoal mb-2">
              Restaurant Not Found
            </h2>
            <p className="text-sm text-fooddash-muted mb-6 leading-relaxed">
              {typeof restaurantError === 'string'
                ? restaurantError
                : "We couldn't locate this restaurant. It may have been removed or the link is incorrect."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-xs shadow-button hover:bg-primary-dark transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Browse All Restaurants</span>
            </Link>
          </div>
        )}

        {/* ==============================================================
            3. REAL RESTAURANT DETAILS & MENU CONTENT
           ============================================================== */}
        {restaurant && (
          <div className="space-y-6 animate-fadeIn">
            {/* 1. RESTAURANT UNIFIED SHOWCASE HERO */}
            <RestaurantHeader restaurant={restaurant} />

            {/* 2. ORDER ONLINE TAB BAR */}
            <div className="flex items-center gap-8 border-b border-fooddash-border text-sm font-bold">
              <div className="pb-3 relative text-primary font-extrabold select-none flex items-center gap-2">
                <span>Order Online</span>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {dishes.length} {dishes.length === 1 ? 'item' : 'items'}
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              </div>
            </div>

            {/* 3. TWO-COLUMN MENU LAYOUT */}
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              {/* Left Sidebar: Categories */}
              <MenuCategories
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                categoryCounts={categoryCounts}
              />

              {/* Right Main Content */}
              <div className="flex-1 w-full min-w-0">
                {/* Search and Veg-Only Filter */}
                <MenuSearch
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  isVegOnly={isVegOnly}
                  onToggleVegOnly={setIsVegOnly}
                />

                {/* Menu Loading Skeleton */}
                {menuLoading && (
                  <div className="space-y-4 my-4">
                    <LoadingSkeleton count={3} />
                  </div>
                )}

                {/* Menu Error with Retry */}
                {menuError && !menuLoading && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center my-6">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-xs text-red-700 font-semibold mb-3">
                      {typeof menuError === 'string' ? menuError : 'Failed to load restaurant dishes.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => dispatch(fetchMenuByRestaurant(id))}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      <span>Retry Dishes</span>
                    </button>
                  </div>
                )}

                {/* Menu Empty State */}
                {!menuLoading && !menuError && dishes.length === 0 && (
                  <div className="bg-white rounded-3xl border border-fooddash-border/80 p-12 text-center max-w-md mx-auto my-8">
                    <UtensilsCrossed size={42} className="text-fooddash-muted mx-auto mb-3" />
                    <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal mb-1">
                      No Dishes Available Yet
                    </h3>
                    <p className="text-xs text-fooddash-muted leading-relaxed">
                      This kitchen hasn't added any dishes to their menu yet. Please check back later.
                    </p>
                  </div>
                )}

                {/* Filter Empty State */}
                {!menuLoading && dishes.length > 0 && filteredDishes.length === 0 && (
                  <div className="bg-white rounded-2xl border border-fooddash-border/80 p-8 text-center my-6">
                    <p className="text-sm font-bold text-fooddash-charcoal mb-1">
                      No matching dishes found
                    </p>
                    <p className="text-xs text-fooddash-muted mb-4">
                      Try clearing your search query or removing the Veg-Only filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setIsVegOnly(false);
                      }}
                      className="px-4 py-1.5 rounded-full bg-fooddash-cream hover:bg-stone-100 text-xs font-bold text-fooddash-charcoal border border-fooddash-border transition-colors cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}

                {/* Menu Sections (Category-wise grouping) */}
                {!menuLoading &&
                  groupedSections.map((section) => (
                    <MenuSection
                      key={section.category}
                      title={section.category}
                      dishes={section.dishes}
                      selectedDishId={selectedDishId}
                      cartQuantities={cartQuantities}
                      onSelectDish={handleSelectDish}
                      onAddDish={handleAddDish}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Dish Detail Modal (Opens smoothly when user clicks a dish) */}
        {selectedDish && (
          <SelectedDish
            dish={selectedDish}
            cartQuantity={cartQuantities[selectedDishId] || 0}
            onClose={() => setSelectedDish(null)}
            onAddToCart={handleAddDish}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
