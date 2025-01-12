import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import apiInstance from "../../utils/axios";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch users from API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await apiInstance.get("admin/users-list/");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query === "") {
            fetchUsers();
        } else {
            const filtered = users.filter((u) =>
                u.full_name.toLowerCase().includes(query)
            );
            setUsers(filtered);
        }
    };

    const handleBlockUnblock = async (user) => {
        try {
            await apiInstance.post(`admin/user-block-unblock/${user.id}/`, {
                is_active: !user.is_active,
            });
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error("Error blocking/unblocking user:", error);
        }
    };

    const handleDelete = async (user) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await apiInstance.delete(`admin/user-delete/${user.id}/`);
                setUsers(users.filter((u) => u.id !== user.id));
                Swal.fire("Deleted!", "The user has been deleted.", "success");
            } catch (error) {
                Swal.fire(
                    "Error!",
                    "Something went wrong. Try again later.",
                    "error"
                );
            }
        }
    };

    return (
        <>
            <AdminHeader />
            <div className="flex h-screen bg-gray-100">
                <AdminSidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* User Management */}
                    <div className="bg-white p-6 rounded shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-3xl font-semibold text-gray-700">
                                User Management
                            </h1>
                            {/* <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={() => alert("Add User functionality not implemented yet!")}
              >
                Add User
              </button> */}
                        </div>

                        {/* Search */}
                        <div className="flex items-center mb-6">
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-2 flex-1"
                                placeholder="Search users..."
                                onChange={(e) => handleSearch(e)}
                            />
                        </div>

                        {/* User List */}
                        {loading ? (
                            <p className="text-center text-gray-500">
                                Loading users...
                            </p>
                        ) : users.length > 0 ? (
                            <div className="space-y-4">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-lg">
                                                {user.username
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium">
                                                    {user.full_name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() =>
                                                    handleBlockUnblock(user)
                                                }
                                                className={`px-4 py-2 rounded-lg text-white ${
                                                    user.is_active
                                                        ? "bg-gray-600 hover:bg-gray-700"
                                                        : "bg-green-500 hover:bg-green-600"
                                                }`}
                                            >
                                                {user.is_active
                                                    ? "Block"
                                                    : "Unblock"}
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(user)
                                                }
                                                title="Delete"
                                                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 flex items-center gap-1"
                                            >
                                                <FiTrash2 className="text-lg" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">
                                No users found.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default UserManagement;
