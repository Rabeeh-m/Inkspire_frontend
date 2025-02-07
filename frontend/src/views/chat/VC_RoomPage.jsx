import React from "react";
import { useState, useEffect } from "react";
import { leaveAndRemoveLocalStream, toggleCamera, toggleMic } from "./streams";

const VC_RoomPage = () => {
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        const storedChannel = sessionStorage.getItem("room"); // Get channel from sessionStorage
        if (storedChannel) {
            setRoomName(storedChannel); // Set room name state
        }
    }, []);
    
    
    
    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center p-4">
            <main className="w-full max-w-7xl bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Room Name Section */}
                <section
                    id="room-name-wrapper"
                    className="p-4 border-b border-gray-200"
                >
                    <p className="text-lg font-medium">
                        Room Name:{" "}
                        <span id="room-name" className="text-blue-600">
                            {roomName}
                        </span>
                    </p>
                </section>

                {/* Video Streams Section */}
                <section
                    id="video-streams"
                    className="flex flex-wrap items-center justify-center p-4 bg-gray-50 min-h-[450px]"
                >
                    
                </section>

                {/* Controls Section */}
                <section
                    id="controls-wrapper"
                    className="flex justify-center items-center gap-x-6 p-4 bg-gray-200"
                >
                    <div className="icon-wrapper">
                        <img
                            className="control-icon w-10 h-10 cursor-pointer"
                            id="mic-btn"
                            src="https://cdn-icons-png.flaticon.com/128/10347/10347481.png"
                            alt="Microphone Icon"
                            onClick={toggleMic}
                        />
                    </div>

                    <div className="icon-wrapper">
                        <img
                            className="control-icon w-12 h-12 cursor-pointer"
                            id="camera-btn"
                            src="https://cdn-icons-png.flaticon.com/128/8408/8408021.png"
                            alt="Camera Icon"
                            onClick={toggleCamera}
                        />
                    </div>

                    <div className="icon-wrapper">
                        <img
                            className="control-icon w-10 h-10 cursor-pointer"
                            id="leave-btn"
                            src="https://cdn-icons-png.flaticon.com/128/10152/10152161.png"
                            alt="Leave Icon"
                            onClick={leaveAndRemoveLocalStream}
                        />
                    </div>
                </section>
            </main>

        </div>
    );
};

export default VC_RoomPage;

