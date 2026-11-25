import api from "./api";

/**
 * Service for communicating with backend Restaurant endpoints.
 * Endpoints:
 * - GET /restaurants        -> getRestaurants(page, limit)
 * - GET /restaurants/search -> searchRestaurants(query, page, limit)
 * - GET /restaurants/:id    -> getRestaurantById(id)
 */
export const restaurantService = {
  /**
   * Fetch paginated list of restaurants.
   * @param {Object} params - Query parameters (page, limit)
   * @returns {Promise<Array>} Array of restaurant objects
   */
  getRestaurants: async (params = {}) => {
    const response = await api.get("/restaurants", { params });
    return response.data?.data ?? response.data ?? [];
  },

  /**
   * Search restaurants by keyword/query (matches name and cuisine in backend).
   * @param {string} query - Search term
   * @param {Object} params - Additional query params (page, limit)
   * @returns {Promise<Array>} Array of matching restaurant objects
   */
  searchRestaurants: async (query, params = {}) => {
    const response = await api.get("/restaurants/search", {
      params: { query, ...params },
    });
    return response.data?.data ?? response.data ?? [];
  },

  /**
   * Fetch a single restaurant by its MongoDB ObjectId.
   * @param {string} id - Restaurant ID
   * @returns {Promise<Object>} Restaurant object
   */
  getRestaurantById: async (id) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data?.data ?? response.data;
  },

  createRestaurant: async () => {
    const response = await api.post(`/restraunts/`);
    return response.data
  }
};

export default restaurantService;
