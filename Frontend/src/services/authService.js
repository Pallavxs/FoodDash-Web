import api from "./api";

export const authService = {

    login: async (userData) => {
        const response = await api.post("/auth/login", userData);
        console.log(response.data)
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get("/auth/get-me");
        return response.data;
    },

    logout: async () => {
        const response = await api.post("/auth/logout");
        return response.data;
    },

    getAllUsers: async () => {
        const response = await api.get("/auth/getAll");
        return response.data;
    },
};

export default authService;
