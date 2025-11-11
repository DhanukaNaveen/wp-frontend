import { useState } from "react";
import toast from "react-hot-toast";
import uploadFile from "../../utils/mediaUpload";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function UploadPhoto() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "wedding",
    displayOrder: 1,
    isFeatured: false,
    isVisible: true,
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, imageFile: files[0] });
    } else if (name === "displayOrder" && type === "number") {
      setFormData({ ...formData, [name]: Math.max(0, parseInt(value) || 0) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      toast.error("Authentication required.");
      setLoading(false);
      return;
    }

    if (!formData.imageFile) {
      toast.error("Please select an image file.");
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadFile(formData.imageFile);
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        isFeatured: formData.isFeatured,
        isVisible: formData.isVisible,
        displayOrder: formData.displayOrder,
        imageUrl,
      };

      const res = await fetch(`${BASE_URL}/api/photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Photo uploaded successfully!");
        setFormData({
          title: "",
          description: "",
          category: "wedding",
          displayOrder: 1,
          isFeatured: false,
          isVisible: true,
          imageFile: null,
        });
      } else {
        toast.error(`Upload failed: ${result.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed due to network or server error.");
    }

    setLoading(false);
  }

  return (
  <div className="w-full max-w-2xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-accent pb-2">
      🖼️ Upload New Photo
    </h2>
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
    >
      <div className="md:col-span-2">
        <label className="text-base font-medium text-gray-800 mb-1 block">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:border-accent focus:ring-accent"
        />
      </div>

      <div className="md:col-span-2">
        <label className="text-base font-medium text-gray-800 mb-1 block">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-base resize-none focus:border-accent focus:ring-accent"
        />
      </div>

      <div>
        <label className="text-base font-medium text-gray-800 mb-1 block">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-white focus:border-accent focus:ring-accent"
        >
          <option value="wedding">Wedding</option>
          <option value="portrait">Portrait</option>
          <option value="event">Event</option>
          <option value="travel">Travel</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      <div>
        <label className="text-base font-medium text-gray-800 mb-1 block">Display Order</label>
        <input
          type="number"
          name="displayOrder"
          value={formData.displayOrder}
          onChange={handleChange}
          min="0"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:border-accent focus:ring-accent"
        />
      </div>

      <div className="md:col-span-2">
        <label className="text-base font-medium text-gray-800 mb-1 block">Select Image</label>
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 text-base bg-white file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-accent hover:file:bg-gray-200"
        />
      </div>

      <div className="flex items-center gap-4 md:col-span-2 text-base">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-accent border-gray-400"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <input
            type="checkbox"
            name="isVisible"
            checked={formData.isVisible}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-accent border-gray-400"
          />
          Visible
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 bg-accent text-white px-6 py-3 rounded-md text-base font-semibold hover:bg-accent-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Uploading...
          </>
        ) : (
          "Upload Photo"
        )}
      </button>
    </form>
  </div>
);
}