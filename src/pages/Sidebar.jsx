import React from 'react';
import { Home, Inbox, Users, Calendar, Activity, Award, BarChart2 } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'inbox', label: 'Inbox', icon: <Inbox size={20} /> },
    { id: 'connections', label: 'Connection', icon: <Users size={20} /> },
    { id: 'calendar', label: 'Event Calendar', icon: <Calendar size={20} /> },
    { id: 'yoga', label: 'Yoga', icon: <Activity size={20} /> },
    { id: 'challenges', label: 'Challenges', icon: <Award size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 'workout', label: 'Workout Library', icon: <Activity size={20} /> },
    { id: 'profile', label: 'Profile', icon: <Users size={20} /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Award size={20} /> },
    { id: 'community', label: 'Community', icon: <Users size={20} /> },
    { id: 'practice', label: 'Practice', icon: <Activity size={20} /> },
  ];

  return (
    <div className="w-64 bg-primary flex flex-col text-textPrimary">
      <div className="text-xl font-bold mb-8 p-6">Dashboard!</div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full p-2 rounded-md transition-transform transform-gpu ${activeTab === item.id
                    ? 'bg-secondary text-accent scale-105'
                    : 'hover:bg-secondary hover:text-accent hover:scale-105'
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
                {item.id === 'inbox' && (
                  <span className="ml-auto bg-accentSecondary text-textPrimary text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* <div className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:scale-105 transition-transform mt-4">
        <button onClick={() => setActiveTab('special')}>Special Button</button>
      </div> */}
    </div>
  );
};

export default Sidebar;