import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

// Global flag to prevent repeated alerts
let sessionExpiredHandled = false;

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const token = localStorage.getItem("access_token");

        // Only trigger session expired logic if token exists
        if (status === 401 && token && !sessionExpiredHandled) {
            sessionExpiredHandled = true;

            alert("Your session has expired. Please log in again.");
            localStorage.removeItem("access_token");

            // Reload the page to reset the React state and trigger navigation
            window.location.href = "/login";

            // Optionally reset the flag in a second
            setTimeout(() => {
                sessionExpiredHandled = false;
            }, 1000);
        }

        return Promise.reject(error);
    }
);

export default api;
