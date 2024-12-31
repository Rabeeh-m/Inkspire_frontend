

import React, { useEffect, useState } from "react";
import apiInstance from "../../utils/axios";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await apiInstance.get("/admin/stats/");
      setStats(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
    <AdminHeader />
    <div className="flex h-screen bg-gray-100">
      
      <AdminSidebar />

      {/* Main Section */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              Total Users
            </h2>
            <p className="text-3xl font-bold text-blue-900">
              {stats ? stats.user_count : "..."}
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              Total Posts
            </h2>
            <p className="text-3xl font-bold text-blue-900">
              {stats ? stats.post_count : "..."}
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              Total Comments
            </h2>
            <p className="text-3xl font-bold text-blue-900">
              {stats ? stats.comment_count : "..."}
            </p>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default AdminDashboard;
