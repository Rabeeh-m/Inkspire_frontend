import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";

const UserDetail = () => {
    const { userId } = useParams();
    const [userDetail, setUserDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserDetail = async () => {
        try {
            const response = await apiInstance.get(`/user/profile/${userId}/`);
            setUserDetail(response.data);
        } catch (error) {
            console.error(error);
            Toast("error", "Failed to fetch user details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center text-gray-500">Loading user details...</div>
            </div>
        );
    }

    if (!userDetail) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center text-gray-500">User not found.</div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
            <Header />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 text-center">
                        <div className="flex flex-col items-center">
                            <img
                                src={userDetail.profile_image}
                                alt={userDetail.full_name}
                                className="w-28 h-28 rounded-full object-cover shadow-md mb-4"
                            />
                            <h1 className="text-3xl font-bold text-gray-800">
                                {userDetail.full_name}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">{userDetail.bio}</p>
                        </div>
                        <div className="mt-6 border-t pt-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                About
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {userDetail.about || "No additional information provided."}
                            </p>
                        </div>
                        {/* <div className="mt-6">
                            <button className="px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition">
                                Follow
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserDetail;
