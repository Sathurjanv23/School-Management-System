"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid token");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Reset failed");
      }

      alert(data.message || "Password reset successful");
      router.push("/");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white/10 p-8 rounded-3xl text-white">
        <h1 className="text-3xl font-bold text-center text-cyan-300 mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/10"
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 text-slate-900 font-semibold py-3 rounded-xl"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}