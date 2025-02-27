import React, { useEffect, useState } from 'react';
import { supabase } from './supabase'; // Import your Supabase client
import { useNavigate } from 'react-router-dom';
import UserStats from './UserStats';

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Fetch the logged-in user's details
  //   const fetchUser = async () => {
  //     const { data: session } = await supabase.auth.getSession();
  //     if (session?.user) {
  //       setUser(session.user);
  //     } else {
  //       // If no session, redirect to login
  //       navigate('/login');
  //     }
  //   };
  //   fetchUser();
  // }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error("Error during logout:", error.message);
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
        {/* Display the user's email or name */}
        <h3 className="font-medium">{user?.email || 'User'}</h3>
        <button className="text-blue-500 text-sm mt-1">Edit Profile</button>
        <button onClick={handleLogout} className="text-blue-500 text-sm cursor-pointer">
          Logout
        </button>

        <div className="mt-6">
          <UserStats />
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
