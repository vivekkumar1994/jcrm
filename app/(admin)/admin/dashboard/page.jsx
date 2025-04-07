'use client';

import { useEffect, useState } from "react";
import { getAllUserDetails } from "@/actions/user";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getAllUserDetails();
      setUsers(data);
    }

    fetchData();
  }, []);

  const industries = Array.from(new Set(users.map((u) => u.industry).filter(Boolean)));

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = industryFilter ? user.industry === industryFilter : true;

    return matchesSearch && matchesIndustry;
  });

  const totalAssessments = users.reduce((sum, u) => sum + (u.assessments?.length || 0), 0);
  const totalSessions = users.reduce((sum, u) => sum + (u.sessions?.length || 0), 0);
  const totalResumes = users.reduce((sum, u) => (u.resume ? sum + 1 : sum), 0);
  const avgExperience = (
    users.reduce((sum, u) => sum + (u.experience || 0), 0) / (users.length || 1)
  ).toFixed(1);
  const topSkill = getTopSkill(users);

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-7">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">🧑‍💼 Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatsCard title="Total Users" value={users.length} emoji="👥" />
        <StatsCard title="Total Resumes" value={totalResumes} emoji="📄" />
        <StatsCard title="Total Assessments" value={totalAssessments} emoji="📝" />
        <StatsCard title="Total Sessions" value={totalSessions} emoji="📅" />
        <StatsCard title="Avg. Experience" value={`${avgExperience} yrs`} emoji="📊" />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
        >
          <option value="">All Industries</option>
          {industries.map((ind, i) => (
            <option key={i} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Highlight top skill */}
      {topSkill && (
        <p className="mb-6 text-sm text-gray-600">
          🔝 Most common skill: <span className="font-medium text-indigo-600">{topSkill}</span>
        </p>
      )}

      {/* User Cards */}
      {filteredUsers.map((user) => {
        const lastSessionDate = user.sessions?.slice(-1)[0]?.date;
        const lastSessionDaysAgo = lastSessionDate
          ? Math.floor((Date.now() - new Date(lastSessionDate)) / (1000 * 60 * 60 * 24))
          : null;
        const isActive = lastSessionDaysAgo !== null && lastSessionDaysAgo < 30;

        return (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold">
                  ?
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-indigo-700">{user.name || "Unnamed"}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span
                  className={`inline-block text-xs mt-1 px-2 py-1 rounded-full ${
                    isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {isActive ? "Active Recently" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
              <p><strong>Industry:</strong> {user.industry || "N/A"}</p>
              <p><strong>Experience:</strong> {user.experience || 0} years</p>
              <p><strong>Skills:</strong> {user.skills?.join(", ") || "None listed"}</p>
              <p><strong>Bio:</strong> {user.bio || "N/A"}</p>
              <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
            </div>

            {/* Resume */}
            {user.resume && (
              <div className="text-sm text-gray-800 mb-3">
                <p className="font-medium">📄 Resume:</p>
                <div className="ml-4 text-gray-600">
                  <p><strong>Title:</strong> {user.resume.title || "Untitled"}</p>
                  <p><strong>Summary:</strong> {user.resume.summary || "No summary provided"}</p>
                  {user.resume.url && (
                    <a
                      href={user.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Cover Letters */}
            {user.coverLetter?.length > 0 && (
              <div className="text-sm text-gray-800 mb-3">
                <p className="font-medium">📬 Cover Letters ({user.coverLetter.length}):</p>
                <ul className="ml-4 list-disc text-gray-600">
                  {user.coverLetter.map((cl, idx) => (
                    <li key={idx}>
                      <strong>{cl.title || `Cover Letter ${idx + 1}`}</strong>:{" "}
                      {cl.content?.slice(0, 80)}...
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Assessments */}
            {user.assessments?.length > 0 && (
              <div className="text-sm text-gray-800 mb-3">
                <p className="font-medium">📝 Assessments ({user.assessments.length}):</p>
                <ul className="ml-4 list-disc text-gray-600">
                  {user.assessments.map((a, idx) => (
                    <li key={idx}>
                      <strong>{a.topic}</strong> — Score: {a.score}/100
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sessions */}
            {user.sessions?.length > 0 && (
              <div className="text-sm text-gray-800">
                <p className="font-medium">📅 Sessions ({user.sessions.length}):</p>
                <ul className="ml-4 list-disc text-gray-600">
                  {user.sessions.map((s, idx) => (
                    <li key={idx}>
                      With <strong>{s.coachName}</strong> on{" "}
                      {new Date(s.date).toLocaleDateString()} at{" "}
                      {new Date(s.date).toLocaleTimeString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function StatsCard({ title, value, emoji }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow text-center border border-gray-200 hover:shadow-md transition">
      <p className="text-2xl">{emoji}</p>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-xl font-bold text-indigo-600">{value}</p>
    </div>
  );
}

function getTopSkill(users) {
  const skillMap = {};
  users.forEach((u) => {
    (u.skills || []).forEach((skill) => {
      skillMap[skill] = (skillMap[skill] || 0) + 1;
    });
  });
  const top = Object.entries(skillMap).sort((a, b) => b[1] - a[1])[0];
  return top?.[0] || null;
}
