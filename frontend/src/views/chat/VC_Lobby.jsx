import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";


const VC_Lobby = () => {
  const [room, setRoom] = useState('');
  // const [name, setName] = useState('');
  const navigate = useNavigate();

  const fullname = useUserData()?.full_name;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await apiInstance.get(`get_token/?channel=${room.toUpperCase()}`);
    const data = await response.data;
    const UID = data.uid
    const token = data.token

    sessionStorage.setItem('UID', UID);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('room', room.toUpperCase());
    sessionStorage.setItem('name', fullname);

    navigate('vc-room');
  };

  return (
    <>
    <Header/>
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to MyChat</h1>
          <p className="text-gray-600">A group video calling platform made just for you!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Room:</label>
              <input
                type="text"
                name="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter a room name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-uppercase"
              />
            </div>

            {/* <div>
              <label className="block text-gray-700 font-medium mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-uppercase"
              />
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Join Stream
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default VC_Lobby;
