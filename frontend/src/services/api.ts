import axios from "axios";

/* =========================================================
   🔐 TOKEN CONFIG
========================================================= */
const TOKEN_KEY = "token";

/* =========================================================
   🌍 AXIOS INSTANCE
========================================================= */
const api = axios.create({
  baseURL: "https://uniqueeng.onrender.com/api",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

/* =========================================================
   🚀 REQUEST INTERCEPTOR
========================================================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================================
   🔁 RESPONSE INTERCEPTOR
========================================================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

/* =========================================================
   🔐 AUTH
========================================================= */
export const authApi = {
  login: (data: any) => api.post("/auth/login", data),
  register: (data: any) => api.post("/auth/register", data),
};

/* =========================================================
   👨‍💼 ADMIN
========================================================= */
export const adminApi = {
  getDashboard: () => api.get("/admin/dashboard"),
  getUsers: () => api.get("/admin/users"),
  getUserServices: (userId: string) =>
    api.get(`/admin/users/${userId}/services`),

  updateServiceStage: (serviceId: string, data: any) =>
    api.put(`/admin/user-service/${serviceId}/stage`, data),
};

/* =========================================================
   🛠 SERVICES
========================================================= */
export const servicesApi = {
  getAll: () => api.get("/services"),
  getById: (id: string) => api.get(`/services/${id}`),
  create: (data: any) => api.post("/services", data),
  update: (id: string, data: any) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

/* =========================================================
   📦 REQUESTS
========================================================= */
export const requestsApi = {
  create: (data: any) => api.post("/requests", data),
  getAll: () => api.get("/requests"),
  getById: (id: string) => api.get(`/requests/${id}`),
  updateStatus: (id: string, data: any) =>
    api.put(`/requests/${id}/status`, data),
};

/* =========================================================
   🖼 PROJECTS
========================================================= */
export const projectsApi = {
  getAll: () => api.get("/projects"),
  create: (formData: FormData) =>
    api.post("/projects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

/* =========================================================
   📰 NEWS
========================================================= */
export const newsApi = {
  getAll: () => api.get("/news"),
  getById: (id: string) => api.get(`/news/${id}`),
  create: (data: any) => api.post("/news", data),
  update: (id: string, data: any) => api.put(`/news/${id}`, data),
  delete: (id: string) => api.delete(`/news/${id}`),
};

/* =========================================================
   📄 LICENSES
========================================================= */
export const licensesApi = {
  getAll: () => api.get("/licenses"),
  create: (data: any) => api.post("/licenses", data),
  delete: (id: string) => api.delete(`/licenses/${id}`),
};

/* =========================================================
   🔔 NOTIFICATIONS
========================================================= */
export const notificationsApi = {
  getAll: () => api.get("/notifications"),
  markAllRead: () => api.put("/notifications/mark-all-read"),
  toggleRead: (id: string) =>
    api.put(`/notifications/${id}/toggle-read`),
};

/* =========================================================
   👤 USER DASHBOARD
========================================================= */
export const userDashboardApi = {
  getStats: () => api.get("/user/dashboard"),
};

/* =========================================================
   👤 USER SERVICES
========================================================= */
export const userServicesApi = {
  getMyServices: () => api.get("/user-services/my-services"),
  getById: (id: string) => api.get(`/user-services/${id}`),
  assign: (data: any) => api.post("/user-services/assign", data),
};