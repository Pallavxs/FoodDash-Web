import api from "./api";

/**
 * Service for communicating with backend Restaurant endpoints.
 * Endpoints:
 * - GET /restaurants        -> getRestaurants()
 * - GET /restaurants/search -> searchRestaurants(query)
 * - GET /restaurants/:id    -> getRestaurantById(id)
 */

export const restaurantService = {

  createRestaurant: async (data) => {
    const response = await api.post("/restaurants/create", data);
    return response.data?.data ?? response.data;
  },

  getRestaurants: async () => {
    const response = await api.get("/restaurants");
    return response.data?.data ?? response.data ?? [];
  },

  searchRestaurants: async (query) => {
    const response = await api.get("/restaurants/search", {
      params: { query },
    });
    return response.data?.data ?? response.data ?? [];
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data?.data ?? response.data;
  },

  getMyRestraunt: async () => {
    const response = await api.get("/restaurants/my");
    return response.data?.data ?? response.data ?? [];
  }
};

export default restaurantService;
