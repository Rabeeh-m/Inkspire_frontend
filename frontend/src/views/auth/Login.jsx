import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../store/authSlice";
import axios from "../../utils/axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function Login() {
    const [bioData, setBioData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });

    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () => {
        setBioData({
            email: "",
            password: "",
        });
    };

    const setAuthUser = (accessToken, refreshToken) => {
        Cookies.set("access_token", accessToken, { expires: 1, secure: true });
        Cookies.set("refresh_token", refreshToken, {
            expires: 7,
            secure: true,
        });

        const user = jwtDecode(accessToken) ?? null;
        if (user) {
            dispatch(setUser(user));
        }
        dispatch(setLoading(false));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(setLoading(true));

        try {
            const response = await axios.post("user/token/", {
                email: bioData.email,
                password: bioData.password,
            });

            if (response && response.data) {
                const { access, refresh } = response.data;
                setAuthUser(access, refresh);

                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully",
                });

                navigate("/");
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: error.response?.data?.detail || "Something went wrong",
            });
            resetForm();
        } finally {
            setIsLoading(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <>
            <Header />
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Sign in
                    </h1>
                    <p className="text-sm text-center mb-6">
                        Don’t have an account?{" "}
                        <Link
                            to="/register/"
                            className="text-blue-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={bioData.email}
                                onChange={handleBioDataChange}
                                placeholder="johndoe@gmail.com"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={bioData.password}
                                onChange={handleBioDataChange}
                                placeholder="**************"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <Link
                                to="/forgot-password/"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex items-center justify-center px-4 py-2 text-white font-medium rounded-lg transition ${
                                    isLoading
                                        ? "bg-blue-300 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white mr-2"
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
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Login;
