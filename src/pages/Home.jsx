import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import FilterBar from "../components/items/FilterBar";
import ItemCard from "../components/items/ItemCard";
import { PackageSearch } from "lucide-react";

const Home = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    category: "all",
  });

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.status !== "all") params.status = filters.status;
      if (filters.category !== "all") params.category = filters.category;

      const { data } = await api.get("/items", { params });
      setItems(data.data);
      setError("");
    } catch (err) {
      setError("Could not load items. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/items/stats/summary");
      setStats(data.data);
    } catch (err) {
      // Stats are non-critical, fail silently
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchItems, 300); // debounce search typing
    return () => clearTimeout(timeout);
  }, [fetchItems]);

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Find what's lost. Return what's found.
        </h1>
        <p className="text-slate-500 mt-1">
          A shared board for the campus community to report and recover lost items.
        </p>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.lost}</p>
            <p className="text-xs text-slate-500 mt-1">Active Lost</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{stats.found}</p>
            <p className="text-xs text-slate-500 mt-1">Active Found</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-brand-600">{stats.resolved}</p>
            <p className="text-xs text-slate-500 mt-1">Resolved</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading items...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <PackageSearch size={40} className="mb-3" />
          <p className="text-sm">No items match your filters yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
