import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    photoType: "wedding",
    rating: 5,
    message: "",
    imageUrl: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/testimonials?isVisible=true`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch testimonials.");
        return res.json();
      })
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderRating = (rating) => {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return (
      <div className="text-yellow-500 text-xl font-bold">
        {fullStars}<span className="text-gray-300">{emptyStars}</span>
      </div>
    );
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "rating" ? parseInt(value) : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success("Thanks! Your review has been submitted for approval.");
        setFormData({
          name: "",
          photoType: "wedding",
          rating: 5,
          message: "",
          imageUrl: ""
        });
      } else {
        const error = await res.text();
        toast.error(error || "Submission failed.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <div className="w-full px-4 md:px-8 py-5 md:py-16 bg-white text-gray-800  mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 border-b pb-4">Client Testimonials</h1>
      <p className="text-center text-gray-800 text-xl mb-12">
        See what my amazing clients have to say about their experience.
      </p>

      {loading ? (
        <div className="flex justify-center py-10"><Loader /></div>
      ) : testimonials.length === 0 ? (
        <p className="text-center text-xl text-gray-500 py-10">No testimonials are publicly visible yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white border border-gray-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start"
            >
              {renderRating(t.rating)}
              <p className="text-xl text-gray-700 italic leading-relaxed mt-4 mb-6 relative">
                <span className="text-2xl font-serif mr-1 text-accent">“</span>{t.message}”
              </p>
              <div className="flex items-center mt-auto">
                {t.imageUrl ? (
  <img
    src={t.imageUrl}
    alt={t.name}
    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-accent/50"
  />
) : (
  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500 mr-4">
    {t.name ? t.name.charAt(0) : '?'}
  </div>
)}
                <div>
                  <p className="text-xl font-bold text-gray-900">{t.name}</p>
                  <p className="text-lg text-accent font-medium capitalize">{t.photoType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonial Submission Form */}
<div className="max-w-xl mx-auto bg-gray-50 px-3 md:px-8 py-8 rounded-xl shadow-lg">
  <h2 className="text-3xl font-bold mb-6 text-center">Share Your Experience</h2>
  <form onSubmit={handleSubmit} className="space-y-3 ">
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 rounded-lg px-6 py-4 text-lg"
    />
    <select
      name="photoType"
      value={formData.photoType}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-6 py-4 text-lg bg-white"
    >
      <option value="wedding">Wedding</option>
      <option value="portrait">Portrait</option>
      <option value="event">Event</option>
      <option value="travel">Travel</option>
      <option value="general">General</option>
    </select>
    <select
      name="rating"
      value={formData.rating}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-6 py-4 text-lg bg-white"
    >
      {[5, 4, 3, 2, 1].map((r) => (
        <option key={r} value={r}>{r} Star{r > 1 && "s"}</option>
      ))}
    </select>
    <textarea
      name="message"
      placeholder="Your experience..."
      value={formData.message}
      onChange={handleChange}
      required
      rows={6}
      className="w-full border border-gray-300 rounded-lg px-6 py-4 text-lg resize-none"
    />
    <input
      type="url"
      name="imageUrl"
      placeholder="Optional: Link to your photo (e.g. Instagram)"
      value={formData.imageUrl}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-6 py-4 text-lg"
    />
    <button
      type="submit"
      disabled={submitting}
      className="w-full bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-dark transition disabled:opacity-50"
    >
      {submitting ? "Submitting..." : "Submit Review"}
    </button>
  </form>
</div>

    </div>
  );
}