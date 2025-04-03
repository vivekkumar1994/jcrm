"use client";

import Image from "next/image";
import boss1 from "@/app/images/boss1.jpg";
import boss2 from "@/app/images/boss2.jpg";
import boss3 from "@/app/images/boss3.jpg";
import work1 from "@/app/images/smarthome.jpg";
import work2 from "@/app/images/onboard.png";
import work3 from "@/app/images/booking.jpg";
import work4 from "@/app/images/work3.jpg";
import { motion } from "framer-motion";

// Services Array
const services = [
  { title: "UI/UX Design", icon: "bi-palette", desc: "Creating beautiful and intuitive interfaces that enhance user experience." },
  { title: "Front End Development", icon: "bi-laptop", desc: "Building responsive and dynamic user interfaces using modern technologies." },
  { title: "Back End Development", icon: "bi-server", desc: "Handling server logic, databases, and application performance." },
  { title: "SEO Optimization", icon: "bi-graph-up", desc: "Improving search engine rankings to boost your online presence." },
];

// Stats Data
const stats = [
  { title: "Projects Completed", value: 1200 },
  { title: "Happy Clients", value: 300 },
  { title: "Awards Won", value: 15 },
  { title: "Years of Experience", value: 5 },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center space-y-16">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center gap-10 px-4 py-20 bg-gray-900 text-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="flex h-full w-full"
            initial={{ x: "0%" }}
            animate={{ x: ["0%", "-100%", "-200%", "-300%", "0%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[work1, work2, work3, work4].map((img, index) => (
              <Image key={index} src={img} alt={`Slide ${index + 1}`} className="w-full object-cover" />
            ))}
          </motion.div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold">Innovating Your Digital World</h1>
          <p className="mt-4 text-sm md:text-lg">Crafting immersive experiences with cutting-edge technology.</p>
          <motion.button
            className="mt-8 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
            whileHover={{ scale: 1.1 }}
          >
            Explore Our Services
          </motion.button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full py-20 bg-blue-50 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Our Achievements</h1>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg w-40 md:w-60">
              <h2 className="text-2xl md:text-5xl font-bold text-blue-500">{stat.value}</h2>
              <p className="mt-2 text-gray-700">{stat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-20 text-center bg-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Our Expertise</h1>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 md:p-6 w-64 md:w-80 hover:shadow-xl transition"
              whileHover={{ scale: 1.05 }}
            >
              <i className={`bi ${service.icon} text-3xl md:text-4xl text-blue-500`}></i>
              <h3 className="text-lg md:text-xl font-semibold mt-2">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-blue-100 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">What Our Clients Say</h1>
        <motion.div
          className="carousel relative flex items-center justify-center gap-8"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {[boss1, boss2, boss3].map((client, index) => (
            <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <Image src={client} alt={`Client ${index + 1}`} className="rounded-full w-20 h-20 md:w-24 md:h-24 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold mt-2">Client {index + 1}</h3>
              <p className="text-gray-600">&quot;Amazing experience and great support!&quot;</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-16 px-4 bg-gray-900 text-white text-center">
        <h1 className="text-2xl md:text-4xl font-bold">Ready to Start Your Project?</h1>
        <p className="mt-4 text-sm md:text-lg">Get in touch with us to build something great together!</p>
        <button className="mt-8 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition">
          Contact Us Now
        </button>
      </section>
    </main>
  );
}
