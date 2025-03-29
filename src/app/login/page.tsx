"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Next.js Image component
import logoinimage from "@/app/images/login.jpg"; // Adjust the path as needed

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Redirect based on user type
      router.push(data.redirectPath);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-5">
      <div className="bg-white shadow-2xl rounded-xl p-0 w-[800px] transform transition duration-500 hover:scale-105 flex">
        {/* Left Image */}
        <div className="w-1/2">
          <Image
            src={logoinimage}  // Use the imported image path
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-l-xl"
            layout="responsive"  // Responsive image handling
            priority  // Ensures the image loads quickly
          />
        </div>

        {/* Right Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 font-medium">E-mail</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E-mail"
                name="email"
                id="email"
                autoComplete="off"
                required
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="slottc"
                  name="slottc"
                  className="form-check-input h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  required
                />
                <label htmlFor="slottc" className="text-gray-700">
                  I accept{" "}
                  <a
                    href="https://yogsathi.com/Home_login/term_condition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline"
                  >
                    Terms & Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 mt-4 text-white font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Submit Now"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
