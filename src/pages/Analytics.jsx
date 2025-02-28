import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { supabase } from './supabase';




const Analytics = () => {

  const [userId, setUserId] = useState("");

  const fetchUsername = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) return;

      setUserId(userData.user.id);
      //   console.log(userId)

    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };
  fetchUsername();


  const [stats, setStats] = useState();

  let data = []
  const fetchData = async () => {
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from('registered_trackies')
        .select('total_squats, pushups, jumping_jacks, toe_touch, curls')
        .eq('user_id', userId)
        .single();

      data = [
        { name: "Squats", value: currentData.total_squats },
        { name: "Pushups", value: currentData.pushups },
        { name: "Jumping Jacks", value: currentData.jumping_jacks },
        { name: "Toe Touch", value: currentData.toe_touch },
        { name: "Curls", value: currentData.curls },
      ]

      setStats(data);
      // console.log(stats)
    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  }
  fetchData();

  // const data = [
  //   { name: "Squats", value: stats.total_squats },
  //   { name: "Pushups", value: (stats.pushups) },
  //   { name: "Jumping Jacks", value: (stats.jumping_jacks) },
  //   { name: "Toe Touch", value: (stats.toe_touch) },
  //   { name: "Curls", value: (stats.curls) },
  // ];

  // console.log(data)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA78FF"];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      {/* <div className="flex justify-end space-x-2">
        {['Week', 'Month', '3 Months', 'Year'].map((range) => (
          <button
            key={range}
            className={`px-3 py-1 rounded-md ${range === 'Month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            {range}
          </button>
        ))}
      </div> */}

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Posture Score Trends</h3>
          <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder: Posture score over time</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
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

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Posture Issues</h3>
          <div className="space-y-3">
            {[
              { issue: "Forward Head", percentage: 42 },
              { issue: "Rounded Shoulders", percentage: 28 },
              { issue: "Pelvic Tilt", percentage: 18 },
              { issue: "Other Issues", percentage: 12 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.issue}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Session Duration</h3>
          <div className="h-40 w-full bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder: Duration bars</p>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Duration</span>
              <span className="font-semibold">18 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Improvement Rate</h3>
          <div className="flex flex-col items-center justify-center h-40">
            <div className="relative w-32 h-32">
              <div className="w-32 h-32 rounded-full bg-gray-100"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold">+23%</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-2">vs. previous month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;