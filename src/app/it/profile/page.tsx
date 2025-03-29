"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Use js-cookie to get cookies on the client side

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [resume, setResume] = useState(null);
    const router = useRouter();

    // Fetch user data
    useEffect(() => {
        async function fetchUser() {
            try {
                const userId = Cookies.get("userId");
                if (!userId) {
                    alert("User not logged in");
                    router.push("/login");
                    return;
                }

                const res = await fetch(`/api/register/${userId}`);
                const data = await res.json();
                if (data.user) {
                    setUser(data.user);
                    setFormData(data.user);
                    setProfilePicture(data.user.profilePicture);
                    setResume(data.user.resume);
                } else {
                    alert("User not found");
                    router.push("/");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file uploads
    const handleFileUpload = async (e, fileType) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append(fileType, file);

        try {
            const userId = Cookies.get("userId");
            if (!userId) {
                alert("User not logged in");
                return;
            }

            const res = await fetch(`/api/user/upload/${userId}`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                if (fileType === "profilePicture") setProfilePicture(data.url);
                if (fileType === "resume") setResume(data.url);
                alert(`${fileType} uploaded successfully!`);
            } else {
                alert(`Failed to upload ${fileType}: ${data.error}`);
            }
        } catch (error) {
            console.error(`Error uploading ${fileType}:`, error);
            alert(`An error occurred while uploading the ${fileType}.`);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = Cookies.get("userId");
            if (!userId) {
                alert("User not logged in");
                return;
            }

            const res = await fetch(`/api/user/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                alert("Profile updated successfully!");
            } else {
                alert("Update failed: " + data.error);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating the profile.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            {user && (
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    {profilePicture && (
                        <div className="mb-4">
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-32 h-32 rounded-full mx-auto"
                            />
                        </div>
                    )}
                    {resume && (
                        <div className="mb-4">
                            <a
                                href={resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Resume
                            </a>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="font-semibold">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                className="border p-2 rounded"
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Address</label>
                            <textarea
                                name="address"
                                value={formData.address || ""}
                                onChange={handleChange}
                                className="border p-2 rounded"
                                rows="3"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Upload Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, "profilePicture")}
                                className="border p-2 rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Upload Resume</label>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileUpload(e, "resume")}
                                className="border p-2 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
