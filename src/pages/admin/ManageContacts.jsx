import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export default function ManageContacts() {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchContacts() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load contact inquiries.");
      const data = await res.json();
      setContacts(data.reverse());
    } catch (error) {
      toast.error(error.message || "Failed to load contact inquiries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, [token]);

  async function deleteContact(id) {
    if (!token) return toast.error("Authentication required.");
    if (!confirm("Delete this inquiry permanently?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Deletion failed.");
      toast.success("Inquiry deleted.");
      fetchContacts();
    } catch (error) {
      toast.error(error.message || "Failed to delete inquiry.");
    }
  }

  return (
    <div className="w-full py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">📬 Contact Inquiries</h2>
      {loading ? (
        <p className="text-center py-10">Loading inquiries...</p>
      ) : contacts.length === 0 ? (
        <p className="text-center py-10 text-xl text-gray-500">No inquiries received yet.</p>
      ) : (
        <div className="space-y-6">
          {contacts.map((c) => (
            <div key={c._id} className="border border-gray-200 rounded-xl p-6 shadow-lg bg-white">
              <div className="flex justify-between items-start mb-3 border-b pb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
                  <p className="text-sm text-accent font-medium">
                    {c.email} {c.phone && `| ${c.phone}`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gray-200 capitalize">
                    {c.shootType}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4 border-l-4 border-gray-100 pl-4">"{c.message}"</p>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="space-y-1">
                  <p><span className="font-semibold">Date:</span> {formatDate(c.preferredDate)}</p>
                  <p><span className="font-semibold">Budget:</span> {c.budget || "Not specified"}</p>
                </div>
                <button
                  onClick={() => deleteContact(c._id)}
                  className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                  Delete Inquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}