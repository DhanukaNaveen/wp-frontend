import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function EditPhoto() {
  const { token } = useAuth();
  const { photoId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchPhoto() {
      try {
        const res = await fetch(`${BASE_URL}/api/photos/${photoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load photo.");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchPhoto();
  }, [token, photoId]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "displayOrder" ? parseInt(value) || 0 : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/api/photos/${photoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Update failed.");
      toast.success("Photo updated successfully.");
      navigate("/admin/photos");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !formData) {
    return <p className="text-center py-10">Loading photo details...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">✏️ Edit Photo</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-lg">
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
          >
            <option value="wedding">Wedding</option>
            <option value="portrait">Portrait</option>
            <option value="event">Event</option>
            <option value="travel">Travel</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Display Order</label>
          <input
            type="number"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            min="0"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex items-center gap-4 md:col-span-2">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-accent rounded"
            />
            Featured Photo
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-accent rounded"
            />
            Visible to Public
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="md:col-span-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
}