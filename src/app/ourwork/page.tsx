"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import boss1 from "../images/boss1.jpg";
import boss2 from "../images/boss2.jpg";
import work1 from "../images/smarthome.jpg";
import work2 from "../images/onboard.png";
import work3 from "../images/booking.jpg";


// Sample project data
const projects = [
  { title: "Smart Home Dashboard", category: "Web Apps", image: boss1 },
  { title: "Onboard UX/UI Design", category: "UI/UX", image: work1 },
  { title: "Booking System App", category: "Mobile Apps", image: work2 },
  { title: "Juice Product Homepage", category: "Web Apps", image: work3 },
];

const categories = ["All", "UI/UX", "Web Apps", "Mobile Apps"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage] = useState("");

  // Filter projects based on category
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <main className="flex flex-col items-center space-y-20 py-16 bg-gray-100 mt-15">
      
      {/* Title */}
      <motion.h1
        className="text-5xl font-bold text-gray-800 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Work: Creativity Meets Functionality
      </motion.h1>

      {/* Filter Buttons */}
      <div className="flex space-x-4 ">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
              ${activeCategory === category ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-500 hover:text-white"}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            // onClick={() => {
            //   setSelectedImage(project.image);
            //   setLightboxOpen(true);
            // }}
          >
            <Image src={project.image} alt={project.title} width={400} height={300} className="w-full h-60 object-cover" />
            <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4 w-full">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm">{project.category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox for Full-Screen Image Preview */}
      {lightboxOpen && (
        <Lightbox mainSrc={selectedImage} onCloseRequest={() => setLightboxOpen(false)} />
      )}

      {/* Client Testimonial */}
      <section className="w-full py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800">What Our Clients Say</h2>
        <motion.div
          className="max-w-2xl mx-auto mt-6 bg-gray-100 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="italic text-gray-600">
            Their design transformed our business! The results speak for themselves.
          </p>
          <div className="flex items-center justify-center mt-4">
            <Image src={boss2} alt="Client" width={60} height={60} className="rounded-full border-2 border-blue-500" />
            <div className="ml-4 text-left">
              <h4 className="text-xl font-semibold text-gray-800">Carlos Tran</h4>
              <p className="text-gray-600">The Decorate Gatsby</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.div
        className="w-full py-10 bg-blue-600 text-white text-center rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold">Want to Work with Us?</h2>
        <p className="mt-2 text-lg">Let’s bring your ideas to life with expert design and development.</p>
        <button className="mt-4 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300">
          Contact Us
        </button>
      </motion.div>

    </main>
  );
}
