import { Search } from "lucide-react";

const CATEGORIES = [
  "all",
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

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by item, description, or location..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => handleChange("status", e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <option value="all">All Status</option>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "All Categories" : cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
