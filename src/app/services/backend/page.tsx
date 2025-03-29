"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";

// Define the type for the profile
interface UXProfile {
  id: string;
  name: string;
  city: string;
  state: string;
  linkedinProfile?: string;
  professionalRole: string;
  access: number;
  profilePhoto?: string;
}

const UXSlider: React.FC = () => {
  const [uxProfiles, setUxProfiles] = useState<UXProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUxProfiles = async () => {
      try {
        const response = await axios.get<UXProfile[]>("/api/register");
        console.log("API Response:", response.data);

        const filteredProfiles = response.data.filter(
          (profile) => profile.professionalRole === "Backend Developer" && profile.access === 1
        );
        console.log("Filtered Profiles:", filteredProfiles);

        setUxProfiles(filteredProfiles);
      } catch (error) {
        console.error("Error fetching UX Developer profiles:", error);
        setError("Failed to load UX Developer profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchUxProfiles();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="w-full overflow-hidden mt-10 p-6 bg-gray-100 rounded-lg shadow-md"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">UX Developer Profiles</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : uxProfiles.length === 0 ? (
        <p className="text-center">No UX Developer profiles found</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {uxProfiles.map((profile) => (
            <motion.div
              key={profile.id}
              className="bg-white shadow-lg rounded-lg p-5 border"
              variants={cardVariants}
              whileHover="hover"
            >
              {profile.profilePhoto && (
                <Image
                  src={profile.profilePhoto}
                  alt="profilePhoto"
                  className="w-24 h-24 mx-auto rounded-full border mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800 text-center">{profile.name}</h3>
              <p className="text-gray-500 text-center">
                {profile.city}, {profile.state}
              </p>
              <h5 className="text-lg font-semibold text-gray-800 text-center">{profile.professionalRole}</h5>
              {profile.professionalRole && (
      <div className="flex justify-center mt-4">
      <a
        href={`/book-session/${profile.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out"
      >
        Book a Session
      </a>
    </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default UXSlider;
