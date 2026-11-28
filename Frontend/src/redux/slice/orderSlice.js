import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../../services/orderService";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await orderService.createOrder(orderData);
      const orderDoc = res?.order || res;
      const finalId = res?.orderId || res?._id || res?.id || orderDoc?._id || orderDoc?.id;
      if (orderDoc && finalId) {
        orderDoc._id = finalId;
        orderDoc.id = finalId;
        orderDoc.orderId = finalId;
      }
      return orderDoc;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

export const fetchCustomerOrders = createAsyncThunk(
  "order/fetchCustomerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await orderService.getCustomerOrders();
      return Array.isArray(data) ? data : (data?.data ?? []);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      return await orderService.getOrderById(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Order not found"
      );
    }
  }
);

export const fetchVendorOrders = createAsyncThunk(
  "order/fetchVendorOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await orderService.getVendorOrders();
      return Array.isArray(data) ? data : (data?.data ?? []);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendor orders"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await orderService.updateOrderStatus({ id, status });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  }
);

const initialState = {
  customerOrders: [],
  vendorOrders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        if (action.payload) {
          state.customerOrders = [action.payload, ...state.customerOrders];
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Customer Orders
      .addCase(fetchCustomerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.customerOrders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Order By ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Vendor Orders
      .addCase(fetchVendorOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorOrders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchVendorOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (updated) {
          const id = updated._id || updated.id;
          state.vendorOrders = state.vendorOrders.map((o) =>
            (o._id || o.id) === id ? updated : o
          );
          if ((state.currentOrder?._id || state.currentOrder?.id) === id) {
            state.currentOrder = updated;
          }
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
