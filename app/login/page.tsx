"use client";

import { useState } from "react";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";
import { setUserSession } from "../lib/session";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);

      if (type === "success") {
        router.push("/dashboard");
      }
    }, 1500);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await api("/login", {
        method: "POST",
        body: form,
      });

      // ✅ store full user object
      setUserSession(res.data);

      showToast("Login successful", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Invalid credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative">
      
      {/* 🔔 Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg border 
          ${
            toast.type === "success"
              ? "bg-green-500/90 border-green-300"
              : "bg-red-500/90 border-red-300"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>

        <div className="mt-6 space-y-4">
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full p-3 rounded-xl bg-cyan-400 text-slate-950 font-bold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </main>
  );
}