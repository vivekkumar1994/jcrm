import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo1.png"
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Company Info */}
                <div>
                    <Image src={logo} width={120} height={50} alt="Logo" />
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
                        <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link href="/services" className="hover:text-white">Services</Link></li>
                        <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
                        <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact & Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <p>Email: <a href="mailto:hr@jcrm.in" className="text-blue-400">hr@jcrm.in</a></p>
                    <p>Phone: <a href="tel:+918310531309" className="text-blue-400">+91 8310531309</a></p>

                    {/* Social Media Links */}
                    <div className="mt-4 flex space-x-4">
                        <Link href="https://instagram.com" target="_blank">
                          
                            <FaInstagram width={30} height={30} />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank">
                        <FaLinkedin  width={30} height={30}/>
                        </Link>
                        <Link href="https://twitter.com" target="_blank">
                        <FaTwitter  width={30} height={30}/>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-4 flex space-x-4 text-blue-600 text-2xl">
                <Link href="https://instagram.com" target="_blank" className="hover:text-pink-500">
                    <FaInstagram />
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-700">
                    <FaLinkedin />
                </Link>
                <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400">
                    <FaTwitter />
                </Link>
            </div>

            {/* Copyright */}
            <div className="mt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} JCRM Technologies. All rights reserved.
            </div>
        </footer>
    );
}
