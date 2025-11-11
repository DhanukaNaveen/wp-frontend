import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function ManageTestimonials() {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTestimonials() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/testimonials/admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load testimonials.");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      toast.error(error.message || "Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, [token]);

  async function toggleVisibility(id, current) {
    if (!token) return toast.error("Authentication required.");
    try {
      const res = await fetch(`${BASE_URL}/api/testimonials/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isVisible: !current }),
      });
      if (!res.ok) throw new Error("Update failed.");
      toast.success(`Testimonial is now ${!current ? "Visible" : "Hidden"}.`);
      fetchTestimonials();
    } catch (error) {
      toast.error(error.message || "Failed to update visibility.");
    }
  }

  async function deleteTestimonial(id) {
    if (!token) return toast.error("Authentication required.");
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Deletion failed.");
      toast.success("Testimonial deleted.");
      fetchTestimonials();
    } catch (error) {
      toast.error(error.message || "Failed to delete testimonial.");
    }
  }

  const renderRating = (rating) => {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return (
      <div className="text-yellow-500">
        {fullStars}
        <span className="text-gray-300">{emptyStars}</span>
      </div>
    );
  };

  return (
    <div className="w-full ">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">⭐ Manage Testimonials</h2>
      {loading ? (
        <p className="text-center py-10">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-center py-10 text-xl text-gray-500">
          No testimonials available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className={`border rounded-xl p-5 shadow-md ${
                t.isVisible ? "bg-white border-green-200" : "bg-yellow-50 border-yellow-300"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  {t.imageUrl ? (
                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                  ) : null}
                  <div>
                    <h3 className="text-lg font-bold">{t.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{t.photoType}</p>
                  </div>
                </div>
              </div>
              {renderRating(t.rating)}
              <p className="text-gray-700 italic mt-3 mb-4 line-clamp-4">“{t.message}”</p>
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleVisibility(t._id, t.isVisible)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
                    t.isVisible
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {t.isVisible ? "Hide Publicly" : "Approve & Show"}
                </button>
                <button
                  onClick={() => deleteTestimonial(t._id)}
                  className="px-4 py-1.5 rounded-lg text-sm bg-gray-300 text-gray-800 hover:bg-red-400 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}