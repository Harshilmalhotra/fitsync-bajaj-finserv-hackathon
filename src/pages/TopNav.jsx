import React from 'react';
import { Bell } from 'lucide-react';

const TopNav = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="bg-amber-50 p-4 rounded-md w-full">
        <h1 className="text-xl font-bold">Welcome Harshil!</h1>
      </div>
      <div className="ml-4">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Bell size={24} />
        </button>
      </div>
    </div>
  );
};

export default TopNav;