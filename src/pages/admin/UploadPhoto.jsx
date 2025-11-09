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
    // Increased max-width from 2xl to 4xl and py from 10 to 16
    <div className="w-full max-w-4xl mx-auto  px-6">
      {/* Increased heading text size from 3xl to 4xl and mb from 8 to 12 */}
      <h2 className="text-4xl font-extrabold mb-5 text-gray-900 border-b-2 border-accent pb-4">
        🖼️ Upload New Photo
      </h2>
      {/* Increased gap from 6 to 8 and padding from 6 to 10 */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7 bg-white p-10 rounded-xl shadow-2xl border border-gray-100"
      >
        <div className="md:col-span-2">
          {/* Increased label text size from sm to base (md:text-lg) and mb from 1 to 2 */}
          <label className="text-lg font-semibold text-gray-800 block mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            // Increased padding, border, and text size
            className="w-full border-2 border-gray-300 rounded-lg px-6 py-4 text-lg focus:border-accent focus:ring-accent transition duration-200"
          />
        </div>
        <div className="md:col-span-2">
          {/* Increased label text size from sm to base (md:text-lg) and mb from 1 to 2 */}
          <label className="text-lg font-semibold text-gray-800 block mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            // Increased rows from 3 to 5
            rows={5}
            // Increased padding, border, and text size
            className="w-full border-2 border-gray-300 rounded-lg px-6 py-4 text-lg resize-none focus:border-accent focus:ring-accent transition duration-200"
          />
        </div>
        <div>
          {/* Increased label text size from sm to base (md:text-lg) and mb from 1 to 2 */}
          <label className="text-lg font-semibold text-gray-800 block mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            // Increased padding, border, and text size
            className="w-full border-2 border-gray-300 rounded-lg px-6 py-4 text-lg bg-white appearance-none focus:border-accent focus:ring-accent transition duration-200"
          >
            <option value="wedding">Wedding</option>
            <option value="portrait">Portrait</option>
            <option value="event">Event</option>
            <option value="travel">Travel</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          {/* Increased label text size from sm to base (md:text-lg) and mb from 1 to 2 */}
          <label className="text-lg font-semibold text-gray-800 block mb-2">
            Display Order
          </label>
          <input
            type="number"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            min="0"
            // Increased padding, border, and text size
            className="w-full border-2 border-gray-300 rounded-lg px-6 py-4 text-lg focus:border-accent focus:ring-accent transition duration-200"
          />
        </div>
        <div className="md:col-span-2">
          {/* Increased label text size from sm to base (md:text-lg) and mb from 1 to 2 */}
          <label className="text-lg font-semibold text-gray-800 block mb-2">
            Select Image
          </label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            required
            // Increased padding, border, and text size - removed px-4 py-2 because file input styling is tricky and browser-dependent, but added text-lg
            className="w-full border-2 border-gray-300 rounded-lg p-4 text-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-accent hover:file:bg-gray-200"
          />
        </div>
        {/* Increased gap from 4 to 8 and text size from base to lg */}
        <div className="flex items-center gap-8 md:col-span-2 text-lg">
          <label className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              // Increased checkbox size
              className="form-checkbox h-6 w-6 text-accent rounded-md border-gray-400 focus:ring-accent"
            />
            Featured Photo
          </label>
          <label className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
              // Increased checkbox size
              className="form-checkbox h-6 w-6 text-accent rounded-md border-gray-400 focus:ring-accent"
            />
            Visible to Public
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          // Increased padding, text size, and added hover effect on text
          className="md:col-span-2 bg-accent text-white px-8 py-4 rounded-xl text-xl font-bold tracking-wide hover:bg-accent-dark transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              {/* Increased spinner size */}
              <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
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