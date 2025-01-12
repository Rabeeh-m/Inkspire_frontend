import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import { FaCheckCircle, FaCommentAlt, FaThumbsUp } from "react-icons/fa";
import { AiFillBook } from "react-icons/ai";
import { timeAgo } from "../../plugin/Moment";

function Notifications() {
    const [noti, setNoti] = useState([]);
    const userId = useUserData()?.user_id;

    const fetchNoti = async () => {
        try {
            const response = await apiInstance.get(
                `author/dashboard/noti-list/${userId}/`
            );
            setNoti(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNoti();
    }, []);

    const handleMarkNotiAsSeen = async (notiId) => {
        try {
            const response = await apiInstance.post(
                "author/dashboard/noti-mark-seen/",
                { noti_id: notiId }
            );
            // console.log(response.data);
            Toast("success", "Notification Seen", "");
            fetchNoti();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container mx-auto px-4">
                    <div className="row mt-0 mt-md-4">
                        <div className="col-lg-12 col-md-8 col-12">
                            <div className="card mb-4 border-2 border-gray-400 bg-white shadow-lg rounded-lg">
                                <div className="card-header d-lg-flex items-center justify-between">
                                    <div className="mb-3 mb-lg-0">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-0 px-5 py-5">
                                            Notifications
                                        </h3>
                                        <span className="text-gray-500 px-5">
                                            Manage all your notifications from
                                            here
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body ">
                                    <ul className="list-group list-group-flush ">
                                        {noti?.map((n, index) => (
                                            <li
                                                key={n.id}
                                                className="list-group-item p-4 shadow-lg rounded-lg  mt-4 flex flex-row justify-between items-center"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div
                                                        className={`icon-lg p-2 rounded-full ${n.type === "Like" ? "bg-blue-100" : n.type === "Comment" ? "bg-green-100" : "bg-red-100"}`}
                                                    >
                                                        {n.type === "Like" && (
                                                            <FaThumbsUp className="text-blue-600 text-xl" />
                                                        )}
                                                        {n.type ===
                                                            "Comment" && (
                                                            <FaCommentAlt className="text-green-600 text-xl" />
                                                        )}
                                                        {n.type ===
                                                            "Bookmark" && (
                                                            <AiFillBook className="text-red-600 text-xl" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h6 className="text-xl font-medium text-gray-700">
                                                            {n.type}
                                                        </h6>
                                                        <p className="text-gray-600">
                                                            {n.type ===
                                                                "Like" && (
                                                                <span>
                                                                    Someone
                                                                    liked your
                                                                    post{" "}
                                                                    <b>
                                                                        {n.post?.title?.slice(
                                                                            0,
                                                                            30
                                                                        ) +
                                                                            "..."}
                                                                    </b>
                                                                </span>
                                                            )}
                                                            {n.type ===
                                                                "Comment" && (
                                                                <span>
                                                                    You have a
                                                                    new comment
                                                                    on{" "}
                                                                    <b>
                                                                        {n.post?.title?.slice(
                                                                            0,
                                                                            30
                                                                        ) +
                                                                            "..."}
                                                                    </b>
                                                                </span>
                                                            )}
                                                            {n.type ===
                                                                "Bookmark" && (
                                                                <span>
                                                                    Someone
                                                                    bookmarked
                                                                    your post{" "}
                                                                    <b>
                                                                        {n.post?.title?.slice(
                                                                            0,
                                                                            30
                                                                        ) +
                                                                            "..."}
                                                                    </b>
                                                                </span>
                                                            )}
                                                        </p>
                                                        <span className="text-sm text-gray-500">
                                                            {timeAgo(
                                                                n.created_at
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleMarkNotiAsSeen(
                                                            n.id
                                                        )
                                                    }
                                                    className="ml-4 bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded-md text-sm flex items-center"
                                                >
                                                    <FaCheckCircle className="mr-2" />{" "}
                                                    Mark as Seen
                                                </button>
                                            </li>
                                        ))}

                                        {noti?.length < 1 && (
                                            <p className="text-center text-gray-500 py-4">
                                                No notifications yet
                                            </p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <Footer /> */}
        </>
    );
}

export default Notifications;
