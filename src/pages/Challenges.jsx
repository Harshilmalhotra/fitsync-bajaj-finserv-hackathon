import React from 'react';
import ChallengeItem from './ChallengeItem';
import UpcomingChallengeItem from './UpcomingChallengeItem';

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

export default Challenges;