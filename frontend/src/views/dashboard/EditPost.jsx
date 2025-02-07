import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";

import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import Swal from "sweetalert2";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
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

function EditPost() {
    const [post, setEditPost] = useState({
        image: "",
        title: "",
        content: "",
        category: parseInt(""),
        tags: "",
        status: "",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useUserData()?.user_id;
    const navigate = useNavigate();
    const param = useParams();

    const fetchPost = async () => {
        const response = await apiInstance.get(
            `author/dashboard/post-detail/${userId}/${param.id}/`
        );
        setEditPost(response.data);
    };

    const fetchCategory = async () => {
        const response = await apiInstance.get(`post/category/list/`);
        setCategoryList(response.data);
    };

    useEffect(() => {
        fetchCategory();
        fetchPost();
    }, []);

    const handleCreatePostChange = (event) => {
        setEditPost({
            ...post,
            [event.target.name]: event.target.value,
        });
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

        setEditPost({
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
        if (!post.title || !post.content || !post.image) {
            Toast("error", "All Fields Are Required To Create A Post");
            setIsLoading(false);
            return;
        }

        const formdata = new FormData();

        formdata.append("user_id", userId);
        formdata.append("title", post.title);
        formdata.append("image", post.image.file);
        formdata.append("content", post.content);
        formdata.append("tags", post.tags);
        formdata.append("category", post.category.id);
        formdata.append("post_status", post.status);
        try {
            const response = await apiInstance.patch(
                `author/dashboard/post-detail/${userId}/${param.id}/`,
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setIsLoading(false);
            Swal.fire({
                icon: "success",
                title: "Post Updated successfully.",
            });
            navigate("/posts/");
        } catch (error) {
            setIsLoading(false);
        }
    };

    const handleContentChange = (value) => {
        setEditPost({
            ...post,
            content: value,
        });
    };

    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container mx-auto px-4">
                    <div className="mt-5">
                        <div className="bg-gradient-to-r from-black to-purple-800 text-white p-6 rounded-lg mb-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        Update Blog Post
                                    </h1>
                                    <p className="text-sm">
                                        Use the article builder below to update
                                        your article.
                                    </p>
                                </div>
                                <div className="flex space-x-4">
                                    <Link
                                        to="/posts/"
                                        className="btn bg-white text-blue-600 font-medium py-2 px-4 rounded-lg"
                                    >
                                        <i className="fas fa-arrow-left mr-2"></i>
                                        Back to Posts
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleCreatePost} className="mt-5">
                            <div className="bg-white border-2 border-gray-400 rounded-lg shadow-md p-6">
                                <h4 className="text-lg font-medium mb-4">
                                    Basic Information
                                </h4>
                                <div className="mb-4">
                                    <label
                                        htmlFor="postThumbnail"
                                        className="block font-medium mb-2"
                                    >
                                        Preview
                                    </label>
                                    <img
                                        className="w-full border-2 border-gray-400 h-80 object-cover rounded-lg mb-4"
                                        src={
                                            imagePreview || post.thumbnail_image
                                        }
                                        alt="Post Thumbnail Preview"
                                    />
                                    <input
                                        onChange={handleFileChange}
                                        name="image"
                                        id="postThumbnail"
                                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                        type="file"
                                        accept="image/png, image/jpeg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">
                                        Title
                                    </label>
                                    <input
                                        value={post.title}
                                        onChange={handleCreatePostChange}
                                        name="title"
                                        className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                                        type="text"
                                        placeholder="Write a 60 character post title."
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">
                                        Posts Category
                                    </label>
                                    <select
                                        name="category"
                                        value={post.category?.id}
                                        onChange={handleCreatePostChange}
                                        className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                                    >
                                        <option value="">-------------</option>
                                        {categoryList?.map((c) => (
                                            <option key={c?.id} value={c?.id}>
                                                {c?.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">
                                        Post Content
                                    </label>
                                    <ReactQuill
                                        value={post.content}
                                        onChange={handleContentChange}
                                        modules={modules}
                                        placeholder="Write your post content here..."
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">
                                        Tags
                                    </label>
                                    <input
                                        value={post.tags}
                                        onChange={handleCreatePostChange}
                                        name="tags"
                                        className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                                        type="text"
                                        placeholder="health, medicine, fitness"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={post.status}
                                        onChange={handleCreatePostChange}
                                        name="status"
                                        className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
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
                            {isLoading ? (
                                <button
                                    className="w-full bg-gray-400 text-white font-medium py-2 px-4 rounded-lg mt-4 flex justify-center items-center cursor-not-allowed"
                                    disabled
                                >
                                    Updating Post...
                                    <i className="fas fa-spinner fa-spin ml-2"></i>
                                </button>
                            ) : (
                                <button
                                    className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg mt-4 hover:bg-blue-700"
                                    type="submit"
                                >
                                    Update Post{" "}
                                    <i className="fas fa-check-circle ml-2"></i>
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default EditPost;
