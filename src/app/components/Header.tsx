"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../images/logo1.png";
import Marquee from "react-fast-marquee";

export default function ClassicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Our Works", path: "/ourwork" },
    { name: "Clients", path: "/client" },
    { name: "Contact", path: "/contact-us" },
    { name: "Registration", path: "/registration" },
  ];

  return (
    <>
      {/* Header Section */}
      <header className="bg-white shadow-lg w-full fixed top-0 left-0 z-50">
        {/* Top Header Marquee */}
        <div className="top-header bg-yellow-400 py-1">
          <Marquee speed={50} gradient={false} className="text-black text-sm">
            Disclaimer: - We are not providing any kind of medical-related consultancy or medical-related solutions.
            We have doctors, dieticians, yoga trainers, yoga therapists, psychologists, and physiotherapists across the country.
            We are providing health awareness online and offline with experts.
          </Marquee>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between px-4 py-4 container mx-auto">
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex-shrink-0">
            <Image src={logo} width={60} height={50} alt="Logo" className="cursor-pointer" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex justify-center items-center w-full space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`relative text-gray-700 text-lg font-semibold hover:text-blue-600 transition-all duration-300 ${
                  pathname === item.path ? "text-blue-600" : ""
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-600"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu Animation */}
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={menuOpen ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white shadow-md flex flex-col items-center justify-center space-y-6 px-6 ${
            menuOpen ? "visible" : "invisible"
          }`}
        >
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -50 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Link
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`text-xl font-semibold ${
                  pathname === item.path ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </header>
    </>
  );
}
