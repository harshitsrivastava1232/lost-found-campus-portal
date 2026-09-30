import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CATEGORIES = [
  "Electronics",
  "Documents",
  "Accessories",
  "Books",
  "Clothing",
  "ID Card",
  "Keys",
  "Bottles & Bags",
  "Other",
];

const initialForm = {
  title: "",
  description: "",
  category: "Other",
  status: "lost",
  location: "",
  date: new Date().toISOString().slice(0, 10),
  imageUrl: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
};

const PostItem = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const { data } = await api.post("/items", form);
      navigate(`/items/${data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Post an Item</h1>
      <p className="text-slate-500 text-sm mb-6">
        Fill in the details below to report a lost or found item on campus.
      </p>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            I have...
            <select name="status" value={form.status} onChange={handleChange} className={inputClasses}>
              <option value="lost">Lost an item</option>
              <option value="found">Found an item</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Category
            <select name="category" value={form.category} onChange={handleChange} className={inputClasses}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
          Item Title
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Black Wallet, Blue Water Bottle"
            value={form.title}
            onChange={handleChange}
            className={inputClasses}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
          Description
          <textarea
            name="description"
            required
            rows={3}
            placeholder="Add distinguishing details that help others identify the item"
            value={form.description}
            onChange={handleChange}
            className={inputClasses}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Location
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Library, Block C"
              value={form.location}
              onChange={handleChange}
              className={inputClasses}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Date
            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
              className={inputClasses}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
          Image URL (optional)
          <input
            type="url"
            name="imageUrl"
            placeholder="https://..."
            value={form.imageUrl}
            onChange={handleChange}
            className={inputClasses}
          />
        </label>

        <div className="border-t border-slate-100 pt-4 mt-2">
          <p className="text-sm font-semibold text-slate-700 mb-3">Contact Details</p>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
              Your Name
              <input
                type="text"
                name="contactName"
                required
                value={form.contactName}
                onChange={handleChange}
                className={inputClasses}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
              Phone (optional)
              <input
                type="tel"
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                className={inputClasses}
              />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600 mt-3">
            Email
            <input
              type="email"
              name="contactEmail"
              required
              value={form.contactEmail}
              onChange={handleChange}
              className={inputClasses}
            />
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {submitting ? "Posting..." : "Post Item"}
        </button>
      </form>
    </div>
  );
};

export default PostItem;
