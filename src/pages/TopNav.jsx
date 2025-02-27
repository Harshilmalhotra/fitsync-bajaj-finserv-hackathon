import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { supabase } from "./supabase"; // Ensure correct import of Supabase client

const TopNav = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) return;

        const userId = userData.user.id;

        // Fetch user's name from registered_trackies table
        const { data: userDetails, error: fetchError } = await supabase
          .from("registered_trackies")
          .select("name")
          .eq("user_id", userId)
          .single();

        if (fetchError) {
          console.error("Error fetching user name:", fetchError.message);
          return;
        }

        setUserName(userDetails?.name || "User");
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div className="bg-amber-50 p-4 rounded-md w-full">
        <h1 className="text-xl font-bold">Welcome {userName}!</h1>
      </div>
      <div className="ml-4">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Bell size={24} />
        </button>
      </div>
    </div>
  );
};

export default TopNav;
