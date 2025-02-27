import React from 'react';

const UpcomingChallengeItem = ({ title, startDate, duration, participants }) => {
  return (
    <div className="border-b border-gray-100 pb-4">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Starts {startDate} • {duration}</span>
        <span>{participants} joined</span>
      </div>
      <button className="w-full bg-blue-50 text-blue-600 py-1 px-4 rounded-md hover:bg-blue-100 text-sm">
        Join Challenge
      </button>
    </div>
  );
};

export default UpcomingChallengeItem;