"use client";

import Image from "next/image";
import boss1 from "../images/boss1.jpg";
import boss2 from "../images/boss2.jpg";
import boss3 from "../images/boss3.jpg";
import latest from "../images/latest1.jpg";
import work1 from "../images/smarthome.jpg";
import work2 from "../images/onboard.png";
import work3 from "../images/booking.jpg";
import work4 from "../images/work3.jpg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Services Array
const services = [
  {
    title: "UI/UX Design",
    icon: "bi-palette",
    desc: "Creating beautiful and intuitive interfaces that enhance user experience.",
  },
  {
    title: "Front End Development",
    icon: "bi-laptop",
    desc: "Building responsive and dynamic user interfaces using modern technologies.",
  },
  {
    title: "Back End Development",
    icon: "bi-server",
    desc: "Handling server logic, databases, and application performance.",
  },
  {
    title: "SEO Optimization",
    icon: "bi-graph-up",
    desc: "Improving search engine rankings to boost your online presence.",
  },
];

// Stats Data
const stats = [
  { title: "Projects Completed", value: 1200 },
  { title: "Happy Clients", value: 300 },
  { title: "Awards Won", value: 15 },
  { title: "Years of Experience", value: 5 },
];

export default function HomePage() {
  const [counter, setCounter] = useState(0);

  // Counter Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev < 100 ? prev + 1 : prev));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center space-y-16">
      {/* Hero Section with Carousel */}
      <section className="w-full flex flex-col items-center justify-center gap-10 px-8 py-40 bg-gray-900 text-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="flex h-full w-full"
            initial={{ x: "0%" }}
            animate={{ x: ["0%", "-100%", "-200%", "-300%", "0%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image src={work1} alt="Slide 1" className="w-full object-cover" />
            <Image src={work2} alt="Slide 2" className="w-full object-cover" />
            <Image src={work3} alt="Slide 3" className="w-full object-cover" />
            <Image src={work4} alt="Slide 4" className="w-full object-cover" />
          </motion.div>
        </div>
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-extrabold">Innovating Your Digital World</h1>
          <p className="mt-4 text-lg">Crafting immersive experiences with cutting-edge technology.</p>
          <motion.button
            className="mt-8 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
            whileHover={{ scale: 1.1 }}
          >
            Explore Our Services
          </motion.button>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="w-full py-20 bg-blue-50 text-center">
        <h1 className="text-4xl font-bold mb-8">Our Achievements</h1>
        <div className="flex flex-wrap justify-center gap-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg w-60">
              <h2 className="text-5xl font-bold text-blue-500">{counter}%</h2>
              <p className="mt-2 text-gray-700">{stat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-20 text-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Our Expertise</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 w-80 hover:shadow-xl transition"
              whileHover={{ scale: 1.05 }}
            >
              <i className={`bi ${service.icon} text-4xl text-blue-500`}></i>
              <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-blue-100 text-center">
        <h1 className="text-4xl font-bold mb-8">What Our Clients Say</h1>
        <motion.div
          className="carousel relative flex items-center justify-center gap-8"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {[boss1, boss2, boss3].map((client, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <Image src={client} alt={`Client ${index + 1}`} className="rounded-full w-24 h-24 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">Client {index + 1}</h3>
              <p className="text-gray-600">"Amazing experience and great support!"</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-gray-900 text-white text-center">
        <h1 className="text-5xl font-bold">Ready to Start Your Project?</h1>
        <p className="mt-4 text-lg">Get in touch with us to build something great together!</p>
        <button className="mt-8 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition">
          Contact Us Now
        </button>
      </section>
    </main>
  );
}
