"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  qualification: string;
  university: string;
  graduationYear: string;
  skills: string;
  experience: string;
  availability: string;
  preferredLocation: string;
  linkedinProfile: string;
  githubProfile: string;
  resume: File | null;
  portfolio: File | null;
  certificates: File[];
  gender: string;
  courseType: string;
  additionalInfo: string;
  references: string;
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    qualification: "",
    university: "",
    graduationYear: "",
    skills: "",
    experience: "",
    availability: "",
    preferredLocation: "",
    linkedinProfile: "",
    githubProfile: "",
    resume: null,
    portfolio: null,
    certificates: [],
    gender: "",
    courseType: "",
    additionalInfo: "",
    references: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, files } = e.target;
  //   if (files && files.length > 0) {
  //     if (name === "certificates") {
  //       setFormData((prev) => ({ ...prev, certificates: Array.from(files) }));
  //     } else if (name === "resume" || name === "portfolio") {
  //       setFormData((prev) => ({ ...prev, [name]: files[0] }));
  //     }
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataToSubmit.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((file, index) => {
          formDataToSubmit.append(`${key}[${index}]`, file);
        });
      } else {
        formDataToSubmit.append(key, value as string);
      }
    });

    fetch("/api/register", {
      method: "POST",
      body: formDataToSubmit,
    })
      .then((response) => response.json())
      .then(() => {
        alert("Registration successful!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          qualification: "",
          university: "",
          graduationYear: "",
          skills: "",
          experience: "",
          availability: "",
          preferredLocation: "",
          linkedinProfile: "",
          githubProfile: "",
          resume: null,
          portfolio: null,
          certificates: [],
          gender: "",
          courseType: "",
          additionalInfo: "",
          references: ""
        });
      })
      .catch(() => {
        alert("Failed to submit the form. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-200">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl space-y-6 max-w-4xl w-full"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Internship Registration Form</h2>
        <div className="grid grid-cols-2 gap-6">
          {Object.keys(formData).map((field) => (
            <motion.input
              key={field}
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'graduationYear' ? 'number' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg mt-6 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
};

export default RegisterForm;
