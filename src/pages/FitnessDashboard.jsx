import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../pages/Sidebar';
import TopNav from '../pages/TopNav';
import ProfileSidebar from '../pages/ProfileSidebar';
import HomeContent from '../pages/HomeContent';
import PoseCorrection from './Posecorrection';
import EventCalendar from '../pages/EventCalendar';
import Challenges from './Challenges';
import Analytics from './Analytics';
import WorkoutLibrary from './WorkoutLibrary';
import Inbox from './Inbox';
import Community from './Community';

import Profile from './Profile';
import Leaderboard from './Leaderboard';

import Connection from './Connection';
import Practice from './Practice';
import Yoga from './Yoga';

const FitnessDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-y-auto bg-black">
        <div className="p-6">
          <TopNav />
          <div className="mt-6">
            {activeTab === 'home' && <HomeContent />}
            {activeTab === 'pose' && <PoseCorrection />}
            {activeTab === 'practice' && <Practice />}
            {activeTab === 'calendar' && <EventCalendar />}
            {activeTab === 'inbox' && <Inbox />}
            {activeTab === 'connections' && <Connection />}
            {activeTab === 'challenges' && <Challenges />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'workout' && <WorkoutLibrary />}
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'leaderboard' && <Leaderboard />}
            {activeTab === 'community' && <Community />}
            {activeTab === 'yoga' && <Yoga />}
          </div>
        </div>
      </div>
      {/* <ProfileSidebar /> */}
    </div>
  );
};

export default FitnessDashboard;