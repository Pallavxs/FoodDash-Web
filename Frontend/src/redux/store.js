import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slice/authSlice.js';
import restaurantSlice from './slice/restaurantSlice.js';
import menuSlice from './slice/menuSlice.js';
import cartSlice from './slice/cartSlice.js';
import orderSlice from './slice/orderSlice.js';

const store = configureStore({
    reducer: {
        auth: authSlice,
        restaurants: restaurantSlice,
        menu: menuSlice,
        cart: cartSlice,
        order: orderSlice,
    }
});

export default store;
