import React, { useEffect, useState } from "react";
import { supabase } from "./supabase"; // Ensure correct import of Supabase client

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [streak, setStreak] = useState(0);
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
          .select("name, email, streak")
          .eq("user_id", userId)
          .single();

        if (fetchError) {
          console.error("Error fetching user profile:", fetchError.message);
          return;
        }

        setUserName(userDetails?.name || "User");
        setEmail(userDetails?.email || "No email provided");
        setStreak(userDetails?.streak || 0);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-lg"><strong>Name:</strong> {userName}</p>
        <p className="text-lg"><strong>Email:</strong> {email}</p>
        <p className="text-lg"><strong>Streak:</strong> {streak}</p>
      </div>
    </div>
  );
};

export default Profile;