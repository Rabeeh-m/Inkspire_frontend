import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";

function Profile() {
    const [profileData, setProfileData] = useState({
        image: null,
        full_name: "",
        bio: "",
        about: "",
    });
    const userId = useUserData()?.user_id;

    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode

    const fetchProfile = () => {
        try {
            apiInstance.get(`user/profile/${userId}/`).then((res) => {
                setProfileData(res.data);
                setImagePreview(res.data.profile_image);
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleProfileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        // Validate file size (less than 2MB)
        if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
            Toast("error", "File size must be less than 2MB", "");
            return;
        }

        // Validate file type (only PNG and JPEG allowed)
        const allowedTypes = ["image/png", "image/jpeg"];
        if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
            Toast("error", "Only PNG and JPEG files are allowed", "");
            return;
        }

        setProfileData({
            ...profileData,
            [event.target.name]: selectedFile,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        if (profileData.image) {
            formData.append("profile_image", profileData.image);
        }
        formData.append("full_name", profileData.full_name);
        formData.append("bio", profileData.bio);
        formData.append("about", profileData.about);

        try {
            await apiInstance.patch(`user/profile/${userId}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            Toast("success", "Profile updated successfully", "");
            setLoading(false);
            setIsEditing(false); // Exit edit mode
            fetchProfile(); // Refresh profile
        } catch (error) {
            console.error("Error updating profile:", error);
            Toast("error", "An Error Occurred", "");
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <section className="py-5">
                <div className="container mx-auto">
                    <div className="bg-white shadow-md rounded-lg">
                        {!isEditing ? (
                            // Profile Display Mode
                            <div className="p-6 text-center">
                                <img
                                    src={imagePreview || "default-avatar.jpg"}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full mx-auto object-cover"
                                />
                                <h2 className="text-2xl font-semibold mt-4">
                                    {profileData.full_name || "Full Name"}
                                </h2>
                                <p className="text-gray-600 text-md mt-2">
                                    {profileData?.user?.email}
                                </p>
                                <p className="text-gray-600 text-sm mt-2">
                                    {profileData.bio || "Short Bio"}
                                </p>
                                <p className="text-gray-500 mt-4">
                                    {profileData.about || "About Me"}
                                </p>
                                <button
                                    className="btn btn-primary mt-6 py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        ) : (
                            // Profile Edit Mode
                            <form className="p-6" onSubmit={handleFormSubmit}>
                                <div className="text-center mb-6">
                                    <img
                                        src={
                                            imagePreview || "default-avatar.jpg"
                                        }
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full mx-auto object-cover"
                                    />
                                    <input
                                        type="file"
                                        name="image"
                                        className="mt-3 p-2 border rounded-md w-full"
                                        onChange={handleFileChange}
                                        accept="image/png, image/jpeg"
                                    />
                                </div>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={profileData.full_name}
                                            onChange={handleProfileChange}
                                            className="form-control mt-2 p-3 border rounded-md w-full"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Bio
                                        </label>
                                        <input
                                            type="text"
                                            name="bio"
                                            value={profileData.bio}
                                            onChange={handleProfileChange}
                                            className="form-control mt-2 p-3 border rounded-md w-full"
                                            placeholder="Short Bio"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            About Me
                                        </label>
                                        <textarea
                                            name="about"
                                            value={profileData.about}
                                            onChange={handleProfileChange}
                                            className="form-control mt-2 p-3 border rounded-md w-full"
                                            placeholder="About Me"
                                            rows="4"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-between">
                                    <button
                                        className="btn btn-secondary py-2 px-6 text-gray-700 bg-gray-300 font-semibold rounded-md hover:bg-gray-400 transition"
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                                        type="submit"
                                    >
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
            {/* <Footer /> */}
        </>
    );
}

export default Profile;