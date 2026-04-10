"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const data = await loginUser({ email, password, role });

      if (!data.user || !data.token) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const user = data.user;

      if (user.role === "ADMIN") router.push("/admin");
      else if (user.role === "TEACHER") router.push("/teacher");
      else if (user.role === "STUDENT") router.push("/student");
      else if (user.role === "PARENT") router.push("/parent");
      else alert("Unknown role");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 text-white">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-cyan-300 mb-2">
          SMS Login
        </h1>
        <p className="text-center text-slate-300 mb-6">
          School Management System
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          
          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="ADMIN" className="text-black">Admin</option>
              <option value="TEACHER" className="text-black">Teacher</option>
              <option value="STUDENT" className="text-black">Student</option>
              <option value="PARENT" className="text-black">Parent</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 rounded-xl transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 School System
        </p>
      </div>
    </div>
  );
}