// src/admin/UploadPhoto.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import uploadFile from "../utils/mediaUpload2";

export default function UploadPhoto() {
  const [formData, setFormData] = useState({
    title: "",
    category: "wedding",
    isFeatured: false,
    isVisible: true,
    imageFile: null
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadFile(formData.imageFile);
      const payload = {
        title: formData.title,
        category: formData.category,
        isFeatured: formData.isFeatured,
        isVisible: formData.isVisible,
        imageUrl
      };

      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success("Photo uploaded successfully!");
        setFormData({
          title: "",
          category: "wedding",
          isFeatured: false,
          isVisible: true,
          imageFile: null
        });
      } else {
        toast.error("Failed to save photo metadata.");
      }
    } catch (err) {
      toast.error("Upload failed.");
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">Upload New Photo</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <input
          type="text"
          name="title"
          placeholder="Photo Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-4 py-2"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="wedding">Wedding</option>
          <option value="portrait">Portrait</option>
          <option value="event">Event</option>
          <option value="travel">Travel</option>
        </select>
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-4 py-2"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          Featured Photo
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVisible"
            checked={formData.isVisible}
            onChange={handleChange}
          />
          Visible to Public
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent-dark transition"
        >
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
      </form>
    </div>
  );
}