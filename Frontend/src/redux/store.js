import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slice/authSlice.js';
import restaurantSlice from './slice/restaurantSlice.js';

const store = configureStore({
    reducer: {
        auth: authSlice,
        restaurants: restaurantSlice,
    }
});

export default store;
