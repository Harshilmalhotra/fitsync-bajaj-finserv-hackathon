import React from 'react';
import StatCard from './StatCard';
import ActivityItem from './ActivityItem';
import UpcomingItem from './UpcomingItem';

const HomeContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Daily Steps"
          value="7,432"
          target="10,000"
          percentage={74}
          icon={<ActivityItem size={24} />}
        />
        <StatCard
          title="Posture Score"
          value="87"
          target="100"
          percentage={87}
          icon={<ActivityItem size={24} />}
        />
        <StatCard
          title="Active Minutes"
          value="48"
          target="60"
          percentage={80}
          icon={<ActivityItem size={24} />}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <ActivityItem
              title="Posture Session"
              time="Today, 10:30 AM"
              duration="15 min"
              improvement="+7%"
            />
            <ActivityItem
              title="Shoulder Exercise"
              time="Yesterday, 4:15 PM"
              duration="20 min"
              improvement="+5%"
            />
            <ActivityItem
              title="Back Strengthening"
              time="Feb 26, 2:00 PM"
              duration="25 min"
              improvement="+8%"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            <UpcomingItem
              title="Live Coaching Session"
              time="Today, 5:00 PM"
              duration="30 min"
              type="Live"
            />
            <UpcomingItem
              title="Group Challenge"
              time="Tomorrow, 3:00 PM"
              duration="45 min"
              type="Group"
            />
            <UpcomingItem
              title="Posture Assessment"
              time="Feb 28, 11:00 AM"
              duration="15 min"
              type="Assessment"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder: Weekly progress visualization</p>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;