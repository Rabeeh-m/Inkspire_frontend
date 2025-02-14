import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Include React Quill styles

const modules = {
    toolbar: [
        // Text Styling
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
        [{ font: [] }], // Font selection
        [{ size: ["small", false, "large", "huge"] }], // Font sizes

        // Text Formatting
        ["bold", "italic", "underline", "strike"], // Bold, Italic, Underline, Strikethrough
        [{ color: [] }, { background: [] }], // Text and background colors
        [{ script: "sub" }, { script: "super" }], // Subscript/Superscript

        // Alignment and Indentation
        [{ list: "ordered" }, { list: "bullet" }], // Ordered and Bullet lists
        [{ indent: "-1" }, { indent: "+1" }], // Indentation
        [{ align: [] }], // Text alignment
    ],
};

function AddPost() {
    const [post, setCreatePost] = useState({
        image: "",
        title: "",
        description: "", // Stores the content from React Quill
        category: parseInt(""),
        tags: "",
        status: "Published",
        profile: "",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const userId = useUserData()?.user_id;

    const navigate = useNavigate();

    const fetchCategory = async () => {
        try {
            const response = await apiInstance.get(`post/category/list/`);
            setCategoryList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await apiInstance.get(`user/profile/${userId}/`);
            setProfileData(response.data);
            setCreatePost((prevPost) => ({
                ...prevPost,
                profile: response.data.id,
            }));
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchProfile();
    }, []);

    const handleCreatePostChange = (event) => {
        setCreatePost({
            ...post,
            [event.target.name]: event.target.value,
        });
    };

    const handleContentChange = (value) => {
        setCreatePost((prevPost) => ({
            ...prevPost,
            description: value, // Update the description with the React Quill content
        }));
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            // Check file type (e.g., image files only)
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(selectedFile.type)) {
                Toast("error", "Only image files (JPEG, PNG, GIF) are allowed.");
                event.target.value = ""; // Reset file input
                return;
            }
    
            // Check file size (max 2MB)
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (selectedFile.size > maxSize) {
                Toast("error", "File size exceeds the 2MB limit.");
                event.target.value = ""; // Reset file input
                return;
            }}

        const reader = new FileReader();

        setCreatePost({
            ...post,
            image: {
                file: event.target.files[0],
                preview: reader.result,
            },
        });
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleCreatePost = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (!post.title || !post.description || !post.image || !post.profile) {
            Toast("error", "All Fields Are Required To Create A Post");
            setIsLoading(false);
            return;
        }

        const formdata = new FormData();
        formdata.append("user_id", userId);
        formdata.append("title", post.title);
        formdata.append("image", post.image.file);
        formdata.append("description", post.description); // Send rich text content
        formdata.append("tags", post.tags);
        formdata.append("category", post.category);
        formdata.append("post_status", post.status);
        formdata.append("profile", post.profile);

        try {
            const response = await apiInstance.post(
                "author/dashboard/post-create/",
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            Swal.fire({
                icon: "success",
                title: "Post created successfully.",
            });
            setIsLoading(false);
            navigate("/posts/");
        } catch (error) {
            console.error("Error creating post:", error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-black to-purple-800 text-white p-6 rounded-lg mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-whitw">
                                    Create Blog Post
                                </h1>
                                <p className="text-sm ">
                                    Use the article builder below to write your
                                    article.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link
                                    to="/posts/"
                                    className="btn bg-white text-blue-600 font-semibold py-2 px-4 rounded"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i>{" "}
                                    Back to Posts
                                </Link>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleCreatePost} className="space-y-6">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Basic Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Preview
                                    </label>
                                    <img
                                        className="w-full h-80 object-cover rounded mt-2"
                                        src={
                                            imagePreview ||
                                            "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                                        }
                                        alt="Preview"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Thumbnail
                                    </label>
                                    <input
                                        onChange={handleFileChange}
                                        name="image"
                                        type="file"
                                        className="mt-2 block w-full  border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                        accept="image/png, image/jpeg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        onChange={handleCreatePostChange}
                                        name="title"
                                        type="text"
                                        className="mt-2 block w-full h-10 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <small className="text-gray-500">
                                        Write a 60 character post title.
                                    </small>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Posts category
                                    </label>
                                    <select
                                        onChange={handleCreatePostChange}
                                        name="category"
                                        className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">-------------</option>
                                        {categoryList?.map((c) => (
                                            <option key={c?.id} value={c?.id}>
                                                {c?.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Post Content
                                    </label>
                                    <ReactQuill
                                        value={post.description}
                                        onChange={handleContentChange}
                                        theme="snow"
                                        className="mt-2 mb-2 rounded-lg shadow-sm"
                                        style={{ height: "200px" }}
                                        modules={modules}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 pt-10">
                                        Tags
                                    </label>
                                    <input
                                        onChange={handleCreatePostChange}
                                        name="tags"
                                        type="text"
                                        className="mt-2 block w-full h-10 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        onChange={handleCreatePostChange}
                                        name="status"
                                        className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="Published">
                                            Published
                                        </option>
                                        <option value="Draft">Draft</option>
                                        <option value="Disabled">
                                            Disabled
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
                                isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>Creating Post...</>
                            ) : (
                                <>Create Post</>
                            )}
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default AddPost;
