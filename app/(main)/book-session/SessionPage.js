"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getUserById, bookSessionWithUser } from "@/actions/session";
import Image from "next/image";
import { motion } from "framer-motion";
import { format, addDays } from "date-fns";

export default function SessionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("id");

  const [user, setUser] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [message, setMessage] = useState("");
  const [bookerName, setBookerName] = useState("");
  const [bookerEmail, setBookerEmail] = useState("");
  const [bookerPhone, setBookerPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (!userId) return;

      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (error) {
        setMessage("⚠️ Error loading user details.");
        console.error(error);
      }
    }

    fetchUser();
  }, [userId]);

  const slots = Array.from({ length: 7 }, (_, i) =>
    format(addDays(new Date(), i), "EEEE, MMM d")
  );

  const timeSlots = [
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  async function handleBooking(e) {
    e.preventDefault();
    setMessage("");

    if (
      !selectedSlot ||
      !selectedTimeSlot ||
      !bookerName.trim() ||
      !bookerEmail.trim() ||
      !bookerPhone.trim()
    ) {
      setMessage("⚠️ Please fill in all fields, select a date and a time slot.");
      return;
    }

    setIsLoading(true);
    try {
      await bookSessionWithUser(userId, {
        date: `${selectedSlot} (${selectedTimeSlot})`,
        bookedBy: {
          name: bookerName,
          email: bookerEmail,
          phone: bookerPhone,
        },
      });
      setMessage("🎉 Booking confirmed successfully!");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setMessage(error.message || "⚠️ Failed to book session. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return (
      <motion.p
        className="text-center text-gray-500 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Loading user details...
      </motion.p>
    );
  }

  return (
    <motion.main
      className="flex flex-col items-center space-y-10 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white min-h-screen rounded-lg shadow-xl mt-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div className="flex flex-col items-center space-y-4">
        <motion.div whileHover={{ scale: 1.1 }}>
          <Image
            src={user.imageUrl || "/default-avatar.png"}
            alt={user.name}
            width={150}
            height={150}
            className="rounded-full border-4 border-blue-400 shadow-lg"
          />
        </motion.div>
        <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
        <p className="text-blue-300">📧 {user.email}</p>
      </motion.div>

      <motion.div
        className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2 className="text-xl font-semibold text-blue-400">📅 Select a Date</h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {slots.map((slot, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setSelectedSlot(slot);
                setSelectedTimeSlot(null); // reset time slot when date changes
              }}
              className={`p-3 rounded-lg transition-all shadow-lg text-sm ${
                selectedSlot === slot
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {slot}
            </motion.button>
          ))}
        </div>

        {selectedSlot && (
          <>
            <h2 className="text-md font-medium text-blue-300 mt-6">
              🕒 Select Time Slot
            </h2>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {timeSlots.map((time, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedTimeSlot(time)}
                  className={`p-2 rounded-lg text-sm transition-all shadow-md ${
                    selectedTimeSlot === time
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </>
        )}

        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Your Name"
            value={bookerName}
            onChange={(e) => setBookerName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={bookerEmail}
            onChange={(e) => setBookerEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            placeholder="Your Phone"
            value={bookerPhone}
            onChange={(e) => setBookerPhone(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </motion.div>

      {selectedSlot && selectedTimeSlot && (
        <p className="text-sm text-blue-300">
          You selected: <strong>{selectedSlot}</strong> at{" "}
          <strong>{selectedTimeSlot}</strong>
        </p>
      )}

      <motion.button
        onClick={handleBooking}
        className={`bg-blue-500 text-white py-2 px-6 rounded transition-all shadow-lg ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        whileHover={{ scale: isLoading ? 1 : 1.1 }}
        whileTap={{ scale: isLoading ? 1 : 0.9 }}
        disabled={isLoading}
      >
        {isLoading ? "Booking..." : "Confirm Booking 🚀"}
      </motion.button>

      {message && (
        <motion.p
          className="mt-4 text-center text-green-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {message}
        </motion.p>
      )}
    </motion.main>
  );
}
