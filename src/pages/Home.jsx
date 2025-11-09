import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import PhotoCard from "../components/PhotoCard";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const [featuredPhotos, setFeaturedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/photos?isFeatured=true&isVisible=true`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch photos.");
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort(
          (a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999)
        );
        setFeaturedPhotos(sorted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Photo fetch error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-primary text-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[91vh] flex items-center justify-center overflow-hidden">
        <img
          src="/assets/home3.jpg"
          alt="Hero Photographer Showcase"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/*<div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>*/}
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-3 text-white drop-shadow-lg">
            Capturing Timeless Memories
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-100">
            Authentic, elegant, and timeless photography tailored for you.
          </p>
          <Link
            to="/portfolio"
            className="inline-block bg-accent text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold tracking-wide shadow-xl hover:bg-accent-dark transition transform hover:scale-[1.02]"
          >
            Explore My Portfolio
          </Link>
        </div>
      </section>

      {/* Featured Photos Section */}
      <section className="py-8 px-4 sm:px-6 md:px-8 bg-black text-white mx-auto">
        <h2 className="text-2xl sm:text-3xl font-serif text-center italic mb-10">
          Enjoy browsing the most recent additions to my photography collection.
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : featuredPhotos.length === 0 ? (
          <p className="text-center text-gray-500">
            No featured photos available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[10px]">
            {featuredPhotos.map((photo) => (
              <div
                key={photo._id}
                className="h-full"
                style={{
                  gridRowEnd: `span ${Math.floor(Math.random() * 20 + 10)}`,
                }}
              >
                <PhotoCard photo={photo} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}