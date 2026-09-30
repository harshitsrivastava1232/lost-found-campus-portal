import { Link } from "react-router-dom";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";

const statusStyles = {
  lost: "bg-red-100 text-red-700",
  found: "bg-emerald-100 text-emerald-700",
};

const ItemCard = ({ item }) => {
  const formattedDate = new Date(item.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      to={`/items/${item._id}`}
      className="group block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-brand-200 transition-all"
    >
      <div className="h-40 bg-slate-100 overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            No image provided
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${
              statusStyles[item.status]
            }`}
          >
            {item.status}
          </span>
          {item.isResolved && (
            <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
              <CheckCircle2 size={14} className="text-brand-500" />
              Resolved
            </span>
          )}
        </div>

        <h3 className="font-semibold text-slate-800 truncate">{item.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mt-1">{item.description}</p>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin size={13} /> {item.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} /> {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
