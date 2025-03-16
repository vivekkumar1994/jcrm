"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import boss1 from "@/app/images/boss1.jpg";
import latest from "@/app/images/latest1.jpg";
import work1 from "@/app/images/smarthome.jpg";
import work2 from "@/app/images/onboard.png";
import work3 from "@/app/images/booking.jpg";
import work4 from "@/app/images/work3.jpg";
import Link from "next/link";

const services = [
  { title: "UI/UX Design", icon: "bi-pencil", desc: "Crafting intuitive and user-friendly designs for seamless experiences.", path: "/services/uiux" },
  { title: "Front End", icon: "bi-code", desc: "Building visually stunning and responsive user interfaces with modern tech.", path: "/services/frontend" },
  { title: "Back End", icon: "bi-hdd-stack", desc: "Handling server-side logic, databases, and performance optimization.", path: "/services/backend" },
  { title: "SEO & Marketing", icon: "bi-bar-chart", desc: "Boosting visibility and traffic with smart digital marketing strategies.", path: "/services/seo" },
  { title: "E-commerce Solutions", icon: "bi-cart", desc: "Creating scalable and high-performing online stores with seamless UX.", path: "/services/ecommerce" },
  { title: "Custom Web Apps", icon: "bi-gear", desc: "Developing custom web applications tailored to business needs.", path: "/services/customapps" },
];

export default function ServicesPage() {
  return (
    <main className="flex flex-col items-center space-y-20 mt-20">
      {/* Hero Section */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 md:px-16 py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2"
        >
          <h6 className="text-lg font-semibold bg-yellow-400 px-4 py-2 rounded inline-block text-gray-900">
            Unhappy with your website?
          </h6>
          <h1 className="text-5xl font-bold mt-4 leading-tight">
            We create beautiful <br /> and fast web services
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2"
        >
          <Image src={latest} alt="hero-image" width={500} height={500} className="rounded-lg shadow-2xl" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="w-full text-center py-20 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">We Offer High-Demand Services</h1>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white shadow-xl rounded-xl p-6 w-80 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl text-blue-500 mb-4">
                <i className={`bi ${service.icon}`}></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.desc}</p>
              <Link href={service.path}>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Learn More
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
