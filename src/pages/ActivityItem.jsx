import React from 'react';

const ActivityItem = ({ title, time, duration, improvement }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-gray-500 text-sm">{time} • {duration}</p>
      </div>
      <div className="text-green-500 font-semibold">{improvement}</div>
    </div>
  );
};

export default ActivityItem;