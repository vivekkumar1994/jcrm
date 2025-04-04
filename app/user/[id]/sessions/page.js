"use client";

import { useState, useEffect } from "react";
import { getUserSessions } from "@/actions/session";
import { useParams } from "next/navigation";

export default function UserSessions() {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      const data = await getUserSessions(id);
      setSessions(data);
    }
    fetchSessions();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Booked Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-center text-gray-500">No sessions booked yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Booked By</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="text-center">
                <td className="border p-2">{session.bookedBy}</td>
                <td className="border p-2">{session.email}</td>
                <td className="border p-2">{session.phone}</td>
                <td className="border p-2">{new Date(session.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
