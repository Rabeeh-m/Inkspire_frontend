import React, { useState } from "react";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

const Upgrade = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10 px-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Choose Your Plan
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                    {/* Free Plan */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Free
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Get started with essential features at no cost
                        </p>
                        <div className="text-3xl font-bold text-gray-800 mb-4">
                            $0
                        </div>
                        <ul className="space-y-2 mb-6 text-gray-600">
                            <li>✅ Share articles with followers</li>
                            <li>✅ Create and manage articles</li>
                        </ul>
                        <button
                            className="bg-gray-800 text-white px-6 py-3 rounded-full w-full hover:bg-gray-900"
                            disabled
                        >
                            Current Plan
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                            Premium{" "}
                            <span className="ml-2 text-yellow-200">👑</span>
                        </h2>
                        <p className="text-white mb-6">
                            Unlock advanced features and tools
                        </p>
                        <div className="text-3xl font-bold text-white mb-4">
                            $9.99
                            <span className="text-xl font-medium">/month</span>
                        </div>
                        <ul className="space-y-2 mb-6 text-white">
                            <li>✅ All free tier benefits</li>
                            <li>✅ Join meetings with video and audio calls</li>
                            <li>
                                ✅ Enjoy unlimited following, likes, and
                                comments
                            </li>
                            <li>
                                ✅ Access exclusive content and advanced tools
                            </li>
                        </ul>
                        <Link
                            to="/checkout/"
                            className="bg-black text-yellow-400 px-6 py-3 rounded-full w-full hover:text-white hover:bg-gray-800 transition"
                        >
                            Purchase Plan
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upgrade;
