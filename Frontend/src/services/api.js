import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
});

// Auto-handle expired or blacklisted tokens
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = window.location.pathname;
            // Only redirect if actively inside protected vendor dashboard area and not already logging in
            if (currentPath.startsWith("/vendor") && !currentPath.startsWith("/login")) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
