
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Moment,{timeAgo} from "../../plugin/Moment";
import Toast from "../../plugin/Toast"

import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaCommentDots,
} from "react-icons/fa";

const Detail = () => {
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);

  const [createComment, setCreateComment] = useState({
    full_name: "",
    email: "",
    comment: "",
  });

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const param = useParams(); // Get article slug from the URL

  const fetchPost = async () => {
    try {
      const response = await apiInstance.get(`post/detail/${param.slug}/`);
      setPost(response.data);
      const tagArray = response?.data?.tags?.split(",");
      setTags(tagArray || []);
    } catch (error) {
      console.error("Error fetching article:", error);
      setPost(null);
    }
  };



  const handleLikePost = async () => {
    setLiked((prev) => !prev);
    
    const jsonData = {
      user_id:2,
      post_id: post?.id
    }

    const response = await apiInstance.post('post/like-post/', jsonData)
    console.log(response.data);
    // Toast("success", response.data.message)
    fetchPost()
  };

  const handleBookmarkPost = async () => {
    setBookmarked((prev) => !prev);
    
    const jsonData = {
      user_id:2,
      post_id: post?.id
    }

    const response = await apiInstance.post('post/bookmark-post/', jsonData)
    console.log(response.data);
    Toast("success", response.data.message)
    fetchPost()
  };

  

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleCreateCommentChange = (event) => {
    setCreateComment({
      ...createComment,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateCommentSubmit = async (e) => {
    e.preventDefault();

    const jsonData = {
      post_id: post?.id,
      name: createComment.full_name,
      email: createComment.email,
      comment: createComment.comment,
    };

    const response = await apiInstance.post(`post/comment-post/`, jsonData);
    console.log(response);
    fetchPost();
    Toast("success", "Comment Posted.", "");
    setCreateComment({
      full_name: "",
      email: "",
      comment: "",
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
            <p className="text-gray-600 text-sm">{post?.profile?.bio}</p>
          </div>
          <hr className="my-6" />
          <div className="text-gray-700 space-y-3">
            <p className="flex items-center gap-2">
              <span className="font-bold">Email:</span> {post?.user?.email}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold">Joined:</span>{" "}
              {Moment(post?.profile?.created_at)}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold">Views:</span> {post?.views}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold">Likes:</span> {post?.likes?.length}
            </p>
          </div>
          <hr className="my-6" />
        
        </aside>

        {/* Main Article Section */}
        <main className="col-span-12 lg:col-span-9 bg-white shadow-md rounded-lg p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">
              {post.title || "Title"}{" "}
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

          <div className="prose lg:prose-lg max-w-none">
            <p>{post.content}</p>
          </div>

          <hr className="my-8" />

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tags</h2>
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

          {/* Like, Bookmark, Share, and Comments */}
          <hr className="my-8" />

          <div className="flex items-center gap-6 text-gray-700 text-lg">
            <button onClick={handleLikePost} className="flex items-center gap-2">
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              {/* {liked ? "Liked" : "Like"} */}
              {post ?. likes ?.length}
            </button>

            <button
              onClick={handleBookmarkPost}
              className="flex items-center gap-2"
            >
              {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </button>

            <button onClick={handleShare} className="flex items-center gap-2">
              <FaShareAlt />
              Share
            </button>
          </div>

          <hr className="my-8" />

          <div>
            {/* Comments Section */}
            <h3 className="text-lg font-semibold mb-4">
              {post?.comments?.length} comments
            </h3>
            {post?.comments?.map((c, index) => (
              <div
                key={index}
                className="my-4 flex bg-gray-100 p-4 mb-4 rounded-lg shadow-md"
              >
                {/* <img
                  className="w-16 h-16 object-cover rounded-full mr-4"
                  src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                  alt="avatar"
                /> */}
                <div>
                  <div className="mb-2">
                    <h5 className="font-bold text-gray-800 m-0">{c?.name}</h5>
                    <span className="text-sm text-gray-400">
                      {timeAgo(c?.created_at)}
                    </span>
                  </div>
                  <p className="font-medium text-gray-700">{c.comment}</p>

                  <p className="text-sm text-gray-600 mt-1">{c.reply}</p>
                </div>
              </div>
            ))}

            {/* Reply Form */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Leave a reply</h3>
              <small className="text-gray-500">
                Your email address will not be published. Required fields are
                marked *
              </small>
              <form className="grid grid-cols-1 gap-4 mt-4" onSubmit={handleCreateCommentSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name *
                    </label>
                    <input
                      onChange={handleCreateCommentChange}
                      name="full_name"
                      value={createComment.full_name}
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      onChange={handleCreateCommentChange}
                      name="email"
                      value={createComment.email}
                      type="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Write Comment *
                  </label>
                  <textarea
                    onChange={handleCreateCommentChange}
                    name="comment"
                    value={createComment.comment}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="4"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                  >
                    Post comment <i className="fas fa-paper-plane ml-2"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </section>
  );
};

export default Detail;
