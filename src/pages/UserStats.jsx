import React from 'react';

const UserStats = () => {
  const stats = [
    { label: 'Workouts', value: '24' },
    { label: 'Challenges', value: '7' },
    { label: 'Streak', value: '5 days ' },
  ];

  return (
    <div className="bg-white rounded-md p-4 shadow-sm">
      <h4 className="font-medium mb-3">Your Stats</h4>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{stat.label}</span>
            <span className="font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;