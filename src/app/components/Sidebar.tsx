"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href} className={`p-2 rounded-lg ${pathname === item.href ? "bg-gray-700" : "hover:bg-gray-800"}`}>
              <Link href={item.href} className="block">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
