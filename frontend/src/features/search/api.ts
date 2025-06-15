import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // e.g. "https://api.myapp.com/v1"
  timeout: 10_000,
});

// Attach JWT, correlation-IDs, etc.
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Unified error logging
http.interceptors.response.use(
  (r) => r,
  (e) => {
    console.error(e);            // 🔥 swap for DataDog/Sentry
    return Promise.reject(e);
  }
);
