// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import { FaRegPaperPlane, FaSearch } from "react-icons/fa";
// import Header from "../partials/Header";
// import apiInstance from "../../utils/axios";
// import Cookies from 'js-cookie';

// const ChatPage = () => {
//     const [messages, setMessages] = useState([
//         { sender: "user", text: "Hey there!" },
//         { sender: "admin", text: "Hello! How can I assist you?" },
//     ]);
//     const [message, setMessage] = useState("");

//     const handleSendMessage = () => {
//         if (message.trim()) {
//             setMessages([...messages, { sender: "user", text: message }]);
//             setMessage("");
//         }
//     };

//     const [userProfiles, setUserProfiles] = useState([]);

//     const accessToken = Cookies.get('access_token');

//     const { profileId } = useParams(); 


//     const fetchProfiles = async () => {
//         try {
//             const response_user = await apiInstance.get(
//                 `user/profiles/`,
//                 {headers: { Authorization: `Bearer ${accessToken}` },}
//             );
//             setUserProfiles(response_user.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchProfiles();
//     }, []);

//     const handleSearch = (e) => {
//       const query = e.target.value.toLowerCase();
//       if (query === "") {
//           fetchProfiles();
//       } else {
//           const filtered = userProfiles.filter((p) =>
//               p.full_name.toLowerCase().includes(query)
//           );
//           setUserProfiles(filtered);
//       }
//   };

//     return (
//         <>
//             <Header />
//             <div className="flex h-screen bg-gray-100">
//                 {/* Sidebar */}
//                 <div className="w-1/4 bg-white border-r border-gray-200 p-3">
//                     {/* Search Input */}
//                     <div className="flex items-center space-x-2">
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className="p-1.5 rounded-md w-full bg-gray-200 text-sm text-gray-700 focus:outline-none"
//                             onChange={(e) => handleSearch(e)}
//                         />
//                         <FaSearch className="text-gray-500 text-sm" />
//                     </div>

//                     {/* User Profiles */}
//                     <div className="mt-3 space-y-2">
//                         {userProfiles.map((profile) => (
//                             <div
//                                 key={profile.id} // Unique key for each profile
//                                 className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
//                             >
//                                 {/* Profile Picture */}
//                                 <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
//                                     <img
//                                         src={profile.profile_image}
//                                         alt="Profile"
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>

//                                 {/* Profile Details */}
//                                 <div className="flex-1">
//                                     <p className="font-medium text-sm text-gray-700">
//                                         {profile.full_name}
//                                     </p>
//                                     <p className="text-green-700 text-xs">
//                                     Online
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Chat Window */}
//                 <div className="flex-1 flex flex-col bg-white">
//                     {/* Header */}
//                     <div className="flex items-center justify-between border-b p-3">
//                     {userProfiles.map((profile) => (
//                         profile.id == profileId && (
//                         <div key={profile.id} className="flex items-center space-x-2">
//                             <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
//                                 <img
//                                     src={profile.profile_image}
//                                     alt="Profile"
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
//                             <div>
//                                 <p className="font-medium text-sm">{profile.full_name}</p>
//                                 <p className="text-gray-500 text-xs">
//                                     Active Now
//                                 </p>
//                             </div>
//                         </div>
//                         )
//                         ))}
//                     </div>

//                     {/* Messages */}
//                     <div className="flex-1 overflow-y-auto p-3 space-y-3">
//                         {messages.map((msg, index) => (
//                             <div
//                                 key={index}
//                                 className={`flex ${
//                                     msg.sender === "user"
//                                         ? "justify-end"
//                                         : "justify-start"
//                                 }`}
//                             >
//                                 <div
//                                     className={`p-2.5 max-w-xs rounded-md text-sm text-white ${
//                                         msg.sender === "user"
//                                             ? "bg-blue-500"
//                                             : "bg-gray-500"
//                                     }`}
//                                 >
//                                     {msg.text}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Message Input */}
//                     <div className="sticky bottom-0 bg-white border-t p-3">
//                         <div className="flex items-center space-x-2">
//                             <input
//                                 type="text"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 placeholder="Type your message..."
//                                 className="p-2 rounded-md w-full bg-gray-200 text-sm text-gray-700 focus:outline-none"
//                             />
//                             <button
//                                 onClick={handleSendMessage}
//                                 className="p-2 bg-blue-500 rounded-full"
//                             >
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


// src/components/ChatPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegPaperPlane } from "react-icons/fa";
import Header from "../partials/Header";
import ChatSidebar from "./ChatSidebar";
import apiInstance from "../../utils/axios";
import Cookies from "js-cookie";

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { sender: "user", text: "Hey there!" },
        { sender: "admin", text: "Hello! How can I assist you?" },
    ]);
    const [message, setMessage] = useState("");
    // const [profileId, setProfileId] = useState(null);
    const [userProfiles, setUserProfiles] = useState([]);

    const accessToken = Cookies.get("access_token");

    const { profileId } = useParams();

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

    useEffect(() => {
        fetchProfiles();
    }, []);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { sender: "user", text: message }]);
            setMessage("");
        }
    };

    const navigate = useNavigate();

    // Function to handle the profile click in the sidebar
    const setProfileId = (id) => {
        navigate(`/chat/${id}`); // Navigate to the selected profile's chat page
    };

    return (
        <>
            <Header />
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <ChatSidebar setProfileId={setProfileId} />

                {/* Chat Window */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Header */}
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
                                            <p className="text-gray-500 text-xs">Active Now</p>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`p-2.5 max-w-xs rounded-md text-sm text-white ${
                                        msg.sender === "user" ? "bg-blue-500" : "bg-gray-500"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="sticky bottom-0 bg-white border-t p-3">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="p-2 rounded-md w-full bg-gray-200 text-sm text-gray-700 focus:outline-none"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="p-2 bg-blue-500 rounded-full"
                            >
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

