import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const currentUserJSON = localStorage.getItem("currentUser");
  const currentUser = currentUserJSON ? JSON.parse(currentUserJSON) : null;
  const username = currentUser ? currentUser.name : "User";
  const userInitial = username.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");
    setMenuOpen(false);
    navigate("/signin");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans">
      <div className=" mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        {role === "user" && (
  <Link
    to="/home"
    className="text-xl font-display font-extrabold text-indigo-600 tracking-tight flex items-center gap-1.5 hover:opacity-90 transition-opacity"
  >
    🛤️ <span>AppliTrack</span>
  </Link>
)}

{role === "HR" && (
  <Link
    to="/dashboard"
    className="text-xl font-display font-extrabold text-indigo-600 tracking-tight flex items-center gap-1.5 hover:opacity-90 transition-opacity"
  >
    🛤️ <span>AppliTrack</span>
  </Link>
)}



        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-gray-500 hover:text-indigo-600 focus:outline-none p-1"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-8 items-center">

          {/* USER LINKS */}
          {role === "user" && (
            <>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${isActive ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/all-jobs"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${isActive ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
                  }`
                }
              >
                Jobs
              </NavLink>


            </>
          )}

          {/* HR LINKS */}
          {role === "hr" && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${isActive ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/addHr"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${isActive ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
                  }`
                }
              >
                Post Job
              </NavLink>

              <NavLink
                to="/addjobs"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${isActive ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
                  }`
                }
              >
                All Jobs
              </NavLink>
            </>
          )}

          {/* User info & Sign Out */}
          {role && (
            <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center border border-indigo-100">
                  {userInitial}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-semibold text-gray-700 leading-tight">{username}</p>
                  <p className="text-[10px] text-gray-400 capitalize">{role === "hr" ? "HR Recruiter" : "Job Seeker"}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 font-semibold text-xs px-3.5 py-2 rounded-xl transition duration-200"
                title="Sign Out"
              >
                <LogOut size={12} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 py-3 shadow-inner">
          <div className="flex flex-col px-4 space-y-3">

            <NavLink
              to="/home"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block text-base font-semibold py-1.5 transition-colors ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
                }`
              }
            >
              Home
            </NavLink>

            {/* USER MOBILE */}
            {role === "user" && (
              <NavLink
                to="/all-jobs"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-base font-semibold py-1.5 transition-colors ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
                  }`
                }
              >
                Jobs
              </NavLink>
            )}

            {/* HR MOBILE */}
            {role === "hr" && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-semibold py-1.5 transition-colors ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
                    }`
                  }
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/addHr"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-semibold py-1.5 transition-colors ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
                    }`
                  }
                >
                  Post Job
                </NavLink>

                <NavLink
                  to="/addjobs"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-semibold py-1.5 transition-colors ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
                    }`
                  }
                >
                  All Jobs
                </NavLink>
              </>
            )}

            {/* User details and Logout (Mobile) */}
            {role && (
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-base flex items-center justify-center border border-indigo-100">
                    {userInitial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{username}</p>
                    <p className="text-xs text-gray-400 capitalize">{role === "hr" ? "HR Recruiter" : "Job Seeker"}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full inline-flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 font-bold py-3 rounded-xl transition duration-200"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

