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
import { Moon, Sun } from "lucide-react";

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Sidebar className="mt-20">
      <SidebarHeader>Admin Panel</SidebarHeader>

      <SidebarContent>
        <SidebarGroup label="Main">
          <a
            href="/admin/dashboard"
            className="group flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-md"
          >
            <span className="transition-transform group-hover:translate-x-1 group-hover:scale-110">
              📊
            </span>
            <span className="font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Dashboard
            </span>
          </a>

          <a
            href="/admin/users"
            className="group flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-md"
          >
            <span className="transition-transform group-hover:translate-x-1 group-hover:scale-110">
              👥
            </span>
            <span className="font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Users
            </span>
          </a>
        </SidebarGroup>

        {/* Theme Toggle Button */}
        {mounted && (
          <div className="mt-4 px-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
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

      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
          © 2025 JCRM
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
