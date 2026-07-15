import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { show, setShow } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: "", password: "", });
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const existingUsersJSON = localStorage.getItem("applitrack_users");
    const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

    const matchedUser = existingUsers.find(
      (u) =>
        u.email.toLowerCase() === formData.email.toLowerCase() &&
        u.password === formData.password
    );

    if (!matchedUser) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("role", matchedUser.role);
    localStorage.setItem("currentUser", JSON.stringify({ name: matchedUser.name, email: matchedUser.email }));

    console.log("User logged in successfully:", matchedUser);
    toast.success(`Welcome back, ${matchedUser.name}!`);

    if (matchedUser.role === "hr") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">
          AppliTrack SignIn
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Serwaa@gmail.com"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type={show.password ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="********"
            />

            <button
              type="button"
              onClick={() => setShow({ ...show, password: !show.password })}
              className="absolute right-3 top-9 text-gray-500"
            >
              {show.password ? "🙈" : "👁️"}
            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
