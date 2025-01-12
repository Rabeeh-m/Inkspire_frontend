import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import Moment, { timeAgo } from "../../plugin/Moment";
import Toast from "../../plugin/Toast";
import useUserData from "../../plugin/useUserData";

function Comments() {
    const [comments, setComments] = useState([]);
    const [reply, setReply] = useState("");
    const [expandedComment, setExpandedComment] = useState(null);

    const userId = useUserData()?.user_id;

    const fetchComment = async () => {
        const response = await apiInstance.get(
            `author/dashboard/comment-list/${userId}/`
        );
        setComments(response?.data);
    };

    useEffect(() => {
        fetchComment();
    }, []);

    const handleSubmitReply = async (commentId) => {
        try {
            const response = await apiInstance.post(
                `author/dashboard/reply-comment/`,
                {
                    comment_id: commentId,
                    reply: reply,
                }
            );
            console.log(response.data);
            fetchComment();
            Toast("success", "Reply Sent.", "");
            setReply("");
            setExpandedComment(null);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleCollapse = (commentId) => {
        setExpandedComment(expandedComment === commentId ? null : commentId);
    };

    return (
        <>
            <Header />
            <section className="py-5">
                <div className="container mx-auto px-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bg-white shadow rounded-md">
                                <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            Comments
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            You have full control to manage your
                                            own comments.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <ul className="space-y-4">
                                        {comments?.map((c) => (
                                            <li
                                                key={c.id}
                                                className="bg-gray-50 shadow rounded-md p-4"
                                            >
                                                <div className="flex">
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex justify-between items-center">
                                                            <h4 className="text-lg font-medium">
                                                                {c.name}
                                                            </h4>
                                                            <span className="text-sm text-gray-500">
                                                                {timeAgo(
                                                                    c.created_at
                                                                )}
                                                            </span>
                                                        </div>
                                                        <p className="mt-2">
                                                            <span className="font-semibold">
                                                                Comment:
                                                            </span>{" "}
                                                            {c.comment}
                                                        </p>
                                                        <p className="mt-2">
                                                            <span className="font-semibold">
                                                                Response:
                                                            </span>{" "}
                                                            {c.reply || (
                                                                <span className="text-red-500">
                                                                    No Reply
                                                                </span>
                                                            )}
                                                        </p>
                                                        <button
                                                            className="mt-4 text-blue-600 underline"
                                                            type="button"
                                                            onClick={() =>
                                                                toggleCollapse(
                                                                    c.id
                                                                )
                                                            }
                                                        >
                                                            {expandedComment ===
                                                            c.id
                                                                ? "Hide Response"
                                                                : "Send Response"}
                                                        </button>
                                                        {expandedComment ===
                                                            c.id && (
                                                            <div className="mt-4 p-4 border border-gray-200 rounded-md">
                                                                <label
                                                                    htmlFor={`response${c.id}`}
                                                                    className="block text-sm font-medium text-gray-700 mb-2"
                                                                >
                                                                    Write
                                                                    Response
                                                                </label>
                                                                <textarea
                                                                    id={`response${c.id}`}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setReply(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    value={
                                                                        reply
                                                                    }
                                                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                                                    rows="4"
                                                                ></textarea>
                                                                <button
                                                                    onClick={() =>
                                                                        handleSubmitReply(
                                                                            c.id
                                                                        )
                                                                    }
                                                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                                                >
                                                                    Send
                                                                    Response{" "}
                                                                    <i className="fas fa-paper-plane"></i>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
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

export default Comments;
