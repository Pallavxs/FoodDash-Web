import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout';

// Public / Customer Pages
import Home from '../pages/Home';
import RestaurantDetails from '../pages/RestaurantDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import OrderTracking from '../pages/OrderTracking';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// User Pages
import Dashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import Orders from '../pages/user/Orders';

// Vendor Pages
import VendorDashboard from '../pages/vendor/VendorDashboard';
import MyRestaurants from '../pages/vendor/MyRestaurants';
import CreateRestaurant from '../pages/vendor/CreateRestaurant';
import ManageRestaurant from '../pages/vendor/ManageRestaurant';
import EditRestaurant from '../pages/vendor/EditRestaurant';
import AddFood from '../pages/vendor/AddFood';
import EditFood from '../pages/vendor/EditFood';
import VendorOrders from '../pages/vendor/VendorOrders';

// Fallback Page
import NotFound from '../pages/NotFound';

/**
 * AppRoutes Component
 * Central route configuration for all 20 required FoodDash prototype routes.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* =========================================
          PUBLIC / CUSTOMER ROUTES (1 - 6)
          ========================================= */}
      {/* 1. Home Page */}
      <Route path="/" element={<Home />} />

      {/* 2. Restaurant Details Page */}
      <Route path="/restaurants/:id" element={<RestaurantDetails />} />

      {/* 3. Cart Page */}
      <Route path="/cart" element={<Cart />} />

      {/* 4. Checkout Page */}
      <Route path="/checkout" element={<Checkout />} />

      {/* 5. Order Success Page */}
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* 6. Order Tracking / Details Page */}
      <Route path="/orders/:id" element={<OrderTracking />} />


      {/* =========================================
          AUTH ROUTES (7 - 9)
          ========================================= */}
      {/* 7. Login Page */}
      <Route
        path="/login"
        element={
          <AuthLayout mode="login">
            <Login />
          </AuthLayout>
        }
      />

      {/* 8. Register Page */}
      <Route
        path="/register"
        element={
          <AuthLayout mode="register">
            <Register />
          </AuthLayout>
        }
      />

      {/* 9. Forgot Password Page */}
      <Route
        path="/forgot-password"
        element={
          <AuthLayout mode="forgot">
            <ForgotPassword />
          </AuthLayout>
        }
      />


      {/* =========================================
          USER / CUSTOMER DASHBOARD ROUTES (10 - 12)
          ========================================= */}
      {/* 10. Customer Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 11. Profile Page */}
      <Route path="/profile" element={<Profile />} />

      {/* 12. My Orders Page */}
      <Route path="/orders" element={<Orders />} />


      {/* =========================================
          VENDOR PORTAL ROUTES (13 - 20)
          ========================================= */}
      {/* 13. Vendor Dashboard */}
      <Route path="/vendor" element={<VendorDashboard />} />

      {/* 14. My Restaurants Page */}
      <Route path="/vendor/restaurants" element={<MyRestaurants />} />

      {/* 15. Create Restaurant Page */}
      <Route path="/vendor/restaurants/create" element={<CreateRestaurant />} />

      {/* 16. Manage Restaurant Page */}
      <Route path="/vendor/restaurants/:id" element={<ManageRestaurant />} />

      {/* 17. Edit Restaurant Page */}
      <Route path="/vendor/restaurants/:id/edit" element={<EditRestaurant />} />

      {/* 18. Add Food Page */}
      <Route path="/vendor/restaurants/:id/menu/create" element={<AddFood />} />

      {/* 19. Edit Food Page */}
      <Route path="/vendor/restaurants/:restaurantId/menu/:id/edit" element={<EditFood />} />

      {/* 20. Vendor Orders Page */}
      <Route path="/vendor/orders" element={<VendorOrders />} />


      {/* =========================================
          404 FALLBACK ROUTE
          ========================================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
