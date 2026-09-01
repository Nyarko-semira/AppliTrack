import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { show, setShow } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUsersJSON = localStorage.getItem("applitrack_users");
    const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

    const userExists = existingUsers.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (userExists) {
      setError("Email is already registered. Please sign in.");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    existingUsers.push(newUser);
    localStorage.setItem("applitrack_users", JSON.stringify(existingUsers));

    console.log("User registered successfully:", newUser);
    toast.success("Account created successfully! Please sign in.");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">
          AppliTrack SignUp
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create your account
        </p>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Akosua Serwaa"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="serwa@gmail.com"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>

            <input
              type={show.password ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
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

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type={show.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="********"
            />

            <button
              type="button"
              onClick={() => setShow({ ...show, confirmPassword: !show.confirmPassword })}
              className="absolute right-3 top-9 text-gray-500"
            >
              {show.confirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
