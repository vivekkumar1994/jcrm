"use client";

import { Line, Bar, LineChart as ReLineChart, BarChart as ReBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 400, orders: 240 },
  { name: "Feb", sales: 300, orders: 221 },
  { name: "Mar", sales: 500, orders: 229 },
  { name: "Apr", sales: 700, orders: 200 },
];

export function LineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
      </ReLineChart>
    </ResponsiveContainer>
  );
}

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
        <Bar dataKey="orders" fill="#82ca9d" />
      </ReBarChart>
    </ResponsiveContainer>
  );
}
