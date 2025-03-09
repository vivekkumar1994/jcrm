"use client";

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    // Here, we'll just log the form data instead of making an API call
    console.log("Form Data Submitted:", formData);

    // Simulate a success message
    setTimeout(() => {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 1500); // Simulate a delay for success message
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-gray-100 min-h-screen mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-600 text-center max-w-xl">
        Have any questions? Feel free to reach out to us, and we’ll get back to you as soon as possible.
      </p>
      <div className="mt-10 grid md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Contact Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Contact Information</h2>
          <div className="space-y-4">
            <p className="flex items-center space-x-3 text-gray-600">
              <FaPhoneAlt className="text-blue-500" />
              <span>+91 8310531309</span>
            </p>
            <p className="flex items-center space-x-3 text-gray-600">
              <FaEnvelope className="text-red-500" />
              <span>jcrm.in</span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Send Us a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            required
          ></textarea>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            {status === "Sending..." ? "Sending..." : "Send Message"}
          </button>
          {status && <p className="text-center text-green-600 mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
