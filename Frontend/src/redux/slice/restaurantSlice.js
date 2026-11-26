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
)

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

export const editRestaurant = createAsyncThunk(
  "restaurants/:id",
  async (params, {rejectWithValue}) => {
    try {
      return await restaurantService.editRestaurant();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit your restaurant"
      )
    }
  }
)

export const fetchMyRestaurants = getMyRestraunt;

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
        state.selectedRestaurant = action.payload;
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
        state.restaurants = list;
        state.myRestaurants = list;
        state.error = null;
      })
      .addCase(getMyRestraunt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setSelectedCuisine, clearRestaurantError } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
