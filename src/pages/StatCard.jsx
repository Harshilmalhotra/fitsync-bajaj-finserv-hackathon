import React from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';

const StatCard = ({ title, value, target, percentage, icon = <AiOutlineLineChart size={24} /> }) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 animate-fade-in"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-md">
          {icon}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-3xl font-extrabold text-gray-800">{value}</span>
        <span className="text-gray-500 text-sm ml-2">/ {target}</span>
      </div>

      <div className="relative w-full bg-gray-200 rounded-full h-3">
        <div
          className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
          style={{
            width: `${percentage}%`,
            transition: 'width 1.5s ease-in-out',
          }}
        ></div>
      </div>
      <p className="text-gray-500 text-xs mt-2">
        {percentage}% achieved
      </p>
    </div>
  );
};

export default StatCard;
