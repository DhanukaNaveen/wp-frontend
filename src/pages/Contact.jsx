import { useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    shootType: "wedding",
    preferredDate: "",
    budget: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success("Message sent successfully! I'll be in touch shortly.");
        setFormData({
          name: "",
          email: "",
          message: "",
          shootType: "wedding",
          preferredDate: "",
          budget: "",
          phone: ""
        });
      } else {
        const text = await res.text();
        console.error("Server response:", text);
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Something went wrong. Check your network connection.");
    }
    setLoading(false);
  }

  return (
    <div className="w-full px-4 md:px-8 py-5 md:py-16 bg-white text-gray-800 mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 border-b pb-4">Let's Connect</h1>
      <p className="text-center text-gray-800 text-xl mb-12 max-w-2xl mx-auto">
        Planning a project? Tell me about your needs and vision. I usually respond within 24 hours.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 px-4 md:px-8 py-8 rounded-xl shadow-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <select
          name="shootType"
          value={formData.shootType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-accent focus:ring-1 focus:ring-accent bg-white"
        >
          <option value="" disabled>Select Shoot Type</option>
          <option value="wedding">Wedding / Elopement</option>
          <option value="portrait">Personal / Corporate Portrait</option>
          <option value="event">Event / Commercial</option>
          <option value="travel">Travel / Editorial</option>
          <option value="general">General Inquiry</option>
        </select>
        <input
          type="date"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          className="w-full max-w-full min-w-0 appearance-none border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-accent focus:ring-1 focus:ring-accent bg-white"
        />
        <input
          type="text"
          name="budget"
          placeholder="Estimated Budget (optional)"
          value={formData.budget}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <textarea
          name="message"
          placeholder="Tell me about your project, location, and specific needs."
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="md:col-span-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-base resize-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-accent-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </>
          ) : (
            "Send Inquiry"
          )}
        </button>
      </form>
    </div>
  );
}