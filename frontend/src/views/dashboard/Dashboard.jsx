import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Moment, { timeAgo } from "../../plugin/Moment";
import Toast from "../../plugin/Toast";
import {
  FaThumbsUp,
  FaBookmark,
  FaBell,
  FaQuoteLeft,
  FaCalendarAlt,
  FaEye,
  FaTags,
  FaHeart,
  FaFileAlt,
  FaUsers

} from "react-icons/fa";
import { MdGridOn } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [noti, setNoti] = useState([]);

  const userId = useUserData()?.user_id;
  // console.log(userId);

  const fetchDashboardData = async () => {
    const stats_res = await apiInstance.get(
      `author/dashboard/stats/${userId}/`
    );
    setStats(stats_res?.data[0]);

    const post_res = await apiInstance.get(
      `author/dashboard/post-list/${userId}/`
    );
    setPosts(post_res?.data);

    const comment_res = await apiInstance.get(
      `author/dashboard/comment-list/${userId}/`
    );
    setComments(comment_res?.data);

    const noti_res = await apiInstance.get(
      `author/dashboard/noti-list/${userId}/`
    );
    setNoti(noti_res?.data);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleMarkNotiAsSeen = async (notiId) => {
    const response = await apiInstance.post(
      "author/dashboard/noti-mark-seen/",
      { noti_id: notiId }
    );
    console.log(response.data);
    fetchDashboardData();
    Toast("success", "Notification Seen", "");
  };

  return (
    <>
      <Header />
      <section className="py-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="col-span-1">
              <div className="card border-2 border-gray-400 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="icon-xl p-3 bg-green-100 rounded-lg text-green-600">
                  <FaUsers className="text-3xl" />
                  </div>
                  <div className="ml-3">
                    <h3>{stats.views}</h3>
                    <h6 className="text-sm text-gray-500">Total Views</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="card border-2 border-gray-400 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="icon-xl p-3 bg-blue-100 rounded-lg text-blue-600">
                  <FaFileAlt className="text-3xl" />
                  </div>
                  <div className="ml-3">
                    <h3>{stats.posts}</h3>
                    <h6 className="text-sm text-gray-500">Posts</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="card border-2 border-gray-400 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="icon-xl p-3 bg-red-100 rounded-lg text-red-600">
                  <FaHeart className="text-3xl text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h3>{stats.likes}</h3>
                    <h6 className="text-sm text-gray-500">Likes</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="card border-2 border-gray-400 p-3 rounded-lg">
                <div className="flex items-center">
                  <div className="icon-xl p-3 bg-teal-100 rounded-lg text-teal-600">
                  <FaTags className="text-3xl" />
                  </div>
                  <div className="ml-3">
                    <h3>{stats.bookmarks}</h3>
                    <h6 className="text-sm text-gray-500">Bookmarks</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            <div className="col-span-1">
              <div className="card border-2 border-gray-400 h-full rounded-lg">
                <div className="card-header flex justify-between items-center p-3 border-b-4">
                  <h5 className="text-lg font-semibold">
                    All Posts ({stats.posts})
                  </h5>
                  <div className="dropdown text-end">
                  <MdGridOn className="text-primary text-lg" />

                  </div>
                </div>
                <div className="card-body p-3">
                  {posts?.map((p, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <img
                        className="w-24 h-28 object-cover rounded-lg"
                        src={p.thumbnail_image}
                        alt="post"
                      />
                      <div className="ml-3">
                        <Link
                          to="#"
                          className="text-lg font-semibold text-dark"
                        >
                          {p.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1 flex items-center space-x-1">
                          <FaCalendarAlt className="text-gray-500 text-md" />
                          <span>{Moment(p.created_at)}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center space-x-1">
                          <FaEye className="text-gray-500 text-md" />
                          <span>{p.views} Views</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center space-x-1">
                          <FaThumbsUp className="text-gray-500 text-md" />
                          <span>{p.likes?.length} Likes</span>
                        </p>

                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="card-footer text-center p-3">
                  <Link to="/posts" className="font-semibold text-primary">
                    View all Posts
                  </Link>
                </div> */}
              </div>
            </div>

            <div className="col-span-1">
              <div className="card border-2 border-gray-400 h-full rounded-lg">
                <div className="card-header flex justify-between items-center p-3 border-b-4">
                  <h5 className="text-lg font-semibold">
                    Comments ({comments?.length})
                  </h5>
                  <div className="dropdown text-end">
                    <FaQuoteLeft className="text-lg text-success" />
                  </div>
                </div>
                <div className="card-body p-3">
                  {comments?.slice(0, 3).map((c, index) => (
                    <div key={index} className="flex items-center mb-3">
                      {/* <div className="w-10 h-10 flex-shrink-0">
                        <img
                          className="rounded-full object-cover w-full h-full"
                          src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                          alt="avatar"
                        />
                      </div> */}
                      <div className="ml-3">
                        <p className="text-lg text-dark">{c.comment}</p>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-500">
                            <i>by</i> {c.name} <br />
                            <i>{timeAgo(c.created_at)}</i>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="card-footer text-center p-3">
                  <Link to="/comments" className="font-semibold text-primary">
                    View all Comments
                  </Link>
                </div> */}
              </div>
            </div>

            <div className="col-span-1">
              <div className="card border-2 border-gray-400 h-full rounded-lg">
                <div className="card-header flex justify-between items-center p-3 border-b-4">
                  <h5 className="text-lg font-semibold">Notifications</h5>
                  <div className="dropdown text-end">
                    <FaBell className="text-xl text-yellow-400" />
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="custom-scrollbar h-72 overflow-auto">
                    {noti?.slice(0, 3)?.map((n, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-3"
                      >
                        <div className="flex items-center">
                          <div className="icon-lg bg-opacity-15 rounded-2 flex-shrink-0">
                            {n.type === "Like" && (
                              <FaThumbsUp
                                style={{ color: "blue", fontSize: "1.2rem" }}
                              />
                            )}
                            {n.type === "Comment" && (
                              <AiOutlineComment
                                style={{ color: "green", fontSize: "1.2rem" }}
                              />
                            )}
                            {n.type === "Bookmark" && (
                              <FaBookmark
                                style={{ color: "red", fontSize: "1.2rem" }}
                              />
                            )}
                          </div>
                          <div className="ml-3">
                            {/* <h6 className="font-semibold text-dark">
                              {n.type}
                            </h6> */}
                            <p className="text-sm text-gray-500">
                              {n.type === "Like" &&
                                `${n?.user?.full_name} liked your post ${n.post?.title.slice(0, 30)}...`}
                              {n.type === "Comment" &&
                                `You have a new comment on ${n.post?.title.slice(0, 30)}...`}
                              {n.type === "Bookmark" &&
                                `${n?.user?.full_name} bookmarked your post ${n.post?.title.slice(0, 30)}...`}
                            </p>
                            <span className="text-xs text-gray-500">
                              {timeAgo(n.created_at)}
                            </span>
                            <button
                              onClick={() => handleMarkNotiAsSeen(n.id)}
                              className="btn btn-sm bg-secondary text-white mt-2"
                            ></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="card-footer text-center p-3">
                  <Link
                    to="/notifications"
                    className="font-semibold text-primary"
                  >
                    View all Notifications
                  </Link>
                </div> */}
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="card border rounded-lg bg-transparent">
              <div className="card-header bg-transparent border-b p-3">
                <div className="flex justify-between items-center">
                  <h5 className="font-semibold">
                    All Blog Posts{" "}
                    <span className="badge bg-primary bg-opacity-10 text-primary">
                      {posts?.length}
                    </span>
                  </h5>
                  <a href="#" className="btn btn-sm bg-primary text-white">
                    Add New <i className="fas fa-plus" />
                  </a>
                </div>
              </div>
              <div className="card-body border-2 border-gray-400">
                <div className="overflow-auto">
                  <table className="table-auto w-full">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="py-2 px-4">Article Name</th>
                        <th className="py-2 px-4">Views</th>
                        <th className="py-2 px-4">Published Date</th>
                        <th className="py-2 px-4">Category</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="border-t-0">
                      {posts?.map((p, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4">{p?.title}</td>
                          <td className="py-2 px-4">{p.views} Views</td>
                          <td className="py-2 px-4">{Moment(p.created_at)}</td>
                          <td className="py-2 px-4">{p.category?.title}</td>
                          <td className="py-2 px-4">
                            <span className="badge bg-opacity-10 text-dark">
                              {p.status}
                            </span>
                          </td>
                          <td className="py-2 px-4">
                            {/* <div className="flex gap-2">
                              <button
                                className="btn bg-red-600 text-white"
                                title="Delete"
                              >
                                <i className="bi bi-trash" />
                              </button>
                              <a
                                href="dashboard-post-edit.html"
                                className="btn bg-primary text-white"
                                title="Edit"
                              >
                                <i className="bi bi-pencil-square" />
                              </a>
                            </div> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Dashboard;
