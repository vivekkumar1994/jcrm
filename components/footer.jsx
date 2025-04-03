"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Company Info */}
                <div>
                    <Image
                        src="/images/logo1.png"
                        width={120}
                        height={50}
                        alt="Logo"
                        className="mb-4"
                    />
                    <p className="mt-4 text-sm">
                        JCRM Technologies - Your trusted partner for digital transformation.
                        We provide top-notch web development, marketing, and branding solutions.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-white">Home</Link></li>
                        <li><Link href="/services" className="hover:text-white">Services</Link></li>
                        <li><Link href="/product" className="hover:text-white">Products</Link></li>
                        <li><Link href="/career" className="hover:text-white">Career</Link></li>
                        <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact & Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <p>
                        Email:{" "}
                        <a href="mailto:hr@jcrm.in" className="text-blue-400 hover:underline">
                            hr@jcrm.in
                        </a>
                    </p>
                    <p>
                        Phone:{" "}
                        <a href="tel:+918310531309" className="text-blue-400 hover:underline">
                            +91 8310531309
                        </a>
                    </p>

                    {/* Social Media Links */}
                    <div className="mt-4 flex space-x-4">
                        <Link href="https://instagram.com" target="_blank" className="text-gray-300 hover:text-white">
                            <FaInstagram size={30} />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="text-gray-300 hover:text-white">
                            <FaLinkedin size={30} />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" className="text-gray-300 hover:text-white">
                            <FaTwitter size={30} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} JCRM Technologies. All rights reserved.
            </div>
        </footer>
    );
}
