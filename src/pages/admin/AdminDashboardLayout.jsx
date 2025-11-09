import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminNav = [
  { path: "/admin/upload", name: "Upload Photo" },
  { path: "/admin/photos", name: "Manage Gallery" },
  { path: "/admin/testimonials", name: "Manage Testimonials" },
  { path: "/admin/contacts", name: "Contact Inquiries" },
];

export default function AdminDashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-gray-800 ">
      {/* Sidebar */}
      <aside className="w-full lg:w-[320px] bg-accent text-white p-6 space-y-4 flex-shrink-0 ">
        <h2 className="text-3xl text-center font-extrabold mb-6 border-b border-accent-dark pb-3 ">Admin Panel</h2>
        <nav className="space-y-4 text-xl">
          {AdminNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block w-full text-left px-4 py-2 rounded-lg transition duration-150 ${
                  isActive ? "bg-accent-dark  border-1 border-gray-300 shadow-md" : "hover:bg-accent-light"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 w-full text-center bg-red-600 text-white text-lg px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}