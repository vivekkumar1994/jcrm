"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";

export default function AppLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  // Admin route: show ONLY sidebar via AdminLayoutWrapper
  if (isAdminRoute) {
    return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
  }

  // Regular route: show header + content + footer
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
