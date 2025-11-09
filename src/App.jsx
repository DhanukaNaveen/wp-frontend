import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import ClientWebPage from "./pages/client/ClientWebPage";
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import UploadPhoto from "./pages/admin/UploadPhoto";
import ManagePhotos from "./pages/admin/ManagePhotos";
import ManageTestimonials from "./pages/admin/ManageTestimonials";
import ManageContacts from "./pages/admin/ManageContacts";
import SubmitTestimonial from "./pages/client/SubmitTestimonial";
import EditPhoto from "./pages/admin/EditPhoto";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<ClientWebPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/submit-review" element={<SubmitTestimonial />} />
            <Route path="/admin" element={<Navigate to="/admin/photos" replace />} />
            <Route path="/admin/*" element={<AdminDashboardLayout />}>
              <Route path="edit-photo/:photoId" element={<EditPhoto />} />
              <Route path="upload" element={<UploadPhoto />} />
              <Route path="photos" element={<ManagePhotos />} />
              <Route path="testimonials" element={<ManageTestimonials />} />
              <Route path="contacts" element={<ManageContacts />} />
              

            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}