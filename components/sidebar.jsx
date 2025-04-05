"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
  ];

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-gray-900 text-white p-4 flex justify-between md:hidden">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 bg-gray-900 text-white p-5 transition-transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-64 w-64 z-50 h-screen flex flex-col`}
      >
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Admin Panel</h2>

        {/* Navigation (Takes Full Space) */}
        <nav className="flex-grow">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.href}
                className={`p-2 rounded-lg ${
                  pathname === item.href ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
              >
                <Link href={item.href} className="block" onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Settings Dropdown */}
            <li className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2 w-full flex justify-between items-center rounded-lg hover:bg-gray-800"
              >
                Settings <ChevronDown size={18} />
              </button>
              {isSettingsOpen && (
                <ul className="absolute left-0 w-full bg-gray-800 rounded-lg mt-1 shadow-lg">
                  <li className="p-2 hover:bg-gray-700 cursor-pointer">Light Theme</li>
                  <li className="p-2 hover:bg-gray-700 cursor-pointer">Dark Theme</li>
                  <li className="p-2 hover:bg-gray-700 cursor-pointer">System Theme</li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Logout Button (At Bottom) */}
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={20} className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
