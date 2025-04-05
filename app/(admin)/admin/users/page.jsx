// app/admin/users/page.js
import React from "react";

// Example mock data (replace with real data from your DB/API)
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export default function UsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full bg-white text-black rounded shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user, idx) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{idx + 1}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
