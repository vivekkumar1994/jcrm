"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import boss1 from "@/app/images/boss1.jpg";
import boss2 from "@/app/images/boss2.jpg";
import boss3 from "@/app/images/boss3.jpg";
import work1 from "@/app/images/smarthome.jpg";
import work2 from "@/app/images/onboard.png";
import work3 from "@/app/images/booking.jpg";
import work4 from "@/app/images/work3.jpg";
import { getAllUsers } from "@/actions/user"; // Import Server Action
import Link from "next/link";

const services = [
  { title: "UI/UX Design", icon: "bi-palette", desc: "Creating intuitive interfaces for the best experience." },
  { title: "Front End Development", icon: "bi-laptop", desc: "Building responsive and dynamic UI with modern tech." },
  { title: "Back End Development", icon: "bi-server", desc: "Managing server logic, databases, and performance." },
  { title: "SEO Optimization", icon: "bi-graph-up", desc: "Boosting search rankings to maximize online presence." },
];

const stats = [
  { title: "Projects Completed", value: 1200 },
  { title: "Happy Clients", value: 300 },
  { title: "Awards Won", value: 15 },
  { title: "Years of Experience", value: 5 },
];

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error.message);
      }
    }
    fetchUsers();
  }, []);

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

      <section className="w-full py-20 bg-white text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Meet Our Experienced Team</h1>

      {/* Skeleton Loader */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-200 p-6 rounded-lg shadow-md h-60"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {users.length > 0 ? (
            users.map((user) => (
              <motion.div
                key={user.id}
                className="bg-gray-100 p-6 rounded-lg shadow-md text-left flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={user.imageUrl || "/default-avatar.png"}
                  alt={user.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-gray-900 mt-4">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">Experience: {user.experience || "N/A"} years</p>
                <p className="text-sm text-gray-600">Skills: {user.skills?.join(", ") || "N/A"}</p>

                {/* Navigate to booking page */}
                <Link href={`/book-session?id=${user.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                    Book a Session
                  </button>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>
      )}
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
