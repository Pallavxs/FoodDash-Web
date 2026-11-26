import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/slice/authSlice';
import AppRoutes from './routes/AppRoutes';

/**
 * Root App component rendering the FoodDash application routing.
 */
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
