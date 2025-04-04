"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUserById, bookSessionWithUser } from "@/actions/session";
import Image from "next/image";
import { motion } from "framer-motion";
import { format, addDays } from "date-fns";

export default function SessionPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [user, setUser] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchUser() {
      if (userId) {
        const data = await getUserById(userId);
        setUser(data);
      }
    }
    fetchUser();
  }, [userId]);

  const slots = Array.from({ length: 7 }, (_, i) => {
    return format(addDays(new Date(), i), "EEEE, MMM d");
  });

  async function handleBooking(e) {
    e.preventDefault();
    if (!selectedSlot) {
      setMessage("⚠️ Please select a slot.");
      return;
    }
    try {
      await bookSessionWithUser(userId, { date: selectedSlot });
      setMessage("🎉 Booking confirmed successfully!");
    } catch (error) {
      setMessage("⚠️ Failed to book session. Try again.");
    }
  }

  if (!user)
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

      {/* Booking Slots */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2 className="text-xl font-semibold text-blue-400">📅 Select a Slot</h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {slots.map((slot, index) => (
            <motion.button 
              key={index}
              onClick={() => setSelectedSlot(slot)}
              className={`p-3 rounded-lg transition-all shadow-lg text-sm ${
                selectedSlot === slot ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {slot}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Booking Button */}
      <motion.button 
        onClick={handleBooking} 
        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-all shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Confirm Booking 🚀
      </motion.button>

      {/* Message */}
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
