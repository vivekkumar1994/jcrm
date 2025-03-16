"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    qualification: string;
    university: string;
    graduationYear: null;
    skills: string;
    experience: string;
    availability: string;
    preferredLocation: string;
    linkedinProfile: string;
    githubProfile: string;
    resume: File | null;
    portfolio: File | null;
    certificates: File[];
    gender: string;
    courseType: string;
    additionalInfo: string;
    reference: string;
    professionalRole: string;
}

const professionalRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Node.js Developer",
    "Python Developer",
    "Graphic Designer",
    "UI/UX Designer",
    "Data Scientist",
    "Project Manager",
];

const RegisterForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        qualification: "",
        university: "",
        graduationYear: null,
        skills: "",
        experience: "",
        availability: "",
        preferredLocation: "",
        linkedinProfile: "",
        githubProfile: "",
        resume: null,
        portfolio: null,
        certificates: [],
        gender: "",
        courseType: "",
        additionalInfo: "",
        reference: "",
        professionalRole: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            if (name === "resume" && file.size > 5 * 1024 * 1024) {
                setMessage("Resume file size exceeds 5MB.");
                e.target.value = "";
                return;
            }
            if (name === "certificates") {
                setFormData((prev) => ({ ...prev, certificates: Array.from(files) }));
            } else if (name === "resume" || name === "portfolio") {
                setFormData((prev) => ({ ...prev, [name]: files[0] }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof File) {
                formDataToSubmit.append(key, value);
            } else if (Array.isArray(value)) {
                if (key === "certificates") {
                    formDataToSubmit.append(key, JSON.stringify(value));
                } else {
                    value.forEach((file, index) => {
                        formDataToSubmit.append(`${key}[${index}]`, file);
                    });
                }
            } else {
                formDataToSubmit.append(key, value as string);
            }
        });

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                body: formDataToSubmit,
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Registration successful! Redirecting...");
                setTimeout(() => {
                    router.push("/");
                }, 2000);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    qualification: "",
                    university: "",
                    graduationYear: null,
                    skills: "",
                    experience: "",
                    availability: "",
                    preferredLocation: "",
                    linkedinProfile: "",
                    githubProfile: "",
                    resume: null,
                    portfolio: null,
                    certificates: [],
                    gender: "",
                    courseType: "",
                    additionalInfo: "",
                    reference: "",
                    professionalRole: "",
                });
            } else {
                setMessage(result.error || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error submitting the form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 mt-25">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white p-8 rounded-2xl shadow-xl space-y-6 max-w-4xl w-full"
                encType="multipart/form-data"
            >
                <h2 className="text-3xl font-semibold text-gray-700 mb-4">Registration</h2>
                <div className="grid grid-cols-2 gap-6">
                    {Object.keys(formData).map((field) => {
                        if (field === "professionalRole") {
                            return (
                                <select
                                    key={field}
                                    name={field}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Professional Role</option>
                                    {professionalRoles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            );
                        }
                        if (field === "resume") {
                            return (
                                <div key={field} className="col-span-2">
                                    <h3 className="text-lg font-medium mb-2">Upload Resume</h3>
                                    <input
                                        type="file"
                                        name={field}
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            );
                        }
                        return (
                            <input
                                key={field}
                                type="text"
                                name={field}
                                placeholder={field}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        );
                    })}
                </div>
                <motion.button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 rounded mt-4 text-white ${
                        loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Submitting..." : "Submit"}
                </motion.button>

                {message && <p className="mt-2 text-center text-red-500">{message}</p>}
            </motion.form>
        </div>
    );
};

export default RegisterForm;