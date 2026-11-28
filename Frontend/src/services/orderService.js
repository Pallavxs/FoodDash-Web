import api from "./api";

/**
 * Service for communicating with backend Order endpoints.
 * Endpoints:
 * - POST /orders/create         -> createOrder(orderData)
 * - GET /orders                 -> getCustomerOrders()
 * - GET /orders/:id             -> getOrderById(id)
 * - GET /orders/restaurant      -> getVendorOrders()
 * - PATCH /orders/:id/status    -> updateOrderStatus({ id, status })
 */
export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post("/orders/create", orderData);
    return response.data?.data ?? response.data;
  },

  getCustomerOrders: async () => {
    const response = await api.get("/orders");
    return response.data?.data ?? response.data ?? [];
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data?.data ?? response.data;
  },

  getVendorOrders: async () => {
    const response = await api.get("/orders/restaurant");
    return response.data?.data ?? response.data ?? [];
  },

  updateOrderStatus: async ({ id, status }) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data?.data ?? response.data;
  },

  updateRiderLocation: async ({ id, riderLocation }) => {
    const response = await api.patch(`/orders/${id}/location`, { riderLocation });
    return response.data?.data ?? response.data;
  },
};

export default orderService;
