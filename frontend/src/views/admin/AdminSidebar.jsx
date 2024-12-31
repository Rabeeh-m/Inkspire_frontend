
import React from 'react';
import { FaTachometerAlt, FaUsers, FaFileAlt, FaComments, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear tokens from localStorage/sessionStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Redirect to login page
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b bg-gray-600 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 text-3xl font-bold border-b border-blue-800 text-center">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-6">
          <li>
            <Link to={'/admin/dashboard'}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              <FaTachometerAlt className="text-xl" />
              <span className="text-lg">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin/user-management'}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              <FaUsers className="text-xl" />
              <span className="text-lg">Users</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin/post-management'}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              <FaFileAlt className="text-xl" />
              <span className="text-lg">Posts</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              <FaComments className="text-xl" />
              <span className="text-lg">Comments</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-lg font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
