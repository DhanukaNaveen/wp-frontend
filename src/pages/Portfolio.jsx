import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import PhotoCard from "../components/PhotoCard";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const CATEGORIES = ["all", "wedding", "portrait", "event", "travel", "commercial"];

export default function Portfolio() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);

      let url = `${BASE_URL}/api/photos?isVisible=true`;
      if (category !== "all") {
        url += `&category=${category}`;
      }

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load portfolio.");

        const data = await res.json();
        const sorted = data.sort(
          (a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999)
        );
        setPhotos(sorted);
      } catch (error) {
        console.error("Portfolio fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [category]);

  return (
    <div className="w-full px-4 md:px-8 py-5 md:py-16 bg-white text-gray-800  mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 border-b pb-4">My Portfolio</h1>

      {/* Category Filter */}
      <div className="flex justify-center mb-12 gap-3 md:gap-4 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 text-sm md:text-base rounded-full border-2 transition-all duration-300 capitalize ${
              category === cat
                ? "bg-accent text-white border-accent shadow-md"
                : "border-gray-300 text-gray-700 hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery */}
      {loading ? (
        <div className="flex justify-center py-10"><Loader /></div>
      ) : photos.length === 0 ? (
        <p className="text-center text-xl text-gray-500 py-10">No photos found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-10">
          {photos.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
}