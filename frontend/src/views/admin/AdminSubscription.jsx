import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import apiInstance from "../../utils/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi"; 

const AdminSubscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch subscriptions from the API
    const fetchSubscriptions = async () => {
        setLoading(true);
        try {
            const response = await apiInstance.get("admin/subscriptions/");
            setSubscriptions(response.data);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const handleUpdate = async (subscriptionId, updatedData) => {
        try {
            const response = await apiInstance.post(
                `admin/subscriptions/${subscriptionId}/`,
                updatedData
            );
            Swal.fire(
                "Updated!",
                "Subscription updated successfully.",
                "success"
            );
            fetchSubscriptions(); // Refresh the subscription list
        } catch (error) {
            console.error("Error updating subscription:", error);
            Swal.fire(
                "Error!",
                "Something went wrong. Try again later.",
                "error"
            );
        }
    };

    return (
        <>
            <AdminHeader />
            <div className="flex h-screen bg-gray-100">
                <AdminSidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h1 className="text-3xl font-semibold text-gray-700 mb-4">
                            Subscription Management
                        </h1>

                        {loading ? (
                            <p className="text-center text-gray-500">
                                Loading subscriptions...
                            </p>
                        ) : subscriptions.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b px-4 py-2">
                                            User Email
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            Plan
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            Status
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            Start Date
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            End Date
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscriptions.map((sub) => (
                                        <tr key={sub.id}>
                                            <td className="border-b px-4 py-2">
                                                {sub?.user?.email}
                                            </td>
                                            <td className="border-b px-4 py-2">
                                                {sub.plan}
                                            </td>
                                            <td className="border-b px-4 py-2">
                                                {sub.status}
                                            </td>
                                            <td className="border-b px-4 py-2">
                                                {new Date(
                                                    sub.start_date
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="border-b px-4 py-2">
                                                {sub.end_date
                                                    ? new Date(
                                                          sub.end_date
                                                      ).toLocaleDateString()
                                                    : "N/A"}
                                            </td>
                                            <td className="border-b px-4 py-2">
                                                <button
                                                    onClick={() =>
                                                        handleUpdate(sub.id, {
                                                            status:
                                                                sub.status ===
                                                                "active"
                                                                    ? "expired"
                                                                    : "active",
                                                        })
                                                    }
                                                    className={`px-4 py-2 rounded-lg text-white ${
                                                        sub.status === "active"
                                                            ? "bg-gray-600 hover:bg-gray-700"
                                                            : "bg-green-500 hover:bg-green-600"
                                                    }`}
                                                >
                                                    {sub.status === "active"
                                                        ? "Expire"
                                                        : "Activate"}
                                                </button>

                                                <Link
                                                    to={`/admin/subscriptions/${sub.id}/view`}
                                                    className="px-4 py-2 ml-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg inline-block text-center"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-500">
                                No subscriptions found.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default AdminSubscription;
