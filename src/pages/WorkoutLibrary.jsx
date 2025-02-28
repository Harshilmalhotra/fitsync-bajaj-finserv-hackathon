import React, { useState } from 'react';
import WorkoutCard from './WorkoutCard';
import RoutineCard from './RoutineCard';

const WorkoutLibrary = () => {
  const colors = {
    primary: "#0F172A",  // Deep Dark Background (Sidebar, Navbar)
    secondary: "#1E293B", // Card & Section Background
    accent: "#3B82F6", // Primary Accent (Buttons, Highlights, Charts)
    accentSecondary: "#8B5CF6", // Secondary Accent (Interactive Elements)
    textPrimary: "#E2E8F0", // Light Text for Readability
    textSecondary: "#94A3B8", // Muted Text (Less Important Info)
    border: "#334155", // Border Color for Separation
  };

  // Define all workouts with category and condition info
  const allWorkouts = [
    {
      title: "Neck Retraction",
      target: "Forward Head Posture",
      duration: "5 min",
      difficulty: "Beginner",
      category: "Neck",
      condition: "Forward Head Posture",
      image: "https://thumb.ac-illust.com/3f/3f56dff4c44e673cce6c937b2cc1d4c1_t.jpeg",
      youtubeLink: "https://youtu.be/JkTnzMJpgt4?si=pLJQc_n9J3ZwyKL9"
    },
    {
      title: "Chin Tucks",
      target: "Neck Tension",
      duration: "4 min",
      difficulty: "Beginner",
      category: "Neck",
      condition: "Neck Strain",
      image: "https://www.verywellhealth.com/thmb/kI7-Z7-dWXD02PPdFLdCgn5H6Dw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Depositphotos_433654902_S-fd660461ceab486f97c0a69452d3c7a7.jpg",
      youtubeLink: "https://youtu.be/wQylqaCl8Zo?si=k6tDnPTF0zFGrzuw"
    },
    {
      title: "Neck Rotations",
      target: "Limited Range of Motion",
      duration: "6 min",
      difficulty: "Beginner",
      category: "Neck",
      condition: "Stiff Neck",
      image: "https://thumbs.dreamstime.com/b/physical-therapy-exercises-to-relieve-neck-pain-man-doing-set-isolated-white-background-home-vector-illustration-99918444.jpg",
      youtubeLink: "https://youtu.be/XulnGEGHgQg?si=8qw4d9RNGUkPL1G-"
    },
    {
      title: "Wall Angels",
      target: "Rounded Shoulders",
      duration: "8 min",
      difficulty: "Intermediate",
      category: "Shoulders",
      condition: "Rounded Shoulders",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGqnfeFXnDJ2ujtQ9KIMUDACvtE37aZzqzw&s",
      youtubeLink: "https://youtu.be/1UU4VvklQ44?si=xrCuTel1n31hWifF"
    },
    {
      title: "Shoulder External Rotation",
      target: "Rotator Cuff Strength",
      duration: "7 min",
      difficulty: "Intermediate",
      category: "Shoulders",
      condition: "Rotator Cuff Weakness",
      image: "https://www.healthpages.org/wp-content/uploads/2016/11/external-rotation-exercise-rotator-cuff-2-resized.jpg",
      youtubeLink: "https://youtu.be/FeJrRROaS7I?si=3pJYENMh5kNzjZNf"
    },
    {
      title: "Shoulder Blade Squeeze",
      target: "Weak Rhomboids",
      duration: "5 min",
      difficulty: "Beginner",
      category: "Shoulders",
      condition: "Winged Scapula",
      image: "https://cdn.shopify.com/s/files/1/1728/2157/files/Retraction.jpg?v=1552916920",
      youtubeLink: "https://youtu.be/FgskXsTGQAE?si=4EKK7-XZ1a3f78EF"
    },
    {
      title: "Scapular Retractions",
      target: "Shoulder Alignment",
      duration: "6 min",
      difficulty: "Beginner",
      category: "Back",
      condition: "Upper Crossed Syndrome",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEDir-y6nqG-ZYVBmc_aH7oDsCjuDy_IItiQ&s",
      youtubeLink: "https://youtu.be/CFt3WjCBbpc?si=z09Tbh5h4g9kHMCy"
    },
    {
      title: "Thoracic Extensions",
      target: "Upper Back Mobility",
      duration: "10 min",
      difficulty: "Intermediate",
      category: "Back",
      condition: "Thoracic Kyphosis",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn7IyRGxbri8Gq7C9_IASoy67LiHsucUzXyg&s",
      youtubeLink: "https://youtu.be/csjTuWpZA10?si=8cYAbRlAys5bNGgt"
    },
    {
      title: "Cat-Cow Stretch",
      target: "Spinal Mobility",
      duration: "8 min",
      difficulty: "Beginner",
      category: "Back",
      condition: "Lower Back Pain",
      image: "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Cow-Pose-768x514_600x400_crop_center.jpg",
      youtubeLink: "https://youtu.be/kqnua4rHVVA?si=i-KnjTYK4O8kWrvk"
    },
    {
      title: "Hip Flexor Stretches",
      target: "Anterior Pelvic Tilt",
      duration: "12 min",
      difficulty: "Beginner",
      category: "Hips",
      condition: "Anterior Pelvic Tilt",
      image: "https://i.ytimg.com/vi/cJSve88Yp4M/maxresdefault.jpg",
      youtubeLink: "https://youtu.be/iQnNn67aAeg?si=xN0VI1DWA9wWGunU"
    },
    {
      title: "Glute Bridge",
      target: "Glute Activation",
      duration: "8 min",
      difficulty: "Beginner",
      category: "Hips",
      condition: "Gluteal Amnesia",
      image: "https://cdn.shopify.com/s/files/1/1728/2157/files/Hip_thrust.jpg?v=1552918732",
      youtubeLink: "https://youtu.be/OUgsJ8-Vi0E?si=Tgf8C48A9JFkO6eL"
    },
    {
      title: "Hip External Rotation",
      target: "Hip Mobility",
      duration: "7 min",
      difficulty: "Intermediate",
      category: "Hips",
      condition: "Hip Impingement",
      image: "https://thumbs.dreamstime.com/b/clamshell-exercise-flat-illustration-girl-performing-sportive-workout-clamshell-exercise-flat-vector-illustration-140496321.jpg",
      youtubeLink: "https://youtu.be/hW_ipLvnlsM?si=wnGUPCOiF-l4dQV6"
    },
    {
      title: "Core Stabilization",
      target: "Lower Back Support",
      duration: "15 min",
      difficulty: "Advanced",
      category: "Back",
      condition: "Core Weakness",
      image: "https://cdn.evolve-mma.com/wp-content/uploads/2021/12/Rich-Franklin-planks.jpg",
      youtubeLink: "https://youtu.be/nFRjHgk2XS0?si=l3dYwkMmF6vz6RrA"
    }
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter workouts based on active category and search term
  const filteredWorkouts = allWorkouts.filter(workout => {
    // Filter by category
    const categoryMatch = activeFilter === 'All' || workout.category === activeFilter;
    
    // Filter by search term
    const searchMatch = 
      workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const routines = [
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
    }
  ];

  const filters = ['All', 'Neck', 'Shoulders', 'Back', 'Hips'];

  return (
    <div className="space-y-6 p-4" style={{ backgroundColor: colors.primary, color: colors.textPrimary }}>
      <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>Workout Library</h2>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-md transition-colors`}
              style={{ 
                backgroundColor: filter === activeFilter ? colors.accent : colors.secondary,
                color: colors.textPrimary
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md py-2 px-3 pl-9 w-64"
            style={{ 
              backgroundColor: colors.secondary,
              color: colors.textPrimary,
              borderColor: colors.border,
              borderWidth: '1px'
            }}
          />
          <div className="absolute left-3 top-2.5" style={{ color: colors.textSecondary }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Show message when no exercises match the criteria */}
      {filteredWorkouts.length === 0 && (
        <div className="text-center py-8" style={{ color: colors.textSecondary }}>
          No exercises found matching your criteria.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout, index) => (
          <WorkoutCard key={index} {...workout} colors={colors} />
        ))}
      </div>

      <div className="rounded-lg p-6" style={{ backgroundColor: colors.secondary }}>
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.textPrimary }}>Recommended Routines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routines.map((routine, index) => (
            <RoutineCard key={index} {...routine} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutLibrary;