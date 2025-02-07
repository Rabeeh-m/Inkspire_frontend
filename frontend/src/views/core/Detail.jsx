import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Moment, { timeAgo } from "../../plugin/Moment";
import Toast from "../../plugin/Toast";
import useUserData from "../../plugin/useUserData";
import Swal from "sweetalert2";

import {
    FaHeart,
    FaRegHeart,
    FaBookmark,
    FaRegBookmark,
    FaShareAlt,
} from "react-icons/fa";

const Detail = () => {
    const [post, setPost] = useState(null);
    const [tags, setTags] = useState([]);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyContent, setReplyContent] = useState("");
    const [activeReply, setActiveReply] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    


    const param = useParams(); // Get post slug from URL
    const userId = useUserData()?.user_id;
    const navigate = useNavigate();

    // Fetch Post and Comments
    const fetchPost = async () => {
        try {
            const response = await apiInstance.get(
                `post/detail/${param.slug}/`
            );
            setPost(response.data);
            setComments(response.data.comments || []);
            const tagArray = response?.data?.tags?.split(",");
            setTags(tagArray || []);
        } catch (error) {
            console.error("Error fetching post:", error);
            setPost(null);
        }
    };

    // Like Post
    const handleLikePost = async () => {
        setLiked((prev) => !prev);
        const response = await apiInstance.post("post/like-post/", {
            user_id: userId,
            post_id: post?.id,
        });
        Toast("success", response.data.message);
        fetchPost();
    };

    // Bookmark Post
    const handleBookmarkPost = async () => {
        setBookmarked((prev) => !prev);
        const response = await apiInstance.post("post/bookmark-post/", {
            user_id: userId,
            post_id: post?.id,
        });
        Toast("success", response.data.message);
        fetchPost();
    };

    // Share Post
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        Toast("success", "Link copied to clipboard!");
    };

    // Post New Comment
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiInstance.post("post/comment-post/", {
                post_id: post.id,
                user_id: userId,
                comment: newComment,
            });
            setNewComment("");
            Toast("success", response.data.message);
            fetchPost();
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    // Like/Unlike a Comment
    const handleCommentLike = async (commentId) => {
        try {
            const response = await apiInstance.post("post/like-comment/", {
                comment_id: commentId,
                user_id: userId,
            });
            Toast("success", response.data.message);
            fetchPost();
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    // Reply to Comment
    const handleReplySubmit = async (e, parentId) => {
        e.preventDefault();
        if (!replyContent.trim()) {
            Toast("error", "Reply content cannot be empty!");
            return;
        }

        const payload = {
            comment_id: parentId,
            user_id: userId, // Ensure this is fetched from your authentication context
            comment: replyContent.trim(),
        };

        try {
            const response = await apiInstance.post(
                "post/reply-comment/",
                payload
            );
            setReplyContent(""); // Clear input
            setActiveReply(null); // Collapse reply input
            Toast(
                "success",
                response.data.message || "Reply posted successfully."
            );
            fetchPost(); // Refresh post and comments data
        } catch (error) {
            console.error(
                "Error replying to comment:",
                error.response?.data || error.message
            );
            Toast(
                "error",
                error.response?.data?.error ||
                    "Failed to post the reply. Please try again."
            );
        }
    };

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const response = await apiInstance.get("admin/users-list/");
            setUsers(response.data);
            
            const user = response.data.find((user) => user.id === userId);
            setCurrentUser(user);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchPost();
        fetchUsers();
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    // Handle Message Button Click
    const handleMessageClick = () => {
        if (currentUser?.is_premium) {
            navigate(`/chat/${post?.profile?.id}`);
        } else {
            Swal.fire({
                title: "Upgrade to Premium",
                text: "Messaging is available only for premium members. Upgrade now to unlock this feature and more!",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Go to Premium",
                cancelButtonText: "Cancel",
                customClass: {
                    confirmButton: "bg-gradient-to-r from-black to-yellow-600 text-white px-4 py-2 rounded-md",
                    cancelButton: "bg-gradient-to-r from-red-400 to-red-700 text-white px-4 py-2 rounded-md",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/upgrade/");
                }
            });
        }
    };

    return (
        <section className="min-h-screen bg-gray-50">
            <Header />

            <div className="container mx-auto py-6 grid grid-cols-12 gap-6">
                {/* Left Sidebar - Author Details */}
                <aside className="col-span-12 lg:col-span-3 bg-white shadow-md rounded-lg p-6">
                    <div className="text-center">
                        <img
                            src={post?.profile?.profile_image}
                            alt="Author"
                            className="w-24 h-24 rounded-full mx-auto object-cover shadow-md"
                        />
                        <h2 className="text-xl font-bold text-gray-800 mt-4">
                            {post?.profile?.full_name}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            {post?.profile?.bio}
                        </p>
                    </div>
                    <div className="mt-6 flex justify-center items-center gap-x-4">
                        {/* <button className="bg-white text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-black hover:text-white border-2 border-gray-400 focus:outline-none transition duration-300">
                            Follow
                        </button> */}
                        {/* <Link
                            to={`/chat/${post?.profile?.id}`}
                            className="bg-white w-full text-center text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-black hover:text-white border-2 border-gray-400 focus:outline-none transition duration-300"
                        >
                            Message
                        </Link> */}
                        <button
                            onClick={handleMessageClick}
                            className="bg-white w-full text-center text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-black hover:text-white border-2 border-gray-400 focus:outline-none transition duration-300"
                        >
                            Message
                        </button>
                    </div>

                    <hr className="my-6" />
                    <div className="text-gray-700 space-y-3">
                        <p>
                            <span className="font-bold">Email:</span>{" "}
                            {post?.user?.email}
                        </p>
                        <p>
                            <span className="font-bold">Joined:</span>{" "}
                            {Moment(post?.profile?.created_at)}
                        </p>
                        <p>
                            <span className="font-bold">Views:</span>{" "}
                            {post?.views}
                        </p>
                        <p>
                            <span className="font-bold">Likes:</span>{" "}
                            {post?.likes?.length}
                        </p>
                    </div>
                </aside>

                {/* Main Article Section */}
                <main className="col-span-12 lg:col-span-9 bg-white shadow-md rounded-lg p-8">
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-800">
                            {post.title}
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Published on {Moment(post.created_at)}
                        </p>
                    </div>

                    <div className="relative mb-8">
                        <img
                            src={post.thumbnail_image}
                            alt="Article Thumbnail"
                            className="w-full h-80 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    <div
                        className="prose lg:prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <hr className="my-8" />

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Tags
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm hover:bg-gray-300 transition"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <hr className="my-8" />

                    <div className="flex items-center gap-6 text-gray-700 text-lg">
                        <button
                            onClick={handleLikePost}
                            className="flex items-center gap-2"
                        >
                            {liked ? (
                                <FaHeart className="text-red-500" />
                            ) : (
                                <FaRegHeart />
                            )}
                            {post?.likes?.length}
                        </button>
                        <button
                            onClick={handleBookmarkPost}
                            className="flex items-center gap-2"
                        >
                            {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                            {bookmarked ? "Bookmarked" : "Bookmark"}
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2"
                        >
                            <FaShareAlt />
                            Share
                        </button>
                    </div>

                    <hr className="my-8" />

                    {/* Comments Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Comments
                        </h2>

                        <div className="mt-4">
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="mb-6 p-5 border-2 border-gray-200 rounded-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-800 font-bold">
                                                {comment?.user?.full_name}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {timeAgo(comment.created_at)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleCommentLike(comment.id)
                                            }
                                            className="text-red-500 flex items-center gap-1"
                                        >
                                            <FaHeart /> {comment.like_count}
                                        </button>
                                    </div>
                                    <p className="mt-2 text-gray-700">
                                        {comment.comment}
                                    </p>

                                    {/* Reply Section */}
                                    <button
                                        className="text-blue-500 text-sm mt-2"
                                        onClick={() =>
                                            setActiveReply(
                                                activeReply === comment.id
                                                    ? null
                                                    : comment.id
                                            )
                                        }
                                    >
                                        {activeReply === comment.id
                                            ? "Cancel"
                                            : "Reply"}
                                    </button>

                                    {activeReply === comment.id && (
                                        <form
                                            onSubmit={(e) =>
                                                handleReplySubmit(e, comment.id)
                                            }
                                            className="mt-2"
                                        >
                                            <textarea
                                                className="w-full border rounded-lg p-3"
                                                placeholder="Write your reply..."
                                                value={replyContent}
                                                onChange={(e) =>
                                                    setReplyContent(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                                            >
                                                Reply
                                            </button>
                                        </form>
                                    )}

                                    {/* Display Replies */}
                                    {comment.replies?.map((reply) => (
                                        <div
                                            key={reply.id}
                                            className="ml-6 mt-4"
                                        >
                                            <p className="text-gray-800 font-bold">
                                                {reply?.user?.full_name}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {timeAgo(reply.created_at)}
                                            </p>
                                            <p className="text-gray-700 mt-2">
                                                {reply.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleCommentSubmit} className="mt-6">
                            <textarea
                                className="w-full border rounded-lg p-3"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                            >
                                Post Comment
                            </button>
                        </form>
                    </div>
                </main>
            </div>

            <Footer />
        </section>
    );
};

export default Detail;
