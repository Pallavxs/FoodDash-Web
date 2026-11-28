import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menuService from "../../services/menuService";

/**
 * Async thunk to fetch menu items for a specific restaurant.
 */
export const fetchMenuByRestaurant = createAsyncThunk(
  "menu/fetchByRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      return await menuService.getMenuByRestaurantId(restaurantId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menu items"
      );
    }
  }
);

/**
 * Async thunk to fetch a single menu item by ID.
 */
export const fetchMenuItemById = createAsyncThunk(
  "menu/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await menuService.getMenuItemById(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menu item"
      );
    }
  }
);

/**
 * Async thunk to create a new menu item.
 */
export const createMenuItem = createAsyncThunk(
  "menu/create",
  async (formData, { rejectWithValue }) => {
    try {
      return await menuService.createMenuItem(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create menu item"
      );
    }
  }
);

/**
 * Async thunk to update a menu item.
 */
export const updateMenuItem = createAsyncThunk(
  "menu/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await menuService.updateMenuItem({ id, data });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update menu item"
      );
    }
  }
);

/**
 * Async thunk to delete a menu item.
 */
export const deleteMenuItem = createAsyncThunk(
  "menu/delete",
  async (id, { rejectWithValue }) => {
    try {
      await menuService.deleteMenuItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete menu item"
      );
    }
  }
);

export const getMenus = createAsyncThunk(
  "menu/getMenus",
  async (_, { rejectWithValue }) => {
    try {
      return await menuService.getMenus();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menus"
      );
    }
  }
);

const initialState = {
  items: [],
  selectedItem: null,
  activeRestaurantId: null,
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearMenuError: (state) => {
      state.error = null;
    },
    resetMenuItems: (state) => {
      state.items = [];
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Menu By Restaurant
      .addCase(fetchMenuByRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuByRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchMenuByRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Menu Item by ID
      .addCase(fetchMenuItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
        state.error = null;
      })
      .addCase(fetchMenuItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Menu Item
      .addCase(createMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items = [action.payload, ...state.items];
        }
        state.error = null;
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Menu Item
      .addCase(updateMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (updated) {
          const id = updated._id || updated.id;
          state.items = state.items.map((item) => ((item._id || item.id) === id ? updated : item));
          state.selectedItem = updated;
        }
        state.error = null;
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Menu Item
      .addCase(deleteMenuItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.items = state.items.filter((item) => (item._id || item.id) !== id);
        if (state.selectedItem && (state.selectedItem._id || state.selectedItem.id) === id) {
          state.selectedItem = null;
        }
        state.error = null;
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Menus
      .addCase(getMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload)
          ? action.payload
          : (action.payload?.data || []);
        state.error = null;
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMenuError, resetMenuItems } = menuSlice.actions;

export default menuSlice.reducer;
