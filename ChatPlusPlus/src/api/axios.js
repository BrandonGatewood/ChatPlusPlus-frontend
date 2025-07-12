import axios from "axios";
import { toast } from "react-toastify";

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

            toast.error("Your session has expired. Redirecting to login...", {
                autoClose: 3000,
                onClose: () => {
                    localStorage.removeItem("access_token");
                    window.location.href = "/login";
                },
            });

            setTimeout(() => {
                sessionExpiredHandled = false;
            }, 4000);
        }

        return Promise.reject(error);
    }
);

export default api;
