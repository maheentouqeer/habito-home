import { useState } from "react";
import { login } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-aqualight">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30"
      >
        <h1 className="text-3xl font-bold text-aquadark text-center mb-6">
          Login
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          No account?{" "}
          <Link to="/signup" className="text-aquadark font-semibold">
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
