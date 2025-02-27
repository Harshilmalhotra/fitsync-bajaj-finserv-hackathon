import React from "react";
import { AiOutlineLineChart } from "react-icons/ai";

const StatCard = ({
  title,
  value,
  target,
  percentage,
  icon = <AiOutlineLineChart size={24} />,
}) => {
  const strokeWidth = 8;
  const radius = 50 - strokeWidth / 2; // Adjust for the stroke width
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <div className="relative m-24 w-40 h-40 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 animate-fade-in flex justify-center items-center group ">
      <svg
        width="200"
        height="200"
        className="absolute transform rotate-[-90deg]"
        viewBox="0 0 100 100"
      >

        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="url(#gradient)" // Gradient for the progress
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-500 ease-in-out group-hover:animate-progress"
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#" /> {/* Blue */}
            <stop offset="100%" stopColor="#" /> {/* Darker Blue */}
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute flex flex-col items-center text-center">
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        <div className="mt-1">
          <span className="text-xl font-extrabold text-gray-800">{value}</span>
          <span className="text-gray-500 text-xs ml-1">/ {target}</span>
        </div>
        <p className="text-gray-500 text-xs mt-1">{percentage}% achieved</p>
      </div>
    </div>
  );
};

export default StatCard;
