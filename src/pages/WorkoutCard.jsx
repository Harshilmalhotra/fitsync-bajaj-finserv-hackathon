import React from 'react';

const WorkoutCard = ({ image, title, target, duration, difficulty }) => {
  const difficultyColor =
    difficulty === 'Advanced' ? 'bg-red-100 text-red-600' :
      difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
        'bg-green-100 text-green-600';

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-52 bg-gray-100 flex items-center justify-center">
        <img src={image} alt="" className="h-full w-auto object-cover" />
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

export default WorkoutCard;