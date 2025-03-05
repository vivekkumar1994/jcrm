"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import boss1 from "../images/boss1.jpg";
import latest from "../images/latest1.jpg";
import work1 from "../images/smarthome.jpg";
import work2 from "../images/onboard.png";
import work3 from "../images/booking.jpg";
import work4 from "../images/work3.jpg";

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
          {[
            { title: "UI/UX Design", icon: "bi-pencil", desc: "Crafting intuitive and user-friendly designs for seamless experiences." },
            { title: "Front End", icon: "bi-code", desc: "Building visually stunning and responsive user interfaces with modern tech." },
            { title: "Back End", icon: "bi-hdd-stack", desc: "Handling server-side logic, databases, and performance optimization." },
            { title: "SEO & Marketing", icon: "bi-bar-chart", desc: "Boosting visibility and traffic with smart digital marketing strategies." },
            { title: "E-commerce Solutions", icon: "bi-cart", desc: "Creating scalable and high-performing online stores with seamless UX." },
            { title: "Custom Web Apps", icon: "bi-gear", desc: "Developing custom web applications tailored to business needs." },
          ].map((service, index) => (
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
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work Showcase Section */}
      <section className="w-full text-center py-20 bg-white">
        <h1 className="text-4xl font-bold text-gray-800">Our Recent Projects</h1>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[work1, work2, work3, work4].map((img, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-80"
            >
              <Image src={img} alt="work-example" width={320} height={240} className="rounded-lg shadow-lg" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800">What Our Clients Say</h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-gray-600 mt-4 italic"
          >
            Fast and outstanding results. They understand customer needs and deliver excellence.
          </motion.p>
          <div className="flex items-center justify-center mt-6">
            <Image src={boss1} alt="client-image" width={80} height={80} className="rounded-full border-4 border-blue-500" />
            <div className="ml-4">
              <h4 className="text-xl font-semibold text-gray-800">Carlos Tran</h4>
              <p className="text-gray-600">The Decorate Gatsby</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}