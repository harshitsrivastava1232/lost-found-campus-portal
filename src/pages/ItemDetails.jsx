import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { MapPin, Calendar, Mail, Phone, User, ArrowLeft, CheckCircle2, Trash2 } from "lucide-react";

const statusStyles = {
  lost: "bg-red-100 text-red-700",
  found: "bg-emerald-100 text-emerald-700",
};

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/items/${id}`);
      setItem(data.data);
    } catch (err) {
      setError("Item not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleResolved = async () => {
    try {
      setUpdating(true);
      const { data } = await api.put(`/items/${id}`, { isResolved: !item.isResolved });
      setItem(data.data);
    } catch (err) {
      alert("Could not update item status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post permanently?")) return;
    try {
      await api.delete(`/items/${id}`);
      navigate("/");
    } catch (err) {
      alert("Could not delete item.");
    }
  };

  if (loading) return <p className="text-center text-slate-500 py-16">Loading...</p>;
  if (error || !item)
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-3">{error}</p>
        <Link to="/" className="text-brand-600 text-sm font-medium">
          Back to listings
        </Link>
      </div>
    );

  const formattedDate = new Date(item.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-4">
        <ArrowLeft size={16} /> Back to listings
      </Link>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="h-64 bg-slate-100">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
              No image provided
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                statusStyles[item.status]
              }`}
            >
              {item.status}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {item.category}
            </span>
            {item.isResolved && (
              <span className="flex items-center gap-1 text-xs font-medium text-brand-600">
                <CheckCircle2 size={14} /> Resolved
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-slate-800">{item.title}</h1>
          <p className="text-slate-600 mt-2">{item.description}</p>

          <div className="grid grid-cols-2 gap-3 mt-5 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-slate-400" /> {item.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={15} className="text-slate-400" /> {formattedDate}
            </span>
          </div>

          <div className="border-t border-slate-100 mt-5 pt-5">
            <p className="text-sm font-semibold text-slate-700 mb-2">Contact Information</p>
            <div className="space-y-1.5 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <User size={15} className="text-slate-400" /> {item.contactName}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-slate-400" />
                <a href={`mailto:${item.contactEmail}`} className="text-brand-600 hover:underline">
                  {item.contactEmail}
                </a>
              </p>
              {item.contactPhone && (
                <p className="flex items-center gap-2">
                  <Phone size={15} className="text-slate-400" /> {item.contactPhone}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={toggleResolved}
              disabled={updating}
              className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              {item.isResolved ? "Mark as Unresolved" : "Mark as Resolved"}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
