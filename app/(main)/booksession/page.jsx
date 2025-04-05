'use client';

import { useEffect, useState } from "react";
import { getUserSessions } from "@/actions/user";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function UserSessionsPage() {
  const { user } = useUser();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      const result = await getUserSessions();
      setSessions(result || []);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📅 My Booked Sessions
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading...</p>
      ) : sessions.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No sessions found.</p>
      ) : (
        <motion.div
          className="overflow-x-auto shadow-2xl rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full table-auto border-collapse bg-white rounded-xl">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="p-4 text-left">📧 Email</th>
                <th className="p-4 text-left">📱 Phone</th>
                <th className="p-4 text-left">🗓️ Date</th>
                <th className="p-4 text-left">👤 Booked By</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, idx) => (
                <motion.tr
                  key={session.id}
                  className="hover:bg-indigo-50 transition duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="p-4 border-t">{session.email}</td>
                  <td className="p-4 border-t">{session.phone}</td>
                  <td className="p-4 border-t">{session.date}</td>
                  <td className="p-4 border-t">{session.bookedBy}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
