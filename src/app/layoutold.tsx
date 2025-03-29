// "use client";
// import { Poppins } from "@next/font/google";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Footer from "@/app/components/Footer";
// import Header from "@/app/components/Header";
// import Sidebar from "@/app/components/Sidebar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "600", "700"],
//   variable: "--font-poppins", // Custom CSS variable
// });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const isAdmin = pathname.startsWith("/admin");

//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Check token
//     if (isAdmin && !token) {
//       router.push("/login"); // Redirect to login if no token
//     } else {
//       setIsAuthenticated(!!token);
//     }
//   }, [pathname, router]);

//   if (isAuthenticated === null) {
//     return (
//       <html lang="en">
//         <body>
//           <div className="flex justify-center items-center h-screen">Loading...</div>
//         </body>
//       </html>
//     );
//   }

//   return (
//     <html lang="en" className={poppins.variable}>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {isAdmin ? (
//           isAuthenticated ? (
//             <div className="flex min-h-screen">
//               <Sidebar />
//               <main className="flex-1 p-4">{children}</main>
//             </div>
//           ) : null
//         ) : (
//           <>
//             <Header />
//             <main>{children}</main>
//             <Footer />
//           </>
//         )}
//       </body>
//     </html>
//   );
// }
