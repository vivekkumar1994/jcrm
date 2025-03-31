"use client";

import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    access: number;
    password?: string;
}

const RegisteredUsers = () => {
    const [data, setData] = useState<User[]>([]);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [newPassword, setNewPassword] = useState(""); // New password state

    useEffect(() => {
        fetch("/api/register")
            .then((res) => res.json())
            .then((data: User[]) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleEdit = (user: User) => {
        setEditUser(user);
        setNewPassword(""); // Clear password field when opening modal
    };

    const toggleAccess = async (id: number) => {
        try {
            const response = await fetch(`/api/register?id=${id}`, {
                method: "PATCH",
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setData((prevData) =>
                    prevData.map((user) =>
                        user.id === id ? { ...user, access: updatedUser.access } : user
                    )
                );
            } else {
                console.error("Failed to toggle access");
            }
        } catch (error) {
            console.error("Error toggling access:", error);
        }
    };

    const handleSaveEdit = async () => {
        if (!editUser) return;

        try {
            let hashedPassword = editUser.password;
            if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(newPassword, salt);
            }

            const response = await fetch(`/api/register?id=${editUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editUser.name,
                    email: editUser.email,
                    phone: editUser.phone,
                    password: hashedPassword, // Send hashed password
                }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setData((prevData) =>
                    prevData.map((user) =>
                        user.id === updatedUser.id ? updatedUser : user
                    )
                );
                setEditUser(null);
                setNewPassword("");
            } else {
                console.error("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Registered Users</h1>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">Access</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id} className="odd:bg-white even:bg-gray-100 text-center">
                                <td className="px-4 py-2 border">{user.id}</td>
                                <td className="px-4 py-2 border">{user.name}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border">{user.phone}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => toggleAccess(user.id)}
                                        className={`px-2 py-1 text-white rounded ${user.access === 1 ? 'bg-green-500' : 'bg-red-500'}`}
                                    >
                                        {user.access === 1 ? "Enabled" : "Disabled"}
                                    </button>
                                </td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Editing User */}
            {editUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>
                        <label className="block mb-2">
                            Name:
                            <input
                                type="text"
                                className="border p-2 w-full"
                                value={editUser.name}
                                onChange={(e) =>
                                    setEditUser((prev) => ({ ...prev!, name: e.target.value }))
                                }
                            />
                        </label>
                        <label className="block mb-2">
                            Email:
                            <input
                                type="email"
                                className="border p-2 w-full"
                                value={editUser.email}
                                onChange={(e) =>
                                    setEditUser((prev) => ({ ...prev!, email: e.target.value }))
                                }
                            />
                        </label>
                        <label className="block mb-2">
                            Phone:
                            <input
                                type="tel"
                                className="border p-2 w-full"
                                value={editUser.phone}
                                onChange={(e) =>
                                    setEditUser((prev) => ({ ...prev!, phone: e.target.value }))
                                }
                            />
                        </label>
                        <label className="block mb-4">
                            New Password (optional):
                            <input
                                type="password"
                                className="border p-2 w-full"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </label>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditUser(null)}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisteredUsers;
