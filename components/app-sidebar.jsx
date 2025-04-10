"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import clsx from "clsx";

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Toggle Button for Small Screens */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md text-black dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
            "lg:translate-x-0 lg:static lg:block": true,
          }
        )}
      >
        <Sidebar className="h-full pt-20">
          {/* Sidebar Header */}
          <SidebarHeader className="flex items-center justify-between px-4">
            <span className="text-lg font-semibold text-black dark:text-white">
              Admin Panel
            </span>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent>
            <SidebarGroup label="Main">
              <a
                href="/admin/dashboard"
                className="group flex items-center gap-3 px-4 py-2 rounded-md 
                  text-black dark:text-gray-200 
                  hover:bg-gray-200 dark:hover:bg-gray-700 
                  transition transform hover:scale-[1.03]"
              >
                📊
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Dashboard
                </span>
              </a>

              <a
                href="/admin/users"
                className="group flex items-center gap-3 px-4 py-2 rounded-md 
                  text-black dark:text-gray-200 
                  hover:bg-gray-200 dark:hover:bg-gray-700 
                  transition transform hover:scale-[1.03]"
              >
                👥
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Users
                </span>
              </a>
            </SidebarGroup>

            {/* Theme Toggle */}
            {mounted && (
              <div className="mt-4 px-4">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 
                    rounded-md bg-gray-200 dark:bg-gray-700 
                    text-black dark:text-gray-200 
                    hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-400" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-gray-700" />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            )}
          </SidebarContent>

        </Sidebar>
      </div>
    </>
  );
}
