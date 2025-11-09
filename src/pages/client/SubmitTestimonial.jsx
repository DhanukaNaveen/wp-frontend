import { useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function SubmitTestimonial() {
  const [formData, setFormData] = useState({
    name: "",
    photoType: "wedding",
    rating: 5,
    message: "",
    imageUrl: ""
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "rating" ? parseInt(value) : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success("Thank you! Your review has been submitted for approval.");
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
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Leave a Review</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-lg">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />
        <select
          name="photoType"
          value={formData.photoType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
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
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
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
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Optional: Link to your photo (e.g. Instagram)"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}