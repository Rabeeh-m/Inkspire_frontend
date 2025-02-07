
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import apiInstance from "../../utils/axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ChatSidebar = ({ profileId }) => {
    const [userProfiles, setUserProfiles] = useState([]);
    const accessToken = Cookies.get("access_token");

    const fetchProfiles = async () => {
        try {
            const response_user = await apiInstance.get("user/profiles/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUserProfiles(response_user.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query === "") {
            fetchProfiles();
        } else {
            const filtered = userProfiles.filter((p) =>
                p.full_name.toLowerCase().includes(query)
            );
            setUserProfiles(filtered);
        }
    };

    return (
        <div className="w-1/4 bg-white border-r border-gray-200 p-3">
            {/* Search Input */}
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-1.5 rounded-md w-full bg-gray-200 text-sm text-gray-700 focus:outline-none"
                    onChange={handleSearch}
                />
                <FaSearch className="text-gray-500 text-sm" />
            </div>

            {/* User Profiles */}
            <div className="mt-3 space-y-2">
                {userProfiles.map((profile) => (
                    <Link to={`/chat/${profile?.id}`} key={profile.id}>
                        <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            {/* Profile Picture */}
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
                                <img
                                    src={profile.profile_image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Profile Details */}
                            <div className="flex-1">
                                <div className="font-medium text-sm text-gray-700">
                                    {profile.full_name}
                                </div>
                                {/* <p className="text-green-700 text-xs">Online</p> */}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
