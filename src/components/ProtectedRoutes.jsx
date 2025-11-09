// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // 1. Wait for verification/initial load
  if (loading) {
    return <div className="text-center py-20 text-lg font-semibold">Verifying session...</div>;
  }

  // 2. Redirect if not authenticated (after loading finishes)
  if (!isAuthenticated) {
    toast.error("Please log in to access the Admin Panel.");
    return <Navigate to="/admin/login" replace />;
  }

  // 3. Render child routes if authenticated
  return <Outlet />;
}