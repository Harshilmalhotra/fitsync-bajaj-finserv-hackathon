import React from 'react';
import { Home, Inbox, Users, Calendar, Activity, Award, BarChart2 } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'inbox', label: 'Inbox', icon: <Inbox size={20} /> },
    { id: 'connection', label: 'Connection', icon: <Users size={20} /> },
    { id: 'calendar', label: 'Event Calendar', icon: <Calendar size={20} /> },
    { id: 'pose', label: 'Pose Correction', icon: <Activity size={20} /> },
    { id: 'challenges', label: 'Challenges', icon: <Award size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 'workout', label: 'Workout Library', icon: <Activity size={20} /> },
  ];

  return (
    <div className="w-64 bg-amber-50 flex flex-col">
      <div className="text-xl font-bold mb-8 p-6">Dashboard!</div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full p-2 rounded-md ${activeTab === item.id
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-100'
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
                {item.id === 'inbox' && (
                  <span className="ml-auto bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;