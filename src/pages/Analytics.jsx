import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, XAxis, YAxis, Line } from "recharts";
import { supabase } from './supabase';

const Analytics = () => {
  const [userId, setUserId] = useState("");
  const [stats, setStats] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA78FF"];

  const fetchUsername = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }
      if (userData?.user) {
        setUserId(userData.user.id);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const fetchData = async () => {
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from('registered_trackies')
        .select('total_squats, pushups, jumping_jacks, toe_touch, curls')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;

      const updatedData = [
        { name: "Squats", value: currentData.total_squats },
        { name: "Pushups", value: currentData.pushups },
        { name: "Jumping Jacks", value: currentData.jumping_jacks },
        { name: "Toe Touch", value: currentData.toe_touch },
        { name: "Curls", value: currentData.curls },
      ];

      setStats(updatedData);
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  const generateRandomData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({
      day,
      score: Math.floor(Math.random() * 50) + 50, // Random score between 50 and 100
    }));
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    setLineChartData(generateRandomData());
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Leaderboard Score Trends</h3>
          <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
          <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {stats?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
