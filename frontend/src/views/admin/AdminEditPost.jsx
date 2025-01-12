import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";
import AdminHeader from "./AdminHeader";

const AdminEditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        image: "",
        title: "",
        content: "",
        category: "",
        tags: "",
        status: "",
    });
    const [categoryList, setCategoryList] = useState([]);
    const [imagePreview, setImagePreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Post Data
    const fetchPostDetails = async () => {
        try {
            const response = await apiInstance.get(`admin/posts/${id}/`);
            setPost(response.data);
            setImagePreview(response.data.image);
        } catch (error) {
            Toast("error", "Failed to load post details.");
        }
    };

    // Fetch Category List
    const fetchCategories = async () => {
        try {
            const response = await apiInstance.get(`/post/category/list/`);
            setCategoryList(response.data);
        } catch (error) {
            Toast("error", "Failed to load categories.");
        }
    };

    useEffect(() => {
        fetchPostDetails();
        fetchCategories();
    }, [id]);

    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    // Handle File Change
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onloadend = () => setImagePreview(reader.result);
    //     if (file) reader.readAsDataURL(file);

    //     setPost({ ...post, image: file });
    // };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (selectedFile) {
            setPost({ ...post, image: selectedFile });
            reader.readAsDataURL(selectedFile);
        }
    };

    // Update Post
    const handleUpdatePost = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("content", post.content);
        formData.append("category", post.category);
        formData.append("tags", post.tags);
        formData.append("status", post.status);
        if (post.image instanceof File) {
            formData.append("image", post.image);
        }

        try {
            await apiInstance.patch(`/admin/posts/${id}/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Swal.fire("Success", "Post updated successfully!", "success");
            navigate("/admin/post-management");
        } catch (error) {
            Toast("error", "Failed to update the post.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AdminHeader />
            <section className="pt-5 pb-5">
                <div className="container mx-auto px-4">
                    <div className="bg-blue-600 text-white rounded-lg p-6 mb-5">
                        <h1 className="text-2xl font-bold">Edit Post</h1>
                        <p className="text-sm">
                            Admin: Update post details below.
                        </p>
                    </div>
                    <form onSubmit={handleUpdatePost}>
                        <div className="bg-white border-2 border-gray-400 rounded-lg shadow-md p-6">
                            <h4 className="text-lg font-medium mb-4">
                                Edit Post Information
                            </h4>

                            <div className="mb-4">
                                <label className="block font-medium mb-2">
                                    Thumbnail
                                </label>
                                <img
                                    src={imagePreview || post.thumbnail_image}
                                    alt="Post Thumbnail"
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                                <input
                                    type="file"
                                    name="image"
                                    id="postThumbnail"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block font-medium mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={post.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block font-medium mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={post.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="">Select Category</option>
                                    {categoryList.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block font-medium mb-2">
                                    Content
                                </label>
                                <textarea
                                    name="content"
                                    value={post.content}
                                    onChange={handleInputChange}
                                    rows="6"
                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600"
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block font-medium mb-2">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={post.tags}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block font-medium mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={post.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Disabled">Disabled</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2 px-4 mt-4 rounded-lg text-white font-medium ${
                                isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update Post"}
                        </button>
                    </form>
                    <Link
                        to={"/admin/post-management"}
                        className="mt-4 block text-center text-blue-600 hover:underline"
                    >
                        Back to Posts Management
                    </Link>
                </div>
            </section>
        </>
    );
};

export default AdminEditPost;
