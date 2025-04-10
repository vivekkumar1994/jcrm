"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllUsers, updateUserTypeInDB } from "@/actions/user";
import { saveAs } from "file-saver";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
        setFilteredUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    let list = [...users];
    if (search.trim()) {
      list = list.filter(
        (user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    list.sort((a, b) => {
      const valA = a[sortKey]?.toString().toLowerCase() || "";
      const valB = b[sortKey]?.toString().toLowerCase() || "";
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    setFilteredUsers(list);
    setCurrentPage(1);
  }, [search, sortKey, sortOrder, users]);

  const handleUserTypeChange = async (userId, newType) => {
    try {
      const updatedUser = await updateUserTypeInDB(userId, newType);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === updatedUser.id ? { ...user, userType: updatedUser.userType } : user
        )
      );
      alert(`User type updated to ${newType}`);
    } catch (err) {
      console.error("Error updating user type:", err);
      alert("Failed to update user type.");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Industry",
      "User Type",
      "Experience",
      "Bio",
      "Skills",
    ];
    const csvRows = [
      headers.join(","),
      ...filteredUsers.map((user) =>
        [
          user.name,
          user.email,
          user.industry,
          user.userType,
          user.experience,
          user.bio?.replace(/\n/g, " ").replace(/,/g, ";"),
          user.skills?.join(" ") ?? "",
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "users.csv");
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border rounded px-3 py-2 w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="industry">Industry</option>
          <option value="userType">User Type</option>
        </select>
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="border px-4 py-2 rounded bg-gray-100"
        >
          {sortOrder === "asc" ? "Asc" : "Desc"}
        </button>
        <button
          onClick={exportToCSV}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download CSV
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black rounded shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">#</th>
                <th className="p-3">Avatar</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Industry</th>
                <th className="p-3">User Type</th>
                <th className="p-3">Experience (Yrs)</th>
                <th className="p-3">Bio</th>
                <th className="p-3">Skills</th>
                <th className="p-3">Joined On</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, idx) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    {(currentPage - 1) * usersPerPage + idx + 1}
                  </td>
                  <td className="p-3">
                    {user.imageUrl ? (
                      <Image
                        src={user.imageUrl}
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="p-3">{user.name || "N/A"}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.industry || "N/A"}</td>
                  <td className="p-3">
                    <select
                      className="border rounded px-2 py-1"
                      value={user.userType || ""}
                      onChange={(e) =>
                        handleUserTypeChange(user.id, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Internship">Internship</option>
                      <option value="Experienced">Experienced</option>
                    </select>
                  </td>
                  <td className="p-3">{user.experience ?? "N/A"}</td>
                  <td className="p-3 max-w-xs overflow-auto">
                    {user.bio || "N/A"}
                  </td>
                  <td className="p-3">
                    {user.skills?.length > 0
                      ? user.skills.join(", ")
                      : "N/A"}
                  </td>
                  <td className="p-3">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <button
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
