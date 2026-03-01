import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AuthLayout } from "./components/layout/AuthLayout";
import { UserLayout } from "./components/layout/UserLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import LandingPage from "./pages/public/LandingPage";
import AboutPage from "./pages/public/AboutPage";
import ServicesPage from "./pages/public/ServicesPage";
import SectorsPage from "./pages/public/SectorsPage";
import GalleryPage from "./pages/public/GalleryPage";
import ReviewsPage from "./pages/public/ReviewsPage";
import NewsPage from "./pages/public/NewsPage";
import ContactPage from "./pages/public/ContactPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import ServiceDetailPage from "./pages/services/ServiceDetailPage";

// User pages
import UserDashboard from "./pages/user/Dashboard";
import MyServices from "./pages/user/MyServices";
import ServiceProgress from "./pages/user/ServiceProgress";
import Documents from "./pages/user/Documents";
import Notifications from "./pages/user/Notifications";

import AdminDashboard from "./pages/admin/Dashboard";

import ServicesList from "./pages/admin/Services/ServicesList";
import AddService from "./pages/admin/Services/AddService";
import EditService from "./pages/admin/Services/EditService";

import GalleryManager from "./pages/admin/Gallery/GalleryManager";
import AddProject from "./pages/admin/Gallery/AddProject";

import NewsManager from "./pages/admin/News/NewsManager";
import AddNews from "./pages/admin/News/AddNews";

import UsersList from "./pages/admin/Users/UsersList";
import UserServicesByUser from "./pages/admin/Users/UserServicesByUser";
import UpdateServiceProgress from "./pages/admin/ServiceRequests/UpdateServiceProgress";

import LicenseManager from "./pages/admin/Licenses/LicenseManager";
import AddLicense from "./pages/admin/Licenses/AddLicense";

import RequestsList from "./pages/admin/ServiceRequests/RequestsList";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 🌍 Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/services/:serviceId"
              element={<ServiceDetailPage />}
            />
            <Route path="/sectors" element={<SectorsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* 🔐 Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* 👤 USER ROUTES */}
          <Route
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/my-services" element={<MyServices />} />
            <Route path="/user/service/:id" element={<ServiceProgress />} />
            <Route path="/user/documents" element={<Documents />} />
            <Route path="/user/notifications" element={<Notifications />} />
          </Route>

          {/* 🛠️ ADMIN ROUTES */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Services */}
              <Route path="/admin/services" element={<ServicesList />} />
              <Route path="/admin/services/add" element={<AddService />} />
              <Route
                path="/admin/services/edit/:serviceId"
                element={<EditService />}
              />

              {/* Gallery */}
              <Route path="/admin/gallery" element={<GalleryManager />} />
              <Route path="/admin/gallery/add" element={<AddProject />} />

              {/* News */}
              <Route path="/admin/news" element={<NewsManager />} />
              <Route path="/admin/news/add" element={<AddNews />} />

              {/* Users */}
              <Route path="/admin/users" element={<UsersList />} />
              <Route
                path="/admin/users/:userId/services"
                element={<UserServicesByUser />}
              />

              <Route
                path="/admin/service-progress/:id"
                element={<UpdateServiceProgress />}
              />

              {/* Licenses */}
              <Route path="/admin/licenses" element={<LicenseManager />} />

              <Route path="/admin/licenses/add" element={<AddLicense />} />

              {/* Service Requests */}
              <Route path="/admin/requests" element={<RequestsList />} />
            </Route>
          </Route>

          {/* ❌ 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
