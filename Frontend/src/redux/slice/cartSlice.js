import { createSlice } from "@reduxjs/toolkit";

const getSavedCart = () => {
  try {
    const saved = localStorage.getItem("fooddash_cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  try {
    localStorage.setItem("fooddash_cart", JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
};

const initialState = {
  items: getSavedCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemId = item._id || item.id;
      const existing = state.items.find((i) => (i._id || i.id) === itemId);

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
        });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((i) => (i._id || i.id) !== itemId);
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existing = state.items.find((i) => (i._id || i.id) === id);
      if (existing) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => (i._id || i.id) !== id);
        } else {
          existing.quantity = quantity;
        }
      }
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
