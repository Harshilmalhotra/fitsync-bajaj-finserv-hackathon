import React from 'react';

const StatCard = ({ title, value, target, percentage, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <div className="p-2 bg-blue-100 rounded-md text-blue-600">
          {icon}
        </div>
      </div>

      <div className="mb-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-gray-500 text-sm ml-2">/ {target}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatCard;