import React from 'react';
import WorkoutCard from './WorkoutCard';
import RoutineCard from './RoutineCard';

const WorkoutLibrary = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Workout Library</h2>

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

      <div className="grid grid-cols-3 gap-6">
        {[
          {
            title: "Neck Retraction",
            target: "Forward Head Posture",
            duration: "5 min",
            difficulty: "Beginner",
            image: "https://thumb.ac-illust.com/3f/3f56dff4c44e673cce6c937b2cc1d4c1_t.jpeg"
          },
          {
            title: "Wall Angels",
            target: "Rounded Shoulders",
            duration: "8 min",
            difficulty: "Intermediate",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGqnfeFXnDJ2ujtQ9KIMUDACvtE37aZzqzw&s"
          },
          {
            title: "Scapular Retractions",
            target: "Shoulder Alignment",
            duration: "6 min",
            difficulty: "Beginner",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEDir-y6nqG-ZYVBmc_aH7oDsCjuDy_IItiQ&s"
          },
          {
            title: "Thoracic Extensions",
            target: "Upper Back Mobility",
            duration: "10 min",
            difficulty: "Intermediate",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn7IyRGxbri8Gq7C9_IASoy67LiHsucUzXyg&s"
          },
          {
            title: "Hip Flexor Stretches",
            target: "Anterior Pelvic Tilt",
            duration: "12 min",
            difficulty: "Beginner",
            image: "https://i.ytimg.com/vi/cJSve88Yp4M/maxresdefault.jpg"
          },
          {
            title: "Core Stabilization",
            target: "Lower Back Support",
            duration: "15 min",
            difficulty: "Advanced",
            image: "https://cdn.evolve-mma.com/wp-content/uploads/2021/12/Rich-Franklin-planks.jpg"
          }
        ].map((workout, index) => (
          <WorkoutCard key={index} {...workout} />
        ))}
      </div>

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

export default WorkoutLibrary;