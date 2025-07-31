import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-1 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-blue-600">
          🛤️AppliTrack
        </Link>

        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " text-sm text-blue-600 font-semibold"
                : " text-sm text-gray-600 hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive
                ? " text-sm text-blue-600 font-semibold"
                : " text-sm text-gray-600 hover:text-blue-500"
            }
          >
            Add Application
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
