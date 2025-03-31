"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Roboto_Flex } from "next/font/google";  // Updated font import
import boss1 from "../images/boss1.jpg";
import boss2 from "../images/boss2.jpg";
import boss3 from "../images/boss3.jpg";

const roboto = Roboto_Flex ({ subsets: ["latin"], weight: "400" });  // Font configuration

const clients = [
  { name: "Tesla", logo: boss1 },
  { name: "Microsoft", logo: boss2 },
  { name: "Google", logo: boss3 },
  { name: "Amazon", logo: boss1 },
  { name: "Airbnb", logo: boss2 },
  { name: "Spotify", logo: boss3 },
];

const testimonials = [
  {
    quote: "Working with this team has been a game changer for our business!",
    name: "Sushant Diwadi",
    position: "CEO, Mahojogi",
    image: boss1,
  },
  {
    quote: "Their design expertise and speed are unmatched!",
    name: "Satya Nadella",
    position: "CEO, Microsoft",
    image: boss2,
  },
  {
    quote: "We saw a 50% increase in engagement thanks to their work.",
    name: "Sundar Pichai",
    position: "CEO, Google",
    image: boss3,
  },
];

export default function ClientsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <main
      className={`flex flex-col items-center space-y-16 py-16 bg-gray-100 ${roboto.className}`}
    >
      {/* Title */}
      <motion.h1
        className="text-5xl font-bold text-gray-800 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Trusted Clients
      </motion.h1>

      {/* Clients Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-6 md:px-16">
        {clients.map((client, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={150}
              height={100}
              className="object-contain"
            />
          </motion.div>
        ))}
      </div>

      {/* Testimonials Section */}
      <section className="w-full bg-white py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800">What Our Clients Say</h2>

        <motion.div
          className="max-w-3xl mx-auto mt-6 bg-gray-100 p-8 rounded-lg shadow-lg relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaQuoteLeft className="text-4xl text-blue-500 absolute top-4 left-4" />
          <p className="text-gray-600 italic text-lg">
            {testimonials[currentTestimonial].quote}
          </p>
          <FaQuoteRight className="text-4xl text-blue-500 absolute bottom-4 right-4" />
          <div className="flex items-center justify-center mt-6">
            <Image
              src={testimonials[currentTestimonial].image}
              alt="Client"
              width={80}
              height={80}
              className="rounded-full border-2 border-blue-500"
            />
            <div className="ml-4 text-left">
              <h4 className="text-xl font-semibold text-gray-800">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-gray-600">{testimonials[currentTestimonial].position}</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Navigation */}
        <div className="flex space-x-4 mt-6 justify-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                currentTestimonial === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.div
        className="w-full py-10 bg-blue-600 text-white text-center rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold">Want to Partner With Us?</h2>
        <p className="mt-2 text-lg">Join our network of successful brands.</p>
        <button className="mt-4 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300">
          Contact Us
        </button>
      </motion.div>
    </main>
  );
}
