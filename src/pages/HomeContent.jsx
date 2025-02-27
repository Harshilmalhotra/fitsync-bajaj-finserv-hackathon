import React from 'react';
import StatCard from './StatCard';
import ActivityItem from './ActivityItem';
import UpcomingItem from './UpcomingItem';
import '../App.css'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HomeContent = () => {
  const data = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    progress: Math.floor(Math.random() * 100),
  }));
  return (
    <div className="space-y-6 bg-black text-gray-200">
      <h2 className="text-2xl font-bold">Your Dashboard</h2>

      <div className="grid grid-cols-3 gap-6 bg-gray-800 rounded-3xl">
        <StatCard
          title="Daily Steps"
          value="2,432"
          target="10,000"
          percentage={24}
          icon={<ActivityItem size={24} />}
          textColor="text-cyan-400"
        />
        <StatCard
          title="Posture Score"
          value="87"
          target="100"
          percentage={87}
          icon={<ActivityItem size={24} />}
          textColor="text-cyan-400"
        />
        <StatCard
          title="Active Minutes"
          value="30"
          target="60"
          percentage={50}
          icon={<ActivityItem size={24} />}
          textColor="text-cyan-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <ActivityItem
              title="Posture Session"
              time="Today, 10:30 AM"
              duration="15 min"
              improvement="+7%"
              textColor="text-lime-500"
            />
            <ActivityItem
              title="Shoulder Exercise"
              time="Yesterday, 4:15 PM"
              duration="20 min"
              improvement="+5%"
              textColor="text-lime-500"
            />
            <ActivityItem
              title="Back Strengthening"
              time="Feb 26, 2:00 PM"
              duration="25 min"
              improvement="+8%"
              textColor="text-lime-500"
            />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            <UpcomingItem
              title="Live Coaching Session"
              time="Today, 5:00 PM"
              duration="30 min"
              type="Live"
              textColor="text-lime-500"
            />
            <UpcomingItem
              title="Group Challenge"
              time="Tomorrow, 3:00 PM"
              duration="45 min"
              type="Group"
              textColor="text-lime-500"
            />
            <UpcomingItem
              title="Posture Assessment"
              time="Feb 28, 11:00 AM"
              duration="15 min"
              type="Assessment"
              textColor="text-lime-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-white mb-6">
          Weekly Progress Overview
        </h3>
        <div className="h-64 w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-inner p-4 flex items-center">
          {/* Chart Component */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(200, 200, 200, 0.5)" strokeDasharray="5 5" />
              <XAxis dataKey="day" stroke="#374151" tick={{ fill: "#6b7280" }} />
              <YAxis stroke="#374151" tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderRadius: "10px",
                  border: "none",
                  color: "#fff",
                }}
                labelStyle={{ color: "#9ca3af" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ stroke: "#3b82f6", strokeWidth: 2, fill: "#3b82f6" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-300 mt-4 text-center">
          Tracking your daily progress helps you stay on top of your goals!
        </p>
      </div>
    </div>
  );
};

export default HomeContent;