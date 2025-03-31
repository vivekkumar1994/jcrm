"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import heroImage from "@/app/images/heroImage.jpg";
import { useParams } from "next/navigation";
import Image from "next/image";

interface UserDetails {
  name: string;
  title: string;
  profilePhoto: string;
  email: string;
  phone: string;
}

const BookSession: React.FC = () => {
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/register?id=${id}`);
        if (response.data.user) {
          setUserDetails(response.data.user);
          setError(null);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to fetch user details.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserDetails();
  }, [id]);

  const generateNext7Days = (): string[] => {
    const days: string[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      days.push(nextDay.toDateString());
    }
    return days;
  };

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    setSelectedSlot(null);
  };

  const timeSlots = ["10-12", "12-2", "2-4", "4-6"];

  const handleConfirmBooking = async () => {
    if (!selectedDay || !selectedSlot || !userDetails) return;

    try {
      const response = await axios.post("/api/booksession", {
        userId: id,
        selectedDay,
        selectedSlot,
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
      });

      if (response.status === 200) {
        alert("Session booked successfully!");
        setSelectedDay(null);
        setSelectedSlot(null);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Failed to book session:", err);
      alert("There was an error booking the session.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100">
      <section
        className="w-full bg-white shadow-lg mt-6 p-6 flex flex-col items-center h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage.src})` }}
      >
        {loading ? (
          <p>Loading user details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-blue-600">{userDetails?.name}</h1>
            <p className="text-lg text-gray-500">{userDetails?.title}</p>
          </>
        )}
      </section>

      <div className="w-full max-w-4xl bg-white shadow-lg mt-10 p-6 flex rounded-lg">
        <div className="w-1/3 flex flex-col items-center border-r pr-6">
          {userDetails && (
            <>
              <Image
                src={userDetails.profilePhoto}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full shadow-lg mb-4 border-4 border-blue-600"
              />
              <h1 className="text-2xl font-bold text-blue-600 mb-1">{userDetails.name}</h1>
              <p className="text-lg text-gray-500 mb-2">{userDetails.title}</p>
            </>
          )}
        </div>

        <div className="w-2/3 pl-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Book a Session</h1>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Select a Day:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {generateNext7Days().map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`px-4 py-2 text-sm rounded-lg border font-medium focus:outline-none transition-all duration-200 shadow-sm ${
                    selectedDay === day
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:shadow-md"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {selectedDay && (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mt-6">Select a Time Slot:</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-2 text-sm rounded-lg border font-medium focus:outline-none transition-all duration-200 shadow-sm ${
                        selectedSlot === slot
                          ? "bg-green-600 text-white border-green-600 shadow-lg scale-105"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-green-50 hover:shadow-md"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={handleConfirmBooking}
              disabled={!selectedDay || !selectedSlot}
              className={`w-full mt-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 focus:outline-none shadow-md ${
                selectedDay && selectedSlot
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSession;
