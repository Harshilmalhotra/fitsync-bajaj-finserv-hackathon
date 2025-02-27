import { useState, useEffect } from "react";
import { supabase } from "./supabase"; 

export default function Connection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [connections, setConnections] = useState([]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("registered_trackies")
      .select("id, username, email")
      .ilike("username", `%${searchQuery}%`); 

    if (!error) setUsers(data);
  };

  const sendRequest = async (receiverId) => {
    const userId = supabase.auth.user().id; 
    const { error } = await supabase.from("connections").insert({
      sender_id: userId,
      receiver_id: receiverId,
      status: "pending",
    });

    if (!error) alert("Connection request sent!");
  };

  const fetchConnections = async () => {
    const userId = supabase.auth.user().id;
    const { data, error } = await supabase
      .from("connections")
      .select(
        "id, sender_id, receiver_id, status, users!receiver_id(username, email)"
      )
      .eq("sender_id", userId)
      .or(`receiver_id.eq.${userId}`); // Fetch requests where the user is sender or receiver

    if (!error) setConnections(data);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Find & Connect</h2>
      <input
        type="text"
        placeholder="Search users..."
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={fetchUsers}
      >
        Search
      </button>

      <div className="mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 border-b"
          >
            <div>
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded-lg"
              onClick={() => sendRequest(user.id)}
            >
              Connect
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">My Connections</h3>
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="flex items-center justify-between p-2 border-b"
          >
            <div>
              <h4 className="text-lg font-semibold">
                {connection.users.username}
              </h4>
              <p className="text-sm text-gray-600">{connection.users.email}</p>
            </div>
            <p className="text-sm font-bold text-gray-500">
              {connection.status.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
