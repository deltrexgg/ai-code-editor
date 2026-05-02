"use client";

import { useState } from "react";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    designation: "",
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

      // redirect after success
      if (type === "success") {
        router.push("/");
      }
    }, 2000);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api("/register", {
        method: "POST",
        body: form,
      });

      showToast("Registered successfully", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative">
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
        <h1 className="text-3xl font-bold">Create Account</h1>

        <div className="mt-6 space-y-4">
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <input
            placeholder="Designation"
            value={form.designation}
            onChange={(e) =>
              handleChange("designation", e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

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
            className="w-full p-3 rounded-xl bg-white text-slate-950 font-bold disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </main>
  );
}