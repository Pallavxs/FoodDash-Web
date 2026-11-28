import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restaurantService from "../../services/restaurantService";

/**
 * Async thunk to create a new restaurant.
 */
export const createRestaurant = createAsyncThunk(
  "restaurants/create",
  async (data, { rejectWithValue }) => {
    try {
      return await restaurantService.createRestaurant(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create restaurant"
      );
    }
  }
);

/**
 * Async thunk to fetch all restaurants without pagination.
 */
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const data = await restaurantService.getRestaurants();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurants"
      );
    }
  }
);

/**
 * Async thunk to search restaurants by name or cuisine.
 */
export const searchRestaurants = createAsyncThunk(
  "restaurants/searchRestaurants",
  async (query, { rejectWithValue }) => {
    try {
      if (!query || !query.trim()) {
        const data = await restaurantService.getRestaurants();
        return data;
      }
      const data = await restaurantService.searchRestaurants(query.trim());
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search restaurants"
      );
    }
  }
);

/**
 * Async thunk to fetch a single restaurant by ID.
 */
export const fetchRestaurantById = createAsyncThunk(
  "restaurants/fetchRestaurantById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await restaurantService.getRestaurantById(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Restaurant not found"
      );
    }
  }
);

/**
 * Async thunk to fetch vendor's own restaurants.
 */
export const getMyRestraunt = createAsyncThunk(
  "restaurants/my",
  async (_, { rejectWithValue }) => {
    try {
      const data = await restaurantService.getMyRestraunt();
      return Array.isArray(data) ? data : (data?.data ?? []);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch your restaurants"
      );
    }
  }
);

export const fetchMyRestaurants = getMyRestraunt;

/**
 * Async thunk to edit an existing restaurant.
 */
export const editRestaurant = createAsyncThunk(
  "restaurants/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await restaurantService.editRestaurant({ id, data });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit restaurant"
      );
    }
  }
);

/**
 * Async thunk to delete a restaurant.
 */
export const deleteRestaurant = createAsyncThunk(
  "restaurants/delete",
  async (id, { rejectWithValue }) => {
    try {
      await restaurantService.deleteRestaurant(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete restaurant"
      );
    }
  }
);

const initialState = {
  restaurants: [],
  myRestaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
  searchTerm: "",
  selectedCuisine: "all",
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCuisine: (state, action) => {
      state.selectedCuisine = action.payload;
    },
    clearRestaurantError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search Restaurants
      .addCase(searchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(searchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Restaurant By ID
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRestaurant = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Restaurant
      .addCase(createRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        const newRest = action.payload;
        if (newRest) {
          state.selectedRestaurant = newRest;
          state.myRestaurants = [newRest, ...state.myRestaurants.filter((r) => (r._id || r.id) !== (newRest._id || newRest.id))];
          state.restaurants = [newRest, ...state.restaurants.filter((r) => (r._id || r.id) !== (newRest._id || newRest.id))];
        }
        state.error = null;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get My Restaurant
      .addCase(getMyRestraunt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyRestraunt.fulfilled, (state, action) => {
        state.loading = false;
        const list = Array.isArray(action.payload)
          ? action.payload
          : (action.payload?.data ?? []);
        state.myRestaurants = list;
        state.error = null;
      })
      .addCase(getMyRestraunt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Restaurant
      .addCase(editRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (updated) {
          const id = updated._id || updated.id;
          state.selectedRestaurant = updated;
          state.myRestaurants = state.myRestaurants.map((r) => ((r._id || r.id) === id ? updated : r));
          state.restaurants = state.restaurants.map((r) => ((r._id || r.id) === id ? updated : r));
        }
        state.error = null;
      })
      .addCase(editRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Restaurant
      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.myRestaurants = state.myRestaurants.filter((r) => (r._id || r.id) !== deletedId);
        state.restaurants = state.restaurants.filter((r) => (r._id || r.id) !== deletedId);
        if (state.selectedRestaurant && (state.selectedRestaurant._id || state.selectedRestaurant.id) === deletedId) {
          state.selectedRestaurant = null;
        }
        state.error = null;
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setSelectedCuisine, clearRestaurantError } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
