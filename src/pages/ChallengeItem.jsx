import React from 'react';

const ChallengeItem = ({ title, progress, days, participants }) => {
  return (
    <div className="border-b border-gray-100 pb-4">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{days} days completed</span>
        <span>{participants} participants</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ChallengeItem;