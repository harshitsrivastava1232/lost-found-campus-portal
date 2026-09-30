import { Link, NavLink } from "react-router-dom";
import { Search, PlusCircle, MapPin } from "lucide-react";

const Navbar = () => {
  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-brand-50 text-brand-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-brand-700">
          <MapPin size={22} />
          Campus Lost &amp; Found
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClasses}>
            <span className="flex items-center gap-1">
              <Search size={16} /> Browse
            </span>
          </NavLink>
          <NavLink to="/post" className={linkClasses}>
            <span className="flex items-center gap-1">
              <PlusCircle size={16} /> Post Item
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
