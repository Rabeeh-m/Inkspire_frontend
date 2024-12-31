
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import axios from "../../utils/axios";
import Swal from "sweetalert2";
import apiInstance from "../../utils/axios";

function Register() {
    const [bioData, setBioData] = useState({ full_name: "", email: "", password: "", password2: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () => {
        setBioData({
            full_name: "",
            email: "",
            password: "",
            password2: "",
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiInstance.post("user/register/", {
                full_name: bioData.full_name,
                email: bioData.email,
                password: bioData.password,
                password2: bioData.password2,
            });

            Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: response.data?.message || "You have successfully registered.",
            });

            resetForm();
            // navigate("/login/");
            navigate("/otp-verification/", { state: { email: bioData.email, full_name: bioData.full_name, password: bioData.password } });


        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.response?.data?.error || "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h1>
                    <p className="text-sm text-gray-600 mb-6">
                        Already have an account?{" "}
                        <Link to="/login/" className="text-blue-600 hover:underline">
                            Sign In
                        </Link>
                    </p>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={bioData.full_name}
                                onChange={handleBioDataChange}
                                placeholder="John Doe"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={bioData.email}
                                onChange={handleBioDataChange}
                                placeholder="johndoe@gmail.com"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={bioData.password}
                                onChange={handleBioDataChange}
                                placeholder="********"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={bioData.password2}
                                onChange={handleBioDataChange}
                                placeholder="********"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    Processing...
                                    <svg
                                        className="ml-2 w-4 h-4 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.042.624 3.933 1.691 5.506l2.309-1.215z"
                                        ></path>
                                    </svg>
                                </span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Register;
