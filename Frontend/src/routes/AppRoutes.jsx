import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout';

// Public / Customer Pages
import Home from '../pages/Home';

// Protected Pages
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
import MenuManagement from '../pages/vendor/MenuManagement';
import VendorRoute from '../components/VendorRoute';

// Fallback Page
import NotFound from '../pages/NotFound';

// Protected Route 

import ProtectedRoute from './ProtectedRoute'

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
      <Route path="/restaurants/:id" element={
        <ProtectedRoute>
          <RestaurantDetails />
        </ProtectedRoute>
      } />

      {/* 3. Cart Page */}
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>  
      } />

      {/* 4. Checkout Page */}
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />

      {/* 5. Order Success Page */}
      <Route path="/order-success" element={
        <ProtectedRoute>
          <OrderSuccess />
        </ProtectedRoute>
      } />
      <Route path="/order-success/:id" element={
        <ProtectedRoute>
          <OrderSuccess />
        </ProtectedRoute>
      } />

      {/* 6. Order Tracking / Details Page */}
      <Route path="/orders/:id" element={
        <ProtectedRoute>
          <OrderTracking />
        </ProtectedRoute>
      } />


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
      <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
      }/>

      {/* 11. Profile Page */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      {/* 12. My Orders Page */}
      <Route path="/orders" element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      } />

      {/* =========================================
          VENDOR PORTAL ROUTES (13 - 21)
          ========================================= */}
      {/* 13. Vendor Dashboard */}

      <Route path="/vendor" element={<VendorRoute><VendorDashboard /></VendorRoute>} />

      {/* 14. My Restaurants Page */}
      <Route path="/vendor/restaurants" element={<VendorRoute><MyRestaurants /></VendorRoute>} />

      {/* 15. Create Restaurant Page */}
      <Route path="/vendor/restaurants/create" element={<VendorRoute><CreateRestaurant /></VendorRoute>} />

      {/* 16. Manage Restaurant Page */}
      <Route path="/vendor/restaurants/:id" element={<VendorRoute><ManageRestaurant /></VendorRoute>} />

      {/* 17. Edit Restaurant Page */}
      <Route path="/vendor/restaurants/:id/edit" element={<VendorRoute><EditRestaurant /></VendorRoute>} />

      {/* 18. Add Food Page */}
      <Route path="/vendor/restaurants/:id/menu/create" element={<VendorRoute><AddFood /></VendorRoute>} />

      {/* 19. Edit Food Page */}
      <Route path="/vendor/restaurants/:restaurantId/menu/:id/edit" element={<VendorRoute><EditFood /></VendorRoute>} />
      <Route path="/vendor/menu/:id/edit" element={<VendorRoute><EditFood /></VendorRoute>} />

      {/* 20. Vendor Orders Page */}
      <Route path="/vendor/orders" element={<VendorRoute><VendorOrders /></VendorRoute>} />

      {/* 21. Menu Management Pages */}
      <Route path="/vendor/menu" element={<VendorRoute><MenuManagement /></VendorRoute>} />
      <Route path="/vendor/menu/create" element={<VendorRoute><AddFood /></VendorRoute>} />
      <Route path="/vendor/restaurants/:id/menu" element={<VendorRoute><MenuManagement /></VendorRoute>} />


      {/* =========================================
          404 FALLBACK ROUTE
          ========================================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
