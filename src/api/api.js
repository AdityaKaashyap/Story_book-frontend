import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "https://storybook-backend-748k.onrender.com", // your Django API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 or refresh token logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: handle token refresh or redirect to login
      console.error("Unauthorized - Token may be expired");
    }
    return Promise.reject(error);
  }
);

export default api;
