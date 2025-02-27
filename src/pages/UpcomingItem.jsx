import React from 'react';

const UpcomingItem = ({ title, time, duration, type }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-gray-500 text-sm">{time} • {duration}</p>
      </div>
      <div className={`text-xs px-2 py-1 rounded-full ${type === 'Live' ? 'bg-red-100 text-red-600' :
          type === 'Group' ? 'bg-purple-100 text-purple-600' :
            'bg-blue-100 text-blue-600'
        }`}>
        {type}
      </div>
    </div>
  );
};

export default UpcomingItem;