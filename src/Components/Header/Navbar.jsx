import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 tracking-wide flex items-center gap-1"
        >
          🛤️ <span>AppliTrack</span>
        </Link>

        <div className="flex gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-sm text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition"
                : "text-sm text-gray-600 hover:text-blue-600 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive
                ? "text-sm text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition"
                : "text-sm text-gray-600 hover:text-blue-600 transition"
            }
          >
            Add Application
          </NavLink>
          <NavLink
            to="/all-jobs"
            className={({ isActive }) =>
              isActive
                ? "text-sm text-blue-600 font-semibold"
                : "text-sm text-gray-600 hover:text-blue-500"
            }
          >
            All Jobs
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
