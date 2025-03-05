"use client";  // Add this at the top


import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/download.png"

export default function ClassicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} width={80} height={50} alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            
            <Link href="/ourwork" onClick={() => setMenuOpen(false)}>Our Works</Link>
            <Link href="/client" onClick={() => setMenuOpen(false)}>Clients</Link>
            <Link href="/contact-us" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            
            <Link href="/ourwork" onClick={() => setMenuOpen(false)}>Our Works</Link>
            <Link href="/client" onClick={() => setMenuOpen(false)}>Clients</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
