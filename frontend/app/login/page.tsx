"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "../services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [view, setView] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("STUDENT");

  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const data = await loginUser({ email, password });

      console.log("Login response:", data);

      if (!data?.user) {
        throw new Error("User data not found");
      }

      localStorage.setItem("token", data.token || "");
      localStorage.setItem("user", JSON.stringify(data.user));

      const userRole = data?.user?.role;

      if (userRole === "ADMIN") router.push("/admin");
      else if (userRole === "TEACHER") router.push("/teacher");
      else if (userRole === "STUDENT") router.push("/student");
      else if (userRole === "PARENT") router.push("/parent");
      else alert("Invalid role");
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err.message || "Login failed");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupName || !signupEmail || !signupPassword || !signupRole) {
      alert("Fill all signup fields");
      return;
    }

    try {
      const data = await signupUser({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        role: signupRole,
      });

      alert(data.message || "Signup successful");

      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupRole("STUDENT");
      setView("login");
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err.message || "Signup failed");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotEmail) {
      alert("Enter your email");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      alert(data.message || "Password reset request sent");
      setForgotEmail("");
      setView("login");
    } catch (err: any) {
      console.error("Forgot password error:", err);
      alert(err.message || "Forgot password failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-bold text-center text-cyan-300 mb-2">
          SMS {view === "login" ? "Login" : view === "signup" ? "Signup" : "Forgot Password"}
        </h1>

        <p className="text-center text-slate-300 mb-6">
          School Management System
        </p>

        {view === "login" && (
          <form className="space-y-5" onSubmit={handleLogin}>
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

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 rounded-xl transition"
            >
              Login
            </button>

            <div className="flex justify-between text-sm">
              <button
                type="button"
                onClick={() => setView("signup")}
                className="text-cyan-300 hover:underline"
              >
                Create account
              </button>

              <button
                type="button"
                onClick={() => setView("forgot")}
                className="text-cyan-300 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </form>
        )}

        {view === "signup" && (
          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-300">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-300">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-300">Role</label>
              <select
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="TEACHER" className="text-black">Teacher</option>
                <option value="STUDENT" className="text-black">Student</option>
                <option value="PARENT" className="text-black">Parent</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 rounded-xl transition"
            >
              Signup
            </button>

            <button
              type="button"
              onClick={() => setView("login")}
              className="w-full text-cyan-300 hover:underline"
            >
              Back to Login
            </button>
          </form>
        )}

        {view === "forgot" && (
          <form className="space-y-5" onSubmit={handleForgotPassword}>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 rounded-xl transition"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() => setView("login")}
              className="w-full text-cyan-300 hover:underline"
            >
              Back to Login
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 School System
        </p>
      </div>
    </div>
  );
}