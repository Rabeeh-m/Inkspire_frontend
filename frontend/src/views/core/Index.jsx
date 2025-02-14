import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import Moment from "../../plugin/Moment";
import apiInstance from "../../utils/axios";
import DOMPurify from "dompurify";
import Toast from "../../plugin/Toast";
import Cookies from "js-cookie";
import { Pagination } from "@mui/material"; // Import Pagination component
import { motion } from "framer-motion";

const blogWords = ["Write", "Inkspire", "Create", "Express", "Blog"]; // Words to animate

const Index = () => {
    const [posts, setPosts] = useState([]);
    const [popular_posts, setPopularPosts] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [postsPerPage] = useState(5); // Number of posts per page
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle

    const accessToken = Cookies.get("access_token");

    const fetchProfiles = async () => {
        try {
            const response_user = await apiInstance.get(`user/profiles/`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUserProfiles(response_user.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPosts = async () => {
        try {
            const response_post = await apiInstance.get("post/lists/");
            const response_popular_posts =
                await apiInstance.get("post/popular-post/");
            setPosts(response_post.data);
            setPopularPosts(response_popular_posts.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPosts();
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

    const getSanitizedContent = (content) => {
        const truncatedContent =
            content.length > 100 ? content.slice(0, 300) + "..." : content;
        return DOMPurify.sanitize(truncatedContent);
    };

    const handleFollowToggle = async (profileId) => {
        try {
            const response = await apiInstance.post(
                `profile/${profileId}/follow/`,
                {},
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            Toast("success", response.data.detail);
            fetchProfiles(); // Refresh profiles to reflect changes
        } catch (error) {
            console.error(error);
            Toast("error", "An error occurred. Please try again.");
        }
    };

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const [wordIndex, setWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const typingSpeed = deleting ? 100 : 150; // Typing and deleting speed

        const updateText = () => {
            const currentWord = blogWords[wordIndex];

            if (!deleting) {
                setDisplayedText((prev) =>
                    currentWord.substring(0, prev.length + 1)
                );
                if (displayedText === currentWord)
                    setTimeout(() => setDeleting(true), 1000);
            } else {
                setDisplayedText((prev) =>
                    currentWord.substring(0, prev.length - 1)
                );
                if (displayedText === "") {
                    setDeleting(false);
                    setWordIndex((prev) => (prev + 1) % blogWords.length);
                }
            }
        };

        const timer = setTimeout(updateText, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, deleting, wordIndex]);

    return (
        <section className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            {/* Mobile Sidebar Toggle Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md shadow-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                ☰
            </button>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar (Hidden on Mobile) */}
                    <aside
                        className={`${
                            isSidebarOpen ? "block" : "hidden"
                        } lg:block lg:col-span-2 bg-white shadow-md rounded-lg p-4 sticky top-0 h-screen overflow-y-auto`}
                    >
                        {/* Navigation Links */}
                        <nav className="space-y-2">
                            <Link
                                to="/"
                                className="block py-2 px-4 rounded-md bg-gray-100 text-gray-900 hover:bg-blue-500 hover:text-white transition"
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className="block py-2 px-4 rounded-md bg-gray-100 text-gray-900 hover:bg-blue-500 hover:text-white transition"
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="block py-2 px-4 rounded-md bg-gray-100 text-gray-900 hover:bg-blue-500 hover:text-white transition"
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Animated Blog Section */}
                        <div className="mt-6 relative h-[350px] flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow-inner overflow-hidden">
                            {/* Typewriter Text */}
                            <h2 className="text-2xl font-bold text-gray-800">
                                <span>{displayedText}</span>
                                <span className="animate-ping">|</span>{" "}
                                {/* Blinking cursor */}
                            </h2>

                            {/* Floating Icons */}
                            <motion.div
                                className="absolute top-8 left-6 text-2xl"
                                animate={{
                                    y: [0, 20, 0],
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut",
                                }}
                            >
                                📝 {/* Writing Sheet */}
                            </motion.div>
                            <motion.div
                                className="absolute top-17 right-10 text-2xl"
                                animate={{
                                    y: [-10, 15, -10],
                                    rotate: [0, -15, 15, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut",
                                }}
                            >
                                ✍️ {/* Writing Hand */}
                            </motion.div>
                            <motion.div
                                className="absolute bottom-6 left-16 text-2xl"
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 5,
                                    ease: "easeInOut",
                                }}
                            >
                                📖 {/* Open Book */}
                            </motion.div>
                            <motion.div
                                className="absolute top-20 left-36 text-2xl"
                                animate={{
                                    y: [5, -10, 5],
                                    rotate: [-10, 5, -5, 10],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "easeInOut",
                                }}
                            >
                                🖊️ {/* Quill Pen */}
                            </motion.div>
                            <motion.div
                                className="absolute bottom-12 right-5 text-2xl"
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [50, 15, -15, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 5.5,
                                    ease: "easeInOut",
                                }}
                            >
                                💻 {/* Laptop */}
                            </motion.div>
                            <motion.div
                                className="absolute bottom-16 left-6 text-2xl"
                                animate={{
                                    y: [-10, 10, -10],
                                    rotate: [0, -5, 5, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 7,
                                    ease: "easeInOut",
                                }}
                            >
                                💬 {/* Speech Bubble */}
                            </motion.div>
                            <motion.div
                                className="absolute top-10 right-15 text-2xl"
                                animate={{
                                    y: [10, -10, 10],
                                    rotate: [-10, 5, -5, 10],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "easeInOut",
                                }}
                            >
                                📰 {/* Newspaper */}
                            </motion.div>
                        </div>
                    </aside>

                    {/* Main Content (Full Width on Mobile) */}
                    <main className="col-span-12 lg:col-span-7 overflow-y-auto">
                        {/* Hero Section */}
                        <section className="mb-8">
                            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-lg p-8 shadow-xl">
                                <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                                    Welcome to Inkspire
                                </h1>
                                <p className="text-lg lg:text-xl font-light mb-6">
                                    Your go-to platform for inspiration, insights, and stories. Dive in to explore more!
                                </p>
                                
                            </div>
                        </section>

                        {/* Featured Articles */}
                        <section className="mb-12">
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                                Featured Articles
                            </h1>
                            {currentPosts?.map((post) => (
                                <div
                                    className="mb-6 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                    key={post?.id}
                                >
                                    <Link to={post.slug}>
                                        <div className="p-6">
                                            {/* Author Info */}
                                            <div className="flex items-center mb-4">
                                                <img
                                                    src={
                                                        post?.profile
                                                            ?.profile_image ||
                                                        "Unknown User"
                                                    }
                                                    alt="Author Profile"
                                                    className="w-10 h-10 rounded-full object-cover mr-3"
                                                />
                                                <div className="text-sm">
                                                    <p className="font-semibold text-gray-800">
                                                        {post?.profile
                                                            ?.full_name ||
                                                            "Unknown User"}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {post?.profile?.bio ||
                                                            ""}
                                                    </p>
                                                    <p className="text-gray-400">
                                                        {Moment(
                                                            post.created_at
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Thumbnail */}
                                            <div className="relative">
                                                <img
                                                    src={post.thumbnail_image}
                                                    className="w-full h-48 object-cover rounded-lg"
                                                />
                                            </div>

                                            {/* Post Content */}
                                            <div className="mt-4">
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    {post.title}
                                                </h3>
                                                <div
                                                    className="text-gray-600 mt-3"
                                                    dangerouslySetInnerHTML={{
                                                        __html: getSanitizedContent(
                                                            post.content
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                            {/* Pagination */}
                            <div className="flex justify-center mt-8">
                                <Pagination
                                    count={Math.ceil(
                                        posts.length / postsPerPage
                                    )}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </div>
                        </section>
                    </main>

                    {/* Right Sidebar (Hidden on Mobile) */}
                    <aside className="hidden lg:block lg:col-span-3 bg-white shadow-md rounded-lg p-4 sticky top-0 h-screen overflow-y-auto">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                People to Follow
                            </h2>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => handleSearch(e)}
                            />

                            <div className="mt-4">
                                {userProfiles.map((profile) => (
                                    <div
                                        key={profile.id}
                                        className="flex items-center justify-between p-4 border-b"
                                    >
                                        <Link
                                            to={`/user/${profile?.user?.id}/`}
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={profile.profile_image}
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div className="ml-3">
                                                    <h3 className="font-semibold">
                                                        {profile.full_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {profile.bio}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleFollowToggle(profile.id)
                                            }
                                            className={`px-4 py-1 text-sm rounded ${
                                                profile.is_following
                                                    ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                            }`}
                                        >
                                            {profile.is_following
                                                ? "Unfollow"
                                                : "Follow"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </section>
    );
};

export default Index;
