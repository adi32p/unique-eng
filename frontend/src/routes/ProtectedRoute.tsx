import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRole: "user" | "admin";
  children?: React.ReactNode;
}

const ProtectedRoute = ({ allowedRole, children }: ProtectedRouteProps) => {
  // 🔐 Replace this with real auth logic later
  const isAuthenticated = true; // from auth context / token
  const userRole: "user" | "admin" = "user"; // from auth context

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // ✅ If children exist → render them
  // ✅ Else → render nested routes via <Outlet />
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
