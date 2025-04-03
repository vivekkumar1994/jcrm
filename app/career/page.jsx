"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const jobListings = [
  {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-Time",
    description:
      "Join our team to build responsive and interactive web applications using React and Tailwind CSS.",
    link: "#",
  },
  {
    title: "Backend Developer",
    location: "New York, USA",
    type: "Full-Time",
    description:
      "Develop and maintain server-side logic, database management, and API integrations.",
    link: "#",
  },
  {
    title: "UI/UX Designer",
    location: "San Francisco, USA",
    type: "Part-Time",
    description:
      "Design user-friendly interfaces and improve user experience across our web applications.",
    link: "#",
  },
];

export default function CareerPage() {
  const [activeJob, setActiveJob] = useState(null);

  return (
    <main className="py-16 bg-gray-100">
      {/* Header Section */}
      <section className="text-center mb-12">
        <motion.h1
          className="text-5xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Join Our Team
        </motion.h1>
        <p className="mt-4 text-gray-600 text-lg">
          We're looking for talented people to help us build amazing products.
        </p>
      </section>

      {/* Company Overview */}
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Why Work With Us?</h2>
        <p className="mt-4 text-gray-600">
          We’re a dynamic team that thrives on creativity and collaboration.
          Join us and make an impact with your skills and ideas. We value
          innovation, growth, and a passion for delivering outstanding products.
        </p>
      </section>

      {/* Job Listings */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Open Positions</h2>
        <div className="space-y-6">
          {jobListings.map((job, index) => (
            <motion.div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${
                activeJob === index ? "border-blue-600" : "border-gray-300"
              } transition-all duration-300 cursor-pointer`}
              onClick={() => setActiveJob(index)}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600">{job.location} • {job.type}</p>
              <p className="mt-2 text-gray-700">{job.description}</p>
              <a
                href={job.link}
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500"
              >
                Apply Now
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 bg-blue-600 text-white text-center py-12 rounded-lg">
        <h2 className="text-4xl font-bold">Ready to Join Us?</h2>
        <p className="mt-2 text-lg">
          Send us your resume and portfolio to start your journey.
        </p>
        <a
          href="#"
          className="mt-4 inline-block px-6 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-300"
        >
          Get in Touch
        </a>
      </section>
    </main>
  );
}
