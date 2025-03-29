// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// const professionalRoles = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "Node.js Developer",
//     "Python Developer",
//     "Graphic Designer",
//     "UI/UX Designer",
//     "Data Scientist",
//     "Project Manager",
// ];

// const RegisterForm = () => {
//     const router = useRouter();
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         gender: "",
//         phone: "",
//         address: "",
//         city: "",
//         state: "",
//         qualification: "",
//         university: "",
//         graduationYear: "",
//         skills: "",
//         experience: "",
//         availability: "",
//         preferredLocation: "",
//         linkedinProfile: "",
//         githubProfile: "",
//         professionalRole: "",
//         resume: null,
//         portfolio: null,
//         certificates: [],
//         courseType: "",
//         additionalInfo: "",
//         reference: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         // Fetch states when the component mounts
//         const fetchStates = async () => {
//             try {
//                 const response = await fetch("https://api.countrystatecity.in/v1/countries/IN/states", {
//                     headers: { "X-CSCAPI-KEY": "YOUR_API_KEY" },
//                 });
//                 const data = await response.json();
//                 setStates(data);
//             } catch (error) {
//                 console.error("Error fetching states:", error);
//             }
//         };
//         fetchStates();
//     }, []);

//     useEffect(() => {
//         // Fetch cities when state changes
//         const fetchCities = async () => {
//             if (formData.state) {
//                 try {
//                     const response = await fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${formData.state}/cities`, {
//                         headers: { "X-CSCAPI-KEY": "YOUR_API_KEY" },
//                     });
//                     const data = await response.json();
//                     setCities(data);
//                 } catch (error) {
//                     console.error("Error fetching cities:", error);
//                 }
//             }
//         };
//         fetchCities();
//     }, [formData.state]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const response = await fetch("/api/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 setMessage("Registration successful! Redirecting...");
//                 setTimeout(() => router.push("/"), 2000);
//             } else {
//                 setMessage(result.error || "Something went wrong.");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             setMessage("Error submitting the form.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 mt-25">
//             <motion.form
//                 onSubmit={handleSubmit}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 className="bg-white p-8 rounded-2xl shadow-xl space-y-6 max-w-4xl w-full"
//             >
//                 <h2 className="text-3xl font-semibold text-gray-700 mb-4">Registration</h2>
//                 <div className="grid grid-cols-2 gap-6">
//                     <select
//                         name="state"
//                         onChange={handleChange}
//                         value={formData.state}
//                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     >
//                         <option value="">Select State</option>
//                         {states.map((state) => (
//                             <option key={state.iso2} value={state.iso2}>{state.name}</option>
//                         ))}
//                     </select>
//                     <select
//                         name="city"
//                         onChange={handleChange}
//                         value={formData.city}
//                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     >
//                         <option value="">Select City</option>
//                         {cities.map((city) => (
//                             <option key={city.id} value={city.name}>{city.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <motion.button
//                     type="submit"
//                     disabled={loading}
//                     className={`w-full p-2 rounded mt-4 text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
//                 >
//                     {loading ? "Submitting..." : "Submit"}
//                 </motion.button>

//                 {message && <p className="mt-2 text-center text-red-500">{message}</p>}
//             </motion.form>
//         </div>
//     );
// };

// export default RegisterForm;
