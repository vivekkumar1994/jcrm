"use client";

import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Home, User, Settings, LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

const ItSidebar: FC = () => {
    const [activeTask, setActiveTask] = useState<string>("Home");
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [alldata, setProfileImage] = useState<{ profilePhoto: string; name: string }>({
        profilePhoto: "https://via.placeholder.com/50?text=User",
        name: "User Name",
    });

    const router = useRouter();

    useEffect(() => {
        const userId = Cookies.get("userId");

        const fetchProfileImage = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`/api/register/${userId}`);
                    if (response.data?.user) {
                        setProfileImage({
                            profilePhoto: response.data.user.profilePhoto || "https://via.placeholder.com/50?text=User",
                            name: response.data.user.name || "User Name",
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching profile image:", error);
            }
        };

        fetchProfileImage();
    }, []);

    const handleTaskClick = (task: string): void => {
        setActiveTask(task);
        switch (task) {
            case "Home":
                router.push("/it/home");
                break;
            case "Profile":
                router.push("/it/profile");
                break;
            case "Settings":
                router.push("/it/settings");
                break;
            default:
                router.push("/");
                break;
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {!isSidebarOpen && (
                <button
                    className="fixed top-4 left-4 z-40 p-2 text-gray-800 bg-white rounded-md shadow-md md:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-8 h-8" />
                </button>
            )}

            <aside
                className={`fixed z-30 top-0 left-0 h-full bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 shadow-xl transform transition-transform duration-300 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:static md:w-80`}
            >
                <div className="flex items-center justify-between gap-4 p-6 text-2xl font-bold text-white bg-gray-900 border-b border-gray-700 shadow-md">
                    <div className="flex items-center gap-4">
                        <img
                            src={alldata.profilePhoto}
                            alt="Profile"
                            className="w-16 h-16 rounded-full border-2 border-white"
                        />
                        <span className="text-lg font-semibold truncate">{alldata.name}</span>
                    </div>
                    <button
                        className="md:hidden text-white hover:text-gray-300"
                        onClick={toggleSidebar}
                    >
                        ✕
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {["Home", "Profile", "Settings"].map((task) => (
                        <button
                            key={task}
                            onClick={() => handleTaskClick(task)}
                            className={`flex items-center gap-3 w-full p-3 rounded-lg text-lg font-medium transition ${
                                activeTask === task
                                    ? "bg-gray-700 text-white shadow-md"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            {task}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700 bg-gray-900">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-3 w-full p-3 rounded-lg text-lg font-medium text-red-400 hover:bg-red-700 hover:text-white transition"
                    >
                        <LogOut className="w-6 h-6" />
                        Logout
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default ItSidebar;
