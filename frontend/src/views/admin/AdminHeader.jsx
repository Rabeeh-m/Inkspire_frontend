import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <header className="w-full bg-gradient-to-r bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        {/* Branding */}
        <img src="/inkspire_final_logo.png" alt="Logo" className=" h-12"/>

        {/* Profile & Notifications */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition duration-300">
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:inline">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
