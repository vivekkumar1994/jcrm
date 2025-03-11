"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (res.ok) router.push("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input type="text" placeholder="Name" className="w-full border p-2 mb-2"
          onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <input type="email" placeholder="Email" className="w-full border p-2 mb-2"
          onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full border p-2 mb-2"
          onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
