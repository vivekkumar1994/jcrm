"use client";

import { BarChart, LineChart } from "@/components/ui/charts";
import { Card, CardContent } from "@/components/ui/card";


export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
    

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-3xl font-bold">1,234</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold">Revenue</h2>
              <p className="text-3xl font-bold">$12,345</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold">Orders</h2>
              <p className="text-3xl font-bold">567</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">Sales Over Time</h2>
              <LineChart />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">Product Sales</h2>
              <BarChart />
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <div className="mt-6">
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2">Order ID</th>
                      <th className="p-2">Customer</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">#12345</td>
                      <td className="p-2">John Doe</td>
                      <td className="p-2">$120</td>
                      <td className="p-2 text-green-500">Completed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">#12346</td>
                      <td className="p-2">Jane Smith</td>
                      <td className="p-2">$90</td>
                      <td className="p-2 text-yellow-500">Pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
