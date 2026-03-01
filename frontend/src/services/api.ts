import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// Service-specific API functions
export const servicesApi = {
  getAll: () => api.get("/services"),
  getById: (id: string) => api.get(`/services/${id}`),
  request: (data: any) => api.post("/services/request", data),
};

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post("/auth/login", credentials),
  register: (data: any) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
};

export const contactApi = {
  submit: (data: any) => api.post("/contact", data),
  subscribe: (email: string) => api.post("/newsletter", { email }),
};

export const galleryApi = {
  getAll: (filters?: any) => api.get("/gallery", { params: filters }),
  getById: (id: string) => api.get(`/gallery/${id}`),
};

export const newsApi = {
  getAll: (filters?: any) => api.get("/news", { params: filters }),
  getById: (id: string) => api.get(`/news/${id}`),
};

export const reviewsApi = {
  getAll: () => api.get("/reviews"),
  submit: (data: any) => api.post("/reviews", data),
};
