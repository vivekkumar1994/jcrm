"use client";

import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    aadhar: null as File | null,
    marksheets: [] as File[],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "marksheets") {
        setFormData((prev) => ({ ...prev, marksheets: Array.from(files) }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    
    if (formData.aadhar) {
      formDataToSend.append("aadhar", formData.aadhar);
    }

    formData.marksheets.forEach((file) => {
      formDataToSend.append("marksheets", file);
    });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          aadhar: null,
          marksheets: [],
        });
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4 max-w-md w-full"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4">Internship Registration</h2>

        {["name", "email", "phone", "address", "city", "state"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(formData as any)[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}

        <div>
          <label className="block mb-1">Aadhar Card</label>
          <input
            type="file"
            name="aadhar"
            accept=".pdf,image/*"
            onChange={handleFileChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Marksheets (Multiple)</label>
          <input
            type="file"
            name="marksheets"
            accept=".pdf,image/*"
            multiple
            onChange={handleFileChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded mt-4 text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && <p className="mt-2 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
