"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/sidebar"; // or wherever the Sidebar is
import React from "react";

export default function AdminLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen">
      {isAdmin && <Sidebar />}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
