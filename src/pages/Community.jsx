import React, { useEffect, useState } from "react";
import { supabase } from "./supabase"; // Ensure correct import of Supabase client

const Community = () => {
  const [userName, setUserName] = useState("");
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  const sampleCommunities = [
    {
      id: "1",
      name: "Fitness Enthusiasts",
      description: "A community for fitness lovers to share tips and workouts.",
      image: "https://via.placeholder.com/300x150.png?text=Fitness+Enthusiasts",
    },
    {
      id: "2",
      name: "Healthy Eating",
      description: "Join us to explore healthy recipes and nutrition advice.",
      image: "https://via.placeholder.com/300x150.png?text=Healthy+Eating",
    },
    {
      id: "3",
      name: "Yoga and Meditation",
      description: "Find peace and balance with yoga and meditation practices.",
      image: "https://via.placeholder.com/300x150.png?text=Yoga+and+Meditation",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          console.error("User authentication error:", userError);
          return;
        }

        const userId = userData.user.id;
        console.log("Authenticated User ID:", userId);

        // Fetch user's name and joined communities
        const { data: userDetails, error: fetchError } = await supabase
          .from("registered_trackies")
          .select("name, communities")
          .eq("user_id", userId)
          .single();

        if (fetchError) {
          console.error("Error fetching user data:", fetchError.message);
          return;
        }

        console.log("Fetched user details:", userDetails);

        setUserName(userDetails?.name || "User");

        // Ensure communities are stored as an array
        const userCommunities = userDetails?.communities || [];
        setJoinedCommunities(Array.isArray(userCommunities) ? userCommunities.map(String) : []);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleJoinCommunity = async (communityId) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error("User not authenticated:", userError);
        return;
      }

      const userId = userData.user.id;
      const updatedCommunities = [...joinedCommunities, String(communityId)];

      const { error } = await supabase
        .from("registered_trackies")
        .update({ communities: updatedCommunities })
        .eq("user_id", userId);

      if (error) {
        console.error("Error updating communities:", error.message);
        return;
      }

      console.log("Community joined successfully:", updatedCommunities);
      setJoinedCommunities(updatedCommunities);
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  return (
    <div className="p-6 bg-primary text-textPrimary">
      <h1 className="text-2xl font-bold mb-6">Welcome {userName}!</h1>

      {/* My Communities Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">My Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCommunities
            .filter((community) => joinedCommunities.includes(String(community.id)))
            .map((community) => (
              <div
                key={community.id}
                className="bg-secondary p-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
              >
                <img src={community.image} alt={community.name} className="w-full h-32 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-bold mb-2">{community.name}</h3>
                <p className="text-textSecondary mb-4">{community.description}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Join a New Community Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Join a New Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCommunities
            .filter((community) => !joinedCommunities.includes(String(community.id)))
            .map((community) => (
              <div
                key={community.id}
                className="bg-secondary p-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
              >
                <img src={community.image} alt={community.name} className="w-full h-32 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-bold mb-2">{community.name}</h3>
                <p className="text-textSecondary mb-4">{community.description}</p>
                <button
                  className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accentSecondary transition"
                  onClick={() => handleJoinCommunity(community.id)}
                >
                  Join
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
