import { useState, useEffect } from "react";
import { supabase } from "./supabase"; // Ensure supabase client is properly configured

export default function Connection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [connections, setConnections] = useState([
        {
            id: 1,
            users: { name: "test2", email: "test2@gmail.com" },
            status: "accepted",
        },
        {
            id: 2,
            users: { name: "arya", email: "ak@gm    ail.com" },
            status: "accepted",
        },
    ]); // Add some fake connections
    const [pendingRequests, setPendingRequests] = useState([]);
    const [userId, setUserId] = useState(null);

    // Fetch authenticated user
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data: userData, error: userError } = await supabase.auth.getUser();
                if (userError || !userData?.user) return;

                const userId = userData.user.id;
                setUserId(userId);

                // Fetch user's name from registered_trackies table
                const { data: userDetails, error: fetchError } = await supabase
                    .from("registered_trackies")
                    .select("name, streak")
                    .eq("user_id", userId)
                    .single();

                if (fetchError) {
                    console.error("Error fetching user data:", fetchError.message);
                    return;
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        };

        fetchUserData();
    }, []);

    const fetchUsers = async () => {
        if (!searchQuery.trim()) {
            alert("Please enter a search query!");
            return;
        }
        const { data, error } = await supabase
            .from("registered_trackies")
            .select("id, name, email")
            .ilike("name", `%${searchQuery}%`);

        if (!error) setUsers(data);
        else console.error("Error fetching users:", error);
    };

    // Send a connection request
    const sendRequest = async (receiverId) => {
        if (!userId) {
            alert("User not authenticated!");
            return;
        }

        const { error } = await supabase.from("connections").insert({
            sender_id: userId,
            receiver_id: receiverId,
            status: "pending",
        });

        if (!error) {
            alert("Connection request sent!");
            fetchConnections();
        } else {
            console.error("Error sending connection request:", error);
        }
    };

    const acceptRequest = async (connectionId) => {
        const { error } = await supabase
            .from("connections")
            .update({ status: "accepted" })
            .eq("id", connectionId);

        if (!error) {
            alert("Connection request accepted!");
            fetchConnections();
        } else {
            console.error("Error accepting connection request:", error);
        }
    };

    const fetchConnections = async () => {
        if (!userId) return;

        const { data, error } = await supabase
            .from("connections")
            .select(
                "id, sender_id, receiver_id, status, registered_trackies!receiver_id(name, email)"
            )
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

        if (!error) {
            setConnections(data.filter((conn) => conn.status === "accepted"));
            setPendingRequests(data.filter((conn) => conn.status === "pending" && conn.receiver_id === userId));
        } else console.error("Error fetching connections:", error);
    };

    useEffect(() => {
        if (userId) fetchConnections();
    }, [userId]);

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
                            <h3 className="text-lg font-semibold">{user.name}</h3>
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
                <h3 className="text-xl font-bold mb-2">Pending Requests</h3>
                {pendingRequests.map((request) => (
                    <div
                        key={request.id}
                        className="flex items-center justify-between p-2 border-b"
                    >
                        <div>
                            <h4 className="text-lg font-semibold">
                                {request.users?.name || "Unknown"}
                            </h4>
                            <p className="text-sm text-gray-600">
                                {request.users?.email || "No email available"}
                            </p>
                        </div>
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded-lg"
                            onClick={() => acceptRequest(request.id)}
                        >
                            Accept
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
                                {connection.users?.name || "Unknown"}
                            </h4>
                            <p className="text-sm text-gray-600">
                                {connection.users?.email || "No email available"}
                            </p>
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
