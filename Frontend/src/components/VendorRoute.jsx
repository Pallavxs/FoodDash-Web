import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSkeleton from './LoadingSkeleton';

/**
 * Route guard ensuring only authenticated users with 'vendor' or 'admin' role
 * can access vendor portal routes.
 */
export default function VendorRoute({ children }) {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-4">
          <LoadingSkeleton count={2} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== 'vendor' && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
