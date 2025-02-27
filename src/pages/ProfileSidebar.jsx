import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserStats from './UserStats';

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="w-64 bg-gray-200 p-6">
      <div className="text-center flex flex-col">
        <h2 className="text-lg font-semibold mb-4">PROFILE</h2>
        <div className="flex justify-center mb-2">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/cheerful-positive-glad-man-has-broad-smile-rejoices-promotion-work_273609-16600.jpg?semt=ais_hybrid"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h3 className="font-medium">Wilfred Joseph</h3>
        <button className="text-blue-500 text-sm mt-1">Edit Profile</button>
        <button onClick={handleLogout} className="text-blue-500 text-sm cursor-pointer">Logout</button>

        <div className="mt-6">
          <UserStats />
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;