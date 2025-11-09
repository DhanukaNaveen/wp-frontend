import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function ManagePhotos() {
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPhotos() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/photos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load photos.");
      const data = await res.json();
      const sortedData = data.sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
      setPhotos(sortedData);
    } catch (error) {
      toast.error(error.message || "Failed to load photos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, [token]);

  async function deletePhoto(id) {
    if (!token) return toast.error("Authentication required.");
    if (!confirm("Are you sure you want to delete this photo permanently?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/photos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Deletion failed.");
      toast.success("Photo deleted successfully.");
      fetchPhotos();
    } catch (error) {
      toast.error(error.message || "Failed to delete photo.");
    }
  }

  const StatusBadge = ({ isVisible, isFeatured }) => (
    <div className="flex gap-2 text-xs font-semibold">
      <span className={`px-2 py-0.5 rounded-full ${isVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {isVisible ? 'Visible' : 'Hidden'}
      </span>
      {isFeatured && (
        <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
          Featured
        </span>
      )}
    </div>
  );

  return (
    <div className="w-full py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">📸 Manage Gallery</h2>
      {loading ? (
        <p className="text-center py-10">Loading photos...</p>
      ) : photos.length === 0 ? (
        <p className="text-center py-10 text-xl text-gray-500">
          No photos uploaded yet. <Link to="/admin/upload" className="text-accent underline">Upload one now</Link>.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div key={photo._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="relative h-48">
                <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold truncate">{photo.title}</h3>
                <p className="text-sm text-accent font-medium capitalize mb-2">
                  Order: {photo.displayOrder} | {photo.category}
                </p>
                <StatusBadge isVisible={photo.isVisible} isFeatured={photo.isFeatured} />
                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/admin/edit-photo/${photo._id}`}
                    className="flex-1 text-center px-3 py-1 rounded-lg text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePhoto(photo._id)}
                    className="flex-1 px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}