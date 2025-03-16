"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for the profile
interface UXProfile {
  id: string;
  name: string;
  city: string;
  state: string;
  linkedinProfile?: string;
  professionalRole: string;
  access: number;
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
          (profile) => profile.professionalRole === "Backend" && profile.access === 1
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

  return (
    <div className="w-full overflow-hidden mt-35">
      <h2 className="text-2xl font-bold mb-4 text-center">UX Developer Profiles</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : uxProfiles.length === 0 ? (
        <p className="text-center">No UX Developer profiles found</p>
      ) : (
        <div className="flex space-x-4 overflow-x-auto">
          {uxProfiles.map((profile) => (
            <div
              key={profile.id}
              className="min-w-[300px] bg-white shadow-lg rounded-lg p-4 border"
            >
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-gray-500">
                {profile.city}, {profile.state}
              </p>
              {profile.linkedinProfile && (
                <a
                  href={profile.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  LinkedIn Profile
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UXSlider;
