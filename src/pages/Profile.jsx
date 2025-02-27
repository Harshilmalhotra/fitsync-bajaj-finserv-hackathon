import React, { useEffect, useState } from "react";
import { supabase } from "./supabase"; // Ensure correct import of Supabase client
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [streak, setStreak] = useState(0);
  const [profilePicture, setProfilePicture] = useState(""); // For profile photo
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) return;

        const userId = userData.user.id;

        // Fetch user's profile information from registered_trackies table
        const { data: userDetails, error: fetchError } = await supabase
          .from("registered_trackies")
          .select("name, email, streak") // Ensure profile_picture is fetched
          .eq("user_id", userId)
          .single();

        if (fetchError) {
          console.error("Error fetching user profile:", fetchError.message);
          return;
        }

        setUserName(userDetails?.name || "User");
        setEmail(userDetails?.email || "No email provided");
        setStreak(userDetails?.streak || 0);
        setProfilePicture(userDetails?.profile_picture || "");
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="p-6 flex flex-col items-center h-[500px]"
      style={{
        backgroundImage: "url('https://contents.mediadecathlon.com/p2722363/k$08a0101e3d16b1f341174cecafc562ec?format=auto&f=3000x0')",
        backgroundSize: "object-fit",
        backgroundPosition: "center"
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white mt-8">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-300" />
          )}
        </div>
        <div className="text-center text-black">
          <p className="text-lg font-medium mb-2">
            <strong>Name:</strong> {userName}
          </p>
          <p className="text-lg font-medium mb-2">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-lg font-medium mb-2">
            <strong>Streak:</strong> {streak}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
