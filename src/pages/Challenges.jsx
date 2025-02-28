import React, { useEffect, useState } from 'react';
import ChallengeItem from './ChallengeItem';
import UpcomingChallengeItem from './UpcomingChallengeItem';
import { motion } from "framer-motion";
import { supabase } from './supabase';
import { FaMedal, FaCrown } from "react-icons/fa";

const calculatePoints = (squats, pushups, jumpingJacks) => {
  const squatPoints = squats * 1; // 1 point per squat
  const pushupPoints = pushups * 2; // 2 points per pushup
  const jumpingJackPoints = jumpingJacks * 0.5; // 0.5 points per jumping jack
  return squatPoints + pushupPoints + jumpingJacks;
};

const Challenges = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userName, setUserName] = useState('');

  // const fetchUsername = async () => {
  //   try {
  //     const { data: userData, error: userError } = await supabase.auth.getUser();
  //     if (userError || !userData?.user) return;

  //     const userId = userData.user.id;

  //     const { data: userDetails, error: fetchError } = await supabase
  //       .from('registered_trackies')
  //       .select('name')
  //       .eq('user_id', userId)
  //       .single();

  //     if (fetchError) {
  //       console.error('Error fetching user name:', fetchError.message);
  //       return;
  //     }

  //     setUserName(userDetails?.name || 'User');
  //   } catch (err) {
  //     console.error('Unexpected error:', err);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsername();
  // }, []);

  // useEffect(() => {
  //   const fetchLeaderboardData = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('registered_trackies')
  //         .select('name, squats, pushup, jumpingjacks');

  //       if (error) throw error;

  //       const leaderboard = data.map((user) => ({
  //         name: user.name,
  //         squats: user.squats,
  //         pushups: user.pushup,
  //         jumpingJacks: user.jumpingjacks,
  //         points: calculatePoints(user.squats, user.pushup, user.jumpingjacks),
  //         isUser: user.name === userName,
  //       }));

  //       leaderboard.sort((a, b) => b.points - a.points);
  //       leaderboard.forEach((user, index) => {
  //         user.rank = index + 1;
  //       });

  //       setLeaderboardData(leaderboard);
  //     } catch (error) {
  //       console.error('Error fetching leaderboard data:', error);
  //     }
  //   };

  //   fetchLeaderboardData();
  // }, [userName]);

  // const getTrophyColor = (rank) => {
  //   if (rank === 1) return 'text-yellow-500';
  //   if (rank === 2) return 'text-gray-400';
  //   if (rank === 3) return 'text-amber-700';
  //   return 'text-gray-500';
  // };

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

      {/* <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-extrabold mb-8 text-center text-gray-800">
          🌟 Top Performers
        </h3>
        <div className="flex justify-center items-end space-x-8 relative">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.rank}
              className={`relative flex flex-col items-center bg-white p-6 rounded-lg shadow-md ml-9 text-center border-4 ${index === 0
                  ? "border-yellow-500 order-2 transform scale-100"
                  : index === 1
                    ? "border-gray-400 order-1 transform scale-100"
                    : "border-gray-400 order-3 transform scale-100"
                }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                delay: index * 0.1,
              }}
            >
              {index === 0 && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <FaCrown className="text-yellow-500 text-3xl drop-shadow-md" />
                </div>
              )}
              <div
                className={`flex justify-center items-center mb-4 text-white text-2xl rounded-full h-16 w-16 ${getTrophyColor(
                  user.rank
                )}`}
              >
                <FaMedal size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-800">{user.name}</h4>
              <p className="text-sm font-medium text-gray-600">{user.points} pts</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`relative flex items-center p-3 rounded-md ${user.isUser ? 'bg-blue-50' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {user.rank}
              </div>
              <FaMedal size={24} className={`mr-2 ${getTrophyColor(user.rank)}`} />
              <div className="flex-1">
                <h4 className={`font-medium ${user.isUser ? 'text-blue-600' : ''}`}>
                  {user.name} {user.isUser && '(You)'}
                </h4>
              </div>
              <div className="font-semibold">{user.points} pts</div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Challenges;
