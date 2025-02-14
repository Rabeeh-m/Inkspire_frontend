
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";
import { AiFillBook, AiOutlineUserAdd } from "react-icons/ai";
import { timeAgo } from "../../plugin/Moment";

function Notifications() {
    const [noti, setNoti] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [notiPerPage] = useState(2); // Notifications per page
    const userId = useUserData()?.user_id;

    const fetchNoti = async () => {
        try {
            const response = await apiInstance.get(
                `author/dashboard/noti-list/${userId}/`
            );
            setNoti(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNoti();
    }, []);

    // Pagination logic
    const indexOfLastNoti = currentPage * notiPerPage;
    const indexOfFirstNoti = indexOfLastNoti - notiPerPage;
    const currentNoti = noti.slice(indexOfFirstNoti, indexOfLastNoti);

    const nextPage = () => {
        if (currentPage < Math.ceil(noti.length / notiPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <>
            <Header />
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-black to-purple-800 text-white p-6">
                            <h2 className="text-3xl font-bold">
                                Notifications
                            </h2>
                            <p className="text-sm text-gray-200">
                                Stay updated with your latest activities
                            </p>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-4">
                                {currentNoti.map((n) => (
                                    <Link to={`/${n?.post?.slug}`} key={n.id}>
                                        <li className="flex items-center mt-2 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all">
                                            <div
                                                className={`p-3 rounded-full ${
                                                    n.type === "Like"
                                                        ? "bg-blue-100"
                                                        : n.type === "Comment"
                                                          ? "bg-green-100"
                                                          : "bg-red-100"
                                                }`}
                                            >
                                                {n.type === "Like" && (
                                                    <FaThumbsUp className="text-blue-600 text-xl" />
                                                )}
                                                {n.type === "Comment" && (
                                                    <FaCommentAlt className="text-green-600 text-xl" />
                                                )}
                                                {n.type === "Bookmark" && (
                                                    <AiFillBook className="text-red-600 text-xl" />
                                                )}
                                                {n.type === "Follow" && (
                                                    <AiOutlineUserAdd className="text-blue-600 text-xl" />
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    {n.type}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {n.type === "Like" && (
                                                        <>
                                                            Someone liked your
                                                            post{" "}
                                                            <b>
                                                                {n.post?.title?.slice(
                                                                    0,
                                                                    30
                                                                )}
                                                                ...
                                                            </b>
                                                        </>
                                                    )}
                                                    {n.type === "Comment" && (
                                                        <>
                                                            You have a new
                                                            comment on{" "}
                                                            <b>
                                                                {n.post?.title?.slice(
                                                                    0,
                                                                    30
                                                                )}
                                                                ...
                                                            </b>
                                                        </>
                                                    )}
                                                    {n.type === "Bookmark" && (
                                                        <>
                                                            Someone bookmarked
                                                            your post{" "}
                                                            <b>
                                                                {n.post?.title?.slice(
                                                                    0,
                                                                    30
                                                                )}
                                                                ...
                                                            </b>
                                                        </>
                                                    )}
                                                    {n.type === "Follow" && (
                                                        <>
                                                            Someone Followed You{" "}
                                                            
                                                        </>
                                                    )}
                                                </p>
                                                <span className="text-xs text-gray-500">
                                                    {timeAgo(n.created_at)}
                                                </span>
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                                {noti.length === 0 && (
                                    <p className="text-center text-gray-500 py-6">
                                        No notifications yet.
                                    </p>
                                )}
                            </ul>
                            {/* Pagination */}
                            <div className="flex justify-center items-center mt-6">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`${
                                        currentPage === 1
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    } px-4 py-2 mx-2 rounded-lg transition-all`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={
                                        currentPage ===
                                        Math.ceil(noti.length / notiPerPage)
                                    }
                                    className={`${
                                        currentPage ===
                                        Math.ceil(noti.length / notiPerPage)
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    } px-4 py-2 mx-2 rounded-lg transition-all`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Notifications;
