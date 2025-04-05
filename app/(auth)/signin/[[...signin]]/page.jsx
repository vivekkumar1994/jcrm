"use client";

import { useState } from "react";
import { adminSignin } from "@/actions/admin";

export default function AdminSigninPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminSignin(form);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Admin Sign In</h2>
      {error && <p className="text-red-500">{error}</p>}
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
      <button className="bg-green-600 text-white px-4 py-2">Sign In</button>
    </form>
  );
}
