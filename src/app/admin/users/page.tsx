"use client";

import { useState, useEffect } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    access: number; // type changed to number
}

const RegisteredUsers = () => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        fetch("/api/register")
            .then((res) => res.json())
            .then((data: User[]) => setData(data)) // Removed access initialization
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

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

    const handleEdit = (id: number) => {
        console.log("Edit user with ID:", id);
    };

    const handleDelete = async (id: number) => {
      try {
        const response = await fetch(`/api/register?id=${id}`, {
          method: "DELETE"
        })
        if(response.ok){
          setData((prevData) => prevData.filter((user) => user.id !== id));
        }else{
          console.error("Failed to delete user");
        }
      }catch(error){
        console.error("Error deleting user:", error);
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
                                        onClick={() => handleEdit(user.id)}
                                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredUsers;