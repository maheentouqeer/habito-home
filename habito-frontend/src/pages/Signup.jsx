import { useState } from "react";
import { signup } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-aqualight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30"
      >
        <h1 className="text-3xl font-bold text-aquadark text-center mb-6">
          Create an Account
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-aquadark" />
            <input
              type="text"
              placeholder="Name"
              className="w-full pl-10 p-3 rounded-xl border focus:ring-2 focus:ring-aqua"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-aquadark" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 rounded-xl border focus:ring-2 focus:ring-aqua"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-aquadark" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 rounded-xl border focus:ring-2 focus:ring-aqua"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="w-full bg-aquadark hover:bg-aquablue text-white p-3 rounded-xl text-lg transition">
            Signup
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-aquadark font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
