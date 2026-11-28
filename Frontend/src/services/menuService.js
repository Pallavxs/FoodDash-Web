import api from "./api";

/**
 * Service for communicating with backend Menu endpoints.
 * Endpoints:
 * - GET /menu/restaurant/:restaurantId -> getMenuByRestaurantId(restaurantId)
 * - GET /menu/item/:id                -> getMenuItemById(id)
 * - POST /menu/create                 -> createMenuItem(formData)
 * - PUT /menu/:id                     -> updateMenuItem({ id, data })
 * - DELETE /menu/:id                  -> deleteMenuItem(id)
 */

export const menuService = {
  getMenuByRestaurantId: async (restaurantId) => {
    const response = await api.get(`/menu/restaurant/${restaurantId}`);
    return Array.isArray(response.data) ? response.data : (response.data?.data ?? []);
  },

  getMenuItemById: async (id) => {
    const response = await api.get(`/menu/item/${id}`);
    return response.data?.data ?? response.data;
  },

  createMenuItem: async (formData) => {
    const response = await api.post("/menu/create", formData);
    return response.data?.data ?? response.data;
  },

  updateMenuItem: async ({ id, data }) => {
    const response = await api.put(`/menu/${id}`, data);
    return response.data?.data ?? response.data;
  },

  deleteMenuItem: async (id) => {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
  },

  getMenus: async () => {
    const response = await api.get("/menu");
    return Array.isArray(response.data) ? response.data : (response.data?.data ?? []);
  },
};

export default menuService;
