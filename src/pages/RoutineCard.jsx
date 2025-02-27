import React from 'react';

const RoutineCard = ({ title, exercises, duration, level }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="flex text-sm text-gray-600 mb-3">
        <span className="mr-3">{exercises} exercises</span>
        <span>{duration}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
          {level}
        </span>
        <button className="text-blue-600 hover:underline text-sm">
          Start Now
        </button>
      </div>
    </div>
  );
};

export default RoutineCard;