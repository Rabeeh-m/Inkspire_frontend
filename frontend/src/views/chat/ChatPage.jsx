
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, Link } from "react-router-dom";
// import { FaRegPaperPlane, FaVideo, FaPaperclip } from "react-icons/fa";
// import Header from "../partials/Header";
// import ChatSidebar from "./ChatSidebar";
// import apiInstance from "../../utils/axios";
// import Cookies from "js-cookie";
// import useUserData from "../../plugin/useUserData";
// import moment from "moment";

// const ChatPage = () => {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);
//     const [room, setRoom] = useState(null);
//     const [userProfiles, setUserProfiles] = useState([]);
//     const [file, setFile] = useState(null);
//     const [filePreview, setFilePreview] = useState(null); // State for file preview
//     const [isAtBottom, setIsAtBottom] = useState(true);
//     const ws = useRef(null);
//     const messagesEndRef = useRef(null);
//     const chatContainerRef = useRef(null);

//     const accessToken = Cookies.get("access_token");
//     const { profileId } = useParams();
//     const userId = useUserData()?.user_id;

//     const sender_id = userId;
//     const receiver_id = Number(profileId) + 1;

//     // Fetch chat room and messages
//     const fetchRoomAndMessages = async () => {
//         try {
//             const response = await apiInstance.get(`chat-room/${sender_id}/${receiver_id}/`);
//             setRoom(response.data);
//             setMessages(response.data.messages);
//         } catch (error) {
//             console.error("Error fetching room and messages:", error);
//         }
//     };

//     // Fetch user profiles
//     const fetchProfiles = async () => {
//         try {
//             const response_user = await apiInstance.get("user/profiles/", {
//                 headers: { Authorization: `Bearer ${accessToken}` },
//             });
//             setUserProfiles(response_user.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // WebSocket setup
//     useEffect(() => {
//         if (room?.id) {
//             ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room.id}/`);

//             ws.current.onopen = () => console.log("WebSocket connected");

//             ws.current.onmessage = (event) => {
//                 try {
//                     const data = JSON.parse(event.data);
//                     if (data?.text || data?.file_url) {
//                         setMessages((prevMessages) => [...prevMessages, data]);
//                     }
//                 } catch (error) {
//                     console.error("WebSocket message parsing error:", error);
//                 }
//             };

//             ws.current.onerror = (error) => console.error("WebSocket error:", error);

//             ws.current.onclose = () => {
//                 console.log("WebSocket disconnected, attempting to reconnect...");
//                 setTimeout(() => fetchRoomAndMessages(), 1000);
//             };

//             return () => ws.current?.close();
//         }
//     }, [room]);

//     // Handle file input change
//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             const previewURL = URL.createObjectURL(selectedFile); // Generate temporary URL
//             setFilePreview(previewURL); // Set file preview URL
//             setFile(selectedFile); // Set file for sending
//         }
//     };

//     // Handle sending messages
//     const handleSendMessage = async () => {
//         if ((message.trim() || file) && room) {
//             const formData = new FormData();
//             formData.append("room_id", room.id);
//             formData.append("sender_id", sender_id);
//             formData.append("text", message);
//             if (file) {
//                 formData.append("file", file);
//             }

//             try {
//                 const response = await apiInstance.post("send-message/", formData, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });

//                 // Optimistic update
//                 setMessages((prevMessages) => [
//                     ...prevMessages,
//                     {
//                         id: Date.now(), // Temporary ID for optimistic update
//                         sender: { id: sender_id },
//                         text: message,
//                         file_url: response.data.file,
//                         timestamp: new Date().toISOString(),
//                     },
//                 ]);

//                 if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//                     ws.current.send(JSON.stringify({
//                         id: Date.now(), // Temporary ID for WebSocket
//                         sender_id: sender_id,
//                         text: message,
//                         file_url: response.data.file,
//                         timestamp: new Date().toISOString(),
//                     }));
//                 }

//                 setMessage("");
//                 setFile(null); // Clear file
//                 setFilePreview(null); // Clear file preview
//                 setIsAtBottom(true); // Enable auto-scroll
//             } catch (error) {
//                 console.error("Error sending message:", error);
//             }
//         }
//     };

//     // Auto-scroll only if user is at the bottom
//     useEffect(() => {
//         if (isAtBottom) {
//             messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [messages]);

//     // Handle manual scrolling (Detect if user is at the bottom)
//     const handleScroll = () => {
//         if (chatContainerRef.current) {
//             const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
//             setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
//         }
//     };

//     // Handle pressing Enter to send a message
//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault(); // Prevent new line
//             handleSendMessage();
//         }
//     };

//     // Fetch initial data
//     useEffect(() => {
//         fetchRoomAndMessages();
//         fetchProfiles();
//     }, [userId, profileId]);

//     return (
//         <>
//             <Header />
//             <div className="flex h-screen bg-gray-100">
//                 <ChatSidebar setProfileId={profileId} />
//                 <div className="flex-1 flex flex-col bg-white">
//                     {/* Chat Header */}
//                     <div className="flex items-center justify-between border-b p-3">
//                         {userProfiles.map(
//                             (profile) =>
//                                 profile.id == profileId && (
//                                     <div key={profile.id} className="flex items-center space-x-2">
//                                         <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
//                                             <img
//                                                 src={profile.profile_image}
//                                                 alt="Profile"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                         <div>
//                                             <p className="font-medium text-sm">{profile.full_name}</p>
//                                         </div>
//                                     </div>
//                                 )
//                         )}
//                         <Link to={'/vc-lobby'}>
//                             <FaVideo size={28} className="text-gray-700 hover:text-blue-500 cursor-pointer mr-8" />
//                         </Link>
//                     </div>

//                     {/* Chat Messages Container */}
//                     <div
//                         ref={chatContainerRef}
//                         onScroll={handleScroll}
//                         className="flex-1 overflow-y-auto p-3 space-y-3"
//                     >
//                         {messages.map((msg, index) => (
//                         <div
//                             key={msg.id || msg.timestamp} // Use a unique key
//                             ref={index === messages.length - 1 ? messagesEndRef : null}
//                             className={`flex ${msg.sender?.id === sender_id ? "justify-end" : "justify-start"}`}
//                         >
//                             <div className={`p-2 rounded-lg max-w-xs ${msg.sender?.id === sender_id ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
//                                 {msg.file && (
//                                     <div className="mb-2">
//                                         {/* Handle image files */}
//                                         {msg.file.endsWith('.jpg') || msg.file.endsWith('.png') || msg.file.endsWith('.jpeg') || msg.file.endsWith('.gif') ? (
//                                             <img src={`http://127.0.0.1:8000${msg.file}`} alt="Media" className="w-full h-auto rounded" />
//                                         ) : msg.file.endsWith('.pdf') ? (
//                                             /* Handle PDF files */
//                                             <a 
//                                                 href={`http://127.0.0.1:8000${msg.file}`} 
//                                                 download 
//                                                 target="_blank" 
//                                                 rel="noopener noreferrer"
//                                                 className="text-black underline"
//                                             >
//                                                 {msg.file.split("/").pop()}
//                                             </a>
//                                         ) : (
//                                             /* Handle other file types */
//                                             <a 
//                                                 href={`http://127.0.0.1:8000${msg.file}`} 
//                                                 download 
//                                                 className="text-black underline"
//                                             >
//                                                 Download File
//                                             </a>
//                                         )}
//                                     </div>
//                                 )}
//                                 {msg.text && <p className="text-sm">{msg.text}</p>}
//                                 <p className="text-[10px] text-right">
//                                     {moment(msg.timestamp).format("hh:mm A")}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}

//                     </div>

//                     {/* Chat Input */}
//                     <div className="sticky bottom-0 bg-white border-t p-3">
//                         {/* File Preview */}
//                         {filePreview && (
//                             <div className="mb-4 p-2 border rounded-lg">
//                                 {file.type.startsWith('image/') ? (
//                                     <img src={filePreview} alt="File Preview" className="w-40 h-40 object-cover rounded" />
//                                 ) : (
//                                     <div className="flex items-center space-x-2">
//                                         <span className="text-sm text-gray-700">File: {file.name}</span>
//                                         <a href={filePreview} download className="text-blue-500 underline">
//                                             Download Preview
//                                         </a>
//                                     </div>
//                                 )}
//                                 <button
//                                     onClick={() => {
//                                         setFilePreview(null); // Clear preview
//                                         setFile(null); // Clear file
//                                     }}
//                                     className="mt-2 text-sm text-red-500 hover:text-red-700"
//                                 >
//                                     Remove File
//                                 </button>
//                             </div>
//                         )}

//                         {/* Chat Input Field */}
//                         <div className="flex items-center space-x-2">
//                             <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
//                                 <FaPaperclip className="text-gray-700" />
//                                 <input
//                                     type="file"
//                                     onChange={handleFileChange}
//                                     className="hidden"
//                                 />
//                             </label>
//                             <input
//                                 type="text"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Type your message..."
//                                 className="p-2 rounded-md w-full bg-gray-200 text-sm text-gray-700 focus:outline-none"
//                             />
//                             <button onClick={handleSendMessage} className="p-2 bg-blue-500 rounded-full">
//                                 <FaRegPaperPlane className="text-white text-sm" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ChatPage;


import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegPaperPlane, FaVideo, FaPaperclip } from "react-icons/fa";
import Header from "../partials/Header";
import ChatSidebar from "./ChatSidebar";
import apiInstance from "../../utils/axios";
import Cookies from "js-cookie";
import useUserData from "../../plugin/useUserData";
import moment from "moment";

const ChatPage = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState(null);
    const [userProfiles, setUserProfiles] = useState([]);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null); // State for file preview
    const [isAtBottom, setIsAtBottom] = useState(true);
    const ws = useRef(null);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const accessToken = Cookies.get("access_token");
    const { profileId } = useParams();
    const userId = useUserData()?.user_id;

    const sender_id = userId;
    const receiver_id = Number(profileId) + 1;

    const isDevelopment = import.meta.env.MODE === 'development';
    const BaseUrl = isDevelopment ? import.meta.env.VITE_LOCAL_BASEURL : import.meta.env.VITE_DEPLOY_BASEURL;

    // Fetch chat room and messages
    const fetchRoomAndMessages = async () => {
        try {
            const response = await apiInstance.get(`chat-room/${sender_id}/${receiver_id}/`);
            setRoom(response.data);
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Error fetching room and messages:", error);
        }
    };

    // Fetch user profiles
    const fetchProfiles = async () => {
        try {
            const response_user = await apiInstance.get("user/profiles/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUserProfiles(response_user.data);
        } catch (error) {
            console.log(error);
        }
    };

    // WebSocket setup
    useEffect(() => {
        if (room?.id) {
            const wsUrl = BaseUrl.replace('http', 'ws') + `/ws/chat/${room.id}/`;
            ws.current = new WebSocket(wsUrl);

            ws.current.onopen = () => console.log("WebSocket connected");

            ws.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data?.text || data?.file_url) {
                        setMessages((prevMessages) => [...prevMessages, data]);
                    }
                } catch (error) {
                    console.error("WebSocket message parsing error:", error);
                }
            };

            ws.current.onerror = (error) => console.error("WebSocket error:", error);

            ws.current.onclose = () => {
                console.log("WebSocket disconnected, attempting to reconnect...");
                setTimeout(() => fetchRoomAndMessages(), 1000);
            };

            return () => ws.current?.close();
        }
    }, [room, BaseUrl]);

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const previewURL = URL.createObjectURL(selectedFile); // Generate temporary URL
            setFilePreview(previewURL); // Set file preview URL
            setFile(selectedFile); // Set file for sending
        }
    };

    // Handle sending messages
    const handleSendMessage = async () => {
        if ((message.trim() || file) && room) {
            const formData = new FormData();
            formData.append("room_id", room.id);
            formData.append("sender_id", sender_id);
            formData.append("text", message);
            if (file) {
                formData.append("file", file);
            }

            try {
                const response = await apiInstance.post("send-message/", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // Optimistic update
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: Date.now(), // Temporary ID for optimistic update
                        sender: { id: sender_id },
                        text: message,
                        file_url: response.data.file,
                        timestamp: new Date().toISOString(),
                    },
                ]);

                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send(JSON.stringify({
                        id: Date.now(), // Temporary ID for WebSocket
                        sender_id: sender_id,
                        text: message,
                        file_url: response.data.file,
                        timestamp: new Date().toISOString(),
                    }));
                }

                setMessage("");
                setFile(null); // Clear file
                setFilePreview(null); // Clear file preview
                setIsAtBottom(true); // Enable auto-scroll
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    // Auto-scroll only if user is at the bottom
    useEffect(() => {
        if (isAtBottom) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Handle manual scrolling (Detect if user is at the bottom)
    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
        }
    };

    // Handle pressing Enter to send a message
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent new line
            handleSendMessage();
        }
    };

    // Fetch initial data
    useEffect(() => {
        fetchRoomAndMessages();
        fetchProfiles();
    }, [userId, profileId]);

    return (
        <>
            <Header />
            <div className="flex h-screen bg-gray-100">
                <ChatSidebar setProfileId={profileId} />
                <div className="flex-1 flex flex-col bg-white">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between border-b p-3">
                        {userProfiles.map(
                            (profile) =>
                                profile.id == profileId && (
                                    <div key={profile.id} className="flex items-center space-x-2">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
                                            <img
                                                src={profile.profile_image}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{profile.full_name}</p>
                                        </div>
                                    </div>
                                )
                        )}
                        <Link to={'/vc-lobby'}>
                            <FaVideo size={28} className="text-gray-700 hover:text-blue-500 cursor-pointer mr-8" />
                        </Link>
                    </div>

                    {/* Chat Messages Container */}
                    <div
                        ref={chatContainerRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto p-3 space-y-3"
                    >
                        {messages.map((msg, index) => (
                        <div
                            key={msg.id || msg.timestamp} // Use a unique key
                            ref={index === messages.length - 1 ? messagesEndRef : null}
                            className={`flex ${msg.sender?.id === sender_id ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`p-2 rounded-lg max-w-xs ${msg.sender?.id === sender_id ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                                {msg.file && (
                                    <div className="mb-2">
                                        {/* Handle image files */}
                                        {msg.file.endsWith('.jpg') || msg.file.endsWith('.png') || msg.file.endsWith('.jpeg') || msg.file.endsWith('.gif') || msg.file.endsWith('.webp') ? (
                                            <img src={`${BaseUrl}${msg.file}`} alt="Media" className="w-full h-auto rounded" />
                                        ) : msg.file.endsWith('.pdf') ? (
                                            /* Handle PDF files */
                                            <a 
                                                href={`${BaseUrl}${msg.file}`} 
                                                download 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-black underline"
                                            >
                                                {msg.file.split("/").pop()}
                                            </a>
                                        ) : (
                                            /* Handle other file types */
                                            <a 
                                                href={`${BaseUrl}${msg.file}`} 
                                                download 
                                                className="text-black underline"
                                            >
                                                Download File
                                            </a>
                                        )}
                                    </div>
                                )}
                                {msg.text && <p className="text-sm">{msg.text}</p>}
                                <p className="text-[10px] text-right">
                                    {moment(msg.timestamp).format("hh:mm A")}
                                </p>
                            </div>
                        </div>
                    ))}

                    </div>

                    {/* Chat Input */}
                    <div className="sticky bottom-0 bg-white border-t p-3">
                        {/* File Preview */}
                        {filePreview && (
                            <div className="mb-4 p-2 border rounded-lg">
                                {file.type.startsWith('image/') ? (
                                    <img src={filePreview} alt="File Preview" className="w-40 h-40 object-cover rounded" />
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-700">File: {file.name}</span>
                                        <a href={filePreview} download className="text-blue-500 underline">
                                            Download Preview
                                        </a>
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        setFilePreview(null); // Clear preview
                                        setFile(null); // Clear file
                                    }}
                                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                                >
                                    Remove File
                                </button>
                            </div>
                        )}

                        {/* Chat Input Field */}
                        <div className="flex items-center space-x-2">
                            <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
                                <FaPaperclip className="text-gray-700" />
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Type your message..."
                                className="p-2 rounded-md w-full bg-gray-200 text-sm text-gray-700 focus:outline-none"
                            />
                            <button onClick={handleSendMessage} className="p-2 bg-blue-500 rounded-full">
                                <FaRegPaperPlane className="text-white text-sm" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;