"use client";

import { useState } from "react";
import { adminSignup } from "@/actions/admin";

export default function AdminSignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminSignup(form);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Admin Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        placeholder="Name"
        className="border p-2 w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        className="border p-2 w-full"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-full"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2">Sign Up</button>
    </form>
  );
}
