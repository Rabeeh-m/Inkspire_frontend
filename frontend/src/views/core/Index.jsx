
import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import useUserData from "../../plugin/useUserData";
import moment from "../../plugin/Moment";
import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";
import Moment from "../../plugin/Moment";


const Index = () => {
  const [posts, setPosts] = useState([]);
  const [popular_posts, setPopularPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);

  
  const userId = useUserData()?.user_id

  const fetchProfiles = async() => {
    try {
      const response_user = await apiInstance.get(`user/profiles/${userId}/`);
      setUserProfiles(response_user.data)
    } catch (error) {
      console.log(error);
    }
  }


  const fetchPosts = async () => {
    try {
      const response_post = await apiInstance.get("post/lists/");
      const response_category = await apiInstance.get("post/category/list/");
      const response_popular_posts = await apiInstance.get("post/popular-post/");
      setPosts(response_post.data);
      setCategory(response_category.data);
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


  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="grid grid-cols-12 gap-4 container mx-auto py-6">
        {/* Left Sidebar */}
        <aside className="col-span-12 lg:col-span-2 bg-white shadow-md rounded-lg p-4">
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

          {/* Categories Section */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
            <ul className="space-y-2">
              {category.slice(0, 10).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to="#"
                    // {`/category/${cat.slug}`}
                    className="block py-2 px-4 rounded-md bg-gray-100 text-gray-900 hover:bg-blue-500 hover:text-white transition"
                  >
                    {cat.title}
                    <p className="text-right">{cat.post_count}</p>
                  </Link>
                </li>
              ))}
              {category.length > 5 && (
                <li>
                  <Link
                    to="/categories"
                    className="block py-2 px-4 rounded-md bg-gray-100 text-gray-900 hover:bg-blue-500 hover:text-white transition"
                  >
                    More...
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-7">
          {/* Hero Section */}
          <section className="mb-8">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg p-8 shadow-lg">
              <h1 className="text-4xl font-extrabold mb-4">
                Welcome to MyBlog
              </h1>
              <p className="text-lg">
                Your go-to platform for inspiration, insights, and stories. Dive
                in to explore more!
              </p>
              <button className="mt-6 bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Explore Now
              </button>
            </div>
          </section>



          {/* Featured Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Featured Articles
            </h2>
            {posts?.map((post) => (
              <div className="grid sm:grid-cols-1 gap-6" key={post?.id}>
                <Link to={post.slug}>
                  <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transform transition-all">
                    {/* Author Info */}
                    <div className="flex items-center mb-4">
                      <img
                        src={post?.profile?.profile_image || "Unknown User"}
                        alt="Author Profile"
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div className="text-sm">
                        <p className="font-semibold text-gray-800">
                          {post?.profile?.full_name || "Unknown User"}
                        </p>
                        <p className="text-gray-600">
                          {post?.profile?.bio || ""}
                        </p>
                        <p className="text-gray-400">
                          {Moment(post.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <img
                        src={post.thumbnail_image}
                        className="w-full h-48 object-cover"
                      />
                      {/* <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 text-sm rounded-md">
                        Trending
                      </div> */}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mt-3">
                        {post.content.length > 100
                          ? post.content.slice(0, 300) + "..."
                          : post.content}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </section>

          {/* Popular Articles Section */}
          {/* <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Popular Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {popular_posts?.map((pop_post) => (
                <div
                  key={pop_post.id} 
                  className="flex bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden"
                >
                  <img
                    src={pop_post.thumbnail_image}
                    alt="Popular Thumbnail"
                    className="w-32 h-32 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <h4 className="text-lg font-bold text-gray-800">
                      {pop_post.title}
                    </h4>
                    <p className="text-gray-600 mt-3">
                      {pop_post.content.length > 100
                        ? pop_post.content.slice(0, 50) + "..."
                        : pop_post.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section> */}
        </main>

        {/* Right Sidebar */}
        <aside className="col-span12 lg:col-span-3 bg-white shadow-md rounded-lg p-4">
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
            <ul className="space-y-2">
            {userProfiles?.map((userProfile,index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={userProfile.profile_image}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-gray-700">
                      {userProfile.full_name}
                    </span>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition">
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default Index;
