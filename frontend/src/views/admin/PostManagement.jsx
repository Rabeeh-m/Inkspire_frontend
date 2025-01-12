import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import apiInstance from "../../utils/axios";
import Swal from "sweetalert2";
import { FiTrash2 } from "react-icons/fi";

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch posts from API
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await apiInstance.get("admin/posts-list/");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query === "") {
            fetchPosts();
        } else {
            const filtered = posts.filter((p) =>
                p.title.toLowerCase().includes(query)
            );
            setPosts(filtered);
        }
    };

    const handleDelete = async (postId) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await apiInstance.delete(`admin/post-delete/${postId}/`);
                setPosts(posts.filter((post) => post.id !== postId));
                Swal.fire("Deleted!", "The post has been deleted.", "success");
            } catch (error) {
                Swal.fire(
                    "Error!",
                    "Something went wrong. Try again later.",
                    "error"
                );
            }
        }
    };

    return (
        <>
            <AdminHeader />
            <div className="flex h-screen bg-gray-100">
                <AdminSidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Posts Management */}
                    <div className="bg-white p-6 rounded shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-3xl font-semibold text-gray-700">
                                Posts Management
                            </h2>
                        </div>

                        {/* Search */}
                        <div
                            onSubmit={handleSearch}
                            className="flex items-center mb-6"
                        >
                            <input
                                type="text"
                                className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Search posts..."
                                onChange={(e) => handleSearch(e)}
                            />
                        </div>

                        {/* Post List */}
                        {loading ? (
                            <p className="text-center text-gray-500">
                                Loading posts...
                            </p>
                        ) : posts.length > 0 ? (
                            <div className="space-y-4">
                                {posts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16  flex items-center justify-center text-blue-500 font-bold text-lg">
                                                {/* {post.title.charAt(0).toUpperCase()} */}
                                                <img
                                                    src={post.thumbnail_image}
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {post.status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Link
                                                to={`/admin/post-edit/${post.id}`}
                                            >
                                                <button className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600">
                                                    Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(post.id)
                                                }
                                                title="Delete"
                                                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 flex items-center gap-1"
                                            >
                                                <FiTrash2 className="text-lg" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">
                                No posts found.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default PostManagement;
