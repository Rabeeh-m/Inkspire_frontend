
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { clearUser } from "../../store/authSlice";
import { FaCrown } from "react-icons/fa";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allUserData } = useSelector((state) => state.auth);
    const isLoggedIn = !!allUserData;
    const [isOpen, setIsOpen] = useState(false);

    const [profileData, setProfileData] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    const userId = useUserData()?.user_id;

    const fetchProfile = async () => {
        try {
            if (!userId) {
                throw new Error("User ID is undefined. Please log in again.");
            }
            const response = await apiInstance.get(`user/profile/${userId}/`);
            if (response.data?.profile_image) {
                setProfileData(response.data.profile_image);
            } else {
                setProfileData(null); // Fallback when profile image is missing
                console.warn("Profile image is not available for this user.");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            setFetchError(true); // Indicate an error occurred
            if (error.response && error.response.status === 404) {
                console.warn(
                    "User profile not found. Please ensure the user exists."
                );
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchProfile();
        }
    }, [isLoggedIn]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        try {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            dispatch(clearUser());
            navigate("/login/");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    return (
        <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src="/inkspire_final_logo.png"
                        alt="Logo"
                        className="h-16 w-auto"
                    />
                </Link>

                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="hover:text-blue-400 flex items-center space-x-2"
                        >
                            <span>Dashboard</span>
                            <i className="bi bi-chevron-down"></i>
                        </button>
                        {isOpen && (
                            <div className="absolute top-full mt-2 bg-gray-700 text-white rounded shadow-lg min-w-[200px]">
                                <ul className="py-2">
                                    <li>
                                        <Link
                                            to="/dashboard/"
                                            className="block px-4 py-2 hover:bg-gray-600"
                                        >
                                            <i className="fas fa-user mr-2"></i>{" "}
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/posts/"
                                            className="block px-4 py-2 hover:bg-gray-600"
                                        >
                                            <i className="bi bi-grid-fill mr-2"></i>{" "}
                                            Posts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/add-post/"
                                            className="block px-4 py-2 hover:bg-gray-600"
                                        >
                                            <i className="fas fa-plus-circle mr-2"></i>{" "}
                                            Add Post
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/comments/"
                                            className="block px-4 py-2 hover:bg-gray-600"
                                        >
                                            <i className="bi bi-chat-left-quote-fill mr-2"></i>{" "}
                                            Comments
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/notifications/"
                                            className="block px-4 py-2 hover:bg-gray-600"
                                        >
                                            <i className="fas fa-bell mr-2"></i>{" "}
                                            Notifications
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/profile/"
                                            className="block px-4 py-2 hover:bg-gray-600"
                                        >
                                            <i className="fas fa-user-gear mr-2"></i>{" "}
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/change-password"
                                            className="block px-4 py-2 hover:bg-gray-600"
                                        >
                                            <i className="fas fa-user-gear mr-2"></i>{" "}
                                            Change Password
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/upgrade/"
                                className="bg-gradient-to-r from-white to-yellow-500 text-black px-5 py-2 rounded-full flex items-center space-x-2 shadow-lg hover:opacity-90"
                            >
                                <FaCrown className="text-yellow-500" />
                                <span>Upgrade</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-2 rounded-full hover:bg-red-700"
                            >
                                Logout{" "}
                                <i className="fas fa-sign-out-alt ml-2"></i>
                            </button>
                            <Link to="/profile/">
                                <img
                                    src={
                                        fetchError
                                            ? "https://via.placeholder.com/40?text=Error"
                                            : profileData ||
                                              "https://via.placeholder.com/40?text=No+Image"
                                    }
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full"
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/register/"
                                className="bg-green-500 px-4 py-2 rounded-full hover:bg-green-600"
                            >
                                Register{" "}
                                <i className="fas fa-user-plus ml-2"></i>
                            </Link>
                            <Link
                                to="/login/"
                                className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600"
                            >
                                Login{" "}
                                <i className="fas fa-sign-in-alt ml-2"></i>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
