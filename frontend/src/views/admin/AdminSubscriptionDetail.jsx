import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import apiInstance from "../../utils/axios";
import Swal from "sweetalert2";

const AdminSubscriptionDetail = () => {
  const { id } = useParams(); // Get subscription ID from the URL
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await apiInstance.get(`admin/subscriptions/${id}/detail/`);
        setSubscription(response.data);
      } catch (error) {
        console.error("Error fetching subscription details:", error);
        Swal.fire("Error!", "Failed to load subscription details.", "error");
        navigate("/admin/subscriptions");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptionDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-gray-500">Loading subscription details...</p>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-gray-500">No subscription found.</p>
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-8">
            <h1 className="text-4xl font-bold">Subscription Details</h1>
            <p className="text-sm mt-2">
              A detailed overview of the subscription and related content.
            </p>
          </div>

          {/* Subscription Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Subscription Information
            </h2>
            <table className="w-full table-auto text-left text-sm text-gray-600">
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">User Email:</td>
                  <td className="px-4 py-2">{subscription.user.email}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-700">Full Name:</td>
                  <td className="px-4 py-2">{subscription.user.full_name || "N/A"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Plan:</td>
                  <td className="px-4 py-2">{subscription.plan}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-700">Status:</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 text-sm rounded-lg ${
                        subscription.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Start Date:</td>
                  <td className="px-4 py-2">
                    {new Date(subscription.start_date).toLocaleDateString()}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-700">End Date:</td>
                  <td className="px-4 py-2">
                    {subscription.end_date
                      ? new Date(subscription.end_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Subscription Benefits
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Access to premium content and advanced features.</li>
              <li>Unlimited interactions and collaboration tools.</li>
              <li>Priority customer support.</li>
              <li>Exclusive access to new features and updates.</li>
            </ul>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Transaction History
            </h2>
            {subscription.transactions && subscription.transactions.length > 0 ? (
              <table className="w-full table-auto text-left text-sm text-gray-600">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 font-medium">Date</th>
                    <th className="px-4 py-2 font-medium">Amount</th>
                    <th className="px-4 py-2 font-medium">Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {subscription.transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="px-4 py-2">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">${transaction.amount}</td>
                      <td className="px-4 py-2">{transaction.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No transactions available.</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate("/admin/subscriptions")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Back to Subscriptions
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminSubscriptionDetail;
