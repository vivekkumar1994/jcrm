"use client";
import { Poppins } from "@next/font/google";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Cookies from "js-cookie";
import "./globals.css";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import ItSidebar from "@/app/components/ItSidebar"; // Import IT Sidebar

// Font configurations
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [userType, setUserType] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Authentication and routing logic for /admin and /it only
  useEffect(() => {
    const token = Cookies.get("authToken");
    const storedUserType = Cookies.get("userType");

    console.log(token,userType)
  
    if (pathname.startsWith("/admin") || pathname.startsWith("/it")) {
      if (!token) {
        router.push("/login");
        return;
      }
  
      setIsAuthenticated(!!token);
      setUserType(storedUserType);
  
      // Route protection and redirect for dashboard
      if (storedUserType === "admin") {
        if (!pathname.startsWith("/admin")) {
          router.push("/admin/dashboard");
        } else if (pathname === "/admin") {
          router.push("/admin/dashboard");
        }
      } else if (storedUserType === "it") {
        if (!pathname.startsWith("/it")) {
          router.push("/it/dashboard");
        } else if (pathname === "/it") {
          router.push("/it/dashboard");
        }
      } else {
        router.push("/login");
      }
    }
  }, [pathname, router]);
  
  // Loading state while checking authentication
  if (isAuthenticated === null && (pathname.startsWith("/admin") || pathname.startsWith("/it"))) {
    return (
      <html lang="en">
        <body>
          <div className="flex justify-center items-center h-screen">Loading...</div>
        </body>
      </html>
    );
  }

  // Sidebar rendering based on user type
  const renderSidebar = () => {
    if (userType === "admin") {
      return <Sidebar />;
    }
    if (userType === "it") {
      return <ItSidebar />;
    }
    return null;
  };

  // Check if the current route is a dashboard route (only for /admin and /it)
  const isDashboard = pathname.startsWith("/admin") || pathname.startsWith("/it");

  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {isDashboard ? (
          <div className="flex min-h-screen">
            <div className="w-64 bg-gray-800 text-white">
              {renderSidebar()}
            </div>
            <main className="flex-1 p-4">{children}</main>
          </div>
        ) : (
          <>
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
