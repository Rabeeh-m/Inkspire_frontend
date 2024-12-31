
import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import Moment from "../../plugin/Moment";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const userId = useUserData()?.user_id;

  const fetchPosts = async () => {
    const post_res = await apiInstance.get(
      `author/dashboard/post-list/${userId}/`
    );
    setPosts(post_res.data);
    setOriginalPosts(post_res.data);
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

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    let sortedPosts = [...originalPosts];

    if (sortValue === "Newest") {
      sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortValue === "Oldest") {
      sortedPosts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (["Published", "Draft", "Disabled"].includes(sortValue)) {
      sortedPosts = posts.filter((post) => post.status === sortValue);
    } else if (sortValue === "") {
      fetchPosts();
    }

    setPosts(sortedPosts);
  };

  
  const handleDelete = async (postId) => {;
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
        await apiInstance.delete(`author/dashboard/post-delete/${postId}/`);
        setPosts(posts.filter((post) => post.id !== postId));
        Swal.fire("Deleted!", "The post has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Something went wrong. Try again later.", "error");
      }
    }
  };

  return (
    <>
      <Header />
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white border-2 border-gray-400 shadow-md rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b-2 border-gray-400 flex justify-between items-center">
              <h5 className="text-lg font-semibold">
                All Blog Posts{" "}
                <span className="text-blue-600">({posts?.length})</span>
              </h5>
              <Link
                to="/add-post"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add New <i className="fas fa-plus ml-2"></i>
              </Link>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                <div className="w-full md:w-2/3">
                  <input
                    type="text"
                    placeholder="Search Articles"
                    onChange={(e) => handleSearch(e)}
                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <select
                    onChange={handleSortChange}
                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Sort by</option>
                    <option value={"Newest"}>Newest</option>
                    <option value={"Oldest"}>Oldest</option>
                    <option value={"Published"}>Published</option>
                    <option value={"Draft"}>Draft</option>
                    <option value={"Disabled"}>Disabled</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2">Image</th>
                      <th className="px-4 py-2">Article Name</th>
                      <th className="px-4 py-2">Views</th>
                      <th className="px-4 py-2">Published Date</th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts?.map((p, index) => (
                      <tr key={index} className="border-t hover:bg-gray-100">
                        <td className="px-4 py-2">
                          <Link to={`/${p.slug}`}>
                            <img
                              src={p.thumbnail_image}
                              alt="Post"
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          </Link>
                        </td>
                        <td className="px-4 py-2">
                          <Link
                            to={`/${p.slug}`}
                            className="text-blue-600 hover:underline"
                          >
                            {p?.title}
                          </Link>
                        </td>
                        <td className="px-4 py-2">{p.views} Views</td>
                        <td className="px-4 py-2">{Moment(p.created_at)}</td>
                        <td className="px-4 py-2">{p.category?.title}</td>
                        <td className="px-4 py-2">
                          <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm">
                            {p.status}
                          </span>
                        </td>
                        <td className="px-12 py-12 flex gap-2">
                          <Link
                            to={`/edit-post/${p.id}/`}
                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 flex items-center gap-1"
                            title="Edit"
                          >
                            <FiEdit className="text-lg" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 flex items-center gap-1"
                            title="Delete"
                          >
                            <FiTrash2 className="text-lg" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}

export default Posts;
