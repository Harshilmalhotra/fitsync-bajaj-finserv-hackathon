

import React, { useState } from 'react';
import { Bell, Home, Inbox, Users, Calendar, Activity, Award, BarChart2, Settings } from 'lucide-react';
import { auth } from '../pages/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

// Main Dashboard Component
const FitnessDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Top Navigation */}
          <TopNav />

          {/* Content Area */}
          <div className="mt-6">
            {activeTab === 'home' && <HomeContent />}
            {activeTab === 'pose' && <PoseCorrection />}
            {activeTab === 'challenges' && <Challenges />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'workout' && <WorkoutLibrary />}
          </div>
        </div>
      </div>

      {/* Profile Sidebar */}
      <ProfileSidebar />
    </div>
  );
};

// Sidebar Component
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

// Top Navigation Component
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

// Profile Sidebar Component
const ProfileSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="w-64 bg-gray-200 p-6">
      <div className="text-center flex flex-col">
        <h2 className="text-lg font-semibold mb-4">PROFILE</h2>
        <div className="flex justify-center mb-2">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/cheerful-positive-glad-man-has-broad-smile-rejoices-promotion-work_273609-16600.jpg?semt=ais_hybrid"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h3 className="font-medium">Wilfred Joseph</h3>
        <button className="text-blue-500 text-sm mt-1">Edit Profile</button>
        <button onClick={handleLogout} className="text-blue-500 text-sm cursor-pointer">Logout</button>

        <div className="mt-6">
          <UserStats />
        </div>
      </div>
    </div>
  );
};

// User Stats Component
const UserStats = () => {
  const stats = [
    { label: 'Workouts', value: '24' },
    { label: 'Challenges', value: '7' },
    { label: 'Streak', value: '5 days ' },
  ];

  return (
    <div className="bg-white rounded-md p-4 shadow-sm">
      <h4 className="font-medium mb-3">Your Stats</h4>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{stat.label}</span>
            <span className="font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Home Content Component
const HomeContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Dashboard</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Daily Steps"
          value="7,432"
          target="10,000"
          percentage={74}
          icon={<Activity size={24} />}
        />
        <StatCard
          title="Posture Score"
          value="87"
          target="100"
          percentage={87}
          icon={<Activity size={24} />}
        />
        <StatCard
          title="Active Minutes"
          value="48"
          target="60"
          percentage={80}
          icon={<Activity size={24} />}
        />
      </div>

      {/* Recent Activities & Upcoming */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <ActivityItem
              title="Posture Session"
              time="Today, 10:30 AM"
              duration="15 min"
              improvement="+7%"
            />
            <ActivityItem
              title="Shoulder Exercise"
              time="Yesterday, 4:15 PM"
              duration="20 min"
              improvement="+5%"
            />
            <ActivityItem
              title="Back Strengthening"
              time="Feb 26, 2:00 PM"
              duration="25 min"
              improvement="+8%"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            <UpcomingItem
              title="Live Coaching Session"
              time="Today, 5:00 PM"
              duration="30 min"
              type="Live"
            />
            <UpcomingItem
              title="Group Challenge"
              time="Tomorrow, 3:00 PM"
              duration="45 min"
              type="Group"
            />
            <UpcomingItem
              title="Posture Assessment"
              time="Feb 28, 11:00 AM"
              duration="15 min"
              type="Assessment"
            />
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder: Weekly progress visualization</p>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
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

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Activity Item Component
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

// Upcoming Item Component
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


const PoseCorrection = () => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false); 
  const [stream, setStream] = useState(null); 

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream); // Store the stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream; // Attach stream to the video element
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
      setIsCameraOn(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stream]);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pose Correction</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Live Posture Feedback</h3>
          <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: "100%", maxWidth: "500px", border: "2px solid #000", borderRadius: "8px" }}
            ></video>

          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <button onClick={startCamera} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Start Session
            </button>
            <button onClick={stopCamera} className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50">
              Stop Session
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Current Issues</h3>
          <div className="space-y-4">
            <IssueItem
              title="Forward Head Posture"
              severity="Moderate"
              recommendation="Chin tucks, 3 sets of 10"
            />
            <IssueItem
              title="Rounded Shoulders"
              severity="Mild"
              recommendation="Wall angels, 2 sets of 12"
            />
            <IssueItem
              title="Anterior Pelvic Tilt"
              severity="Minor"
              recommendation="Glute bridges, 3 sets of 15"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Improvement History</h3>
        <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder: Posture improvement over time</p>
        </div>
      </div>
    </div>
  );
};

// Issue Item Component
const IssueItem = ({ title, severity, recommendation }) => {
  const severityColor =
    severity === 'Severe' ? 'bg-red-100 text-red-600' :
      severity === 'Moderate' ? 'bg-orange-100 text-orange-600' :
        severity === 'Mild' ? 'bg-yellow-100 text-yellow-600' :
          'bg-green-100 text-green-600';

  return (
    <div className="border-b border-gray-100 pb-3">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-medium">{title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${severityColor}`}>
          {severity}
        </span>
      </div>
      <p className="text-gray-500 text-sm">{recommendation}</p>
    </div>
  );
};

// Challenges Component
const Challenges = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Challenges</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Active Challenges</h3>
          <div className="space-y-4">
            <ChallengeItem
              title="7-Day Perfect Posture"
              progress={71}
              days="5/7"
              participants={124}
            />
            <ChallengeItem
              title="Office Warrior"
              progress={45}
              days="9/20"
              participants={307}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Challenges</h3>
          <div className="space-y-4">
            <UpcomingChallengeItem
              title="Weekend Warrior"
              startDate="Mar 2"
              duration="3 days"
              participants={89}
            />
            <UpcomingChallengeItem
              title="Neck & Shoulder Relief"
              startDate="Mar 5"
              duration="14 days"
              participants={156}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Leaderboard</h3>
          <select className="border rounded-md p-1 text-sm">
            <option>7-Day Perfect Posture</option>
            <option>Office Warrior</option>
          </select>
        </div>
        <div className="space-y-3">
          {[
            { rank: 1, name: "Emma S.", points: 1240, isUser: false },
            { rank: 2, name: "David K.", points: 1180, isUser: false },
            { rank: 3, name: "Wilfred Joseph", points: 1120, isUser: true },
            { rank: 4, name: "Sarah P.", points: 1050, isUser: false },
            { rank: 5, name: "Michael T.", points: 980, isUser: false },
          ].map((user) => (
            <div
              key={user.rank}
              className={`flex items-center p-3 rounded-md ${user.isUser ? 'bg-blue-50' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {user.rank}
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${user.isUser ? 'text-blue-600' : ''}`}>
                  {user.name} {user.isUser && '(You)'}
                </h4>
              </div>
              <div className="font-semibold">{user.points} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Challenge Item Component
const ChallengeItem = ({ title, progress, days, participants }) => {
  return (
    <div className="border-b border-gray-100 pb-4">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{days} days completed</span>
        <span>{participants} participants</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Upcoming Challenge Item Component
const UpcomingChallengeItem = ({ title, startDate, duration, participants }) => {
  return (
    <div className="border-b border-gray-100 pb-4">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Starts {startDate} • {duration}</span>
        <span>{participants} joined</span>
      </div>
      <button className="w-full bg-blue-50 text-blue-600 py-1 px-4 rounded-md hover:bg-blue-100 text-sm">
        Join Challenge
      </button>
    </div>
  );
};

// Analytics Component
const Analytics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      {/* Time Range Selector */}
      <div className="flex justify-end space-x-2">
        {['Week', 'Month', '3 Months', 'Year'].map((range) => (
          <button
            key={range}
            className={`px-3 py-1 rounded-md ${range === 'Month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Posture Score Trends</h3>
          <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder: Posture score over time</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
          <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder: Activity types pie chart</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Posture Issues</h3>
          <div className="space-y-3">
            {[
              { issue: "Forward Head", percentage: 42 },
              { issue: "Rounded Shoulders", percentage: 28 },
              { issue: "Pelvic Tilt", percentage: 18 },
              { issue: "Other Issues", percentage: 12 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.issue}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Session Duration</h3>
          <div className="h-40 w-full bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder: Duration bars</p>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Duration</span>
              <span className="font-semibold">18 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Improvement Rate</h3>
          <div className="flex flex-col items-center justify-center h-40">
            <div className="relative w-32 h-32">
              <div className="w-32 h-32 rounded-full bg-gray-100"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold">+23%</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-2">vs. previous month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Workout Library Component
const WorkoutLibrary = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Workout Library</h2>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {['All', 'Neck', 'Shoulders', 'Back', 'Hips'].map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 rounded-md ${filter === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search exercises..."
            className="border rounded-md py-1 px-3 pl-8 w-64"
          />
          <div className="absolute left-2 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Workout Grid */}
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            title: "Neck Retraction",
            target: "Forward Head Posture",
            duration: "5 min",
            difficulty: "Beginner"
          },
          {
            title: "Wall Angels",
            target: "Rounded Shoulders",
            duration: "8 min",
            difficulty: "Intermediate"
          },
          {
            title: "Scapular Retractions",
            target: "Shoulder Alignment",
            duration: "6 min",
            difficulty: "Beginner"
          },
          {
            title: "Thoracic Extensions",
            target: "Upper Back Mobility",
            duration: "10 min",
            difficulty: "Intermediate"
          },
          {
            title: "Hip Flexor Stretches",
            target: "Anterior Pelvic Tilt",
            duration: "12 min",
            difficulty: "Beginner"
          },
          {
            title: "Core Stabilization",
            target: "Lower Back Support",
            duration: "15 min",
            difficulty: "Advanced"
          }
        ].map((workout, index) => (
          <WorkoutCard key={index} {...workout} />
        ))}
      </div>

      {/* Recommended Routines */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recommended Routines</h3>
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              title: "Office Worker Relief",
              exercises: 5,
              duration: "20 min",
              level: "Beginner"
            },
            {
              title: "Tech Neck Solution",
              exercises: 4,
              duration: "15 min",
              level: "Beginner"
            },
          ].map((routine, index) => (
            <RoutineCard key={index} {...routine} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Workout Card Component
const WorkoutCard = ({ title, target, duration, difficulty }) => {
  const difficultyColor =
    difficulty === 'Advanced' ? 'bg-red-100 text-red-600' :
      difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
        'bg-green-100 text-green-600';

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Exercise image</p>
      </div>
      <div className="p-4">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-gray-600 text-sm mb-3">Targets: {target}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{duration}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`}>
            {difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};

// Routine Card Component
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

export default FitnessDashboard;
