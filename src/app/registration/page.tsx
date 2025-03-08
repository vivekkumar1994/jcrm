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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log the form data to the console or handle it as needed
    console.log("Form data submitted:", formData);

    // You can reset the form data after submission
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

    alert("Registration successful!");
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
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
