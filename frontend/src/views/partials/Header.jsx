
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { clearUser } from "../../store/authSlice";
import { FaCrown, FaUser, FaPlusCircle, FaBell, FaCog, FaSignOutAlt, FaUserPlus, FaSignInAlt, FaChevronDown, FaCogs } from "react-icons/fa";
import { BiGrid, BiChat } from "react-icons/bi";
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
        <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
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
                            className="hover:text-blue-400 flex items-center space-x-2 transition duration-300 ease-in-out"
                        >
                            <span>Dashboard</span>
                            <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                            <div className="absolute top-full mt-2 bg-gray-900 text-white rounded-lg shadow-lg min-w-[200px] transform transition-all duration-300 ease-in-out">
                                <ul className="py-2">
                                    <li>
                                        <Link
                                            to="/dashboard/"
                                            className="block px-4 py-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                                        >
                                            <FaUser className="inline mr-2" />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/posts/"
                                            className="block px-4 py-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                                        >
                                            <BiGrid className="inline mr-2" />
                                            Posts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/add-post/"
                                            className="block px-4 py-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                                        >
                                            <FaPlusCircle className="inline mr-2" />
                                            Add Post
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/comments/"
                                            className="block px-4 py-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                                        >
                                            <BiChat className="inline mr-2" />
                                            Comments
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/notifications/"
                                            className="block px-4 py-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                                        >
                                            <FaBell className="inline mr-2" />
                                            Notifications
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/profile/"
                                            className="block px-4 py-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                                        >
                                            <FaCog className="inline mr-2" />
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/change-password"
                                            className="block px-4 py-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                                        >
                                            <FaCogs className="inline mr-2" />
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
                                className="bg-gradient-to-r from-white to-yellow-500 text-black px-5 py-2 rounded-full flex items-center space-x-2 shadow-lg hover:opacity-90 transition duration-300 ease-in-out"
                            >
                                <FaCrown className="text-yellow-700" />
                                <span>Upgrade</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 rounded-full hover:opacity-90 transition duration-300 ease-in-out"
                            >
                                Logout{" "}
                                <FaSignOutAlt className="inline ml-2" />
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
                                    className="h-10 w-10 rounded-full border-2 border-white hover:border-blue-400 transition duration-300 ease-in-out"
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/register/"
                                className="bg-gradient-to-r from-green-500 to-green-700 px-4 py-2 rounded-full hover:opacity-90 transition duration-300 ease-in-out"
                            >
                                Register{" "}
                                <FaUserPlus className="inline ml-2" />
                            </Link>
                            <Link
                                to="/login/"
                                className="bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 rounded-full hover:opacity-90 transition duration-300 ease-in-out"
                            >
                                Login{" "}
                                <FaSignInAlt className="inline ml-2" />
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;